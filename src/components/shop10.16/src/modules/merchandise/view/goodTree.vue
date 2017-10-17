<template>
    <div id="good-tree">
        <div class="tree-title">商品列表</div>

        <z-tree ref="tree" @node-click="selectNodeActive" @delete-category="deleteCategorys" @editor-category="openEditorDialog" :treeData="treeData" @add-category="addCategorys"></z-tree>

        <!-- 商品添加弹窗 -->
        <el-dialog class="category-dialog" :visible.sync="addDialogVisible" :show-close="false" size="">
            <div class="dialog-title" slot="title">添加商品分类</div>
            <div class="dialog-content">
                <div class="category clearfix">
                    <div class="content-left left">
                        <span>分类名称</span>
                    </div>
                    <div class="content-right left">
                        <el-input class="left" v-model="dialongInputValue" placeholder="请输入内容"></el-input>
                    </div>
                </div>

                <div class="button-group clearfix">
                    <div class="ok-btn left" @click="dialogAddFirst">确定</div>
                    <div class="cancel-btn left" @click="dialogAddCancelFirst">取消</div>
                </div>
            </div>
        </el-dialog>

        <!-- 添加分类弹窗 -->
        <el-dialog class="category-dialog" :visible.sync="EditorDialogVisible" :show-close="false" size="">
            <div class="dialog-title" slot="title">{{ dialogTitle }}分类</div>
            <div class="dialog-content">
                <div class="dinner-time clearfix">
                    <div class="content-left left">
                        <span>所属餐时</span>
                    </div>

                    <el-checkbox-group class="left content-right" v-model="dinnerTimeArr">
                        <el-checkbox-button v-for="item in dinnerTimeSelect" :label="item.value" :key="item.value">{{item.label}}</el-checkbox-button>
                    </el-checkbox-group>
                </div>

                <div class="dinner-tip">
                    注：默认全选，仅可设置上级目录包含的属于餐时项
                </div>

                <div class="category clearfix">
                    <div class="content-left left">
                        <span>分类名称</span>
                    </div>
                    <div class="content-right left">
                        <el-input class="left" v-model="dialongInputValue" placeholder="请输入内容"></el-input>
                    </div>
                </div>

                <div v-if="isEditor" class="button-group clearfix">
                    <div class="ok-btn left" @click="editorCategorys">确定</div>
                    <div class="cancel-btn left" @click="dialogAddCancel">取消</div>
                </div>

                <div v-else class="button-group clearfix">
                    <div class="ok-btn left" @click="dialogAdd">确定</div>
                    <div class="cancel-btn left" @click="dialogAddCancel">取消</div>
                </div>
            </div>
        </el-dialog>

        <!-- 删除提示弹窗 -->
        <el-dialog class="delete-dialog" :visible.sync="DeleteDialogVisible" :show-close="false" size="">
            <div class="dialog-title" slot="title"></div>
            <div class="dialog-content">
                <div class="delete-tip">
                    <div class="delete-img">
                        <img src="./images/question.png" alt="提示图片">
                    </div>
                    <div class="delete-text">删除此商品分类将会删除它的子分类，是否删除？</div>
                </div>
                <div class="button-group clearfix">
                    <div class="ok-btn left" @click="dialogDelete">确定</div>
                    <div class="cancel-btn left" @click="dialogDeleteCancel">取消</div>
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
import { GoodType } from '@/config/cfg';

