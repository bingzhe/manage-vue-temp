<template>
    <div id="access-editor">

        <!-- 面包屑 start -->
        <el-breadcrumb separator=">" class="breadcrumb">
            <el-breadcrumb-item>店铺管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/shop/good' }">菜品管理</el-breadcrumb-item>
            <el-breadcrumb-item>新增配件编辑</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 面包屑 end -->

        <div class="content-box">
            <!-- 导航 start -->
            <div class="menu-nav">
                <ul class="clearfix">
                    <li v-for="(item, index) in menuNavData" :key="index" :class="{active:activeSelect === index}">{{ item.label }}</li>
                </ul>
            </div>
            <!-- 导航 end -->

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
                        <span class="must">名称</span>
                    </div>
                    <div class="name-content food-right left">
                        <el-input v-model="foodName" placeholder="请输入配件名"></el-input>
                    </div>
                </div>

                <!-- category -->
                <div class="food-category clearfix">
                    <div class="category-title food-left left">
                      <span class="must">商品分类</span>
                    </div>
                    <div class="category-content food-right left">
                        <select-cate 
                        :categoryArr="categoryArr"
                        @on-change="getSelectId" 
                        @on-changeT="getSelectId"></select-cate>
                    </div>
                </div>

                <!-- 价格  -->
                <div class="food-price clearfix">
                    <div class="price-title food-left left">
                        <span class="must">价格</span>
                    </div>
                    <div class="price-content food-right left">
                        <el-input
                        @keyup.native="checkPrice" 
                        min="0" 
                        placeholder="请输入价格" 
                        v-model="foodPrice">
                            <template slot="append">元</template>
                        </el-input>
                    </div>
                </div>

                <!-- 图片 -->
                <div class="food-picture clearfix">
                    <div class="picture-title food-left left">图片</div>
                    <div class="picture-content food-right left clearfix">
                        <div class="default-img" v-if="imgList.length === 0">
                           <img src="../images/empty.png" alt="默认">
                        </div>
                        <div class="upload-content">                        
                            <el-upload 
                            :action="base_url + '/img_save.php'" 
                            name="imgfile" :data="imgData" 
                            list-type="picture-card" 
                            :on-preview="handlePictureCardPreview" 
                            :on-success="successHandle"
                            :on-remove="removeHandle">
                                上传
                                <!-- <div slot="tip" class="tip">注：最多可上传五张图片、支持JPG、JPEG、PNG文件格式，大小不得大于500KB</div>                     -->
                            </el-upload>
                            <el-dialog v-model="dialogVisible" size="tiny">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </div>
                    </div>
                </div>

                <!-- 库存 -->
                <div class="food-stock clearfix">
                    <div class="stock-title food-left left">
                        <span>库存数量</span>
                    </div>
                    <div class="stock-content food-right left">
                        <el-input 
                        @keyup.native = "checkStockNum"
                        v-model="stockNum" 
                        placeholder="0表示不限量"></el-input>
                    </div>
                </div>

                <div class="btn-content">
                    <div class="btn-group clearfix">
                        <div class="btn-item left" @click="assceeSaveDraft">保存草稿</div>
                        <div class="btn-item left" @click="assceeSave">保存</div>
                        <div class="btn-item left" @click="assceeSaveSale">保存并上架</div>
                        <div class="btn-item left" @click="cancelBtn">取消</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getFoodSn, saveEditor, getFoodEditor } from "../../api";
import { GoodList } from "../../index";
import SelectCate from "../../components/selectCate";
import { Util } from "@/config/util";
import { GoodType } from "@/config/cfg";

