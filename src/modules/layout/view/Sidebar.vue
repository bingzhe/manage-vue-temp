<template>
    <el-menu mode="vertical">
        <section v-for="item in routes">
            <router-link v-if="!item.hidden&&item.noDropdown&&item.children.length>0" :to="item.path='/'+item.children[0].path">
                    <el-menu-item :index="item.path+'/'+item.children[0].path">
                        <i class="el-icon-menu"></i>{{item.name}}
                    </el-menu-item>
            </router-link>

            <el-submenu :index="item.name" v-if="!item.noDropdown&&!item.hidden">
                <template slot="title">
                    <i class="el-icon-menu"></i> {{item.name}}
                </template>

                <template v-for="child in item.children" v-if="!child.hidden">
                    <router-link class="menu-indent" :to="item.path+'/'+child.path">
                        <el-menu-item :index="item.path+'/'+child.path">
                        {{child.name}}
                        </el-menu-item>
                    </router-link>
                </template>
            </el-submenu>
        </section>
    </el-menu>
</template>

<script>
export default {
    data() {
        return {
            routes: [{
                path: '/',
                //component: Layout,
                name: '首页',
                redirect: '/dashboard',
                icon: 'dashboardicon',
                noDropdown: true,
                children: [{path: 'dashboard',/*component: _import(''),*/ }]
            },{
                path: '/shop',
                //component: Layout,
                redirect: '/shop/shopinfo',
                name: '店铺管理',
                icon: 'shopicon',
                children: [
                    { path: 'shopinfo',/*component: _import(''),*/ name: '店铺信息' },
                    { path: 'staff',/*component: _import(''),*/ name: '员工管理' },
                ]
            },{
                path: '/merchandise',
                // component: Layout,
                redirect: '/merchandise/good',
                name: '商品管理',
                icon: 'merchandiseicon',
                children: [
                    { path: 'good',/*component: _import(''),*/ name: '商品管理' },
                    { path: 'order',/*component: _import(''),*/ name: '订单管理' },
                    { path: 'menu',/*component: _import(''),*/ name: '菜单管理' },
                    { path: 'sale',/*component: _import(''),*/ name: '促销管理' },
                ]
            },{
                path: '/advance',
                // component: Layout,
                redirect: '/advance/index',
                name: '预定管理',
                icon: 'advanceicon',
                children: [
                    { path: 'index',/*component: _import(''),*/ name: '预定管理' },
                    { path: 'set',/*component: _import(''),*/ name: '预定设置' },
                ]
            },{
                path: '/table',
                //component: Layout,
                redirect: '/table/index',
                name: '餐桌管理',
                icon: 'tableicon',
                children: [
                    { path: 'index',/*component: _import(''),*/ name: '餐桌监控' },
                    { path: 'set',/*component: _import(''),*/ name: '餐桌设置' },
                ]
            },{
                path: '/printer',
                //component: Layout,
                name: '打印机管理',
                icon: 'printericon',
                noDropdown: true,
                children: [{path: 'index',/*component: _import(''),*/}]
            },{
                paht: '/user',
                //component: Layout,
                name: '用户管理',
                icon: 'usericon',
                noDropdown: true,
                children: [{path: 'index',/*component: _import(''),*/}]
            }]  
        }
    }
}
</script>

<style>

</style>


