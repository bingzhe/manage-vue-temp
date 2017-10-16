import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import_' + process.env.NODE_ENV);
//路由懒加载

/*layout */
import Layout from '@/modules/layout/view/layout';
import refresh from '@/components/refresh.vue';


Vue.use(Router);

/**
 * icon: sidebar显示的图标
 * hidden: 'hidden:true' sidebar不会显示
 * redirect: 'redirect:noredirect' levelbar 不显示
 * noDropdown: 'noDropdown: true' 无下拉
 */


export const constantRouterMap = [
	{
		path: '/',
		component: _import('login/view/index'),
		// redirect: '/login',
		hidden: true
	},
	// { path: '/404', component: _import(''), hidden: true },
	// {
	// 	path: '/',
	// 	// component: Layout,
	// 	redirect: '/dashboard/dashboard',
	// 	hidden: true
	// },
	{
		path: '/dashboard',
		component: Layout,
		redirect: '/dashboard/dashboard',
		name: '首页',
		// hidden: true,
		noDropdown: true,
		icon: 'icon-shouye',
		children: [{
			path: 'dashboard',
			component: _import('dashboard/view/index')
		},
		{
			path: '/refresh',
			component: refresh,
			name: 'refresh'
		}
		]
	},
	{
		path: '/shop',
		component: Layout,
		redirect: '/shop/shopinfo',
		name: '店铺管理',
		icon: 'icon-shop-fill',
		children: [{
			path: 'shopinfo',
			component: _import('shop/view/shopinfo/index'),
			name: '店铺信息'
		},
		{
			path: 'staff',
			component: _import('shop/view/staff/index'),
			name: '员工管理'
		},
		{
			path: 'table',
			component: _import('table/view/index'),
			name: '餐桌管理'
		},
		{
			path: 'good',
			component: _import('merchandise/view/index'),
			name: '菜品管理'
		},
		{
			path: 'customer',
			component: _import('customer/view/index'),
			name: '客户管理'
		},
		{
			path: 'printer',
			component: _import('printer/view/index'),
			name: '打印机管理'
		},
		{
			path: 'silver',
			component: _import('silver/view/index'),
			name: '收银管理'
		},
		]
	},
	{
		path: '/statistical',
		component: Layout,
		redirect: '/statistical/orderform',
		name: '统计报表',
		icon: 'icon-yuyue',
		children: [{
			path: 'ordierform',
			component: _import('statisticalform/view/orderform'),
			name: '订单报表'
		},
		{
			path: 'advance',
			component: _import('statisticalform/view/advance'),
			name: '预定报表'
		},
		{
			path: 'bills',
			component: _import('statisticalform/view/bills'),
			name: '账单流水'
		},
		]
	},
	{
		path: '/message',
		component: Layout,
		redirect: '/message/systemmsg',
		name: '消息中心',
		icon: 'icon-xiaoxi',
		children: [{
			path: 'systemmsg',
			component: _import('messagecenter/view/systemmsg'),
			name: '系统公告'
		},
		{
			path: 'mass',
			component: _import('messagecenter/view/mass'),
			name: '群发消息'
		},
		]
	},
	{
		path: '/shopinfo',
		component: Layout,
		redirect: '/shopinfo/basicinformation',
		name: '基础信息',
		hidden: true,
		children: [{
			path: 'basicinformation',
			component: _import('shop/view/shopinfo/children/basicinformation'),
			name: '编辑基础信息'
		},
		{
			path: 'commercialinformation',
			component: _import('shop/view/shopinfo/children/commercialinformation'),
			name: '编辑工商信息'
		},
		{
			path: 'shopseting',
			component: _import('shop/view/shopinfo/children/shopseting'),
			name: '编辑店铺设置'
		}
		]
	},
	{
		path: '/good',
		component: Layout,
		redirect: '/good/foodeditor',
		name: '菜品',
		hidden: true,
		children: [{
			path: 'foodeditor',
			component: _import('merchandise/view/foodEditor/index'),
			name: '新增菜品编辑'
		}]
	},
	{
		path: '/table',
		component: Layout,
		redirect: '/table/edit',
		name: '餐桌',
		hidden: true,
		children: [
			{
				path: 'edit',
				component: _import('table/view/children/createNewTable'),
				name: '新建餐桌'
			}
		]
	}


];

export default new Router({
	// mode: 'history', //后端支持可开
	scrollBehavior: () => ({
		y: 0
	}),
	routes: constantRouterMap
});

// export const asyncRouterMap = [
//   {
//     path: '/shop',
//     component: Layout,
//     redirect: '/shop/shopinfo',
//     name: '店铺管理',
//     icon: 'icon-shop-fill',
//     children: [
//       { path: 'shopinfo', component: _import('shop/view/shopinfo/index'), name: '店铺信息' },
//       { path: 'staff', component: _import('shop/view/staff/index'), name: '员工管理' },
//       { path: 'table', component: _import('table/view/index'), name: '餐桌管理' },
//       { path: 'good', component: _import('merchandise/view/good/index'), name: '菜品管理' },
//       { path: 'customer', component: _import('customer/view/index'), name: '客户管理' },
//       { path: 'printer', component: _import('printer/view/index'), name: '打印机管理' },
//       { path: 'silver', component: _import('silver/view/index'), name: '收银管理' },
//     ]
//   },
//   {
//     path: 'statistical',
//     component: Layout,
//     redirect: '/statistical/orderform',
//     name: '统计报表',
//     icon: 'icon-yuyue',
//     children: [
//       { path: 'ordierform', component: _import('statistical/view/orderform'), name: '订单报表' },
//       { path: 'advance', component: _import('statistical/view/advance'), name: '预定报表' },
//       { path: 'bills', component: _import('statistical/view/bills'), name: '账单流水' },
//     ]
//   },
//   {
//     path: 'message',
//     component: Layout,
//     redirect: '/message/systemmsg',
//     name: '消息中心',
//     icon: 'icon-xiaoxi',
//     children: [
//       { path: 'systemmsg', component: _import('messagecenter/view/systemmsg'), name: '系统公告' },
//       { path: 'mass', component: _import('messagecenter/view/mass'), name: '群发消息' },
//     ]
//   }
// ];