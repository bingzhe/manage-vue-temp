import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/modules/dashboard/view'
import Shopinfo from '@/modules/shop/view/shopinfo'
import Staff from '@/modules/shop/view/staff'
import Good from '@/modules/merchandise/view/good'
import Order from '@/modules/merchandise/view/order'
import Menu from '@/modules/merchandise/view/menu'
import Sale from '@/modules/merchandise/view/sale'
import Advance from '@/modules/advance/view'
import AdvanceSet from '@/modules/advance/view/set'
import Table from '@/modules/table/view'
import TableSet from '@/modules/table/view/set'
import Printer from '@/modules/printer/view'
import User from '@/modules/user/view'
// layout
import Layout from '@/modules/layout/view/layout'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: Layout,
    name: '首页',
    redirect: '/dashboard',
    icon: 'dashboardicon',
    noDropdown: true,
    children: [{ path: 'dashboard', component: Dashboard/*component: _import(''),*/ }]
  }, {
    path: '/shop',
    component: Layout,
    redirect: '/shop/shopinfo',
    name: '店铺管理',
    icon: 'shopicon',
    children: [
      { path: 'shopinfo',component: Shopinfo,/*component: _import(''),*/ name: '店铺信息' },
      { path: 'staff',component: Staff,/*component: _import(''),*/ name: '员工管理' },
    ]
  }, {
    path: '/merchandise',
    component: Layout,
    redirect: '/merchandise/good',
    name: '商品管理',
    icon: 'merchandiseicon',
    children: [
      { path: 'good',component: Good,/*component: _import(''),*/ name: '商品管理' },
      { path: 'order',component: Order,/*component: _import(''),*/ name: '订单管理' },
      { path: 'menu',component: Menu,/*component: _import(''),*/ name: '菜单管理' },
      { path: 'sale',component: Sale,/*component: _import(''),*/ name: '促销管理' },
    ]
  }, {
    path: '/advance',
    component: Layout,
    redirect: '/advance/index',
    name: '预定管理',
    icon: 'advanceicon',
    children: [
      { path: 'index',component: Advance,/*component: _import(''),*/ name: '预定管理' },
      { path: 'set',component: AdvanceSet,/*component: _import(''),*/ name: '预定设置' },
    ]
  }, {
    path: '/table',
    component: Layout,
    redirect: '/table/index',
    name: '餐桌管理',
    icon: 'tableicon',
    children: [
      { path: 'index',component: Table,/*component: _import(''),*/ name: '餐桌监控' },
      { path: 'set', component: TableSet,/*component: _import(''),*/ name: '餐桌设置' },
    ]
  }, {
    path: '/printer',
    component: Layout,
    name: '打印机管理',
    icon: 'printericon',
    noDropdown: true,
    children: [{ path: 'index',component:Printer,/*component: _import(''),*/ }]
  }, {
    path: '/user',
    component: Layout,
    name: '用户管理',
    icon: 'usericon',
    noDropdown: true,
    children: [{ path: 'index',component:User/*component: _import(''),*/ }]
  }]
})
