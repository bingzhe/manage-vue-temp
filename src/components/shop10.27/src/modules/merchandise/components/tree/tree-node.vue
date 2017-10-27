<template>
    <ul class="tree-node">
        <li v-for="(item, index) in nodeData" :key="item.key">
            <div v-show="item.canEditor" class="input-content">
                <div class="input-name">
                    <input type="text" v-model="item.category_name" @blur="isHideEditor(item)" @keyup.enter="isHideEditor(item)">
                </div>
            </div>
            <div v-show="!item.canEditor" class="name-content" @mouseleave="isHideBtn(item)">
                <div class="category-name" 
                @click="handleNode(item)" 
                @mouseenter="isShowBtn(item)" 
                :class="{'tree-category': item.isThree, 'active': item.isActive }">
                    <div class="icon-group" v-if="item.isThree">                    
                        <span v-if="item.breakshow" class="icon breakfast">早</span>
                        <span v-if="item.lunckshow" class="icon lunch">午</span>
                        <span v-if="item.dinnershow" class="icon dinne">晚</span>
                        <span v-if="item.nightshow" class="icon night">夜</span>
                        <span v-if="item.allShow" class="icon all">全</span>
                    </div>
                    {{ item.category_name }}
                </div>
                <div v-if="item.isShowBtn" class="operate-btn">
                    <i v-if="item.addIcon" class="iconfont icon-tianjia blue" @click="addCategory(item)"></i>
                    <i v-if="item.editorIcon" class="iconfont icon-bianji blue" @click="isShowEditor(item)"></i>
                    <i v-if="item.deleteIcon" class="iconfont icon-shanchu red" @click="deleteCategory(item)"></i>
                </div>
            </div>
            <tree-node ref="treenode" v-if="item.list && item.list.length > 0" :tree-data="item.list"></tree-node>
        </li>
    </ul>
</template>

<script>
import { Tree } from "./tree";

export default {
  name: "treeNode",
  props: {
    treeData: Array
  },
  data() {
    return {
      nodeData: []
    };
  },
  created() {
    const parent = this.$parent;
    if (parent.isTree) {
      this.tree = parent;
    } else {
      this.tree = parent.tree;
    }
    this.nodeData = (this.treeData || []).slice(0);
  },
  watch: {
    treeData: function(data) {
      this.nodeData = (data || []).slice(0);
    }
  },
  methods: {
    handleNode(node) {
      node.isActive = true;
      this.tree.$emit("node-click", node);
    },
    addCategory(node) {
      this.tree.$emit("add-category", node);
    },
    // isShowEditor(node) {
    //     node.canEditor = true;
    // },
    isShowEditor(node) {
      this.tree.$emit("editor-category", node);
    },
    deleteCategory(node) {
      this.tree.$emit("delete-category", node);
    },
    isShowBtn(node) {
      node.isShowBtn = true;
    },
    isHideBtn(node) {
      node.isShowBtn = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/styles/mixin.scss";

.name-content {
  font-size: 0;
  padding-bottom: 20px;
}

.input-content {
  padding-bottom: 20px;

  .input-name {
    border: 1px solid #4877e7;
    @include wh(187px, 34px); 
    border-radius: 2px;
    padding: 0 3px 0 10px;

    input {
      @include wh(100%, 100%);
    }

    input:focus {
      outline-style: initial;
    }
  }
}

.category-name {
  border: 1px solid #979797;
  @include wh(80px, 34px);
  line-height: 34px;
  border-radius: 2px;
  display: inline-block;
  @include fc(14px, #666666);
  text-align: center;
  vertical-align: bottom;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  div.icon-group {
    display: inline-block;
    height: 18px;
    line-height: 18px;
    text-align: center;
  }

}
.category-name .icon {
  display: inline-block;
  @include fc(12px, #666666);
  @include wh(16px, 16px);
  border-radius: 8px;
  color: #fff;
  background-color: #4877e7;
}
.category-name.active {
  border-color: #4877e7;
  color: #fff;
  background-color: #4877e7;
  overflow: hidden;
  text-overflow: ellipsis;

  span.icon {
    color: #4877e7;
    background-color: #fff;
  }
}

.operate-btn {
  display: inline-block;
  cursor: pointer;

  .iconfont {
    font-size: 24px;
    line-height: 34px;
    margin-left: 10px;
  }
}

.tree-node li {
  margin: 0; 
  position: relative;
}

.tree li:after,
.tree li:before {
  content: "";
  left: -12px;
  position: absolute;
  right: auto;
  border-width: 1px;
}

.tree > ul:first-child > li:first-child:before {
  border: none;
  bottom: 50%;
  height: 100%;
  top: 15px;
  width: 1px;
}

.tree > ul:first-child > li:first-child:after {
  border: none;
}

.tree li:before {
  border-left: 1px solid #d8d8d8;
  bottom: 50px;
  height: 100%;
  top: -20px;
  width: 1px;
}

.tree li:after {
  border-top: 1px solid #d8d8d8;
  height: 20px;
  top: 15px;
  width: 12px;
}

.tree li:last-child::before {
  height: 36px;
}

.tree > ul {
  padding-left: 0;
}

.tree ul ul {
  padding-left: 19px; 
}

.blue {
  color: #4877e7;
}

.red {
  color: #e7487e;
}

.tree-category {
  @include wh(185px, 34px);
  text-align: left;
  padding-left: 10px;
}
</style>

