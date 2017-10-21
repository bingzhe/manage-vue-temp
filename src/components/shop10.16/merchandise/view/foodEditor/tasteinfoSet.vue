<template>
    <div id="taste-set">
        <h3 class="title">
            <span>口味设置</span>
            <span class="tip">（注：可自定义新属性，只能同时选择两个口味设置属性在前端显示，每个口味前端界面最多显示四个标签）</span>
        </h3>

        <div class="content">
            <div class="taste clearfix" v-for="(item,index) in specList" :key="index">
                <div class="item-title food-left left">
                    <el-checkbox v-model="item.checked"></el-checkbox>
                    <span>{{item.title}}</span>
                </div>

                <ul class="item-content food-right left">
                    <li class="left" v-for="(items, indexs) in item.list" :key="items.index">{{ items.title }}</li>
                    <li class="editor left">编辑</li>
                </ul>
            </div>

            <div class="add-btn">
                + 添加属性
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            specList: [{
                food_id: "",
                spec_id: "",
                spec_sort: "",
                title: "辣度",
                type: 2,
                list: [{
                    default: 0,
                    id: "505",
                    title: "特辣",
                }, {
                    default: 0,
                    id: "506",
                    title: "微辣",
                }, {
                    default: 0,
                    id: "506",
                    title: "中辣",
                }],
                checked: true,
            }, {
                food_id: "",
                spec_id: "",
                spec_sort: "",
                title: "盐暑",
                type: 2,
                list: [{
                    default: 0,
                    id: "505",
                    title: "少盐",
                }, {
                    default: 0,
                    id: "506",
                    title: "适中",
                }, {
                    default: 0,
                    id: "506",
                    title: "多盐",
                }, {
                    default: 0,
                    id: "506",
                    title: "解暑",
                }],
                checked: true,
            }, {
                food_id: "",
                spec_id: "",
                spec_sort: "",
                title: "口味",
                type: 2,
                list: [{
                    default: 0,
                    id: "505",
                    title: "酸",
                }, {
                    default: 0,
                    id: "506",
                    title: "甜",
                }, {
                    default: 0,
                    id: "506",
                    title: "苦",
                }],
                checked: false,
            }]
        };
    }
};
</script>

<style lang="scss" scoped>
@import 'src/styles/mixin.scss';

#taste-set {

    .title {
        @include fc(14px, #666666);
        background-color: #F6F8FC;
        height: 40px;
        line-height: 40px;
        padding-left: 14px;

        .tip {
            @include fc(12px, #9B9B9B);
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

.add-btn {
    @include fc(14px, #4877E7);
    @include wh(150px, 34px);
    border: 1px solid #4877E7;
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