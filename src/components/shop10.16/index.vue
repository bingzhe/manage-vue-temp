<template>
    <div id="access-editor">

        <!-- 面包屑 start -->
        <el-breadcrumb separator=">" class="breadcrumb">
            <el-breadcrumb-item>店铺管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/shop/good' }">菜品管理</el-breadcrumb-item>
            <el-breadcrumb-item>新增配件编辑</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 面包屑 end -->

        <!-- 导航 start -->
        <!-- <div class="menu-nav">
                        <ul class="clearfix">
                            <li v-for="(item, index) in menuNavData" :key="index" :class="{active:activeSelect === index}" @click="goAnchor(index,item.selector)">{{ item.label }}</li>
                        </ul>
                    </div> -->
        <!-- 导航 end -->

        <h3 class="title">基础设置</h3>

        <div class="content">
            <!-- 编号 -->
            <div class="food-sn clearfix">
                <div class="sn-title food-left left">
                    <span>商品编号</span>
                </div>
                <div class="sn-content food-right left">
                    <span>{{ foodinfo.food_sn }}</span>
                </div>
            </div>

            <!-- 二维码 -->
            <div class="food-code clearfix">
                <div class="code-title food-left left">
                    <span>二维码</span>
                </div>
                <div class="code-content food-right left">
                    <img src="../images/empty.png" alt="默认">
                </div>
            </div>

            <!-- name -->
            <div class="food-name clearfix">
                <div class="name-title food-left left">
                    <span>菜品名称</span>
                </div>
                <div class="name-content food-right left">
                    <el-input v-model="foodinfo.food_name" placeholder="请输入菜品名"></el-input>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            menuNavData: [{
                label: "基础设置",
                selector: "#base-set",
            }]
        };
    }
};
</script>

<style lang="scss" scoped>
@import 'src/styles/mixin.scss';

.breadcrumb {
    margin-bottom: 14px;
}

.menu-nav {
    @include fc(14px, #333333);
    background-color: #fff;
    height: 40px;
    line-height: 36px;
}

.title {
    @include fc(14px, #666666);
    background-color: #F6F8FC;
    height: 40px;
    line-height: 40px;
    padding-left: 14px;
}
</style>

<style lang="scss">
@import 'src/styles/mixin.scss';

#access-editor {
    .el-breadcrumb {
        @include fc(12px, #333333);
    }

    .el-breadcrumb__item:last-child .el-breadcrumb__item__inner {
        color: #4877E7;
    }

    .el-breadcrumb__item__inner:hover {
        color: #4877E7;
    }
}
</style>
