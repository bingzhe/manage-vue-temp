<template>
    <div id="size-price-tem">
        <div class="select">
            <el-checkbox-group v-model="checkPrice" :min="1" :max="2">
                <el-checkbox
                :disabled="price.value === 1" 
                v-for="price in priceOptions" 
                :label="price.value" 
                :key="price.value"
                @change="changePrice">{{price.name}}</el-checkbox>
            </el-checkbox-group>
        </div>

        <div class="noSize clearfix" v-if="type === FoodType.YES">
            <div class="title left">例牌</div>
            <div class="price-content left">
                <el-input type="number" placeholder="请输入内容" @change="changePrice" v-model="noSizePrice.original_price">
                    <template slot="prepend">原价</template>
                    <template slot="append">元</template>
                </el-input>
                <el-input type="number" placeholder="请输入内容" @change="changePrice" v-model="noSizePrice.discount_price">
                    <template slot="prepend">促销价</template>
                    <template slot="append">元</template>
                </el-input>
                <el-input type="number" placeholder="请输入内容" @change="changePrice" v-model="noSizePrice.festival_price">
                    <template slot="prepend">节日价</template>
                    <template slot="append">元</template>
                </el-input>
                <el-input type="number" placeholder="请输入内容" @change="changePrice" v-model="noSizePrice.vip_price">
                    <template slot="prepend">会员价</template>
                    <template slot="append">元</template>
                </el-input>
            </div>
        </div>

        <div class="hasSize" v-if="type === FoodType.NO">
            <div class="clearfix">
                <div class="title left size-btn" :class="{'active': bigSizePrice.is_use}" @click="togglebig">大</div>
                <div class="price-content left">
                    <el-input type="number" placeholder="请输入内容" @change="changePrice" v-model="bigSizePrice.original_price">
                        <template slot="prepend">原价</template>
                        <template slot="append">元</template>
                    </el-input>
                    <el-input type="number" placeholder="请输入内容" @change="changePrice" v-model="bigSizePrice.discount_price">
                        <template slot="prepend">促销价</template>
                        <template slot="append">元</template>
                    </el-input>
                    <el-input type="number" placeholder="请输入内容" @change="changePrice" v-model="bigSizePrice.festival_price">
                        <template slot="prepend">节日价</template>
                        <template slot="append">元</template>
                    </el-input>
                    <el-input type="number" placeholder="请输入内容" @change="changePrice" v-model="bigSizePrice.vip_price">
                        <template slot="prepend">会员价</template>
                        <template slot="append">元</template>
                    </el-input>
                </div>
            </div>
            <div class="clearfix">
                <div class="title left size-btn" :class="{'active': middleSizePrice.is_use}" @click="togglemiddle">中</div>
                <div class="price-content left">
                    <el-input type="number" placeholder="请输入内容" @change="changePrice" v-model="middleSizePrice.original_price">
                        <template slot="prepend">原价</template>
                        <template slot="append">元</template>
                    </el-input>
                    <el-input type="number" placeholder="请输入内容" @change="changePrice" v-model="middleSizePrice.discount_price">
                        <template slot="prepend">促销价</template>
                        <template slot="append">元</template>
                    </el-input>
                    <el-input type="number" placeholder="请输入内容" @change="changePrice" v-model="middleSizePrice.festival_price">
                        <template slot="prepend">节日价</template>
                        <template slot="append">元</template>
                    </el-input>
                    <el-input type="number" placeholder="请输入内容" @change="changePrice" v-model="middleSizePrice.vip_price">
                        <template slot="prepend">会员价</template>
                        <template slot="append">元</template>
                    </el-input>
                </div>
            </div>
            <div class="clearfix">
                <div class="title left size-btn" :class="{'active': smallSizePrice.is_use}" @click="togglesmall">小</div>
                <div class="price-content left">
                    <el-input type="number" placeholder="请输入内容" @change="changePrice" v-model="smallSizePrice.original_price">
                        <template slot="prepend">原价</template>
                        <template slot="append">元</template>
                    </el-input>
                    <el-input type="number" placeholder="请输入内容" @change="changePrice" v-model="smallSizePrice.discount_price">
                        <template slot="prepend">促销价</template>
                        <template slot="append">元</template>
                    </el-input>
                    <el-input type="number" placeholder="请输入内容" @change="changePrice" v-model="smallSizePrice.festival_price">
                        <template slot="prepend">节日价</template>
                        <template slot="append">元</template>
                    </el-input>
                    <el-input type="number" placeholder="请输入内容" @change="changePrice" v-model="smallSizePrice.vip_price">
                        <template slot="prepend">会员价</template>
                        <template slot="append">元</template>
                    </el-input>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { priceType, FoodType, sizeSpec, SizeUse } from "@/config/cfg";

