// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import locale from 'element-ui/lib/locale/lang/zh-CN';
import App from './App';
import router from './router';
import '@/assets/font/iconfont.css';
import '@/config/utilPageStore';
import { Util } from '@/config/util.js';

Vue.use(ElementUI, { locale });
 window.router = router;
Vue.config.productionTip = false;

Util.creatKey();
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
});
