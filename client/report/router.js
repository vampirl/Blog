import Vue from 'vue';
import VueRouter from 'vue-router';

const Index = () => import('@report/components/index');
const Followers = () => import('@report/page/followers');
const Funs = () => import('@report/page/funs')
const AddBlog = () => import('@report/page/addBlog')
const Detail = () => import('@report/components/detail')
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Index,
  },{
    path: '/followers',
    component: Followers
  },{
    path: '/funs',
    component: Funs
  },{
    path: '/addblog',
    component: AddBlog 
  },{
    path: '/detail',
    component: Detail
  }

];

const router = new VueRouter({
  base: '/report',
  mode: 'history',
  routes
});

export default router;
