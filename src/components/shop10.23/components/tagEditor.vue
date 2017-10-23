<template>
<!-- 多选标签弹窗组件  rr
配置项：
    dialogVisible: {
      type: Boolean,
      default: false
    },
    selectArr: {  //选中数组
      type: Array,
      default: []
    },
    tagObj: {   //配置
      type: Object,
      default: function() {
        return {
          name: "特色",
          value: "shop_feature",
          limitNum: 30,
          limitWord: 5,  
          limitSelect: 10 
        };
      }
    }
冒泡事件： 
    this.$emit("on-close");
    this.$emit("on-change", this.tagSelect);  //参数，选中tag项
-->

  <div class="tagEditor">
    <el-dialog
    :visible="isDialogVisible" 
    :show-close="false"
    @open = "getTag"
    :before-close="handleClose"
    size="">
        <div class="dialog-title" slot="title">添加{{ tagObj.name }}图标</div>
        <div class="dialog-content">
            <div class="clearfix tip-delete">
                <span>请选择标签（多选）</span>
                <span v-if="isDeleteState" class="right btn red-text" @click="deleteStateCancel">取消</span>
                <span v-if="isDeleteState" class="right btn blue-text" @click="deleteStateOk">确定</span>
                <span v-if="!isDeleteState" class="right btn red-text" @click="toggleDelete">删除</span>
            </div>

            <div class="selet-tag">
                <el-checkbox-group class="" v-model="tagSelect">
                    <el-checkbox-button :class="{delete: isDeleteState}"
                    :disabled="isDeleteState"
                    v-for="item in shopTag" 
                    :label="item" 
                    :key="item">
                    {{item}}
                    <span class="delete-btn" v-if="isDeleteState" @click="deleteTag(item)"></span>
                    </el-checkbox-button>
                </el-checkbox-group>
            </div>


            <div class="dialog-add clearfix" v-if="!isDeleteState">
              <el-form class="left" :model="form" :rules="rules" ref="Form">
                <el-form-item prop="dialongInputValue">
                  <el-input class="left" 
                  v-model="form.dialongInputValue"
                  placeholder="请输入内容"></el-input>
                </el-form-item> 
              </el-form>

                <div class="add-btn left" @click="addTag('Form')">添加</div>
            </div>
            <div class="confirm-btn clearfix" v-if="!isDeleteState">
                <div class="ok left" @click="confirmOk">确定</div>
                <div class="cancel left" @click="handleClose">取消</div>
                <span v-if="isShowErrorTip" class="error-tip">选择标签不能超过{{tagObj.limitSelect}}个</span>
            </div>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import { tagEditor, saveTagEditor } from "../api";
import { Util } from "@/config/util";

