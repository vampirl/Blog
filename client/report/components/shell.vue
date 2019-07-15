<template>
  <div>
    <el-container class="blogShell">
      <el-header class="header">
        <slot name="header" />
      </el-header>
      <el-main class="main">
        <slot name="authorInfo" />
        <slot name="tabs" />
        <slot name="main" />
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
  border-bottom: 1px solid #969696
}
.main {
  width: 70%;
  margin-left: 15%;
  border:1px solid #969696;
}
</style>
