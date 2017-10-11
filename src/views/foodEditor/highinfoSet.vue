<template>
    <div id="high-set">
        <h3 class="title">高级设置</h3>
    </div>
</template>

<script>
export default {

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
}
</style> 