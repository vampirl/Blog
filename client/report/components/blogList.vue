<template>
  <a-list
    class="demo-loadmore-list"
    :loading="loading"
    :data-source="data"
  >
    <div 
      v-if="showLoadingMore" 
      slot="loadMore" 
      :style="{ textAlign: 'center', marginTop: '12px', height: '102px', lineHeight: '32px' }"
    >
      <a-spin v-if="loadingMore" />
      <el-button 
        v-else 
        @click="onLoadMore"
      >
        加载更多
      </el-button>
      <el-button @click="addBlog">
        <i class="el-icon-plus" />
      </el-button>
    </div>
    <a-list-item 
      slot="renderItem" 
      slot-scope="item"
      class="listItem"
    >
      <a-list-item-meta :description="item.description">
        <a 
          slot="title" 
          class="title"
          @click="getDetail(item.id)"
        >
          {{ item.title }}
        </a>
      </a-list-item-meta>
      <span class="date">{{ item.time }}</span>
    </a-list-item>
  </a-list>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      loading: true,
      loadingMore: false,
      showLoadingMore: true,
      data: [],
    }
  },
  mounted () {
    this.getdatalist()
  },
  methods: {
    onLoadMore () {
      this.loadingMore = true
      this.$store.dispatch("GETDATALIST").then( () => {
        this.data = this.data.concat(this.$store.state.datalist)
        this.loadingMore = false
        this.$nextTick(() => {
          window.dispatchEvent(new Event('resize'))
        })
      })
    },
    getdatalist() {
      this.$store.dispatch('GETDATALIST').then(() => {
        this.loading = false
        this.data = this.$store.state.datalist;
      }).catch((err) => {
        alert(err)
      })
    },
    addBlog() {
      this.$router.push('/addblog')
    },
    getDetail(id) {
      this.$router.push({
        path:'/detail',
        query: {
          id:id
          }
      })
    }
  },
  
}
</script>
<style>
.demo-loadmore-list {
  min-height: 350px;
}
.title {
  color: #969696;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.5;
}
</style>