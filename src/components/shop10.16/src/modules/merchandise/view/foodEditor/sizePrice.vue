<template>
    <div id="size-price-tem">
        <div class="noSize clearfix">
            <div class="title left">例牌</div>
            <div class="price-content left">
                <el-checkbox v-model="checked"></el-checkbox>
                <el-input type="" placeholder="请输入内容" v-model="input3">
                    <template slot="prepend">原价</template>
                    <template slot="append">元</template>
                </el-input>
                <el-checkbox v-model="checked"></el-checkbox>
                <el-input type="" placeholder="请输入内容" v-model="input4">
                    <template slot="prepend">原价</template>
                    <template slot="append">元</template>
                </el-input>
                <el-checkbox v-model="checked"></el-checkbox>
                <el-input type="" placeholder="请输入内容" v-model="input5">
                    <template slot="prepend">原价</template>
                    <template slot="append">元</template>
                </el-input>
                <el-checkbox v-model="checked"></el-checkbox>
                <el-input type="" placeholder="请输入内容" v-model="input6">
                    <template slot="prepend">原价</template>
                    <template slot="append">元</template>
                </el-input>
            </div>

        </div>
        <div class="hasSize">

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            checked: true,
            input3: "",
            input4: "",
            input5: "",
            input6: "",
            food_price: {
                discount_price: "",
                festival_price: "",
                original_price: "",
                type: 1,
                vip_price: "",
            }
        };
        
    }
};

</script>

<style lang="scss" scoped>
@import 'src/styles/mixin.scss';
.noSize {
    height: 30px;
    line-height: 30px;
    margin-top: 10px;
    .title {
        margin-right: 60px;
    }
}
</style>

<style lang="scss">
#size-price-tem {
    .el-input-group__prepend {
        width: 50px;
    }
    .el-input-group__append {
        width: 15px;
    }
    .el-input__inner {
        height: 30px;
    }
    .el-input {
        width: 150px;
    }
}
</style>




