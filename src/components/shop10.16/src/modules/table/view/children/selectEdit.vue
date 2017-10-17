<template>
	<div>
		<div class="mask">
		</div>
		<div class="messageBox">
		<div class="heade">添加{{name.label}} </div>
		<div class="main">
		<div class="add">
			<el-button-group  v-for="(tag,index) in addTags">
			<el-button class="tag" @click="selectTag(tag,index,$event.target)">{{tag}}</el-button>
			</el-button-group>
			<!--</el-radio-group>-->
		</div>  
			<el-input placeholder="请输入标签名称，字数不超过4个字" v-model="inputValue"></el-input>
			<el-button @click="addTag">添加</el-button>
			<div class="btn">
				<el-button class="confirm_btn selected" @click="confirm">确定</el-button>
				<el-button @click="cancel">取消</el-button>
			</div>
		</div>
		</div>
	</div>
</template>

<script>
	import { apiMethods } from'../../api';
	export default{
		props:["name","history"],
		data() {
			return{
				addTags: [],
		        inputValue: '',
		        value:""
			}
		},
		methods:{
			//关闭标签
//			 handleClose(tag) {
//			 	console.log(tag)
////		        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
//		      },
			//点击确定
			confirm() {
				
				this.$emit('my-add',[this.value,this.name.id]);

			},
			cancel() {
				this.$emit('my-cancle',this.name.id);
			},
			addTag() {
				this.value=this.inputValue
				for(var i in this.addTags){
					console.log(this.addTags[i]==this.value)
					if(this.addTags[i]==this.value){
						alert("你已经添加该项咯！")
						return;
					}
				}
				this.addTags.push(this.value);
				this.inputValue=""
				
			},
			selectTag(tag,index,event) {
				$(event).toggleClass("selected")
				this.value = tag;
				localStorage.setItem("tagArr",this.addTags)
			}
		},
		created() {
			if(this.history){
				this.value=this.history
				this.addTags.push(this.value);
			}else{
				this.addTags=localStorage.getItem("tagArr");
				
			}
			
		},
	}
</script>

<style lang="scss" scoped>
@import 'src/styles/mixin.scss';
	.mask {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 180%;
		z-index: 9990;
		background: rgba(0,0,0,0.5);
	}
	.messageBox{
		width:540px ;
		height:264px;
		position: absolute;
		top: 408px;
		left: 690px;
		background: #FFFFFF;
		z-index: 9991;
	}
	.heade{
		font-family: MicrosoftYaHei;
		font-size: 16px;
		color: #FFFFFF;
		letter-spacing: 0.57px;
		text-align: center;
		background: #5A8CFF; 
		height: 40px;
		line-height: 40px;
	}
	.main{
		padding-left:80px;
		font-size: 14px;
	}
	.add{
		margin:40px 0 20px;
	}
	.el-input{
		width: 300px;
		height: 34px;
		margin-right:20px;
	}
	.el-button{
		width: 60px;
		height: 34px;
		color:#4877E7;
		border: 1px solid #4877E7;
	}
	.el-button:hover{
		color:#4877E7;
		border:1px solid #4877E7 ;
	}
	.btn .el-button{
		color: #4877E7;
		width: 160px;
		height: 40px;
		
	}
	.el-button.confirm_btn{
		background:#4877E7;
		color: #FFFFFF;
		margin-right: 60px;
	}
	.btn{
		margin-top: 20px;
	}
	.tag.el-button{
		width: 80px;
		color: #4877E7;
		text-align: center;
		/*height: 30px;*/
		vertical-align: middle;
		margin:0 10px 10px;	
		border-radius: 5px;
		border: 1px solid #4877E7;
	}
	.tag.el-button.selected{
		color: green;
		border: 1px solid green;
	}
</style>