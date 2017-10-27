<template>
  <div class="upload">
    <div class="default-img" v-if="imgList.length === 0">
        <img src="../view/images/empty.png" alt="默认">
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
        <el-dialog v-model="imgDialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
  </div>
</template>

<script>
import { GoodList } from "../index";

export default {
  props: {
    imgLists: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      base_url: base_url,
      imgData: {
        upload: 1,
        userid: 1
      },
      imgList: [],
      imgDialogVisible: false,
      dialogImageUrl: ""
    };
  },
  watch: {
    // imgLists: {
    //   <<<<<<<<<<<
    //   handler: function(val) {
    //     this.imgList = val;
    //   }
    // }
  },
  methods: {
    //图片上传
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.imgDialogVisible = true;
    },
    successHandle(response) {
      if (response.ret === 0) {
        let imgName = response.data.filename;
        this.imgList.push(imgName);
        this.$emit("img-change", this.imgList);
      } else {
        console.warn("图片上传错误！");
      }
    },
    removeHandle(file) {
      let imgName = file.response.data.filename;
      GoodList.deleteArrayItem(this.imgList, imgName);
      this.$emit("img-change", this.imgList);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/styles/mixin.scss";

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
</style>
<style lang="scss">
@import "src/styles/mixin.scss";
.upload {
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
</style>

