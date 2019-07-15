import Vue from 'vue';
import router from '@report/router';
import ElementUI from 'element-ui'
import App from '@report/App.vue';
import 'element-ui/lib/theme-chalk/index.css'
import '@report/style/index.less';

Vue.use(ElementUI)
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
