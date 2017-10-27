<template>
	<div class="box">
		<!--头部导航-->
		<div class="header">
			<p>
				<router-link :to="{path:'/shop/table'}">
				<span>餐桌管理</span>
				</router-link> >
				<span class="blue"v-if="$route.query.id==null">添加餐桌</span>
				<span class="blue" v-if="$route.query.id!=null">编辑餐桌信息</span>
			</p>
				
		</div>
		<div class="text">
			基础设置
		</div>
		<div class="set">
			<p class="seat_no"><span>餐桌编号</span><span>{{form.TABLE_NO}}</span></p>
			<div class="qr">
				<span>二维码</span>
				<img src="../image/empty_pic_normal.png" class="qrPicture" />
		</div>
		<div class="form">
			<el-form :model="form" :rules="rules" label-width="135px" ref='Form'>
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
			   <el-form-item label="餐位费结算方式">
			    <el-radio-group v-model="form.PRICE">
			      <el-radio :label="0">无餐位费</el-radio>
			      <el-radio :label="1">按就餐人数</el-radio>
			      <el-radio :label="2">固定餐位费</el-radio>
			      <el-radio :label="3">按订单金额百分比</el-radio>
			    </el-radio-group>
			  </el-form-item>
			   <el-form-item label="餐位费" prop="PRICE" v-if="form.PRICE=='1'">
			    <el-input  v-model="inputValue[form.PRICE]" class="price">
			    	 <el-button slot="append" size="small" >元 / 人</el-button>
			    </el-input>
			     </el-form-item>
			     <el-form-item label="餐位费" prop="PRICE" v-if="form.PRICE=='2'">
			    <el-input  v-model="inputValue[form.PRICE]" class="price">
			    	 <el-button slot="append" size="small" >元 / 桌</el-button>
			    </el-input>
			     </el-form-item>
			       <el-form-item label="餐位费" prop="PRICE" v-if="form.PRICE=='3'">
			    <el-input  v-model="inputValue[form.PRICE]" class="price">
			    	 <el-button slot="append" size="small" >%</el-button>
			    </el-input>
			     </el-form-item>
			  <el-form-item label="最低消费">
			    <el-input  v-model="price" class="price">
			    	 <el-button slot="append" size="small" >元</el-button>
			    </el-input>
			  </el-form-item>
			  </el-form>
			  <div class="btnGroup">
			    <span @click="onSave('Form')" class="spanBtn save_btn">保存</span>
			    <span   class="spanBtn add_btn" v-if="$route.query.id==null" @click="saveAdd('Form')"> 保存并继续添加餐桌</span>
			    <span  class="spanBtn cancel_btn"@click="onConcel">取消</span >
			  </div>
			
		</div>
	</div>
	<!--点击每个餐桌选项的编辑按钮-->
	<select-edit v-if="showSelectEdit"  @my-add="show" :name="selectName" :history="historyText" @my-cancle="show2"></select-edit>
	
	</div>