export default {
  components: {
    SelectCate //菜单选择
  },
  data() {
    return {
      menuNavData: [
        {
          label: "基础设置",
          selector: "#base-set"
        }
      ],

      foodName: "",
      foodPrice: "",
      stockNum: 0,
      categoryId: "",
      categoryArr: [],

      activeSelect: 0,
      foodId: null,
      foodinfo: {
        food_id: "", //菜品编号
        food_name: "",
        food_price: "",
        category_id: "",
        stock_num: ""
      },
      dialogImageUrl: "",
      dialogVisible: false,
      base_url: base_url,
      imgData: {
        upload: 1,
        userid: 1
      },
      imgList: [],
      isNew: true
    };
  },
  computed: {
    foodType() {
      return this.$store.state.good.type;
    }
  },
  created() {
    this.init();
    this.getfoodSnn();
  },
  methods: {
    //图片上传
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    successHandle(response) {
      if (response.ret === 0) {
        let imgName = response.data.filename;
        this.imgList.push(imgName);
      } else {
        console.log("图片上传错误！");
      }
    },
    removeHandle(file) {
      let imgName = file.response.data.filename;
      GoodList.deleteArrayItem(this.imgList, imgName);
      // this.imgList.
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
    //获取保存的信息
    getSaveData() {
      let data = {
        save: 1,
        food_id: this.foodinfo.food_id,
        food_name: this.foodName,
        category_id: this.categoryId,
        food_price: this.foodPrice,
        food_num_day: this.stockNum,
        food_img_list: this.imgList,
        type: GoodType.ACCESSORY
      };

      if (this.isNew) {
        data["entry_type"] = 1;
      }

      return data;
    },
    //配件保存
    assceeSave() {
      //必填项检验
      if (this.check()) {
        return;
      }

      let data = this.getSaveData();
      data["sale_off"] = 1;
      saveEditor(data, this.saveHander);
    },

    //保存并上架
    assceeSaveSale() {
      let data = this.getSaveData();

      saveEditor(data, this.saveHander);
    },

    cancelBtn() {
      this.$router.go(-1);
    },
    //草稿保存
    assceeSaveDraft() {
      let data = this.getSaveData();
      data["is_draft"] = 1;

      saveEditor(data, resp => {
        if (resp.ret === 0) {
          console.log("保存草稿成功！");
          this.$router.push({ path: "/good/draft" });
        } else {
          console.warn("保存草稿失败！");
        }
      });
    },

    saveHander(resp) {
      if (resp.ret === 0) {
        console.log("保存成功！");
        this.$router.push({ path: "/shop/good" });
      } else {
        console.log("保存失败！ ");
      }
    },
    //分类id
    getSelectId(id) {
      this.categoryId = id;
    },
    init() {
      this.foodId = this.$route.query.foodId;
      this.$store.commit("CHANGE_TYPE", GoodType.ACCESSORY);

      if (!Util.isEmpty(this.foodId)) {
        this.isNew = false;

        getFoodEditor(this.foodId, resp => {
          if (resp.ret === 0) {
            this.foodinfo = resp.data.info || {};

            this.foodName = this.foodinfo.food_name;
            this.foodPrice = this.foodinfo.food_price;
            this.stockNum = this.foodinfo.food_num_day || 0;
            this.categoryId = this.foodinfo.category_id;
            this.categoryArr = this.foodinfo.category || [];
          } else {
            console.warn("获取配件详情失败! ");
          }
        });
      }
    },

    //check 价格
    checkPrice() {
      this.foodPrice = GoodList.clearNoNum(this.foodPrice);
    },

    checkStockNum() {
      this.stockNum = GoodList.checkRound(this.stockNum);
    },

    //必填项检验
    check() {
      //name
      if (this.foodName === "" || GoodList.isEmpty(this.foodName)) {
        this.$notify({
          title: "警告",
          message: "配件名称为必填",
          type: "warning"
        });
        return true;
      }
      //商品分类
      if (this.categoryId === "" || GoodList.isEmpty(this.categoryId)) {
        this.$notify({
          title: "警告",
          message: "配件分类为必填",
          type: "warning"
        });
        return true;
      }
      //规格
      if (this.foodPrice === "" || GoodList.isEmpty(this.foodPrice)) {
        this.$notify({
          title: "警告",
          message: "配件价格为必填",
          type: "warning"
        });
        return true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/styles/mixin.scss";

#access-editor {
  .content {
    @include fc(14px, #000);
    background-color: #fff;
  }
}

.content-box {
  background: #ffffff;
  box-shadow: 0 2px 4px 0 #becaeb;
}

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
  .category-title {
    line-height: 34px;
  }
}

.food-price {
  height: 30px;
  margin-top: 20px;
  margin-bottom: 20px;

  .price-title {
    line-height: 30px;
  }
}

.food-picture {
  .picture-content {
    .default-img {
      margin-right: 10px;
      float: left;
      @include wh(100px, 100px);
      img {
        @include wh(100px, 100px);
      }
    }
    .upload-content {
      float: left;
    }
  }
}

.food-stock {
  height: 34px;
  margin-top: 20px;
  margin-bottom: 20px;

  .stock-title {
    line-height: 34px;
  }
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
      margin-right: 10;
    }
  }
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

#access-editor {
  .el-breadcrumb {
    @include fc(12px, #333333);
  }

  .el-breadcrumb__item:last-child .el-breadcrumb__item__inner {
    color: #4877e7;
  }

  .el-breadcrumb__item__inner:hover {
    color: #4877e7;
  }

  .el-input {
    width: inherit;
  }
  .food-name .el-input__inner {
    @include wh(280px, 34px);
    border-radius: 0;
  }
  .food-stock .el-input__inner {
    @include wh(280px, 34px);
    border-radius: 0;
  }
  .el-input__inner:hover {
    border: 1px solid #bfcbd9;
  }
  .el-input__inner:focus {
    border: 1px solid #bfcbd9;
  }
  .food-price {
    .el-input-group__append {
      width: 15px;
    }
    .el-input__inner {
      height: 30px;
    }
    .el-input {
      width: 150px;
    }
  }
  .food-picture {
    // display: inline-block;
    .el-upload.el-upload--picture-card {
      @include wh(60px, 30px);
      line-height: 30px;
      border: 1px solid #4877e7;
      border-radius: 0;
      color: #4877e7;
    }
    .el-upload-list--picture-card .el-upload-list__item {
      @include wh(100px, 100px);
      border-radius: 0;
    }
    .tip {
      @include fc(12px, #9b9b9b);
      padding-top: 54px;
    }
  }
}
</style>
