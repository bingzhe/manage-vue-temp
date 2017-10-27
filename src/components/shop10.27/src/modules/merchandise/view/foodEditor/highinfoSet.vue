<template>
    <div id="high-set">
        <h3 class="title">高级设置</h3>
        <div class="content">

          <!-- 销售方式 -->
          <div class="sale-way clearfix">
              <div class="way-title food-left left">
                  <span>销售方式</span>
              </div>

              <div class="way-content food-right left clearfix">
                  <el-checkbox-group v-model="selectSaleWay" :min="1">
                    <el-checkbox
                    @change="saleWayHandler" 
                    v-for="way in saleWay" 
                    :label="way.value" 
                    :key="way.value">{{way.label}}</el-checkbox>
                  </el-checkbox-group>
              </div>
          </div>
          
          <!-- 起售数量 -->
          <div class="sale-num clearfix">
              <div class="num-title food-left left">
                  <span>起售数量</span>
              </div>
              <div class="num-content food-right left">
                  <el-input v-model="saleNum" type="number" @change="saleNumHandler"></el-input>
              </div>
          </div>

          <!-- 定时上架方式 -->
          <div class="sale-offway">
              <div class="offway-title food-left left">
                  <span>定时上架方式</span>
              </div>
              <div class="offway-content food-right left">
                <div class="btn left"
                  v-for="(item, index) in saleStatusWay"
                  :key="item.value"
                  :class="{active: saleStatusWaySelect === item.value}"
                  @click="changeSaleStatus(item.value)">{{item.label}}</div>
              </div>
          </div>

          <!-- 自定义 -->
          <custom-time 
          v-if="saleStatusWaySelect === saleStatus.CUSTOME" 
          :timeArr="foodinfo.food_sale_time"
          @time-change="timeChangeHandler"></custom-time>

          <!-- 按周数 -->
          <div class="sale-week clearfix" v-if="saleStatusWaySelect === saleStatus.WKKE">
            <div class="week-title food-left left">
                <span>价格</span>
            </div>
            <div class="week-content food-right left">
              <div class="tip">
                  （注：循环周期默认全选）
              </div>
              <div class="week-select">
                <el-checkbox-group @change="weekSelectHandler" v-model="weekSelect">
                    <el-checkbox-button
                    v-for="item in weeks" 
                    :label="item" 
                    :key="item">
                    {{item}}
                    </el-checkbox-button>
                </el-checkbox-group>
              </div>
            </div>
          </div>


        </div>
    </div>
</template>

<script>
import CustomTime from "../../components/customTime";
import { foodSaleWay, saleStatus } from "@/config/cfg";

