<template>
    <div id="sidebar">
        <div class="sl-icon">
            <img src="" />
        </div>
        <div class="shop-info">
            <div class="shop-icon">
                <img src="./images/personal.png" />
                <div></div>
            </div>
            <h2 class="shop-name">
                {{ shopName }}
            </h2>
        </div>

        <el-menu mode="vertical">
            <section v-for="item in routes">
                <router-link v-if="!item.hidden&&item.noDropdown&&item.children.length>0" :to="item.path + '/'+item.children[0].path">
                    <el-menu-item :index="item.path+'/'+item.children[0].path" class="sl-title">
                        <i class="iconfont" :class="item.icon"></i> {{item.name}}
                    </el-menu-item>
                </router-link>

                <el-submenu :index="item.name" v-if="!item.noDropdown&&!item.hidden">
                    <template slot="title">
                        <i class="iconfont" :class="item.icon"></i> {{item.name}}
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
    </div>
</template>

<script>
import { constantRouterMap } from '@/router/index';
// import Layout from '@/modules/layout/view/layout';

export default {
    data() {
        return {
            shopName: '毛毛快餐',
            routes: constantRouterMap
        };
    },
    mounted() {
        // console.log(this.routes);
    }
};
</script>

<style lang="scss" scoped>
@import 'src/styles/mixin.scss';

.sl-icon {
    height: 55px;
    background-color: rgb(72, 119, 231);
}

.shop-info {
    height: 156px;
    position: relative;

    .shop-icon {
        @include wh(80px, 80px);
        border-radius: 40px;
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
        top: 20px;

        img {
            @include wh(80px, 80px); // border-radius: 40px;
        }
    }
    .shop-name {
        // font-size: 20px;
        @include fc(18px, #333);
        font-weight: bold;
        text-align: center;
        height: 56px;
        width: 210px;
        line-height: 56px;
        position: absolute;
        bottom: 0;
        left: 0;
    }
}

.sl-title {
    background-color: #d1dbe5
}
</style>

<style lang="scss">
//覆盖element-ui默认样式
#sidebar {
    .el-menu-item {
        background-color: #fff;
        height: 40px;
        line-height: 40px;

        .iconfont {
            color: #4877E7;
        }
    }

    .el-submenu__title {
        background-color: #F6F8FC;
        height: 40px;
        line-height: 40px;

        .iconfont {
            color: #4877E7
        }
    }

    .el-menu-item.is-active {
        background-color: #4877E7;
        color: #fff;
    }

    .sl-title {
        background-color: rgb(238, 241, 246);
    }
}
</style>


