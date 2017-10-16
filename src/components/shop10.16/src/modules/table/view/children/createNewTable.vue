<template>
	<div>
		<!--头部导航-->
		<div class="header">
			<p><span>店铺管理</span>><span>餐桌管理</span>><span class="blue">新建餐桌设置</span></p>
		</div>
		<div class="text">
			基础设置
		</div>
		<div class="set">
			<p class="seat_no"><span>餐桌编号</span><span>{{form.TABLE_NO}}</span></p>
			<div class="qr">
				<span>二维码</span>
				<img src="../image/empty_pic_normal.png" class="qrPicture" />
				<!--<img :src="form.IMG_URL" class="qrPicture"/>-->
		</div>
		<div class="form">
			<el-form :model="form" :rules="rules" label-width="135px">
			<el-form-item label="餐桌台号（名称）" prop="SEAT_NAME">
			    <el-input v-model="form.SEAT_NAME"></el-input>
			</el-form-item>
			 <el-form-item label="可供就餐人数" prop="SEAT_SIZE">
			    <el-input  v-model="form.SEAT_SIZE"></el-input>
			  </el-form-item>
			  <div v-for="(item,index) in nameArray" class="select">
			  	
			   <el-form-item :label="item.label" :prop="item.id">
			 	 <el-radio-group v-model="form[item.id]" fill="#4877E7"  @change="handEdit(item)">
				    <el-radio-button :label="$data[item.id]" v-if="$data[item.id]"></el-radio-button>
				    <el-radio-button label="编辑" class="add" ref="item.id"></el-radio-button>
				    
			  	</el-radio-group>
			   </el-form-item>
			   </div>
			   <el-form-item label="餐位费结算方式" prop="PRICE">
			    <el-radio-group v-model="form.PRICE">
			      <el-radio label="0">无餐位费</el-radio>
			      <el-radio label="1">按就餐人数</el-radio>
			      <el-radio label="2">固定餐位费</el-radio>
			      <el-radio label="3">按订单金额百分比</el-radio>
			    </el-radio-group>
			  </el-form-item>
			   <el-form-item label="餐位费" prop="PRICE" v-if="form.PRICE!=='0'&&form.PRICE!==''">
			    <el-input  v-model="form.PRICE" class="price">
			    	 <el-button slot="append" size="small" >元</el-button>
			    </el-input>
			  </el-form-item>
			  <el-form-item label="最低消费">
			    <el-input  v-model="price" class="price">
			    	 <el-button slot="append" size="small" >元</el-button>
			    </el-input>
			  </el-form-item>
			  <el-form-item class="btnGroup">
			    <el-button type="primary" @click="onSave" class="save_btn">保存</el-button>
			    <el-button type="primary" class="add_btn" v-if="$route.query.id==null"@click="saveAdd"> 保存并继续添加餐桌</el-button>
			    <el-button class="cancel_btn"@click="onConcel">取消</el-button>
			  </el-form-item>
			</el-form>
		</div>
	</div>
	<!--点击每个餐桌选项的编辑按钮-->
	<select-edit v-if="showSelectEdit"  @my-add="show" :name="selectName" :history="historyText" @my-cancle="show2"></select-edit>
	</div>
