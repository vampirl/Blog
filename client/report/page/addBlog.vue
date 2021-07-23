<template>
  <div>
    <div class="content">
      <div style="margin: 40px 0;" />
      <el-input
        v-model="title"
        type="textarea"
        autosize
        placeholder="请输入标题"
      />
      <div style="margin: 40px 0;" />
      <el-input
        v-model="description"
        type="textarea"
        autosize
        placeholder="请输入副标题"
      />
      <div style="margin: 40px 0;" />
      <el-input
        v-model="content"
        type="textarea"
        :autosize="{ minRows: 10, maxRows: 20}"
        placeholder="请输入内容"
      />
      <div style="margin: 40px 0;" />
      <el-button @click="submit">
        提交
      </el-button>
      <el-button @click="back">
        返回
      </el-button>
    </div>
  </div>
</template>
<script>
import axios from "axios"
export default {
    data () {
        return {
            title: "",
            content: "",
            description:''
        }
    },
    methods: {
      submit() {
        axios.post('/api/addBlog',{
          title: this.title,
          content:this.content,
          description:this.description
        }).then( res => {
          if(res.status === 201 ) {
            this.title = ''
            this.content = ''
            this.description = ''
          }
        })
      },
      back(){
        this.$router.push("/")
      }
    }
}
</script>
<style>
.content{
  width:30%;
  margin-left: 30%;
}
button{
  margin-left:80% 
}
</style>
