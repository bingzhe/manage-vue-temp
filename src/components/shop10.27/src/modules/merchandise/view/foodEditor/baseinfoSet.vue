<template>
    <div id="base-set">
        <h3 class="title">基础设置</h3>

        <div class="content">

            <!-- 编号 -->
            <div class="food-sn clearfix">
                <div class="sn-title food-left left">
                    <span>商品编号</span>
                </div>
                <div class="sn-content food-right left">
                    <span>{{ foodinfo.food_id }}</span>
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
                    <span class="must">菜品名称</span>
                </div>
                <div class="name-content food-right left">
                    <el-input 
                    v-model="foodName" 
                    placeholder="请输入菜品名"
                    @change="foodNameHandler"></el-input>
                </div>
            </div>

            <!-- category -->
            <div class="food-category clearfix">
                <div class="category-title food-left left">
                  <span class="must">商品分类</span>
                </div>
                <div class="category-content food-right left">
                    <select-cate @on-change="getSelectId"></select-cate>
                </div>
            </div>

            <!-- 计量单位 -->
            <div class="food-unit clearfix">
                <div class="unit-title food-left left"><span class="must">
                  规格</span></div>
                <ul class="unit-content food-right left clearfix">
                    <li class="left" 
                    :class="{active: unitSelect === index}" 
                    v-for="(item,index) in unitData" 
                    :key="index" 
                    @click="changeUnit(index)">{{ item }}</li>
                </ul>
            </div>

            <!-- 特色 -->
            <div class="food-feature clearfix">
                <div class="feature-title food-left left">特色</div>
                <ul class="feature-content food-right left clearfix">
                    <li class="left" v-for="(item, index) in featureData" :key="item.index">{{ item }}</li>
                    <li class="editor left" @click="showFeatureDialog">编辑</li>
                </ul>
            </div>
            <div class="feature-tip">注：最多可设置10个特色标签，且标签最多输入4个字符</div>

            <!-- 是否有分量 -->
            <div class="food-size clearfix">
                <div class="size-title food-left left"><span class="must">
                  是否有份量大小分类</span></div>
                <ul class="size-content food-right left">
                    <li class="left" 
                    :class="{active: sizeSelect === item.value}" 
                    v-for="(item, index) in sizeData" 
                    :key="item.value" 
                    @click="changeSizeSelect(item.value)">{{ item.label }}</li>
                </ul>
            </div>

            <!-- 价格 -->
            <div class="food-price clearfix">
                <div class="price-title food-left left"><span class="must">
                  价格</span></div>
                <div class="price-content food-right left">
                    <div class="tip">
                        （只能同时选择两个价格在前端显示，且显示顺序规则是原价、促销价、会员价。1.原价：菜品的原始定价，适用于普通用户；2.促销价：菜品促销时使用的价格，适用于普通用户；3.会员价：为会员定制的价格，适用于所有会员；4.节日价：为特定假日制定的价格，适用于特定客户。
                    </div>
                    <size-price 
                    :foodPrice="foodinfo.food_price" 
                    :typeSelect="sizeSelect"
                    @price-change="getPrice"></size-price>
                </div>
            </div>

            <!-- 图片 -->
            <div class="food-picture clearfix">
                <div class="picture-title food-left left">图片</div>
                <div class="picture-content food-right left">
                  <img-upload :imgLists="imgList" @img-change="imgChangeHandler"></img-upload>
                </div>
            </div>
            
            <!-- 食材 -->
            <div class="food-composition clearfix">
                <div class="composition-title food-left left">食材</div>
                <ul class="composition-content food-right left clearfix">
                    <li class="left" v-for="(item, index) in compositionData" :key="item.index">{{ item }}</li>
                    <li class="editor left" @click="showCompositionDialog">编辑</li>
                </ul>
            </div>
            <div class="feature-tip">注：最多可设置10个特色标签，且标签最多输入4个字符</div>

            <!-- 库存 -->
            <div class="food-stock clearfix">
                <div class="stock-title food-left left">
                    <span>库存数量</span>
                </div>
                <div class="stock-content food-right left">
                    <el-input type="number" 
                    v-model="stockNum" 
                    placeholder="0表示不限量"
                    @change="changeStock"></el-input>
                </div>
            </div>
        </div>

        <!-- 特色编辑弹窗 -->
        <tag-editor 
        :dialogVisible="dialogVisible"
        :selectArr="featureData"
        :tagObj="featureObj"
        @on-close="hideDialog"
        @on-change="getFeature"
        ></tag-editor>

        <!-- 食材编辑弹窗 -->
        <tag-editor 
        :dialogVisible="compositionDialog"
        :selectArr="compositionData"
        :tagObj="compositionObj"
        @on-close="hideCompositionDialog"
        @on-change="getComposition"
        ></tag-editor>
    </div>
