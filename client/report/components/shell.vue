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
   border-bottom: 1px solid #e6e6e6;
}
.main {
  width: 85%;
  margin-left: 15%;

}
</style>