export default {
    data() {
        return {
            addDialogVisible: false,
            EditorDialogVisible: false,
            DeleteDialogVisible: false,
            isEditor: false, //是编辑弹框
            dialogTitle: "",
            dialongInputValue: "",
            dinnerTimeData: [{
                label: "早市",
                value: 1,
            }, {
                label: "午市",
                value: 2,
            }, {
                label: "晚市",
                value: 3,
            }, {
                label: "夜宵",
                value: 4,
            }],
            dinnerTimeSelect: [],
            dinnerTimeArr: [], //当前选中的时段
            treeData: [],
            treeDataById: null,
            dialogParentId: null,
            dialogNode: null,  //弹窗分类节点
            dinnerSelected: null,
        };
    },
    computed: {
        selectCategoryId(){
            return this.$store.state.good.selectCategoryId;
        }
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
        dialogNode: {
            handler: function(val) {
                this.changeSelecteDinner();
            }
        },
        dialogParentId: {
            handler: function(val) {
                this.changeSelecteDinnerP();
            }
        }
    },
    created() {
        this.getCategory();
    },
    methods: {
        //选中样式
        selectNodeActive(node) {
            this.$store.commit('CHANGE_ID', node.category_id);
            GoodList.changeSelecte(node, this.treeDataById);
        },
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
                let treeDataObj = GoodList.addCategoryFirst(data);
                Vue.set(this.treeData, 0, treeDataObj);
                GoodList.generateKey(this.treeData, 0);
                GoodList.initTreeData(this.treeData);
                GoodList.selectIcon(this.treeData);
            }
        },
        //编辑
        openEditorDialog(node) {
            this.dialogNode = node;
            this.dialogTitle = "修改" + node.category_name;
            this.dialogParentId = node.parent_id;
            this.dinnerTimeArr = node.opening_time;
            this.dialongInputValue = node.category_name;
            this.EditorDialogVisible = true;
            this.isEditor = true;
        },
        editorCategorys() {
            let data = {
                save: 1,
                category_id: this.dialogNode.category_id,
                category_name: this.dialongInputValue,
                parent_id: this.dialogNode.parent_id,
                opening_time: this.dinnerTimeArr,
                userid: 1,
            };
            debugger;
            editorCategory(data, this.editorCategorysHanler);
        },
        editorCategorysHanler(resp) {
            if (resp.ret === 0) {
                this.getCategory();
                this.EditorDialogVisible = false;
                this.isEditor = false;
                this.dialongInputValue = "";
                console.log("修改成功");
            } else {
                this.EditorDialogVisible = false;
                this.isEditor = false;
                this.dialongInputValue = "";
                console.log("菜品分类修改失败");
            }
        },
        changeSelecteDinnerP() {
            let node = this.treeDataById[this.dialogParentId];
            this.dinnerTimeSelect = GoodList.selectdinnerTime(this.dinnerTimeData, node.opening_time);
        },
        //商品分类增加
        dialogAddFirst() {
            let data = {
                save: 1,
                category_name: this.dialongInputValue,
                opening_time: [1, 2, 3, 4],
                type: GoodType.DISH,
                userid: 1,
            };
            editorCategory(data, this.dialogAddFirstHandler);
        },
        dialogAddFirstHandler(resp) {
            if (resp.ret === 0) {
                this.getCategory();
                this.addDialogVisible = false;
                this.dialongInputValue = "";
                console.log("添加成功");
            } else {
                this.addDialogVisible = false;
                this.dialongInputValue = "";
                console.log("商品分类添加失败");
            }
        },
        dialogAddCancelFirst() {
            this.addDialogVisible = false;
        },
        //增加
        addCategorys(node) {
            this.dialogNode = node;
            // this.dialogParentId = node.parent_id;
            this.dinnerTimeArr = node.opening_time;
            if (node.category_id === "0") {
                this.addDialogVisible = true;
            } else {
                this.dialogTitle = "添加" + node.category_name;
                this.EditorDialogVisible = true;
            }
        },
        changeSelecteDinner() {
            //<<<<<<<<<<<<<<<<<<<<<<<<<<
            // let node = this.treeDataById[this.dialogParentId];
            this.dinnerTimeSelect = GoodList.selectdinnerTime(this.dinnerTimeData, this.dialogNode.opening_time);
        },
        dialogAdd() {
            let data = {
                save: 1,
                category_name: this.dialongInputValue,
                opening_time: this.dinnerTimeArr,
                parent_id: this.dialogNode.category_id,
                //<<<<<<<<<<<<<<
                // type: this.dialogNode.type,
                type: 2,
                userid: 1,
            };
            editorCategory(data, this.dialogAddHandler);
        },
        dialogAddHandler(resp) {
            if (resp.ret === 0) {
                this.getCategory();
                this.EditorDialogVisible = false;
                this.isEditor = false;
                this.dialongInputValue = "";
                console.log("修改成功");
            } else {
                this.EditorDialogVisible = false;
                this.isEditor = false;
                this.dialongInputValue = "";
                console.log("菜品分类添加失败");
            }
        },
        dialogAddCancel() {
            this.EditorDialogVisible = false;
        },
        //删除
        deleteCategorys(node) {
            this.dialogNode = node;
            this.DeleteDialogVisible = true;
        },
        dialogDelete() {
            let data = {
                delete: 1,
                category_id: this.dialogNode.category_id,
                userid: 1
            };

            editorCategory(data, this.deletCategorysHandler);
        },
        deletCategorysHandler(resp) {
            if (resp.ret === 0) {
                this.getCategory();
                this.DeleteDialogVisible = false;
                console.log("删除成功");
            } else {
                this.DeleteDialogVisible = false;
                console.log("菜品分类删除失败");
            }
        },
        dialogDeleteCancel() {
            this.DeleteDialogVisible = false;
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
                cursor: pointer;
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

.delete-dialog {
    .dialog-title {
        @include wh(540px, 4px);
        background-color: #5A8CFF;
        line-height: 4px;
    }

    .dialog-content {
        padding: 80px 75px 50px;

        .delete-tip {
            margin-bottom: 60px;

            .delete-img {
                display: inline-block;
                @include wh(50px, 50px);
                img {
                    @include wh(50px, 50px);
                }
            }

            .delete-text {
                display: inline-block;
                padding-bottom: 15px;
                padding-left: 20px;
                vertical-align: bottom;
                @include fc(14px, #666);
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
                cursor: pointer;
            }
            .ok-btn {
                margin-right: 60px;
                background-color: #5A8CFF;
                color: #fff;
            }
        }
    }
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
    .el-checkbox-button {
        margin-right: 10px;
    }
    .el-checkbox-button:first-child .el-checkbox-button__inner,
    .el-checkbox-button:last-child .el-checkbox-button__inner {
        border-radius: 0;
    }
    .el-checkbox-button__inner {
        @include wh(60px, 30px);
        padding: 8px 15px;
        border-left: 1px solid #bfcbd9;
    }
    .el-checkbox-button.is-checked .el-checkbox-button__inner {
        border-color: #5A8CFF;
        color: #5A8CFF;
        background-color: #fff;
        box-shadow: none;
    }
    .el-checkbox-button.is-checked .el-checkbox-button__inner::after {
        @include wh(12px, 12px);
        position: absolute;
        content: '';
        background-image: url(./images/select.png);
        background-repeat: no-repeated;
        top: 0;
        right: 0;
    }
}
</style>



