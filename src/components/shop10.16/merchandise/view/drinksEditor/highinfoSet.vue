<template>
    <div id="high-set">
        <h3 class="title">高级设置</h3>
        <div class="content">

            <div class="sale-way clearfix">
                <div class="way-title food-left left">
                    <span>销售方式</span>
                </div>

                <div class="way-content food-right left clearfix">
                    <div class="left" v-for="(item, index) in saleWay" :key="item.value">
                        <el-checkbox v-model="item.checked"></el-checkbox>
                        <span class="text">{{ item.label }}</span>
                    </div>
                </div>
            </div>

            <div class="sale-num clearfix">
                <div class="num-title food-left left">
                    <span>起售数量</span>
                </div>
                <div class="num-content food-right left">
                    <el-input v-model="saleNum" type="number"></el-input>
                </div>
            </div>

            <div class="sale-offway">
                <div class="offway-title food-left left">
                    <span>定时上架方式</span>
                </div>
                <div class="offway-content food-right left">
                    <div class="btn left active">不设置</div>
                    <div class="btn left">自定义</div>
                    <div class="btn left">按周期</div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            saleWay: [{
                label: "预定在店吃",
                value: 1,
                checked: true,
            }, {
                label: "非预定在店吃",
                value: 2,
                checked: true,
            }, {
                label: "预定自提",
                value: 3,
                checked: true,
            }, {
                label: "外卖",
                value: 4,
                checked: true,
            }, {
                label: "打包外带",
                value: 5,
                checked: true,
            }],
            saleWaySelect: 1,
            saleNum: 1, //起售数量
        };
    }
};
</script>

<style lang="scss" scoped>
@import 'src/styles/mixin.scss';

#high-set {

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
        padding-top: 48px;
        padding-bottom: 40px;
    }
}

.sale-way {
    .way-content {
        span.text {
            padding: 0 40px 0 10px;
        }
    }
}

.sale-num {
    height: 34px;
    line-height: 34px;
    margin-top: 22px;
    margin-bottom: 20px;
}

.sale-offway {
    height: 30px;
    line-height: 30px;

    .offway-content {
        .btn {
            @include wh(80px, 30px);
            line-height: 30px;
            border-radius: 2px;
            margin-right: 10px;
            text-align: center;
            border: 1px solid #d9d9d9;
            cursor: pointer;
        }

        .btn.active{
            color: #fff;
            background-color: #4877E7;
            border: 1px solid #4877E7;
        }
    }
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

#high-set {
    .el-input {
        width: inherit
    }
    .el-input__inner {
        @include wh(180px, 34px);
        border-radius: 0;
    }
    .el-input__inner:hover {
        border: 1px solid #bfcbd9;
    }
    .el-input__inner:focus {
        border: 1px solid #bfcbd9;
    }
}
</style>
