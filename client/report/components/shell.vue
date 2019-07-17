<template>
  <div>
    <el-container class="blogShell">
      <el-header class="header">
        <slot name="header" />
      </el-header>
      <el-main class="main">
        <div class="left" />
        <div class="mid">
          <slot name="authorInfo" />
          <slot name="tabs" />
          <slot name="main" />
        </div>
        <div class="right" />
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {};
</script>
<style>
.blogShell {
    height: 100vh;
}
.header{
   border-bottom: 1px solid #e6e6e6;
}
.main {
  display: flex;
  flex-direction: row;
  width: 100%;
}
.left {
  width: 15%;
}
.mid {
  width: 60%;
}
.right {
  width: 25%;
}
</style>
