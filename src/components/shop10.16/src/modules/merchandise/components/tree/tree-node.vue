<template>
    <ul class="tree-node">
        <li v-for="(item, index) in nodeData" :key="item.key">
            <div v-show="item.canEditor" class="input-content">
                <div class="input-name">
                    <input type="text" v-model="item.category_name" @blur="isHideEditor(item)" @keyup.enter="isHideEditor(item)">
                </div>
            </div>
            <div v-show="!item.canEditor" class="name-content">
                <div class="category-name" @click="handleNode(item)">
                    <!-- //<<<<<<<<<<<<<<<  图标预留未知-->
                    <!-- <span></span> -->
                    <!-- <span></span> -->
                    <!-- <span></span> -->
                    <!-- <span></span> -->
                    <span>
                        {{ item.category_name }}
                    </span>
                </div>
                <div class="operate-btn">
                    <i v-if="item.addIcon" class="iconfont icon-tianjia blue" @click="addCategory(item)"></i>
                    <i v-if="item.editorIcon" class="iconfont icon-bianji blue" @click="isShowEditor(item)"></i>
                    <i v-if="item.deleteIcon" class="iconfont icon-shanchu red"></i>
                </div>
            </div>
            <tree-node ref="treenode" v-if="item.list && item.list.length > 0" :tree-data="item.list"></tree-node>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'treeNode',
    props: {
        treeData: Array,
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
            //<<<<<<<<<<<<<<< 
            this.tree.$emit('node-click', node);
        },
        addCategory(node){
            this.tree.$emit('add-category', node);
        },
        isShowEditor(node) {
            node.canEditor = true;
        },
        isHideEditor(node) {
            this.tree.$emit('editor-category', node);
            node.canEditor = false;
        }
    }
};
</script>

<style lang="scss" scoped>
@import 'src/styles/mixin.scss';

.name-content {
    font-size: 0;
    padding-bottom: 20px;
}

.input-content {
    padding-bottom: 20px;

    .input-name {
        border: 1px solid #4877E7;
        @include wh(187px, 34px); // line-height: 34px;
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
    // line-height: 34px;
    margin: 0; // padding: 4px 0 20px 4px;
    // padding-bottom: 20px;
    position: relative;
}

.tree li:after,
.tree li:before {
    content: '';
    left: -12px;
    position: absolute;
    right: auto;
    border-width: 1px
}

.tree>ul:first-child>li:first-child:before {
    // border-left: 1px solid #D8D8D8;
    border: none;
    bottom: 50%;
    height: 100%;
    top: 15px;
    width: 1px;
}

.tree>ul:first-child>li:first-child:after {
    border: none;
}

.tree li:before {
    border-left: 1px solid #D8D8D8;
    bottom: 50px;
    height: 100%;
    top: -20px;
    width: 1px;
}

.tree li:after {
    border-top: 1px solid #D8D8D8;
    height: 20px;
    top: 15px;
    width: 12px
}

.tree li:last-child::before {
    height: 36px
}

.tree>ul {
    padding-left: 0
}

.tree ul ul {
    padding-left: 19px; // padding-top: 10px;
}

.blue {
    color: #4877E7;
}

.red {
    color: #E7487E;
}
</style>

