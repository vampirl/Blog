<template>
  <shell>
    <template slot="header">
      <blog-header />
    </template>
    <template slot="authorInfo">
      <div class="authorInfo">
        <el-upload
          class="avatar-uploader"
          multiple
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img 
            src="../images/headpic.jpg"
            class="pic"
          >
        </el-upload>
        <div class="info">
          <span class="username">{{ username }}</span>
          <el-breadcrumb
            separator="/"
            class="breadcrumb"
          >
            <el-breadcrumb-item :to="{ path: '/followers' }">
              <p class="number">
                {{ followersNum }}
              </p>
              关注
            </el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/funs' }">
              <p class="number">
                {{ funsNum }}
              </p>
              粉丝
            </el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/' }">
              <p class="number">
                {{ articleNum }}
              </p>
              文章
            </el-breadcrumb-item>
            <el-breadcrumb-item>
              <p class="number">
                {{ likeNum }}
              </p>
              收获喜欢
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
    </template>
    <template slot="tabs">
      <el-menu
        :default-active="activeIndex" 
        class="el-menu-demo"
        background-color="#F4F4F4"
        mode="horizontal"
        active-text-color="#646464"
        @select="handleSelect"
      >
        <el-menu-item :index="indexes[0]">
          <i class="el-icon-document" />
          <span class="menuText">文章</span>
        </el-menu-item>
        <el-menu-item :index="indexes[1]">
          <i class="el-icon-bell" />
          <span class="menuText">动态</span>
        </el-menu-item>
        <el-menu-item :index="indexes[2]">
          <i class="el-icon-edit" />
          <span class="menuText">最新评论</span>
        </el-menu-item>
        <el-menu-item :index="indexes[3]">
          <i class="el-icon-star-on" />
          <span class="menuText">我的收藏</span>
        </el-menu-item>
      </el-menu>
    </template>
    <template slot="main">
      <component :is="currentComponent" />
    </template>
  </shell>
</template>

<script>
import { imageListConvert }  from '@report/utils/compress.js'
import Shell from './shell'
import BlogHeader from './header'
import BlogList from './blogList'
import BlogDynamic from './blogDynamic'
import NewComment from "./newComment"
import Collect from './collect'
export default {
  components: {
    Shell,
    BlogHeader,
    BlogList,
    BlogDynamic,
    NewComment,
    Collect
  },
  data() {
    return {
      indexes: ["/blogList","/blogDynamic", "/newComment","/collect"],
      components: ["BlogList", "BlogDynamic","NewComment","Collect"],
      currentComponent: "BlogList",
      activeIndex: "/blogList",
      username: "Vampire丶_L",
      followersNum: '202',
      funsNum: "19",
      articleNum: '20',
      likeNum: '2000'
    }
  },
  methods: {
    //切换导航栏，切换对应的组件
    handleSelect(index) {
      this.defaultActive = index;
      this.currentComponent = this.components[this.indexes.indexOf(index)];
    },
    handleAvatarSuccess() {},
    async beforeAvatarUpload(file) {
      console.log('file===', file);
      const compressItem = await imageListConvert(file)
      console.log('compressItem==', compressItem);
    }
  }
}
</script>

<style lang="less">
.authorInfo {
  display: flex;
  flex-direction: row;
  width: 70%;
  height: 80px;
  margin-top: 5px;
  margin-bottom: 10px;
}
.avatar-uploader .el-upload {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.pic {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.info {
  width: 400px;
  height: 80px;
  margin-left:5px; 
}
.username {
  display: inherit;
  margin-left: 10px;
  margin-top: 5px;
  font-weight: 700;
  font-size: 21px;
  color: #333;
}

.number{
  width: 20px;
  font-size: 16px;
  font-weight:400; 
}
.list {
  height: 2020px;
}
.menuText {
  padding: 13px 5px;
  font-size: 15px;
  font-weight: 700;
  color: #969696;
  line-height: 25px;
}
.breadcrumb{
  margin-top:  7px;
  margin-left: 10px
}

</style>