</template>

<script>
import SizePrice from "../../components/sizePrice";
import SelectCate from "../../components/selectCate";
import TagEditor from "../../components/tagEditor";
import ImgUpload from "../../components/imgUpload";

import { Util } from "@/config/util";
import { foodSize } from "@/config/cfg";

export default {
  props: {
    foodinfo: {
      type: Object
    }
  },
  components: {
    SizePrice,
    SelectCate,
    TagEditor,
    ImgUpload
  },
  data() {
    return {
      foodName: "",
      unitData: ["个", "份", "碗", "盘", "盒", "只", "斤", "打"],
      unitSelect: 0,
      //特色
      featureObj: {
        name: "特色",
        value: "shop_feature",
        limitNum: 30,
        limitWord: 5,
        limitSelect: 5
      },
      dialogVisible: false,
      featureData: [],
      //份量
      sizeData: [
        {
          label: foodSize.toString(foodSize.YES),
          value: foodSize.YES
        },
        {
          label: foodSize.toString(foodSize.NO),
          value: foodSize.NO
        }
      ],
      sizeSelect: foodSize.NO,
      //食材
      compositionData: [],
      compositionObj: {
        name: "食材",
        value: "shop_composition",
        limitNum: 30,
        limitWord: 5,
        limitSelect: 5
      },
      compositionDialog: false,
      //库存
      stockNum: 0,
      imgList: [],
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
    foodNameHandler() {
      this.$emit("foodname-change", this.foodName);
    },
    changeUnit(index) {
      this.unitSelect = index;
      this.$emit("foodUnit-change", this.unitData[index]);
    },
    //特色弹窗
    showFeatureDialog() {
      this.dialogVisible = true;
    },
    hideDialog() {
      this.dialogVisible = false;
    },
    getFeature(select) {
      this.featureData = select;
      this.$emit("get-feature", select);
    },
    //份量
    changeSizeSelect(index) {
      this.sizeSelect = index;
    },
    //价格
    getPrice(price) {
      this.$emit("price-change", price);
    },
    //图片
    imgChangeHandler(imgList) {
      this.$emit("img-changeT", imgList);
    },
    //食材
    showCompositionDialog() {
      this.compositionDialog = true;
    },
    hideCompositionDialog() {
      this.compositionDialog = false;
    },
    getComposition(select) {
      this.compositionData = select;
      this.$emit("get-composition", select);
    },

    //库存
    changeStock() {
      this.$emit("stocknum-change", this.stockNum);
    },

    //初始计量单位
    initUnit() {
      let unit = this.foodinfo.food_unit;
      let that = this;

      this.unitData.forEach(function(item, index) {
        if (item === unit) {
          that.unitSelect = index;
        }
      });
    },
    //>>>>>>>>>>>>>>>>>>>>>>
    getSelectId(id) {
      this.$emit("category-change", id);
    },
    init() {
      this.foodName = this.foodinfo.food_name;
      this.featureData = this.foodinfo.feature || [];
      this.sizeSelect = this.foodinfo.food_price.type || foodSize.NO;
      this.compositionData = this.foodinfo.composition || [];
      this.stockNum = this.foodinfo.food_num_day || 0;
      this.imgList = this.foodinfo.food_img_list;

      this.initUnit();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/styles/mixin.scss";

#base-set {
  .content {
    @include fc(14px, #000);
    background-color: #fff;
    padding-bottom: 22px;
  }
}

.food-sn {
  height: 94px;
  line-height: 19px;

  div {
    margin-top: 48px;
  }
}

.food-code {
  .code-content {
    img {
      @include wh(100px, 100px);
    }
  }
}

.food-name {
  height: 34px;
  margin-top: 20px;
  margin-bottom: 20px;

  .name-title {
    line-height: 34px;
  }
}

.food-category {
  height: 34px;
  line-height: 34px;
}

.food-unit {
  height: 30px;
  line-height: 30px;
  margin-top: 22px;
  margin-bottom: 24px;

  .unit-content {
    li {
      @include wh(60px, 30px);
      border: 1px solid #d8d8d8;
      border-radius: 2px;
      line-height: 30px;
      text-align: center;
      color: #666;
      margin-right: 10px;
      cursor: pointer;
    }

    li.active {
      border-color: #4877e7;
      color: #fff;
      background-color: #4877e7;
    }
  }
}

.food-feature {
  height: 30px;
  line-height: 30px;
  margin-bottom: 12px;

  .feature-content {
    li {
      @include wh(80px, 30px);
      background: #d8d8d8;
      border-radius: 2px;
      margin-right: 10px;
      line-height: 30px;
      text-align: center;
    }

    li.editor {
      @include wh(60px, 30px);
      border: 1px solid #4877e7;
      border-radius: 2px;
      color: #4877e7;
      background-color: #fff;
      cursor: pointer;
    }
  }
}

.food-size {
  height: 30px;
  line-height: 30px;
  margin-bottom: 22px;

  .size-content {
    li {
      @include wh(60px, 30px);
      line-height: 30px;
      text-align: center;
      border: 1px solid #d9d9d9;
      color: #333;
      border-radius: 2px;
      margin-right: 10px;
      cursor: pointer;
    }
    li.active {
      border-color: #4877e7;
      color: #fff;
      background-color: #4877e7;
    }
  }
}

.food-price {
  padding-bottom: 20px;

  .price-content {
    .tip {
      font-size: 12px;
      color: #9b9b9b;
    }
  }
}

.food-composition {
  height: 30px;
  line-height: 30px;
  margin-bottom: 12px;
  margin-top: 22px;

  .composition-content {
    li {
      @include wh(80px, 30px);
      background: #d8d8d8;
      border-radius: 2px;
      margin-right: 10px;
      line-height: 30px;
      text-align: center;
    }

    li.editor {
      @include wh(60px, 30px);
      border: 1px solid #4877e7;
      border-radius: 2px;
      color: #4877e7;
      background-color: #fff;
      cursor: pointer;
    }
  }
}

.food-stock {
  height: 34px;

  .stock-title {
    line-height: 34px;
  }
}

.feature-tip {
  @include fc(12px, #9b9b9b);
  margin-left: 234px;
  margin-bottom: 22px;
}

.title {
  @include fc(14px, #666666);
  background-color: #f6f8fc;
  height: 40px;
  line-height: 40px;
  padding-left: 14px;
}

.food-left {
  width: 220px;
  text-align: right;
  opacity: 0.5708;
  margin-right: 14px;
}

.food-right {
  @include fc(14px, #666);
  min-width: 1020px;
  max-width: 1021px;
}

.featureDial {
  @include wh(540px, 493px);
}
span.must {
  position: relative;
}
span.must:before {
  position: absolute;
  left: -10px;
  top: 3px;
  content: "";
  display: block;
  @include wh(10px, 10px);
  background: url(../images/delete.png);
  background-repeat: no-repeat;
  margin-right: 4px;
}
</style>

<style lang="scss">
@import "src/styles/mixin.scss";

#base-set {
  .el-input {
    width: inherit;
  }
  .food-name .el-input__inner {
    @include wh(280px, 34px);
    border-radius: 0;
  }
  .el-input__inner:hover {
    border: 1px solid #bfcbd9;
  }
  .el-input__inner:focus {
    border: 1px solid #bfcbd9;
  }
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__body {
    padding: 0;
  }
  .dialog-add .el-input__inner {
    @include wh(300px, 34px);
    border-radius: 0;
  }
  .food-stock .el-input__inner {
    @include wh(280px, 34px);
    border-radius: 0;
  }
}
</style>
