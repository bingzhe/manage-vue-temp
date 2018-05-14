const _import = require("./_import_" + process.env.NODE_ENV);

import Main from "@/views/main/TheMain.vue";

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
  path: "/",
  name: "otherRouter",
  // redirect: '/home',
  component: Main,
  // children: [
  //   { path: 'home', title: { i18n: 'home' }, name: 'home_index', component: _import("components-demo/text-editor/TextEditor") },
  //   // { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: () => import('@/views/own-space/own-space.vue') },
  //   // { path: 'order/:order_id', title: '订单详情', name: 'order-info', component: () => import('@/views/advanced-router/component/order-info.vue') }, // 用于展示动态路由
  //   // { path: 'shopping', title: '购物详情', name: 'shopping', component: () => import('@/views/advanced-router/component/shopping-info.vue') }, // 用于展示带参路由
  //   // { path: 'message', title: '消息中心', name: 'message_index', component: () => import('@/views/message/message.vue') }
  // ]
};

/**
 * 
 //当设置 true 的时候该路由不会再侧边栏出现
 hidden: true

 //当设置 noredirect 的时候该路由不会在面包屑导航中出现
 redirect: noredirect
 
 //当设置 true 的时候永远会显示根菜单，不设置的情况下只有当子路由个数大于一个时才会显示根菜单
 //当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式。只有一个时会将那个子路由当做根路由
 alwaysShow: true
 
 name:'router-name'            //设定路由的名字并且唯一，一定要填写不然 使用 <keep-alive> 时会出现各种问题
 meta : {
   roles: ['admin','editor']   //设置该路由进入的权限，支持多个权限叠加
   title: 'title'              //设置该路由在侧边栏和面包屑中展示的名字
   icon: 'icon-name'            //设置该路由的图标
   noCache: true               //如果设置为true ,则不会被 <keep-alive> 缓存(默认 false)
  }
 */

export const appRouter = [
  {
    path: "/component",
    name: "component",
    component: Main,
    meta: {
      icon: "el-icon-printer",
      title: "组件"
    },
    children: [{
      path: "text-editor",
      name: "text-editor",
      mate: {
        icon: "el-icon-printer",
        title: "富文本编辑器",
      },
      component: _import("components-demo/text-editor/TextEditor")
    }, {
      path: "file-upload",
      name: "file-upload",
      mate: {
        icon: "el-icon-printer",
        title: "文件上传",
      },
      component: _import("components-demo/file-upload/FileUpload")
    }]
  }
];

export const routers = [
  otherRouter,
  ...appRouter
];
