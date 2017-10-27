<template>
	<div id="staff-tree">
		<div class="tree-title">部门列表</div>
	</div>
</template>

<script>
</script>

<style lang="scss"  scoped>
@import 'src/styles/mixin.scss';
.tree-title {
    @include wh(100%, 40px);
    @include fc(14px, #666666);
    line-height: 40px;
    background-color: #F6F8FC;
    padding-left: 14px;
    margin-bottom: 40px;
}
</style>