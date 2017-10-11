<template>
    <div id="taste-set">
        <h3 class="title">
            <span>口味设置</span>
            <span class="tip">（注：可自定义新属性，只能同时选择两个口味设置属性在前端显示，每个口味前端界面最多显示四个标签）</span>
        </h3>
    </div>
</template>

<script>
export default {

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

        .tip{
            @include fc(12px, #9B9B9B);
        }
    }
}
</style>