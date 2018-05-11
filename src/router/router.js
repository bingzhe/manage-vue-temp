import Main from '@/views/main/TheMain.vue';

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  redirect: '/home',
  component: Main,
  children: [
    // { path: 'home', title: { i18n: 'home' }, name: 'home_index', component: () => import('@/views/home/home.vue') },
    // { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: () => import('@/views/own-space/own-space.vue') },
    // { path: 'order/:order_id', title: '订单详情', name: 'order-info', component: () => import('@/views/advanced-router/component/order-info.vue') }, // 用于展示动态路由
    // { path: 'shopping', title: '购物详情', name: 'shopping', component: () => import('@/views/advanced-router/component/shopping-info.vue') }, // 用于展示带参路由
    // { path: 'message', title: '消息中心', name: 'message_index', component: () => import('@/views/message/message.vue') }
  ]
};

export const appRouter = [
  {
    path: '/component',
    icon: '',
    name: 'component',
    title: '组件',
    component: Main,
    children: [{
      path: 'text-editor',
      icon: 'compose',
      name: 'text-editor',
      title: '富文本编辑器',
      component: () => import('@/views/components-demo/text-editor/TextEditor.vue')
    }, {
      path: 'file-upload',
      icon: 'android-upload',
      name: 'file-upload',
      title: '文件上传',
      component: () => import('@/views/components-demo/file-upload/FileUpload.vue')
    }]
  }
];

export const routers = [
  otherRouter,
  ...appRouter
];