export default {
  data() {
    var validateInput = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("标签不能为空"));
      } else if (value.length >= this.tagObj.limitWord) {
        callback(new Error("标签字数不能超过" + this.tagObj.limitWord));
      } else if (this.shopTag.length > this.tagObj.limitNum - 1) {
        callback(new Error("已经超过上限数量,请先删除在添加"));
      } else if (this.shopTag.indexOf(value) !== -1) {
        callback(new Error("标签已经存在"));
      } else {
        callback();
      }
    };
    return {
      isDialogVisible: false,
      form: {
        dialongInputValue: ""
      },
      shopTag: [],
      tagSelect: [],
      tagSelectCopy: [], //删除状态选中备份
      tagSelectCopyT: [],
      shopTagCopy: [], //所有标签备份
      isShowErrorTip: false,
      isDeleteState: false,
      rules: {
        dialongInputValue: [
          // { required: true, message: "请输入活动名称", trigger: "blur" },
          { validator: validateInput, trigger: "click" }
        ]
      }
    };
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    selectArr: {
      type: Array,
      default: []
    },
    tagObj: {
      type: Object,
      default: function() {
        return {
          name: "特色",
          value: "shop_feature",
          limitNum: 30,
          limitWord: 5,
          limitSelect: 10
        };
      }
    }
  },
  watch: {
    dialogVisible: function(val) {
      if (val === true) {
        this.isDialogVisible = true;
      }
    },
    tagSelect: function(val) {
      if (val.length > this.tagObj.limitSelect) {
        this.isShowErrorTip = true;
      } else {
        this.isShowErrorTip = false;
      }
    }
  },
  computed: {},
  methods: {
    //添加标签并验证
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.shopTag.push(this.form.dialongInputValue);
          this.form.dialongInputValue = "";
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //重置form
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //取店铺标签
    getTag() {
      let data = {
        get_shop_label: 1,
        label_name: this.tagObj.value
      };

      tagEditor(data, this.getTaghandler);
    },
    getTaghandler(resp) {
      if (resp.ret === 0) {
        let data = resp.data.shop_feature;
        if (Util.isEmpty(data)) {
          this.shopTag = [];
        }
        this.shopTag = data;
        this.tagSelect = this.selectArr;
      } else {
        console.log("获取标签失败!");
      }
    },
    saveTag() {
      let data = {
        save_label: 1,
        label_name: this.tagObj.value
      };

      data[this.tagObj.value] = this.shopTag;
      saveTagEditor(data, this.saveTagHandler);
    },
    saveTagHandler(resp) {
      if (resp.ret === 0) {
        console.log("保存标签成功!");
      } else {
        console.log("保存标签失败!");
      }
    },
    //添加tag
    addTag(formName) {
      this.submitForm(formName);
    },
    handleClose(done) {
      if (this.isDeleteState === true) {
        return false;
      }
      this.$emit("on-close");
      this.isDialogVisible = false;
    },
    //确定
    confirmOk() {
      if (this.tagSelect.length > this.tagObj.limitSelect) {
        return false;
      }
      if (this.isDeleteState === true) {
        return false;
      }
      this.$emit("on-close");
      this.$emit("on-change", this.tagSelect);
      this.saveTag();
      this.isDialogVisible = false;
    },
    //切换删除状态
    toggleState() {
      this.isDeleteState = !this.isDeleteState;
    },
    toggleDelete() {
      this.tagSelectCopy = this.tagSelect.slice();
      this.tagSelectCopyT = this.tagSelect.slice();
      this.shopTagCopy = this.shopTag.slice();
      this.tagSelect = [];
      this.toggleState();
    },
    deleteStateOk() {
      this.tagSelect = this.tagSelectCopy;
      this.toggleState();
    },
    deleteStateCancel() {
      this.tagSelect = this.tagSelectCopyT;
      this.shopTag = this.shopTagCopy;
      this.toggleState();
    },
    //删除标签
    deleteTag(item) {
      this.shopTag = this.deleteArrayItem(this.shopTag, item);
      this.tagSelectCopy = this.deleteArrayItem(this.tagSelectCopy, item);
    },
    /**
     * 删除数组中的某一项
     */
    deleteArrayItem(arr = [], item) {
      arr.forEach((items, index) => {
        if (items === item) {
          arr.splice(index, 1);
          return;
        }
      });
      return arr;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/styles/mixin.scss";

.dialog-title {
  @include wh(540px, 40px);
  @include fc(16px, #fff);
  background-color: #5a8cff;
  text-align: center;
  line-height: 40px;
}

.dialog-content {
  padding: 40px 50px 50px 50px;

  .tip-delete {
    margin-bottom: 30px;

    .btn {
      padding-left: 20px;
      cursor: pointer;
    }
  }

  .selet-tag {
    max-width: 440px;
    margin-bottom: 20px;

    .delete-btn {
      @include wh(12px, 12px);
      position: absolute;
      content: "";
      background-image: url(../view/images/delete.png);
      background-repeat: no-repeated;
      top: 0;
      right: 0;
      cursor: pointer;
    }
  }
}

.dialog-add {
  margin-left: 30px;
  min-width: 380px;

  .add-btn {
    @include wh(60px, 34px);
    @include fc(14px, #5a8cff);
    line-height: 34px;
    text-align: center;
    border: 1px solid #5a8cff;
    margin-left: 20px;
    cursor: pointer;
  }
}

.confirm-btn {
  margin-left: 30px;
  min-width: 380px;
  margin-top: 20px;
  position: relative;
  div {
    @include wh(160px, 40px);
    border-radius: 4px;
    border: 1px solid #5a8cff;
    color: #5a8cff;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
  }
  .ok {
    margin-right: 60px;
    background-color: #5a8cff;
    color: #fff;
  }
  .error-tip {
    color: #ff4949;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 0;
  }
}
.blue-text {
  color: #5a8cff;
}
.red-text {
  color: #e7487e;
}
</style>

<style lang="scss">
@import "src/styles/mixin.scss";

.tagEditor {
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
    background-image: url(../view/images/select.png);
    background-repeat: no-repeated;
    top: 0;
    right: 0;
  }
  .el-checkbox-button.is-disabled .el-checkbox-button__inner {
    background-color: #fff;
    cursor: inherit;
  }
}
</style>


