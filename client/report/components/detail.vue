<template>
  <shell>
    <template slot="header">
      <blog-header />
    </template>
    <template slot="main">
      <p>{{ title }}</p>
      <div class="detail">
        <p>{{ content }}</p>
      </div>
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
    data () {
        return {
            id: this.$route.query.id,
            title: '',
            content: ''
        }
    },
    mounted () {
      this.getdetail()
    },
    methods: {
        getdetail() {
            this.$store.dispatch('GETDETAIL',{id:this.id}).then( () => {
            this.title = this.$store.state.detail.title
            this.content = this.$store.state.detail.content
            })
        }
    }
}
</script>
<style>
.detail{
    margin-top: 70px;
}
</style>
