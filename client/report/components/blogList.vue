<template>
  <a-list
    class="demo-loadmore-list"
    :loading="loading"
    :data-source="data"
  >
    <div 
      v-if="showLoadingMore" 
      slot="loadMore" 
      :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
    >
      <a-spin v-if="loadingMore" />
      <a-button 
        v-else 
        @click="onLoadMore"
      >
        加载更多
      </a-button>
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
    this.getdatalist((res) => {
      this.loading = false
      this.data = res.data;
    });
    
  },
  methods: {
     getdatalist(callback) {
      axios.get('/getDataList').then( res => {
        if (res.status === 200) {
          callback(res)
        }
      })
    },
    onLoadMore () {
      this.loadingMore = true
      this.getData((res) => {
        this.data = this.data.concat(res.results)
        this.loadingMore = false
        this.$nextTick(() => {
          window.dispatchEvent(new Event('resize'))
        })
      })
    },
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