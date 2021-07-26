/**
 * 文件读取并通过canvas压缩转成base64
 * @param files
 * @param callback
 */

// EXIF js 可以读取图片的元信息  https://github.com/exif-js/exif-js
// import EXIF from 'exif-js';

// 压缩图片时 质量减少的值
const COMPRESS_QUALITY_STEP = 0.03;
const COMPRESS_QUALITY_STEP_BIG = 0.06;
// 压缩图片时，图片尺寸缩放的比例，eg：0.9, 等比例缩放为0.9
const COMPRESS_SIZE_RATE = 1;

const defaultOptions = {
  maxSize: 1024 * 1024 * 5, // 压缩后允许的最大值，默认：1M
  fillBgColor: '#ffffff'
};

/**
   *  将待上传文件列表压缩并转换base64
   *  ！！！！ 注意 ： 图片会默认被转为 jpeg ， 透明底会加白色背景
   *  files : 文件列表 ，必须是数组
   *  callback : 回调，每个文件压缩成功后都会回调,
   *  options ：配置
   *  @return { base64Data: '',fileType: '' }， //fileType强制改为jpeg
   */
export function imageListConvert(file, options = {}) {
  options = { ...defaultOptions, ...options };
  const fileName = file.name
  return new Promise((reslove) => {
    console.log('压缩前:', parseFloat(file.size / 1048576).toFixed(2), 'M')
    const reader = new FileReader();
    reader.onload = function(file) {
      const image = new Image();
      image.onload = function() {
        const data = convertImage(image, options.maxSize, options.fillBgColor);
        const compressFile = dataURLtoFile(data, fileName)
        console.log('压缩后:', parseFloat(compressFile.size / 1048576).toFixed(2), 'M')
        reslove(compressFile)
      };
      image.src = file.target.result;
    }
    reader.readAsDataURL(file);
  })
}

function dataURLtoFile(dataurl, filename) {
  const arr = dataurl.split(',')
  const bstr = window.atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {
    type: 'image/jpeg',
  })
}

/**
 * 将 image 对象 画入画布并导出base64数据
 */
export function convertImage(
  image,
  maxSize = 1024 * 1024 * 5,
  fillBgColor = '#ffffff'
) {
  const maxWidth = 1280
  const maxHeight = 1280
  let cvs = document.createElement('canvas')
  let w = image.width
  let h = image.height
  let quality = 0.9;

  /**
   * 这里用于计算画布的宽高
   */
  if (w > 0 && h > 0) {
    if (w / h >= maxWidth / maxHeight) {
      if (w > maxWidth) {
        h = (h * maxWidth) / w;
        w = maxWidth;
      }
    } else {
      if (h > maxHeight) {
        w = (w * maxHeight) / h;
        h = maxHeight;
      }
    }
  }

  let ctx = cvs.getContext('2d');
  let size = prepareCanvas(cvs, ctx, w, h);

  // 填充白色背景
  ctx.fillStyle = fillBgColor;
  ctx.fillRect(0, 0, size.w, size.h);

  // 将图片绘制到Canvas上，从原点0,0绘制到w,h
  ctx.drawImage(image, 0, 0, size.w, size.h);

  let dataUrl = cvs.toDataURL(`image/jpeg`, quality);
  // 当图片大小 > maxSize 时，循环压缩,并且循环不超过10次
  let count = 0;
  while (dataUrl.length > maxSize && count < 10) {
    const imgDataLength = dataUrl.length;
    const isDoubleSize = imgDataLength / maxSize > 2;
    // 质量一次下降
    quality -= isDoubleSize ? COMPRESS_QUALITY_STEP_BIG : COMPRESS_QUALITY_STEP;
    quality = parseFloat(quality.toFixed(2));

    // 图片还太大的情况下，继续压缩 。 按比例缩放尺寸
    const scaleStrength = COMPRESS_SIZE_RATE;
    w = w * scaleStrength;
    h = h * scaleStrength;

    size = prepareCanvas(cvs, ctx, w, h, 6);

    // 将图片绘制到Canvas上，从原点0,0绘制到w,h
    ctx.drawImage(image, 0, 0, size.w, size.h);

    console.log(`imgDataLength：${imgDataLength} , maxSize --> ${maxSize}`);
    console.log(`size.w:${size.w}, size.h:${size.h}, quality：${quality}`);
    dataUrl = cvs.toDataURL(`image/jpeg`, quality);
    count++;
  }

  console.log(`imgDataLength：${dataUrl.length} , maxSize --> ${maxSize}`);
  console.log(`size.w:${size.w}, size.h:${size.h}, quality：${quality}`);

  cvs = ctx = null;
  return dataUrl;
}

/**
 * 准备画布
 * cvs 画布
 * ctx 上下文
 * w : 想要画的宽度
 * h : 想要画的高度
 * orientation : 屏幕方向
 */
function prepareCanvas(cvs, ctx, w, h, orientation) {
  cvs.width = w;
  cvs.height = h;
  // 判断图片方向，重置canvas大小，确定旋转角度，iphone默认的是home键在右方的横屏拍摄方式
  let degree = 0;
  switch (orientation) {
    case 3:
      // iphone横屏拍摄，此时home键在左侧
      degree = 180;
      w = -w;
      h = -h;
      break;

    case 6:
      // iphone竖屏拍摄，此时home键在下方(正常拿手机的方向)
      cvs.width = h;
      cvs.height = w;
      degree = 90;
      // w = w;
      h = -h;
      break;
    case 8:
      // iphone竖屏拍摄，此时home键在上方
      cvs.width = h;
      cvs.height = w;
      degree = 270;
      w = -w;
      // h = h;
      break;
  }
  // 使用canvas旋转校正
  ctx.rotate((degree * Math.PI) / 180);
  return { w, h };
}

export function getFileType(fileName = '') {
  return fileName.substring(fileName.lastIndexOf('.') + 1);
}
