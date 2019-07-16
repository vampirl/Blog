import Vue from 'vue';
import VueRouter from 'vue-router';

const Index = () => import('@report/components/index');
const Followers = () => import('@report/page/followers');
const Funs = () => import('@report/page/funs')

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
  }
];

const router = new VueRouter({
  base: '/report',
  mode: 'history',
  routes
});

export default router;
