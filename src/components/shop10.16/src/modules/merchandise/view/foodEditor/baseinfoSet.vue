<template>
    <div id="base-set">
        <h3 class="title">基础设置</h3>

        <div class="content">

            <!-- 编号 -->
            <div class="food-sn clearfix">
                <div class="sn-title food-left left">
                    <span>商品编号</span>
                </div>
                <div class="sn-content food-right left">
                    <span>{{ foodinfo.food_sn }}</span>
                </div>
            </div>

            <!-- 二维码 -->
            <div class="food-code clearfix">
                <div class="code-title food-left left">
                    <span>二维码</span>
                </div>
                <div class="code-content food-right left">
                    <img src="../images/empty.png" alt="默认">
                </div>
            </div>

            <!-- name -->
            <div class="food-name clearfix">
                <div class="name-title food-left left">
                    <span>菜品名称</span>
                </div>
                <div class="name-content food-right left">
                    <el-input v-model="foodinfo.food_name" placeholder="请输入菜品名"></el-input>
                </div>
            </div>

            <!-- category -->
            <div class="food-category clearfix">
                <div class="category-title food-left left">商品分类</div>
                <!-- <<<<<<<<<<<<<<<<<< -->
                <div class="category-content food-right left">
                    <!-- <el-select v-model="caregoryFirValue" placeholder="请选择">
                                                                                                       <el-option v-for="item in caregoryFirOption" :key="item.value" :label="item.label" :value="item.value">
                                                                                                            </el-option>
                                                                                                        </el-select> -->
                </div>
            </div>

            <!-- 计量单位 -->
            <div class="food-unit clearfix">
                <div class="unit-title food-left left">规格</div>
                <ul class="unit-content food-right left clearfix">
                    <li class="left" :class="{active: unitSelect === index}" v-for="(item,index) in unitData" :key="index" @click="changeUnit(index)">{{ item }}</li>
                </ul>
            </div>

            <!-- 特色 -->
            <div class="food-feature clearfix">
                <div class="feature-title food-left left">特色</div>
                <ul class="feature-content food-right left clearfix">
                    <li class="left" v-for="(item, index) in featureData" :key="item.index">{{ item }}</li>
                    <li class="editor left" @click="showFeatureDialog">编辑</li>
                </ul>
            </div>
            <div class="feature-tip">注：最多可设置10个特色标签，且标签最多输入4个字符</div>
            <!-- 特色编辑弹窗 -->
            <el-dialog class="feature-dialog" :visible.sync="featureDialogVisible" :show-close="false" size="">
                <div class="dialog-title" slot="title">添加特色图标</div>
                <div class="dialog-content">
                    <ul class="selet-feature clearfix">
                        <li class="left" v-for="(item, index) in featureData" :key="item.index">{{ item }}</li>
                    </ul>
                    <div class="dialog-add clearfix">
                        <el-input class="left" v-model="dialongInputValue" placeholder="请输入内容"></el-input>
                        <div class="add-btn left">添加</div>
                    </div>
                    <div class="confirm-btn clearfix">
                        <div class="ok left">确定</div>
                        <div class="cancel left">取消</div>
                    </div>
                    <div class="history">
                        <div class="history-title">历史记录</div>
                        <ul class="select-history clearfix">
                            <li class="left" v-for="(item, index) in featureHistory" :key="item.index">{{ item }}</li>
                        </ul>
                    </div>
                </div>
            </el-dialog>

            <!-- 是否有分量 -->
            <div class="food-size clearfix">
                <div class="size-title food-left left">是否有分量大小分类</div>
                <ul class="size-content food-right left">
                    <li class="left" :class="{active: sizeSelect === item.value}" v-for="(item, index) in sizeData" :key="item.value" @click="changeSizeSelect(item.value)">{{ item.label }}</li>
                </ul>
            </div>

            <!-- 价格 -->
            <div class="food-price clearfix">
                <div class="price-title food-left left">价格</div>
                <div class="price-content food-right left">
                    <div class="tip">
                        （只能同时选择两个价格在前端显示，且显示顺序规则是原价、促销价、会员价。1.原价：菜品的原始定价，适用于普通用户；2.促销价：菜品促销时使用的价格，适用于普通用户；3.会员价：为会员定制的价格，适用于所有会员；4.节日价：为特定假日制定的价格，适用于特定客户。
                    </div>
                    <size-price></size-price>
                </div>
            </div>

            <!-- 图片 -->
            <div class="food-picture clearfix">
                <div class="picture-title food-left left">图片</div>
                <div class="picture-content food-right left"></div>
            </div>
        </div>
    </div>
