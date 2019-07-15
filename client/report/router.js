import Vue from 'vue';
import VueRouter from 'vue-router';

const Index = () => import('@report/components/index');

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Index,
  },
];

const router = new VueRouter({
  base: '/report',
  mode: 'history',
  routes
});

export default router;
