<template>
  <div id="food-editor">

    <!-- 面包屑 start -->
    <el-breadcrumb separator=">" class="breadcrumb">
      <el-breadcrumb-item>店铺管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/shop/good' }">菜品管理</el-breadcrumb-item>
      <el-breadcrumb-item>新增菜品编辑</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑 end -->

    <!-- 导航 start -->
    <div class="menu-nav">
      <ul class="clearfix">
        <li v-for="(item, index) in menuNavData" :key="index" :class="{active:activeSelect === index}" @click="goAnchor(index,item.selector)">{{ item.label }}</li>
      </ul>
    </div>
    <!-- 导航 end -->

    <!-- 基础设置 start -->
    <base-set :foodinfo="foodinfo"></base-set>
    <!-- 基础设置 end  -->

    <!-- 口味设置 start -->
    <taste-set></taste-set>
    <!-- 口味设置 end  -->

    <!-- 打包设置 start -->
    <pack-set></pack-set>
    <!-- 打包设置 end  -->

    <!-- 高级设置 start -->
    <high-set></high-set>
    <!-- 高级设置 end  -->

    <!-- 促销设置 start -->
    <sale-set></sale-set>
    <!-- 促销设置 end  -->

    <!-- 推广设置 start -->
    <expend-set></expend-set>
    <!-- 推广设置 end  -->

    <div class="btn-content">
      <div class="btn-group clearfix">
        <div class="btn-item left">预览</div>
        <div class="btn-item left">保存草稿</div>
        <div class="btn-item left">保存</div>
        <div class="btn-item left">保存并上架</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getFoodEditor } from '../../api';
import { GoodList } from '../../index';
import { Util } from '@/config/util';
import BaseSet from './baseinfoSet';
import TasteSet from './tasteinfoSet';
import PackSet from './packinfoSet';
import HighSet from './highinfoSet';
import SaleSet from './saleinfoSet';
import ExpendSet from './expendinfoSet';

export default {
  components: {
    BaseSet,
    TasteSet,
    PackSet,
    HighSet,
    SaleSet,
    ExpendSet,
  },
  data() {
    return {
      menuNavData: [{
        label: "基础设置",
        selector: "#base-set",
      }, {
        label: "口味设置",
        selector: "#taste-set",
      }, {
        label: "打包设置",
        selector: "#pack-set",
      }, {
        label: "高级设置",
        selector: "#high-set",
      }, {
        label: "促销设置",
        selector: "#sale-set",
      }, {
        label: "推广设置",
        selector: "#expend-set",
      }],
      activeSelect: 0,
      foodId: null,
      foodinfo: {
        food_sn: "1231231", //菜品编号
        food_name: "",
        food_unit: "盘",
        category: [],
        feature: ["加量", "不加钱"],
        composition: ['玉米','大米'],  //食材
      },
    };
  },
  created() {
    this.getFoodinfo();
  },
  methods: {
    //锚跳转
    goAnchor(index, selector) {
      this.activeSelect = index;
      GoodList.goAnchor(this.$el, selector);
    },
    //拉取编辑信息
    getFoodinfo() {
      this.foodId = this.$route.query.foodId;

      if (!Util.isEmpty(this.foodId)) {
        getFoodEditor(this.foodId, this.getFoodinfoHander);
      }
    },
    getFoodinfoHander(resp) {
      if (resp.ret === 0) {
        this.foodinfo = resp.data.info || {};
      } else {
        console.log("错误! ");
      }
    }
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

.btn-content{
  background-color: #F6F8FC;
  position: relative;
  height: 80px;
  // margin-bottom: 50px;

  .btn-group{
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);

    .btn-item{
      @include wh(100px, 40px);
      line-height: 40px;
      text-align: center;
      border: 1px solid #4877E7;
      cursor: pointer;
      border-radius: 4px;
      color: #4877E7;
      margin-right: 10px;
    }

    .btn-item:last-child{
      margin-right: 10;
    }
  }
}

</style>

<style lang="scss">
@import 'src/styles/mixin.scss';

#food-editor {
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



