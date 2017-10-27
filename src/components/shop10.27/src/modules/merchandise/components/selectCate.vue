<template>
    <div class="select-cate">
        <div class="first-cate">
            <div>{{ list.category_name }}</div>
        </div>

        <div class="second-cate">
            <el-select v-model="secondCate" placeholder="请选择" @change="changethirdData">
                <el-option 
                v-for="item in list.list" 
                :key="item.category_id" 
                :label="item.category_name" 
                :value="item.category_id">
                </el-option>
            </el-select>
        </div>

        <div class="third-cate" v-if="isShowThird">
            <el-select v-model="thirdCate" placeholder="请选择" :disabled="disabled" @change="sendId">
                <el-option 
                v-for="item in thirdData.list" 
                :key="item.category_id" 
                :label="item.category_name" 
                :value="item.category_id">
                </el-option>
            </el-select>
        </div>
    </div>
</template>

<script>
import { getCategory } from "../api";

export default {
  props: {
    categoryArr: {
      type: Array,
      default: function() {
        return [{ category_id: "" }, { category_id: "" }, { category_id: "" }];
      }
    }
  },
  data() {
    return {
      secondCate: "",
      thirdCate: "",
      cateById: {},
      disabled: true,
      isShowThird: false,
      thirdData: {
        category_id: "301",
        category_name: "热菜",
        list: [
          {
            category_id: "539",
            category_name: "川菜",
            list: []
          }
        ]
      },
      list: {
        category_id: "11",
        category_name: "菜品",
        list: [
          {
            category_id: "301",
            category_name: "热菜",
            list: [
              {
                category_id: "539",
                category_name: "川菜",
                list: []
              }
            ]
          }
        ]
      }
    };
  },
  computed: {
    foodType() {
      return this.$store.state.good.type;
    }
  },
  created() {
    this.getCategory();
    // this.init();
  },
  watch: {
    categoryArr: {
      handler: function(val) {
        this.init();
      },
      deep: true
    }
  },
  methods: {
    //拉取分类
    getCategory() {
      let data = {
        type_list: 1,
        type: this.foodType
      };

      getCategory(data, resp => {
        this.list = resp.data.list;
        this.cateById = this.getCateById(this.list.list);
        // this.init();
      });
    },

    /**
         * 建立分类ID索引  
         */
    getCateById(cateData = []) {
      let cateById = {};

      const _saveCate = item => {
        item.forEach(items => {
          if (items.hasOwnProperty("category_id")) {
            cateById[items.category_id] = items;
          }

          if (items.hasOwnProperty("list") && items.list.length > 0) {
            _saveCate(items.list);
          }
        });
      };

      _saveCate(cateData);
      return cateById;
    },

    changethirdData() {
      this.disabled = false;
      this.thirdCate = "";
      this.thirdData = this.cateById[this.secondCate] || {};

      if ((this.thirdData.list || []).length !== 0) {
        this.isShowThird = true;
      } else {
        this.isShowThird = false;
      }

      if (this.isShowThird === false) {
        this.$emit("on-changeT", this.secondCate);
      }
    },
    sendId() {
      if (this.thirdCate === "") {
        return;
      }
      this.$emit("on-change", this.thirdCate);
    },
    init() {
      this.secondCate = (this.categoryArr[1] || {}).category_id || "";
      this.thirdCate = (this.categoryArr[2] || {}).category_id || "";
    },
  }
};
</script>

<style lang="scss" scoped>
@import "src/styles/mixin.scss";

.select-cate > div {
  // display: inline-block;
  float: left;
  margin-right: 10px;
}

.first-cate > div {
  @include wh(180px, 34px);
  padding: 3px 10px;
  border: 1px solid #d9d9d9;
  line-height: 29px;
  cursor: no-drop;
}
</style>

<style lang="scss">
@import "src/styles/mixin.scss";

.select-cate {
  .el-select {
    width: 180px;

    .el-input__inner {
      height: 34px;
      border-radius: 0;
    }
  }
}
</style>