export default {
  props: {
    foodPrice: {
      type: Object,
      default: function() {
        return {
          food_price: {
            type: FoodType.YES, // 1 无分量规格价格 2, 有分量规格价格
            using: 5, // 使用哪个价格的位标志(1:原价,2:折扣价,4:会员价,8:节日价)
            price: [
              {
                original_price: 180.0, // 原价
                discount_price: 175.0, // 折扣价
                vip_price: 165.0, // 会员价
                festival_price: 160.0 // 节日价
              }
            ]
          }
        };
      } // default: function(){ ... end
    },
    typeSelect: {
      type: Number
    }
  },
  data() {
    return {
      FoodType: FoodType,
      type: FoodType.YES,
      noSizePrice: {
        discount_price: "",
        festival_price: "",
        original_price: "",
        vip_price: ""
      },
      bigSizePrice: {
        title: "大份",
        discount_price: "",
        festival_price: "",
        original_price: "",
        vip_price: "",
        is_use: SizeUse.NO
      },
      middleSizePrice: {
        title: "中份",
        discount_price: "",
        festival_price: "",
        original_price: "",
        vip_price: "",
        is_use: SizeUse.NO
      },
      smallSizePrice: {
        title: "小份",
        discount_price: "",
        festival_price: "",
        original_price: "",
        vip_price: "",
        is_use: SizeUse.NO
      },
      priceOptions: [
        {
          name: priceType.toString(priceType.ORIGINAL),
          value: priceType.ORIGINAL
        },
        {
          name: priceType.toString(priceType.DISCOUNT),
          value: priceType.DISCOUNT
        },
        {
          name: priceType.toString(priceType.FESTIVAL),
          value: priceType.FESTIVAL
        },
        {
          name: priceType.toString(priceType.VIP),
          value: priceType.VIP
        }
      ],
      checkPrice: [1]
    };
  },
  watch: {
    foodPrice: {
      handler: function(val) {
        this.init();
      }
    },
    typeSelect: {
      handler: function(val) {
        this.type = val;
      }
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.type = this.foodPrice.type;
      this.checkPrice = this.foodPrice.using;
      //   this.initUsing();

      if (this.type === FoodType.YES) {
        this.noSizePrice = (((this.foodPrice||{}).price|| [])[0]||{});
      } else if (this.type === FoodType.NO) {
        this.initSizePrice(this.foodPrice.price);
      }
    },
    //分量价格初始化
    initSizePrice(price = []) {
      price.forEach(item => {
        if (item.title === sizeSpec.toString(sizeSpec.BIG)) {
          this.bigSizePrice = item;
        } else if (item.title === sizeSpec.toString(sizeSpec.MIDDEL)) {
          this.middleSizePrice = item;
        } else if (item.title === sizeSpec.toString(sizeSpec.SMALL)) {
          this.smallSizePrice = item;
        }
      });
    },
    initUsing() {
      let using = this.foodPrice.using;

      if (
        using | priceType.ORIGINAL &&
        this.checkPrice.indexOf(priceType.ORIGINAL) === -1
      ) {
        this.checkPrice.push(priceType.ORIGINAL);
      } else if (
        using | priceType.DISCOUNT &&
        this.checkPrice.indexOf(priceType.DISCOUNT) === -1
      ) {
        this.checkPrice.push(priceType.DISCOUNT);
      } else if (
        using | priceType.FESTIVAL &&
        this.checkPrice.indexOf(priceType.FESTIVAL) === -1
      ) {
        this.checkPrice.push(priceType.FESTIVAL);
      } else if (
        using | priceType.VIP &&
        this.checkPrice.indexOf(priceType.VIP) === -1
      ) {
        this.checkPrice.push(priceType.VIP);
      }
    },
    //价格保存
    changePrice() {
      if (this.type === FoodType.YES) {
        let price = [];
        let foodPrice = {};
        let using = 0;

        this.checkPrice.forEach(item => {
          using = using | item;
        });

        price.push(this.noSizePrice);

        foodPrice["type"] = this.type;
        foodPrice["using"] = using;
        foodPrice["price"] = price;

        this.$emit("price-change", foodPrice);
      } else if (this.type === FoodType.NO) {
        let price = [];
        let foodPrice = {};
        let using = 0;

        price.push(this.bigSizePrice);
        price.push(this.middleSizePrice);
        price.push(this.smallSizePrice);

        this.checkPrice.forEach(item => {
          using = using | item;
        });

        foodPrice["type"] = this.type;
        foodPrice["using"] = using;
        foodPrice["price"] = price;

        this.$emit("price-change", foodPrice);
      }
    },
    togglebig() {
      if (this.bigSizePrice.is_use === SizeUse.YES) {
        this.bigSizePrice.is_use = SizeUse.NO;
      } else {
        this.bigSizePrice.is_use = SizeUse.YES;
      }

      this.changePrice();
    },
    togglemiddle() {
      if (this.middleSizePrice.is_use === SizeUse.YES) {
        this.middleSizePrice.is_use = SizeUse.NO;
      } else {
        this.middleSizePrice.is_use = SizeUse.YES;
      }

      this.changePrice();
    },
    togglesmall() {
      if (this.smallSizePrice.is_use === SizeUse.YES) {
        this.smallSizePrice.is_use = SizeUse.NO;
      } else {
        this.smallSizePrice.is_use = SizeUse.YES;
      }

      this.changePrice();
    },
  }
};
</script>

<style lang="scss" scoped>
@import "src/styles/mixin.scss";

.select {
  margin-left: 88px;
  margin-top: 10px;
}

.price-content {
  margin-top: 10px;
}
.title {
  margin-top: 10px;
}
.noSize {
  height: 30px;
  line-height: 30px;

  .title {
    margin-right: 60px;
  }
}

.hasSize {
  .size-btn {
    @include wh(60px, 30px);
    border: 1px solid #d8d8d8;
    border-radius: 2px;
    line-height: 30px;
    text-align: center;
    margin-right: 29px;
    cursor: pointer;
    position: relative;
  }

  .size-btn.active {
    border-color: #5a8cff;
    color: #5a8cff;
    background-color: #fff;
    box-shadow: none;
  }
  .size-btn.active:after {
    @include wh(12px, 12px);
    position: absolute;
    content: "";
    background-image: url(../view/images/select.png);
    background-repeat: no-repeated;
    top: 0;
    right: 0;
  }
}
</style>

<style lang="scss">
#size-price-tem {
  .el-input-group__prepend {
    width: 50px;
  }
  .el-input-group__append {
    width: 15px;
  }
  .el-input__inner {
    height: 30px;
    padding: 3px;
  }
  .el-input {
    width: 165px;
  }
  .select .el-checkbox-group .el-checkbox {
    margin-right: 100px;
  }
}
</style>




