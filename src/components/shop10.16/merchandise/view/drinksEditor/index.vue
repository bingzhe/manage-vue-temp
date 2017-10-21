<template>
    <div id="drink-editor">

        <!-- 面包屑 start -->
        <el-breadcrumb separator=">" class="breadcrumb">
            <el-breadcrumb-item>店铺管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/shop/good' }">菜品管理</el-breadcrumb-item>
            <el-breadcrumb-item>新增酒水编辑</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 面包屑 end -->

        <div class="content-box">
            <!-- 导航 start -->
            <div class="menu-nav">
                <ul class="clearfix">
                    <li v-for="(item, index) in menuNavData" :key="index" :class="{active:activeSelect === index}" @click="goAnchor(index,item.selector)">{{ item.label }}</li>
                </ul>
            </div>
            <!-- 导航 end -->

            <!-- 基础设置 start -->
            <base-set :foodinfo="foodinfo" @get-feature="getfeature"></base-set>
            <!-- 基础设置 end  -->

            <!-- 高级设置 start -->
            <high-set></high-set>
            <!-- 高级设置 end  -->

            <!-- 促销设置 start -->
            <sale-set></sale-set>
            <!-- 促销设置 end  -->

            <!-- 推广设置 start -->
            <expend-set></expend-set>
            <!-- 推广设置 end  -->
        </div>
    </div>
</template>

<script>
import { GoodList } from "../../index";
import BaseSet from "./baseinfoSet";
import HighSet from "./highinfoSet";
import SaleSet from "./saleinfoSet";
import ExpendSet from "./expendinfoSet";

export default {
  components: {
    BaseSet,
    HighSet,
    SaleSet,
    ExpendSet
  },
  data() {
    return {
      foodinfo: {
        food_id: "",
        food_name: "",
        food_unit: "瓶",
        feature: ["特辣"],
      },
      menuNavData: [
        {
          label: "基础设置",
          selector: "#base-set"
        },
        {
          label: "高级设置",
          selector: "#high-set"
        },
        {
          label: "促销设置",
          selector: "#sale-set"
        },
        {
          label: "推广设置",
          selector: "#expend-set"
        }
      ],
      activeSelect: 0
    };
  },
  methods: {
    //锚跳转
    goAnchor(index, selector) {
      this.activeSelect = index;
      GoodList.goAnchor(this.$el, selector);
    },
    getfeature(select){
      this.foodinfo.feature = select;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/styles/mixin.scss";

.breadcrumb {
  margin-bottom: 14px;
}

.menu-nav {
  @include fc(14px, #333333);
  background-color: #fff;
  height: 40px;
  line-height: 36px;

  ul {
    li {
      float: left;
      cursor: pointer;
    }
    li:first-child {
      margin-left: 14px;
    }
    li {
      margin-left: 80px;
    }
    li.active {
      border-bottom: 4px solid #4877e7;
    }
  }
}
</style>

<style lang="scss">
@import "src/styles/mixin.scss";

#drink-editor {
  .el-breadcrumb {
    @include fc(12px, #333333);
  }

  .el-breadcrumb__item:last-child .el-breadcrumb__item__inner {
    color: #4877e7;
  }

  .el-breadcrumb__item__inner:hover {
    color: #4877e7;
  }
}
</style>
