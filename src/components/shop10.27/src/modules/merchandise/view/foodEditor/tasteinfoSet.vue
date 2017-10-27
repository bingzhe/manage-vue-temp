<template>
    <div id="taste-set">
        <h3 class="title">
            <span>口味设置</span>
            <span class="tip">（注：可自定义新属性，只能同时选择两个口味设置属性在前端显示，每个口味前端界面最多显示四个标签）</span>
        </h3>

        <div class="content">
            <div class="taste clearfix" v-for="(item,index) in food_attach_list" :key="index">
                <div class="item-title food-left left">
                    <span>{{item.title}}</span>
                </div>

                <ul class="item-content food-right left">
                    <li class="left" v-for="(items, indexs) in item.list" :key="indexs">{{ items }}</li>
                    <li class="editor left" @click="showAttachDialog(index)">编辑</li>
                </ul>
            </div>

            <div class="add-btn" @click="showTitleDialog">
                + 添加属性
            </div>
        </div>

        <!-- 口味编辑弹窗 -->
        <tag-editor 
        :dialogVisible="attachdialogVisible"
        :selectArr="attachData"
        :tagObj="attachObj"
        @on-close="hideAttachDialog"
        @on-change="getAttach"
        ></tag-editor>

        <!-- 口味title编辑弹窗 -->
        <tag-editor 
        :dialogVisible="titledialogVisible"
        :selectArr="titleData"
        :tagObj="titleObj"
        @on-close="hideTitleDialog"
        @on-change="getTitle"
        ></tag-editor>

    </div>
</template>

<script>
import TagEditor from "../../components/tagEditor";
import { Util } from "@/config/util";

export default {
  props: {
    foodinfo: {
      type: Object
    }
  },
  components: {
    TagEditor //标签编辑
  },
  data() {
    return {
      food_attach_list: [
        {
          // 口味
          title: "辣度",
          list: ["中辣", "微辣"]
        },
        {
          title: "盐度",
          list: ["少盐", "多盐"]
        }
      ],
      //口味
      attachObj: {
        name: "口味",
        value: "food_attach_list",
        limitNum: 30,
        limitWord: 5,
        limitSelect: 5
      },
      attachdialogVisible: false,
      attachData: [],
      index: 0,

      //口味title
      titleObj: {
        name: "口味标题",
        value: "shop_food_attach",
        limitNum: 30,
        limitWord: 5,
        limitSelect: 5
      },
      titledialogVisible: false,
      titleData: []
    };
  },
  watch: {
    foodinfo: {
      handler: function(newVal) {
        this.init();
      },
      deep: true
    }
  },
  created() {
    this.init();
  },
  methods: {
    //口味弹窗
    showAttachDialog(index) {
      this.attachData = this.food_attach_list[index].list || [];
      this.index = index;
      this.attachdialogVisible = true;
    },
    hideAttachDialog() {
      this.attachdialogVisible = false;
    },
    getAttach(select) {
      this.food_attach_list[this.index].list = select;
      this.attachData = [];
      this.$emit("get-attach", this.food_attach_list);
    },
    //口味标题弹窗
    showTitleDialog() {
      this.food_attach_list.forEach(item => {
        this.titleData.push(item.title);
      });

      this.titledialogVisible = true;
    },
    hideTitleDialog() {
      this.titledialogVisible = false;
    },
    getTitle(select) {
      this.food_attach_list = this.food_attach_list.filter(item => {
        return select.indexOf(item.title) !== -1;
      });

      select.forEach(item => {
        if (this.titleData.indexOf(item) === -1) {
          let obj = {};
          obj["title"] = item;
          obj["list"] = [];
          this.food_attach_list.push(obj);
        }
      });
      this.titleData = [];
      this.$emit("get-attach", this.food_attach_list);
    },
    init() {
      this.food_attach_list = this.foodinfo.food_attach_list;

      if (Util.isEmpty(this.food_attach_list)) {
        this.food_attach_list = [];
      }

      if (!(this.food_attach_list[0]||{}).title) {
        this.food_attach_list = [];
      }

      if (!(this.food_attach_list[0]||{}).list) {
        this.food_attach_list.list = [];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/styles/mixin.scss";

#taste-set {
  .title {
    @include fc(14px, #666666);
    background-color: #f6f8fc;
    height: 40px;
    line-height: 40px;
    padding-left: 14px;

    .tip {
      @include fc(12px, #9b9b9b);
    }
  }

  .content {
    @include fc(14px, #000);
    background-color: #fff;
    padding: 40px 0;
  }
}

.taste {
  height: 30px;
  line-height: 30px;
  margin-bottom: 10px;
  .item-content {
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

.add-btn {
  @include fc(14px, #4877e7);
  @include wh(150px, 34px);
  border: 1px solid #4877e7;
  text-align: center;
  line-height: 34px;
  border-radius: 2px;
  cursor: pointer;
  margin-left: 234px;
}

.food-left {
  width: 220px;
  text-align: right;
  margin-right: 14px;
  span {
    opacity: 0.5708;
  }
}

.food-right {
  @include fc(14px, #666);
  min-width: 1020px;
}
</style>

<style lang="scss">
@import "src/styles/mixin.scss";

#taste-set {
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
}
</style>
