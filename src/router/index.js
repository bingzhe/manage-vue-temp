import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import TheMain from '@/views/main/TheMain';
import { routers, otherRouter, appRouter } from './router';

Vue.use(Router);

const RouterConfig = {
  routes: routers
};

export default new Router(RouterConfig);