</template>

<script>
import SizePrice from './sizePrice';
import { Util } from '@/config/util';

export default {
    props: {
        foodinfo: {
            type: Object,
        }
    },
    components: {
        SizePrice
    },
    data() {
        return {
            foodName: "玉米汤排骨汤",
            caregoryFirValue: "",
            caregoryFirOption: [{
                label: "菜品分类",
                value: "1"
            }, {
                label: "酒水分类",
                value: "2",
            }, {
                label: "配件",
            }],
            unitData: ["个", "份", "碗", "盘", "盒", "只", "斤", "打"],
            unitSelect: 0,
            featureData: ["少盐", "微酸", "解暑", "微酸", "微辣", "微苦"],  //特色
            featureHistory: ["少盐", "微酸", "解暑", "微酸", "微辣", "微苦", "酸", "甜", "苦", "辣啦啦啦啦"], //特色历史记录
            featureDialogVisible: false,
            dialongInputValue: "",
            isShowFeatureHistory: true,
            sizeData: [{
                label: "是",
                value: 2
            }, {
                label: "否",
                value: 1
            }],
            sizeSelect: 2,
            saleWay: [{
                label: "预定在店吃",
                value: 1
            }, {
                label: "非预定在店吃",
                value: 2
            }, {
                label: "预定自提",
                value: 3
            }, {
                label: "外卖",
                value: 4
            }, {
                label: "打包外带",
                value: 5
            }],
            saleWaySelect: 1
        };
    },
    watch: {
        foodinfo: {
            handler: function(newVal, oldVal) {
                this.initData();
            },
            deep: true
        }
    },
    created() {
        // this.initData();
    },
    mounted() {
        this.initData();
    },
    methods: {
        changeUnit(index) {
            this.unitSelect = index;
        },
        showFeatureDialog() {
            this.featureDialogVisible = true;
        },
        changeSizeSelect(index) {
            this.sizeSelect = index;
        },
        initUnit() {
            let unit = this.foodinfo.food_unit;
            let that = this;

            this.unitData.forEach(function(item, index) {
                if (item === unit) {
                    that.unitSelect = index;
                }
            });
        },
        initData() {
            let unit = this.foodinfo.food_unit;
            let that = this;

            this.unitData.forEach(function(item, index) {
                if (item === unit) {
                    that.unitSelect = index;
                }
            });
        },
        text(val, oldVal) {
            console.log(val);
            console.log(oldVal);
        }
    }
};
</script>

<style lang="scss" scoped>
@import 'src/styles/mixin.scss';

#base-set {

    .content {
        @include fc(14px, #000);
        background-color: #fff;
    }
}

.food-sn {
    height: 94px;
    line-height: 19px;

    div {
        margin-top: 48px;
    }
}

.food-code {

    .code-content {
        img {
            @include wh(100px, 100px);
        }
    }
}

.food-name {
    height: 34px;
    margin-top: 20px;
    margin-bottom: 20px;

    .name-title {
        line-height: 34px;
    }
}

.food-category {
    height: 34px;
    line-height: 34px;
}

.food-unit {
    height: 30px;
    line-height: 30px;
    margin-top: 22px;
    margin-bottom: 24px;

    .unit-content {

        li {
            @include wh(60px, 30px);
            border: 1px solid #d8d8d8;
            border-radius: 2px;
            line-height: 30px;
            text-align: center;
            color: #666;
            margin-right: 10px;
            cursor: pointer;
        }

        li.active {
            border-color: #4877e7;
            color: #fff;
            background-color: #4877e7;
        }
    }
}

