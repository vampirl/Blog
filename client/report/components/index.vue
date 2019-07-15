<template>
  <shell>
    <template slot="header">
      <blog-header />
    </template>
    <template slot="authorInfo">
      <div class="authorInfo"></div>
    </template>
    <template slot="tabs">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" active-text-color="#646464" background-color="#F4F4F4">
        <el-menu-item index="1">
          <i class="el-icon-document"></i>
          <span class="menuText">文章</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-bell"></i>
          <span class="menuText">动态</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-edit"></i>
          <span class="menuText">最新评论</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-star-on"></i>
          <span class="menuText">我的收藏</span>
        </el-menu-item>
      </el-menu>
    </template>
    <template slot="main">
    </template>
  </shell>
</template>

<script>
import Shell from './shell'
import BlogHeader from './header'
export default {
  components: {
    Shell,
    BlogHeader
  },
  data() {
    return {
      message: 'this is the report page'
    }
  }
}
</script>

<style lang="less">
.authorInfo {
  width: 70%;
  height: 80px;
  margin-top: 10px;
  border: 1px solid #969696; 
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
</style>
