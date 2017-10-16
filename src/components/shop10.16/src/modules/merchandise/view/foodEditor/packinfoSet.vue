<template>
    <div id="pack-set">
        <h3 class="title">打包设置</h3>
        <div class="content">

            <div class="pack-name clearfix">
                <div class="name-title food-left left">
                    <span>餐盒</span>
                </div>
                <ul class="name-content food-right left">
                    <li class="left" :class="{active: packNameSelect === item.value}" v-for="(item,index) in packName" :key="item.value" @click="changePackNameSelect(item.value)">{{ item.label }}</li>
                </ul>
            </div>

            <div class="pack-num clearfix">
                <div class="num-title food-left left">
                    <span>所需餐盒数量</span>
                </div>
                <div class="num-content food-right left">
                    <el-select v-model="selectPackNum" placeholder="1">
                        <el-option v-for="item in packNumOptions" :key="item.value" :label="item" :value="item">
                        </el-option>
                    </el-select>
                    <span>个</span>
                </div>
            </div>

            <div class="pack-remark clearfix">
                <div class="remark-title food-left left">
                    <span>备注</span>
                </div>
                <div class="remark-content food-right left">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="输入备注不得超过200个字符" v-model="remarkText">
                    </el-input>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            packName: [{
                label: "餐盒1",
                value: 1
            }, {
                label: "餐盒2",
                value: 2
            }, {
                label: "餐盒3",
                value: 3
            }],
            packNameSelect: 1,
            packNumOptions: [0, 1, 2, 3],
            selectPackNum: "",
            remarkText: "",
        };
    },
    methods: {
        changePackNameSelect(index) {
            this.packNameSelect = index;
        }
    }
};
</script>

<style lang="scss" scoped>
@import 'src/styles/mixin.scss';


#pack-set {

    .title {
        @include fc(14px, #666666);
        background-color: #F6F8FC;
        height: 40px;
        line-height: 40px;
        padding-left: 14px;
    }

    .content {
        @include fc(14px, #000);
        background-color: #fff;
        padding: 40px 0;
    }
}

.pack-name {
    height: 30px;
    line-height: 30px;
    margin-bottom: 22px;
    .name-content {
        li {
            @include wh(80px, 30px);
            border: 1px solid #D8D8D8;
            border-radius: 2px;
            margin-right: 10px;
            line-height: 30px;
            text-align: center;
            cursor: pointer;
        }
        li.active {
            border-color: #4877e7;
            color: #fff;
            background-color: #4877e7;
        }
    }
}

.pack-num {
    height: 30px;
    line-height: 30px;
    margin-bottom: 20px;
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

<style lang="scss">
@import 'src/styles/mixin.scss';


#pack-set {
    .pack-remark .el-textarea{
        textarea{
            width: 400px !important;
            height: 150px !important;
        }
    }
}
</style>