</template>
<script>
	import { apiMethods } from'../../api';
	import selectEdit from "./selectEdit";
	import { ls } from "@/config/pageStore";
	import { seatPriceType } from "@/config/cfg"
	export default{
		data() {
			 var validateInput = (rule, val, callback) => {
		      if (val === "") {
		        callback(new Error("请输入有效就餐人数"));
		      }else if (val<=0) {
		        callback(new Error("请输入有效就餐人数"));
		      } else {
		        callback();
		      }
		    };
			return{
				historyText:"",//历史标签内容
				historyTag:{},//历史数组
				selectName:"",//点击编辑，显示在编辑标签页面的信息
				name:{},//点击编辑时传递过去的对象，包括id和label
				showTag:false,//是否显示编辑弹框
				inputValue:{},//餐位费支付方式输入框的值
				id:null,//餐桌列表单行中点击标签后，路由传过来的单行的信息;
		        price:"",//最低消费金额
		        TABLE_TYPE:"",//桌型
		        SEAT_TYPE:"",//餐桌类型
		        SEAT_REGION:"",//餐桌区域
		        idInfo:null,//餐桌列表中对应项信息
		        form: {			//餐桌列表中的信息
		          TABLE_NO: '',//餐桌编号
		          SEAT_NAME: '',//餐桌台号（名称）
		          SEAT_TYPE: '',//餐桌类型
		          SEAT_SIZE: '',//可供就餐人数
		          SEAT_REGION: "",//餐桌区域
		          TABLE_TYPE:"",//桌型
		          PRICE:"" //餐位费结算方式
		        },
		        nameArray:[//方便页面显示循环
		        	{label: '餐桌区域', id: 'SEAT_REGION'},
                    {label: '餐桌类型', id: 'SEAT_TYPE'},
                    {label: '桌型', id: 'TABLE_TYPE'},
		        ],
		        rules: {	//表单验证规则
		          SEAT_NAME: [
		            { required: true, message: '请输入餐桌台号（名称）' ,trigger: "click" }
		          ],
		          SEAT_SIZE: [
					{  required: true,validator: validateInput, trigger: "click" }
		          ],
		          SEAT_REGION: [
		          { required: true, message: '请输入餐桌区域' ,trigger: "click" }
		          ],
		          SEAT_TYPE: [
		          {required: true, message: '请输入餐桌类型' ,trigger: "click"}
		          ],
		          PRICE:[
		          {type:"number",required: true, message: '对应的餐位费金额', trigger: "click"}
		          ]
		        },
		      
			}
		},
		components:{selectEdit},
		created() {
			this.initEditeData()
		},
		computed:{
			//控制是否显示编辑框
			showSelectEdit() {
				return this.showTag
			}
		},
//		beforeRouteLeave(to, from, next) {
//			console.log("即不刷新")
//		         // 设置下一个路由的 meta
//		        to.meta.keepAlive = true;  // 让 A 缓存，即不刷新
//		        console.log(this.$route.meta.keepAlive)
//		        next();
//		       
// 		},
		methods:{
//			初始化编辑数据
			initEditeData() {
				//新建获取餐桌编号
				if(!this.$route.query.id){
					apiMethods.getId({
					genid:1,
					type:"seat"
					},(res)=>{
						this.form.TABLE_NO = res.data.id;
					})
				}else{
					this.id=this.$route.query.id;
					apiMethods.getTableEditor({
					get_seat_list:1
					},(resp)=>{
						for(var i in resp.data.seatlist){
			        	if(resp.data.seatlist[i].seat_id===this.id){
			        		this.idInfo = resp.data.seatlist[i]
			        	}
			     	}
					this.TABLE_TYPE=this.form.TABLE_TYPE=this.idInfo.seat_shape||"";
					this.form.TABLE_NO=this.idInfo.seat_id||"";
					this.form.SEAT_NAME=this.idInfo.seat_name||"";
					this.form.SEAT_SIZE=this.idInfo.seat_size||1;
					this.SEAT_REGION=this.form.SEAT_REGION=this.idInfo.seat_region||"";
					this.SEAT_TYPE=this.form.SEAT_TYPE=this.idInfo.seat_type||"";
					this.form.PRICE=this.idInfo.price_type;
					if(this.form.PRICE==seatPriceType.PERCENTAGE){
						this.inputValue[this.form.PRICE]=this.idInfo.price;
					}else{
						this.inputValue[this.form.PRICE]=Number(this.idInfo.price).toFixed(2);
					}
					this.price=this.idInfo.consume_min||0;
					});
				}	
			},
			//点击保存并验证
		    submitForm(formName,fnAfterSave) {
		      this.$refs[formName].validate(valid => {
		        if (valid) {
		         apiMethods.changeTableData({
	      			seat_save:1,
		        	seat_id:this.form.TABLE_NO, //餐桌id
		        	price:this.inputValue[this.form.PRICE],//餐位费
		        	seat_name:this.form.SEAT_NAME,//餐桌台号（名称）
		        	seat_region:this.form.SEAT_REGION,//就餐区域
		        	seat_shape:this.form.TABLE_TYPE,//桌型
		        	seat_size:this.form.SEAT_SIZE,//就餐人数
		        	seat_type:this.form.SEAT_TYPE,//餐桌类型
		        	consume_min:this.price,//最低消费
		        	price_type:this.form.PRICE//餐位费结算方式
	      		},fnAfterSave)
		        } else {
		          console.log("error submit!!");
		          return false;
		        }
		      });
		    },
			//刷新页面
			Refresh() {
				apiMethods.shallowRefresh(this.$route.name)
			},
			//返回列表页
			goTablePage() {
				this.$router.go(-1);
			},
 			//点击保存
			onSave(formName) {
				this.submitForm(formName,this.goTablePage)
			},
			//点击取消
			onConcel() {
				this.initEditeData()
				this.$router.go(-1)
			},
			//点击编辑标签
			handEdit(item) {
				if(this.form[item.id]=="编辑"){
					this.showTag = true;
					this.selectName = item;
						this.historyText = this.$data[item.id];
				}
			},
			//点击保存并添加
			saveAdd(formName) {
				this.submitForm(formName,this.Refresh)
			},
			//编辑标签页面点击确定传过来的数据
			show(data) {
					this.showTag=false
					if(data[0]==""){
						this.form[data[1]]=this.$data[data[1]]
					}else{
						this.$data[data[1]]=data[0];
						this.form[data[1]]=this.$data[data[1]];
					}
						this.historyTag[data[1]]=data[2]
						this.name[data[1]]=data[2]
			},
			//编辑标签页面点击取消传过来的数据
			show2(data) {
					this.showTag=false;	
					this.form[data[0]]=this.$data[data[0]]
					this.historyTag[data[0]]=data[1];
			}
		},
	}