export default {
  components: {
    CustomTime
  },
  props: {
    foodinfo: {
      type: Object
    }
  },
  data() {
    return {
      selectSaleWay: [1],
      saleWay: [
        {
          label: foodSaleWay.toString(foodSaleWay.PRESHOP),
          value: foodSaleWay.PRESHOP
        },
        {
          label: foodSaleWay.toString(foodSaleWay.SHOP),
          value: foodSaleWay.SHOP
        },
        {
          label: foodSaleWay.toString(foodSaleWay.PACKSELF),
          value: foodSaleWay.PACKSELF
        },
        {
          label: foodSaleWay.toString(foodSaleWay.TAKEOUT),
          value: foodSaleWay.TAKEOUT
        },
        {
          label: foodSaleWay.toString(foodSaleWay.PACK),
          value: foodSaleWay.PACK
        }
      ],
      saleWaySelect: 1,
      saleNum: 1, //起售数量
      //上架方式
      saleStatusWay: [
        {
          label: saleStatus.toString(saleStatus.NO),
          value: saleStatus.NO
        },
        {
          label: saleStatus.toString(saleStatus.CUSTOME),
          value: saleStatus.CUSTOME
        },
        {
          label: saleStatus.toString(saleStatus.WKKE),
          value: saleStatus.WKKE
        }
      ],
      saleStatusWaySelect: 0,
      saleStatus: saleStatus,
      weekSelect: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      weeks: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    };
  },
  watch: {
    foodinfo: {
      handler: function(newVal, oldVal) {
        this.init();
      },
      deep: true
    }
  },
  created() {
    this.init();
  },
  methods: {
    weekSelectHandler() {
      this.$emit("week-change", this.weekSelect);
    },
    saleWayHandler() {
      this.$emit("saleway-change", this.selectSaleWay);
    },
    saleNumHandler() {
      this.$emit("salenum-change", this.saleNum);
    },
    changeSaleStatus(index) {
      this.saleStatusWaySelect = index;
      this.$emit("salestatus-change", this.saleStatusWaySelect);
    },
    timeChangeHandler(dataTime) {
      this.$emit("time-changeT", dataTime);
    },
    init() {
      this.selectSaleWay = this.foodinfo.sale_way || [1];
      this.saleNum = this.foodinfo.sale_num || 1;
      this.saleStatusWaySelect = this.foodinfo.sale_off_way || 0;
      this.weekSelect = this.foodinfo.food_sale_week || [
        "周一",
        "周二",
        "周三",
        "周四",
        "周五",
        "周六",
        "周日"
      ];
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/styles/mixin.scss";

#high-set {
  .title {
    @include fc(14px, #666666);
    background-color: #f6f8fc;
    height: 40px;
    line-height: 40px;
    padding-left: 14px;
  }

  .content {
    @include fc(14px, #000);
    background-color: #fff;
    padding-top: 48px;
    padding-bottom: 40px;
  }
}

.sale-way {
  .way-content {
    span.text {
      padding: 0 40px 0 10px;
    }
  }
}

.sale-num {
  height: 34px;
  line-height: 34px;
  margin-top: 22px;
  margin-bottom: 20px;
}

.sale-offway {
  height: 30px;
  line-height: 30px;
  margin-bottom: 20px;

  .offway-content {
    .btn {
      @include wh(80px, 30px);
      line-height: 30px;
      border-radius: 2px;
      margin-right: 10px;
      text-align: center;
      border: 1px solid #d9d9d9;
      cursor: pointer;
    }

    .btn.active {
      color: #fff;
      background-color: #4877e7;
      border: 1px solid #4877e7;
    }
  }
}

.sale-week {
  .week-content {
    .tip {
      font-size: 14px;
      color: #9b9b9b;
      margin-bottom: 10px;
    }
    .time {
      margin-bottom: 10px;
    }
  }
}

.food-left {
  width: 220px;
  text-align: right;
  opacity: 0.5708;
  margin-right: 14px;
}

.food-right {
  @include fc(14px, #666);
}
</style> 


<style lang="scss">
@import "src/styles/mixin.scss";

#high-set {
  .el-input {
    width: inherit;
  }
  .el-input__inner {
    @include wh(180px, 34px);
    border-radius: 0;
  }
  .el-input__inner:hover {
    border: 1px solid #bfcbd9;
  }
  .el-input__inner:focus {
    border: 1px solid #bfcbd9;
  }

  .sale-week {
    .el-checkbox-button {
      margin-right: 10px;
      margin-bottom: 10px;
    }
    .el-checkbox-button:first-child .el-checkbox-button__inner,
    .el-checkbox-button:last-child .el-checkbox-button__inner {
      border-radius: 0;
    }
    .el-checkbox-button__inner {
      padding: 7px 15px;
      border-left: 1px solid #bfcbd9;
    }
    .el-checkbox-button.is-checked .el-checkbox-button__inner {
      border-color: #5a8cff;
      color: #5a8cff;
      background-color: #fff;
      box-shadow: none;
    }
    .el-checkbox-button.is-checked .el-checkbox-button__inner::after {
      @include wh(12px, 12px);
      position: absolute;
      content: "";
      background-image: url(../images/select.png);
      background-repeat: no-repeated;
      top: 0;
      right: 0;
    }
    .el-checkbox-button.is-disabled .el-checkbox-button__inner {
      background-color: #fff;
      cursor: inherit;
    }
  }
}
</style>
