import Vue from 'vue';
import router from '@report/router';
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import ElementUI from 'element-ui'
import App from '@report/App.vue';
import 'element-ui/lib/theme-chalk/index.css'
import '@report/style/index.less';
import store from './store/index'

Vue.use(ElementUI)
Vue.use(Antd)
new Vue({
  store,
  el: '#app',
  router,
  render: h => h(App)
});
