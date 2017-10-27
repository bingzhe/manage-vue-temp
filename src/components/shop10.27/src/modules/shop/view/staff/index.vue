<template>
    <div id="staff">
        <staff-tree class='staff-tree'></staff-tree>
        <staff-table class='staff-table'></staff-table>
    </div>
</template>

<script>
	import StaffTree from './staffTree';
	import StaffTable from './staffTable';
export default{
	components:{
		StaffTree,
		StaffTable
	}
};
</script>

<style lang="scss" scoped>
    @import 'src/styles/mixin.scss';
  #staff{
  	position: relative;
  	@include wh(100%,100%);
  	.staff-tree {
    width: 343px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    background-color: #fff;
}

.staff-table {
    margin-left: 357px;
    background-color: #fff;
}
  }
</style>