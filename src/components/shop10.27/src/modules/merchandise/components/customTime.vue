<template>
    <div class="sale-custom clearfix">
        <div class="custom-title food-left left">
            <span>定时上架时段</span>
        </div>
        <div class="custom-content food-right left">
            <div class="tip">
                （注：时段时间不可重合）
            </div>
            <div class="time" v-for="(item,index) in dataArr" :key="index">
              <el-date-picker
                v-model="item.start_time"
                @change="saveTime"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>

              <el-date-picker
                v-model="item.end_time"
                @change="saveTime"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
              <span>                
                <i v-if="index === 0" class="iconfont icon-tianjia blue" @click="addItem"></i>
                <i v-if="index !== 0" class="iconfont icon-shanchu red" @click="deleteItem"></i>
              </span>
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment";
import { Util } from "@/config/util";

export default {
  props: {
    timeArr: {
      type: Array
    }
  },
  data() {
    return {
      dataArr: [
        {
          start_time: "2017-10-24T02:36:08.447Z",
          end_time: "2017-10-24T02:36:08.447Z"
        }
      ]
    };
  },
  watch: {
    timeArr: {
      handler: function(newVal, odVal) {
        this.initTime();
      },
      deep: true
    }
  },
  created() {
    this.initTime();
  },
  methods: {
    addItem() {
      let timeObj = { start_time: "", end_time: "" };
      this.dataArr.push(timeObj);
    },
    deleteItem() {
      if (this.dataArr.length > 1) {
        this.dataArr.pop();
      }
    },
    //取数据时间转换
    initTime() {
      this.dataArr = this.timeArr.map(item => {
        let itemCopy = {};
        for (let items in item) {
          if (item.hasOwnProperty(items)) {
            if (Util.isEmpty(item[items])) {
              itemCopy[items] = moment()
                .utc()
                .format();
            } else {
              itemCopy[items] = moment(item[items])
                .utc()
                .format();
            }
          }
        }
        return itemCopy;
      });
    },

    //保存时时间转换
    saveTime() {
      let dataTime = this.dataArr.map(item => {
        let itemCopy = {};
        for (let items in item) {
          if (item.hasOwnProperty(items)) {
            itemCopy[items] = moment(item[items]).format("x");
          }
        }
        return itemCopy;
      });
      this.$emit("time-change", dataTime);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/styles/mixin.scss";
.custom-content {
  .tip {
    font-size: 14px;
    color: #9b9b9b;
    margin-bottom: 10px;
  }
  .time {
    margin-bottom: 10px;
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

.blue {
  color: #4877e7;
  cursor: pointer;
}
.red {
  color: #e7487e;
  cursor: pointer;
}
</style>

