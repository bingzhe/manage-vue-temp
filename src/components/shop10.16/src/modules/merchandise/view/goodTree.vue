<template>
    <div id="good-tree">
        <div class="tree-title">商品列表</div>

        <z-tree ref="tree" @editor-category="editorCategorys" :treeData="treeData" @add-category="addCategorys"></z-tree>

        <!-- 添加分类弹窗 -->
        <el-dialog class="category-dialog" :visible.sync="featureDialogVisible" :show-close="false" size="">
            <div class="dialog-title" slot="title">添加{{ dialogTitle }}分类</div>
            <div class="dialog-content">
                <div class="dinner-time clearfix">
                    <div class="content-left left">
                        <span>所属餐时</span>
                    </div>
                    <ul class="content-right left clearfix">
                        <li :class="{active: item.selected}" class="left" v-for="(item, index) in dinnerTimeSelect" :key="item.value">{{ item.label }}</li>
                    </ul>
                </div>

                <div class="dinner-tip">
                    注：默认全选，仅可设置上级目录包含的属于餐时项
                </div>

                <div class="category clearfix">
                    <div class="content-left left">
                        <span>所属餐时</span>
                    </div>
                    <div class="content-right left">
                        <el-input class="left" v-model="dialongInputValue" placeholder="请输入内容"></el-input>
                    </div>
                </div>

                <div class="button-group clearfix">
                    <div class="ok-btn left">确定</div>
                    <div class="cancel-btn left">取消</div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import ZTree from '../components/tree/tree.vue';
import { GoodList } from '../index';
import { getTableCategory, editorCategory } from '../api';
import Vue from 'vue';

export default {
    data() {
        return {
            featureDialogVisible: false,
            dialogTitle: "菜品ss",
            dialongInputValue: "",
            dinnerTimeData: [{
                label: "早市",
                value: 1,
                selected: true,
            }, {
                label: "午市",
                value: 2,
                selected: true,
            }, {
                label: "晚市",
                value: 3,
                selected: true,
            }, {
                label: "夜宵",
                value: 4,
                selected: true
            }],
            dinnerTimeSelect: [],
            dinnerTimeArr: [], //当前选中的时段
            treeData: [],
            treeDataById: null,
            dialogParentId: null,
            dialogNode: null,
            dinnerSelected: null,
        };
    },
    components: {
        ZTree
    },
    watch: {
        treeData: {
            handler: function(val) {
                this.treeDataByIds();
            },
            deep: true
        },
        dialogParentId: {
            handler: function(val) {
                // this.changeSelecteDinner();
            }
        }
    },
    created() {
        this.getCategory();
    },
    methods: {
        treeDataByIds() {
            this.treeDataById = GoodList.treeDataById(this.treeData);
        },
        //拉取分类
        getCategory() {
            getTableCategory(this.categoryHander);
        },
        categoryHander(resp) {
            if (resp.ret === 0) {
                let data = resp.data.list;
                let treeDataObj = this.addCategoryFirst(data);
                Vue.set(this.treeData, 0, treeDataObj);
                GoodList.initTreeData(this.treeData);
                GoodList.generateKey(this.treeData, 0);
                GoodList.selectIcon(this.treeData);
            }
        },
        //编辑
        editorCategorys(node) {
            let data = {
                save: 1,
                category_id: node.category_id,
                category_name: node.category_name,
                parent_id: node.parent_id,
            };
            editorCategory(data, this.editorCategorysHanler);
        },
        editorCategorysHanler(resp) {
            if (resp.ret === 0) {
                console.log("修改成功");
            } else {
                console.log("菜品分类修改失败");
            }
        },
        //增加
        addCategorys(node) {
            this.dialogNode = node;
            if (node.parent_id === null) {
                this.dialogParentId = "#1";
            } else {
                this.dialogParentId = node.parent_id;
            }
            this.dialogTitle = node.category_name;
            this.dinnerTimeArr = node.opening_time || [];
            this.featureDialogVisible = true;
        },
        /**
         *添加最顶层商品分类
        * @param {Array} treeData 
        * @return {Object}
        */
        addCategoryFirst(treeData = []) {
            let treeDataA = {};
            Vue.set(treeDataA, 'category_name', '商品');
            Vue.set(treeDataA, 'list', treeData);
            Vue.set(treeDataA, 'opening_time', [1, 2, 3, 4]);
            Vue.set(treeDataA, 'category_id', '#1');

            return treeDataA;
        },
        changeSelecteDinner() {
            let node = this.treeDataById[this.dialogParentId];
            this.dinnerTimeSelect = GoodList.selectdinnerTime(this.dinnerTimeData, node.opening_time);
        }
    }
};
</script>

<style lang="scss" scoped>
@import 'src/styles/mixin.scss';

.tree-title {
    @include wh(100%, 40px);
    @include fc(14px, #666666);
    line-height: 40px;
    background-color: #F6F8FC;
    padding-left: 14px;
    margin-bottom: 40px;
}

.category-dialog {
    .dialog-title {
        @include wh(540px, 40px);
        @include fc(16px, #fff);
        background-color: #5A8CFF;
        text-align: center;
        line-height: 40px;
    }

    .dialog-content {
        padding: 50px 80px;

        .dinner-time {

            .content-left {
                @include wh(80px, 30px);
                line-height: 30px;
            }
            .content-right {
                @include wh(300px, 30px);

                li {
                    @include wh(60px, 30px);
                    border: 1px solid #d8d8d8;
                    line-height: 30px;
                    text-align: center;
                    color: #666;
                    cursor: pointer;
                    margin-right: 10px;
                }

                li.active {
                    @include wh(60px, 30px);
                    @include fc(14px, #5A8CFF);
                    line-height: 30px;
                    text-align: center;
                    border: 1px solid #5A8CFF;
                    margin-right: 10px;
                    position: relative;
                    margin-bottom: 10px;
                }

                li.active::after {
                    @include wh(12px, 12px);
                    position: absolute;
                    content: '';
                    background-image: url(./images/select.png);
                    background-repeat: no-repeated;
                    top: 0;
                    right: 0;
                }
            }
        }

        .category {

            .content-left {
                @include wh(80px, 34px);
                line-height: 34px;
            }

            .content-right {
                @include wh(300px, 34px);
            }
        }

        .button-group {
            margin-top: 40px;

            div {
                @include wh(160px, 40px);
                border-radius: 4px;
                border: 1px solid #5A8CFF;
                color: #5A8CFF;
                line-height: 40px;
                text-align: center;
            }
            .ok-btn {
                margin-right: 60px;
                background-color: #5A8CFF;
                color: #fff;
            }
        }
    }

    .dinner-tip {
        @include fc(12px, #9B9B9B);
        margin-left: 80px;
        padding: 10px 0 20px 0;
    }

    .content-left {
        @include fc(14px, #000);
        opacity: 0.5408;
        text-align: center;
    }

    .content-right {}
}
</style>


<style lang="scss">
@import 'src/styles/mixin.scss';

#good-tree {
    .category {
        .el-input {
            width: inherit
        }
        .el-input__inner {
            border-radius: 0;
            height: 34px;
        }
        .el-input__inner:hover {
            border: 1px solid #bfcbd9;
        }
        .el-input__inner:focus {
            border: 1px solid #bfcbd9;
        }
    }

    .el-dialog__header {
        padding: 0;
    }
    .el-dialog__body {
        padding: 0;
    }
}
</style>



