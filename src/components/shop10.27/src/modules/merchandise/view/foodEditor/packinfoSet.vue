<template>
    <div id="pack-set">
        <h3 class="title">打包设置</h3>
        <div class="content">

            <!-- 餐盒 -->
            <div class="pack-name clearfix">
                <div class="name-title food-left left">
                    <span>餐盒</span>
                </div>
                <ul class="name-content food-right left">
                    <li class="left" 
                    :class="{active: accessSelect === item.food_id}" 
                    v-for="(item,index) in accessoryData" 
                    :key="item.food_id" 
                    @click="changePackNameSelect(item.food_id)">{{ item.food_name }}</li>
                </ul>
            </div>

            <!-- 所需餐盒数量 -->
            <div class="pack-num clearfix">
                <div class="num-title food-left left">
                    <span>所需餐盒数量</span>
                </div>
                <div class="num-content food-right left">
                    <el-select v-model="selectPackNum" placeholder="1" @change="packNumHandler">
                        <el-option v-for="item in packNumOptions" 
                        :key="item.value" :label="item" :value="item">
                        </el-option>
                    </el-select>
                    <span>个</span>
                </div>
            </div>


            <!-- 备注 -->
            <div class="pack-remark clearfix">
                <div class="remark-title food-left left">
                    <span>备注</span>
                </div>
                <div class="remark-content food-right left">
                    <el-input type="textarea"
                    @change="remarkTextHandler" 
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="输入备注不得超过200个字符" 
                    v-model="remarkText">
                    </el-input>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getTableList } from "../../api";

export default {
  props: {
    foodinfo: {
      type: Object
    }
  },
  data() {
    return {
      accessoryData: [],
      accessSelect: 1,
      packNumOptions: [0, 1, 2, 3],
      selectPackNum: "",
      remarkText: ""
    };
  },
  created() {
    this.getAccessory();
    this.init();
  },
  watch: {
    foodinfo: {
      handler: function(newVal, oldVal) {
        this.init();
      },
      deep: true
    }
  },
  methods: {
    changePackNameSelect(index) {
      this.accessSelect = index;
      this.$emit("access-change", this.accessSelect);
    },
    packNumHandler() {
      this.$emit("packnum-change", this.selectPackNum);
    },
    remarkTextHandler() {
      this.$emit("remarktext-change", this.remarkText);
    },
    getAccessory() {
      getTableList({ accessory: 1 }, resp => {
        if (resp.ret === 0) {
          this.accessoryData = resp.data.list;
          if (this.accessoryData.length >= 1) {
            // this.accessSelect = this.accessoryData[0].food_id;
          }
        } else {
          console.warn("获取餐盒配件失败！");
        }
      });
    },
    init() {
      this.accessSelect = this.foodinfo.accessory;
      this.selectPackNum = this.foodinfo.accessory_num;
      this.remarkText = this.foodinfo.pack_remark;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/styles/mixin.scss";

#pack-set {
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
    padding: 40px 0;
  }
}

.pack-name {
  height: 30px;
  line-height: 30px;
  margin-bottom: 22px;
  .name-content {
    li {
      padding: 0 20px;
      height: 30px;
      border: 1px solid #d8d8d8;
      border-radius: 2px;
      margin-right: 10px;
      line-height: 30px;
      text-align: center;
      cursor: pointer;
    }
    li.active {
      border-color: #4877e7;
      color: #fff;
      background-color: #4877e7;
    }
  }
}

.pack-num {
  height: 30px;
  line-height: 30px;
  margin-bottom: 20px;
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

#pack-set {
  .pack-remark .el-textarea {
    textarea {
      width: 400px !important;
      height: 150px !important;
    }
  }
  .el-select {
    width: 180px;
  }
  .el-select .el-input__inner {
    border-radius: 0;
  }
}
</style>