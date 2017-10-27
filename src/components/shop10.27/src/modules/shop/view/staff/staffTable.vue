<template>
	<div id="staff-table">
		<div class="table-title">详情列表</div>
		<div class="search-content clearfix">
			<div class="lf left">
				<el-form :inline="true" :model="form" class="demo-form-inline">
					<el-form-item label="姓名">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="手机号码">
						<el-input v-model="form.telephone"></el-input>
					</el-form-item>
					<el-form-item>
						<button  class="crt"  @click="onSearch">搜索</button>
					</el-form-item>
				</el-form>
			</div>
			<div class="rf right">
				<button class="crt">创建</button>
				<button class="del">删除</button>
			</div>
		</div>
	</div>
</template>

<script>
export default{
data() {
      return {
        form: {
          name: '',
          telephone: ''
        }
      }
    },
    methods:{
    	onSearch(){
    		alert(1);
    	}
    }
}
</script>

<style lang="scss" scoped>
	@import 'src/styles/mixin.scss';
	#staff-table {
		.table-title {
			@include wh(100%, 40px);
			@include fc(14px, #666666);
			line-height: 40px;
			background-color: #F6F8FC;
			padding-left: 14px;
		}
		.lf{
			padding: 20px 0 0 14px;
		}
		.rf{
		padding-top:20px;
		
		}
		.crt{
			@include wh(100px, 34px);
            border: 1px solid #4877E7;
            color: #4877E7;
            border-radius: 0;
            font-size: 14px;
            background: #fff;
		}
		.del{
		@include wh(100px, 34px);
            border: 1px solid #E7487E;
            border-radius: 0;
            font-size: 14px;
            background: #fff;
			color:#E7487E;
			margin:0 14px 0 20px;
		}
	}
</style>
<style lang="scss">
@import 'src/styles/mixin.scss';
#staff-table{
  .search-content{
  	font-size:0;
  	.el-input {
            font-size: 14px;
            width: inherit;

            input {
                @include wh(180px, 34px);
                border-radius: 0;
            }
        }
  	.el-form-item__label{
  	color: #333;}
  }
  .el-form--inline .el-form-item{
  	margin-right: 20px;
  }
}
</style>