<template>
    <div class="sale-custom clearfix">
        <div class="custom-title food-left left">
            <span>定时上架时段</span>
        </div>
        <div class="custom-content food-right left">
            <div class="tip">
                （注：时段时间不可重合）
            </div>
            <div class="time">
              <el-date-picker
                v-model="value1"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>

              <el-date-picker
                v-model="value2"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      value1: "",
      value2: new Date(2000, 10, 10, 10, 10),
      value3: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value4: "",
    };
  },
  mounted() {},
  methods: {
    openTimeSelect() {
      // this.$refs['dataPicker'].pickerVisible = true;
      console.log(this.$refs["dataPicker"].pickerVisible);
      console.log(this.$refs["dataPicker"]);
      console.log(this.$refs["dataPicker"].$children[0].$refs["input"]);
      // this.$refs['dataPicker'].blur();
      this.$refs["dataPicker"].$children[0].$refs["input"].focus();
      // this.$refs['dataPicker'].$children[0].dispatch('focus');
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