</script>

<style lang="scss" scoped>
@import 'src/styles/mixin.scss';
	.box{
		height: 100%;
	}
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
	
	.el-form-item{
		margin-bottom: 24px;
	}
	.el-input.price{
		width: 190px;
		height: 30px;
	}
	.btnGroup{
		margin-left: 500px;
	}
	.btnGroup .spanBtn{
		color: white;
		width: 160px;
		height: 40px;
		text-align: center;
		line-height: 40px;
		font-size: 14px;
		margin-right: 60px;
		margin-bottom: 50px;
		display: inline-block;
		border-radius: 5px;
	}
	.btnGroup .save_btn{
		background:#4877E7;
		border: 1px solid #4877E7;
	}
	.btnGroup .add_btn{
		margin-right: 40px;
		background:#4877E7;
		border: 1px solid #4877E7;
	}
	.btnGroup .cancel_btn{
		color:#4877E7 ;
		border: 1px solid #4877E7;
	}
	.tagGroupName{
		display: inline-block;
	}
	.tag{
		width: 80px;
		color: #4877E7;
		height: 30px;
		font-size: 13px;
		text-align: center;
		vertical-align: middle;
		margin:0 10px 10px;	
		border-radius: 5px;
		border: 1px solid #4877E7;
		display: inline-block;
	}
	.tagGroup{
		width: 400px;
		list-style: none;
	}
	.tag.selected{
		color: green;
		border: 1px solid green;
	}
</style>
<style lang="scss">
	.el-radio-button .el-radio-button__inner{
		width: 80px;
		height: 33px;
		border: none;
		margin-right: 10px;
		border: 1px solid #4877E7;
	} 
	.el-radio-button:first-child .el-radio-button__inner,
	.el-radio-button:last-child .el-radio-button__inner{
		border-radius: 4px;
	}
	.el-input-group--append .el-input__inner{
		width:150px;
	}
	.el-input-group__append .el-button{
		width:55px;
	}
	
</style>