</template>
<script>
	import { apiMethods } from'../../api';
	import selectEdit from "./selectEdit"
	export default{
		data() {
			return{
				historyText:"",
				selectName:"",
				showTag:false,
				id:null,
		        price:10.5,
		        TABLE_TYPE:"",
		        SEAT_TYPE:"",
		        SEAT_REGION:"",
		       	SEAT_FEE:"",
		        form: {
		          TABLE_NO: '',
		          SEAT_NAME: '',
		          SEAT_TYPE: '',
		          SEAT_SIZE: '',
		          SEAT_REGION: "",
		          TABLE_TYPE:"",
		          PRICE:""
		        },
		        nameArray:[
		        	{label: '餐桌区域', id: 'SEAT_REGION'},
                    {label: '餐桌类型', id: 'SEAT_TYPE'},
                    {label: '桌型', id: 'TABLE_TYPE'},
		        ],
		        rules: {
		          SEAT_NAME: [
		            { required: true, message: '请输入餐桌台号（名称）' }
		          ],
		          SEAT_SIZE: [
		            { required: true, message: '请输入可供就餐人数' },
//		            { type: number, message: '请输入数字' }
		          ],
		          SEAT_REGION: [
		          { required: true, message: '请输入餐桌区域' }
		          ],
		          SEAT_TYPE: [
		          {required: true, message: '请输入餐桌类型'}
		          ],
		        }
					}
		},
		components:{selectEdit},
		created() {
			console.log(1111)
			//新建获取餐桌编号
			
			if(this.$route.query.id!=undefined){
			this.id = this.$route.query.id
			console.log(this.$route.query.id)
			this.TABLE_TYPE=this.form.TABLE_TYPE=this.id.seat_shape||"";
			this.form.TABLE_NO=this.id.seat_id;
			this.form.SEAT_NAME=this.id.seat_name;
			this.form.SEAT_SIZE=this.id.seat_size;
			this.SEAT_FEE=Number(this.id.seat_size*1.5);
			this.SEAT_REGION=this.form.SEAT_REGION=this.id.seat_region||"大厅";
			this.SEAT_TYPE=this.form.SEAT_TYPE=this.id.seat_type||"散座";	
			}else{
				apiMethods.getId({
				genid:1,
				type:"seat"
			},(res)=>{
				this.form.TABLE_NO = res.data.id;
			})
			}
			
			
		},
		computed:{
			showSelectEdit() {
				return this.showTag
			}
		},
		methods:{
			//点击保存
			onSave() {
				console.log(this.form.TABLE_NO)
				apiMethods.changeTableData({
	      			seat_save:1,
		        	seat_id:this.form.TABLE_NO, //餐桌id
		        	price:this.form.PRICE,//餐位费
		        	seat_name:this.form.SEAT_NAME,//餐桌台号（名称）
		        	seat_region:this.form.SEAT_REGION,//就餐区域
		        	seat_shape:this.form.TABLE_TYPE,//桌型
		        	seat_size:this.form.SEAT_SIZE,//就餐人数
		        	seat_type:this.form.SEAT_TYPE,//餐桌类型
		        	consume_min:this.price,//最低消费
		        	price_type:this.form.PRICE//餐位费结算方式
	      		},(resp)=>{
	      			console.log(resp)
	      			this.$router.go(-1)
	      		})
			},
			//点击取消
			onConcel() {
				this.$router.go(-1)
			},
			//点击编辑标签
			handEdit(item) {
				if(this.form[item.id]=="编辑"){
					this.showTag = true;
					this.selectName = item;
					this.historyText = this.$data[item.id]
				}
			},
			//点击保存并添加
			saveAdd() {
				apiMethods.changeTableData({
	      			seat_save:1,
		        	seat_id:this.form.TABLE_NO, //餐桌id
		        	price:this.form.PRICE,//餐位费
		        	seat_name:this.form.SEAT_NAME,//餐桌台号（名称）
		        	seat_region:this.form.SEAT_REGION,//就餐区域
		        	seat_shape:this.form.TABLE_TYPE,//桌型
		        	seat_size:this.form.SEAT_SIZE,//就餐人数
		        	seat_type:this.form.SEAT_TYPE,//餐桌类型
		        	consume_min:this.price,//最低消费
		        	price_type:this.form.PRICE//餐位费结算方式
	      		},(resp)=>{
	      			console.log(resp)
	      			 apiMethods.shallowRefresh(this.$route.name)
	      			
	      		})
			},
			show(data) {
				this.showTag=false
				this.$data[data[1]]=data[0];
				this.form[data[1]]=this.$data[data[1]];
			},
			show2(data) {
				this.showTag=false;	
				this.form[data]=this.$data[data]
			}
		},
			
		
	}
</script>

<style lang="scss" scoped>
@import 'src/styles/mixin.scss';
	.header{
		height: 16px;
		font-family: MicrosoftYaHei;
		font-size: 12px;
		color: #333333;
		letter-spacing: 0.43px;
		margin-bottom: 14px;
	}
	.header span{
		margin: 2px;
	}
	.blue{
		color:#4877E7;
	}
	.text{
		height: 40px;
		font-size: 14px;
		color: #666666;
		letter-spacing: 0.5px;
		background: #F6F8FC;
		padding: 14px;
	}
	.set{
		background: #FFFFFF;
		font-size: 14px;
		color: #666666;
		position: relative;

	}
	.seat_no{
		padding:48px 168px 27px;
		font-size: 14px;
		color: #000000;
		letter-spacing: 0.5px;
	}
	.qr{
		padding-left: 175px;
		margin-bottom: 20px;
	}
	.set span{
		margin-right: 14px;
	}
	.qrPicture{
		position: absolute;
		top: 98px;
		left: 240px;
		width: 100px;
		height: 100px;
	}
	.form{
		margin: 100px 104px;
	}
	.el-input{
		width:280px;
		height: 34px;
	}
	.el-radio-button{
		/*width: 90px;*/
		margin-right: 10px;
		background: #4877E7;
		border: 1px solid #4877E7;
		/*border-radius: 10px;*/
	}
	
	.add.el-radio-button__inner {
		background: #4877E7;
	}
	
	
	.add .el-radio-button__inner{
		color: #4877E7;
		border:none
	}
	.el-radio-button__inner:hover{
		color:#4877E7;
	}
	.el-form-item{
		margin-bottom: 24px;
	}
	.el-input.price{
		width: 190px;
		height: 30px;
	}
	
	.btnGroup .el-button{
		width: 160px;
		height: 40px;
		margin-bottom: 50px;
	}
	.save_btn{
		margin-left: 350px;
		margin-right: 40px;
		background:#4877E7;
		border: 1px solid #4877E7;
	}
	.add_btn{
		margin-right: 40px;
		background:#4877E7;
		border: 1px solid #4877E7;
	}
</style>