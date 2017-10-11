<template>
    <div id="expend-set">
        <h3 class="title">推广设置</h3>
        <div class="content clearfix">
            <div class="add-btn left">
                + 添加
            </div>
        </div>
    </div>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
@import 'src/styles/mixin.scss';

#expend-set {

    .title {
        @include fc(14px, #666666);
        background-color: #F6F8FC;
        height: 40px;
        line-height: 40px;
        padding-left: 14px;
    }

    .content {
        background-color: #fff;
        padding: 40px 0 50px 234px;

        .add-btn {
            @include fc(14px, #d9d9d9);
            @include wh(60px, 34px);
            border: 1px solid #d9d9d9;
            text-align: center;
            line-height: 34px;
            border-radius: 4px;
            cursor: pointer;
        }
    }
}
</style>