.food-feature {
    height: 30px;
    line-height: 30px;
    margin-bottom: 12px;

    .feature-content {

        li {
            @include wh(80px, 30px);
            background: #D8D8D8;
            border-radius: 2px;
            margin-right: 10px;
            line-height: 30px;
            text-align: center;
        }

        li.editor {
            @include wh(60px, 30px);
            border: 1px solid #4877E7;
            border-radius: 2px;
            color: #4877E7;
            background-color: #fff;
            cursor: pointer;
        }
    }
}

.food-size {
    height: 30px;
    line-height: 30px;
    margin-bottom: 22px;

    .size-content {
        li {
            @include wh(60px, 30px);
            line-height: 30px;
            text-align: center;
            border: 1px solid #d9d9d9;
            color: #333;
            border-radius: 2px;
            margin-right: 10px;
            cursor: pointer;
        }
        li.active {
            border-color: #4877e7;
            color: #fff;
            background-color: #4877e7;
        }
    }
}

.food-price {
    padding-bottom: 20px;

    .price-content {
        .tip {
            font-size: 12px;
            color: #9B9B9B;
        }
    }
}

.feature-tip {
    @include fc(12px, #9B9B9B);
    margin-left: 234px;
    margin-bottom: 22px;
}

.feature-dialog {
    .dialog-title {
        @include wh(540px, 40px);
        @include fc(16px, #fff);
        background-color: #5A8CFF;
        text-align: center;
        line-height: 40px;
    }

    .dialog-content {
        padding: 40px 50px 50px 50px;

        ul.selet-feature {
            max-width: 440px;
            margin-bottom: 10px;

            li {
                @include wh(80px, 30px);
                @include fc(14px, #5A8CFF);
                line-height: 30px;
                text-align: center;
                border: 1px solid #5A8CFF;
                margin-right: 10px;
                position: relative;
                margin-bottom: 10px;
            }
            li::after {
                @include wh(12px, 12px);
                position: absolute;
                content: '';
                background-image: url(../images/select.png);
                background-repeat: no-repeated;
                top: 0;
                right: 0;
            }
            li:nth-child(5) {
                margin-right: 0;
            }
            li:last-child {
                margin-right: 0;
            }
        }
    }

    .dialog-add {
        margin-left: 30px;
        min-width: 380px;

        .add-btn {
            @include wh(60px, 34px);
            @include fc(14px, #5A8CFF);
            line-height: 34px;
            text-align: center;
            border: 1px solid #5A8CFF;
            margin-left: 20px;
            cursor: pointer;
        }
    }

    .confirm-btn {
        margin-left: 30px;
        min-width: 380px;
        margin-top: 20px;
        margin-bottom: 40px;

        div {
            @include wh(160px, 40px);
            border-radius: 4px;
            border: 1px solid #5A8CFF;
            color: #5A8CFF;
            line-height: 40px;
            text-align: center;
        }
        .ok {
            margin-right: 60px;
            background-color: #5A8CFF;
            color: #fff;
        }
    }

    .history {
        .history-title {
            margin-bottom: 10px;
        }
        ul.select-history {
            max-width: 440px;
            li {
                @include wh(80px, 30px);
                @include fc(14px, #D8D8D8);
                line-height: 30px;
                text-align: center;
                border: 1px solid #D8D8D8;
                margin-right: 10px;
                margin-bottom: 10px;
            }
            li:nth-child(5) {
                margin-right: 0;
            }
            li:nth-child(10) {
                margin-right: 0;
            }
        }
    }
}

.title {
    @include fc(14px, #666666);
    background-color: #F6F8FC;
    height: 40px;
    line-height: 40px;
    padding-left: 14px;
}

.food-left {
    width: 220px;
    text-align: right;
    opacity: 0.5708;
    margin-right: 14px;
}

.food-right {
    @include fc(14px, #666);
    min-width: 1020px;
    max-width: 1021px;
}

.featureDial {
    @include wh(540px, 493px);
}
</style>

<style lang="scss">
@import 'src/styles/mixin.scss';

#base-set {
    .el-input {
        width: inherit
    }
    .food-name .el-input__inner {
        @include wh(280px, 34px);
        border-radius: 0;
    }
    .el-input__inner:hover {
        border: 1px solid #bfcbd9;
    }
    .el-input__inner:focus {
        border: 1px solid #bfcbd9;
    }
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
