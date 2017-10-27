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
            <base-set 
            :foodinfo="foodinfo"
            @get-feature="getData('feature', $event)"
            @foodname-change="getData('foodName', $event)"
            @foodUnit-change="getData('foodUnit', $event)"
            @price-change="getData('foodPrice', $event)"
            @get-composition="getData('composition', $event)"
            @img-change="getData('foodImgList', $event)"
            @stocknum-change="getData('stockNum', $event)"
            ></base-set>
            <!-- 基础设置 end  -->

            <!-- 高级设置 start -->
            <high-set :foodinfo="foodinfo"
            @saleway-change="getSaleWay"
            @salenum-change="getSaleNum"
            @week-change="getSaleWeek"
            @time-changeT="getSaleTime"
            @salestatus-change="getSaleStatus"
            ></high-set>
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
                    <div class="btn-item left" @click="drinkSaveDraft">保存草稿</div>
                    <div class="btn-item left" @click="drinkSave">保存</div>
                    <div class="btn-item left" @click="drinkSaveSale">保存并上架</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { GoodList } from "../../index";
import { getFoodSn, saveEditor, getFoodEditor } from "../../api";
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
      //基础设置
      foodName: "",
      foodUnit: "瓶",
      feature: null,
      foodPrice: null,
      composition: null,
      stockNum: 0,
      foodImgList: [], //保存图片数组
      categoryId: "",
      //高级设置
      saleWay: null,
      saleNum: 1,
      saleOffWay: null,
      foodSaleTime: null,
      foodSaleWeek: null,

      foodId: null,
      foodinfo: {
        food_id: "",
        food_name: "",
        food_unit: "瓶",
        feature: [],
        composition: [], //食材
        food_price: {
          type: 1, // 1 无分量规格价格 2, 有分量规格价格
          using: [1], // 使用哪个价格的位标志(1:原价,2:折扣价,4:会员价,8:节日价)
          price: [{}]
        },
        food_sale_time: [
          {
            start_time: null,
            end_time: null
          }
        ]
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
      activeSelect: 0,
      isNew: true
    };
  },
  computed: {
    foodType() {
      return this.$store.state.good.type;
    }
  },
  created() {
    this.getfoodSnn();
    this.getFoodinfo();
  },
  methods: {
    //锚跳转
    goAnchor(index, selector) {
      this.activeSelect = index;
      GoodList.goAnchor(this.$el, selector);
    },
    getfeature(select) {
      this.foodinfo.feature = select;
    },
    getSaleWay(select) {
      this.saleWay = select;
    },
    getSaleNum(select) {
      this.saleNum = select;
    },
    getSaleWeek(select) {
      this.foodSaleWeek = select;
    },
    getSaleTime(dataTime) {
      this.foodSaleTime = dataTime;
    },
    getSaleStatus(saleStatus) {
      this.saleOffWay = saleStatus;
    },
    getData(name, value) {
      this[name] = value;
    },
    //得到编号
    getfoodSnn() {
      let data = {
        genid: 1,
        type: "food"
      };
      if (this.isNew) {
        getFoodSn(data, resp => {
          if (resp.ret === 0) {
            this.foodinfo.food_id = resp.data.id;
          } else {
            console.log("获取编号错误! ");
          }
        });
      }
    },
    //拉取编辑信息
    getFoodinfo() {
      this.foodId = this.$route.query.foodId;

      if (!GoodList.isEmpty(this.foodId)) {
        this.isNew = false;

        getFoodEditor(this.foodId, resp => {
          if (resp.ret === 0) {
            this.foodinfo = resp.data.info || {};

            //基础设置
            this.foodName = this.foodinfo.food_name;
            this.foodUnit = this.foodinfo.food_unit || "瓶";
            this.feature = this.foodinfo.feature;
            this.foodPrice = this.foodinfo.food_price;
            this.composition = this.foodinfo.composition;
            this.stockNum = this.foodinfo.food_num_day;
            this.foodImgList = this.foodinfo.food_img_list;
            this.categoryId = this.foodinfo.category_id;

            //高级设置
            this.saleWay = this.foodinfo.sale_way;
            this.saleNum = this.foodinfo.sale_num;
            this.foodSaleTime = this.foodinfo.food_sale_time;
            this.foodSaleWeek = this.foodinfo.food_sale_week;
            this.saleOffWay = this.foodinfo.sale_off_way;
          } else {
            console.warn("获取菜品详情失败! ");
          }
        });
      }
    },
    //获取保存的信息
    getSaveData() {
      let data = {
        save: 1,
        food_id: this.foodinfo.food_id,
        food_name: this.foodName,
        category_id: "12",
        food_price: this.foodPrice,
        food_num_day: this.stockNum,
        food_img_list: this.foodImgList,
        feature: this.feature,
        type: this.foodType,
        composition: this.composition,
        food_unit: this.foodUnit,
        sale_way: this.saleWay,
        sale_num: this.saleNum,
        sale_off_way: this.saleOffWay
      };

      if (this.saleOffWay === 1) {
        data["food_sale_time"] = this.foodSaleTime;
      } else if (this.saleOffWay === 2) {
        data["food_sale_week"] = this.foodSaleWeek;
      }

      if (this.isNew) {
        data["entry_type"] = 1;
      }
      return data;
    },
    //酒水编辑保存
    drinkSave() {
      let data = this.getSaveData();
      data["sale_off"] = 1;

      saveEditor(data, this.saveHander);
    },
    //酒水草稿保存
    drinkSaveDraft() {
      let data = this.getSaveData();
      data["is_draft"] = 1;

      saveEditor(data, this.saveHander);
    },
    //酒水保存并上架
    drinkSaveSale() {
      let data = this.getSaveData();

      saveEditor(data, this.saveHander);
    },
    saveHander(resp) {
      if (resp.ret === 0) {
        console.log("保存成功！");
      } else {
        console.log("保存失败！ ");
      }
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

.btn-content {
  background-color: #f6f8fc;
  position: relative;
  height: 130px; // margin-bottom: 50px;
  .btn-group {
    position: absolute;
    top: 40px;
    left: 50%;
    transform: translateX(-50%);

    .btn-item {
      @include wh(100px, 40px);
      line-height: 40px;
      text-align: center;
      border: 1px solid #4877e7;
      cursor: pointer;
      border-radius: 4px;
      color: #4877e7;
      margin-right: 10px;
    }

    .btn-item:last-child {
      margin-right: 10px;
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
