<template>
	<div>
		<div class="mask">
		</div>
		<div class="messageBox">
			<div class="heade">添加{{name.label}} </div>
			<div class="main">
				<span class="red delete_btn" type="text" size="small" @click="showDeleteSelect" v-if="showDelete">
					删除
				</span>
				<div class="add">
					<ul class="tagGroup">
						<li class="tag" @click="selectTag(tag,index,$event.target)" v-for="(tag,index) in addTags" :class="[{selected:history==tag&&showDelete},{selecteDelete:!showDelete},'']" v-if="tag!=null&&tag!=''">{{tag}}</li>

					</ul>
				</div>
				<div class="inputContainer">
					<el-form :model="ruleForm" :rules="rules" ref="Form" class="left" v-if="showDelete">
						<el-form-item prop="inputValue">
							<el-input placeholder="请输入标签名称，字数不超过4个字" v-model="ruleForm.inputValue"></el-input>
						</el-form-item>
					</el-form>
					<div class="add-btn left" @click="addTag('Form')" v-if="showDelete">添加</div>
				</div>
				<p v-if="cantAddTip" class="tips">已超过标签上限，请先删除再添加!</p>
				<p v-if="cantDeleTip" class="tips">该标签在前面餐桌列表中有显示,不能删除!</p>
				<div class="btn" v-if="showDelete">
					<el-button class="confirm_btn " @click="confirm">确定</el-button>
					<el-button @click="cancel">取消</el-button>
				</div>
				<div class="deleteBtn" v-else>
					<el-button class="confirm_btn " @click="confirmDelete">确定</el-button>
					<el-button @click="cancelDelete">取消</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { apiMethods } from '../../api';
	import { ls } from "@/config/pageStore";
	export default {
		props: ["name", "history"],
		data() {
			var validateInput = (rule, val, callback) => {
				if(val === "") {
					callback(new Error("标签不能为空"));
				} else if(this.addTags.indexOf(val) !== -1) {
					callback(new Error("标签已经存在"));
				} else if(val.length > 4) {
					callback(new Error("标签名称不能超过4个字符"));
			    }else {
					callback();
				}
			};
			return {
				addTags: [], //添加的标签集合
				deleteTags: [], //删除之后的标签集合
				value: "", //传递选中的标签
				beforDeleteTags: [],
				hisTagObj: {}, //餐桌列表显示的对应分类标签
				cantAddTip: false, //不能添加提示
				cantDeleTip: false, //不能删除提示
				showDelete: true, //显示删除文字按钮
				ruleForm: {
					inputValue: '' //输入框
				},
				rules: {
					inputValue: [{
						validator: validateInput,
						trigger: "click"
					}]
				}
			}
		},
		created() {
				this.initTagList()
		},
		methods: {
			//初始化历史标签
			initTagList() {
				var getStringName = apiMethods.getBackstageName(this.name.id);
				apiMethods.getTagArr({
					get_shop_label: 1,
					label_name: getStringName
				}, (resp) => {
					if(resp.data[getStringName] == undefined) {
						this.addTags = [];
					} else {
						var obj = ls.getItem("hisTagObj")
						if(!obj[this.name.id]) {
							this.hisTagObj = obj[this.name.id.toLowerCase()]
						} else {
							this.hisTagObj = obj[this.name.id]
						}
						var dataArr = apiMethods.objTansToArr(resp.data[getStringName]);
						this.addTags = apiMethods.getUniqueType(this.hisTagObj,dataArr)
					}
				})	
			},
			//添加标签并验证
			submitForm(formName) {
				this.$refs[formName].validate(valid => {
					if(valid) {
						this.addTags.push(this.ruleForm.inputValue);
						this.ruleForm.inputValue = "";
					} else {
						console.log("error submit!!");
						return false;
					}
				});
			},
			//添加标签
			addTag(formName) {
				if(this.addTags.length >= 30) {
					this.cantAddTip = true;
				} else {
					this.submitForm(formName)
				}

			},
			//单选（添加之后的单选，删除时的单选）
			selectTag(tag, index) {
				if(this.showDelete == true) {
					$(".tag").eq(index).addClass("selected").siblings().removeClass("selected")
					this.value = tag;
				} else {
					this.value = "";
					if(this.hisTagObj.indexOf(tag) == -1) {
						this.deleteTags = this.deleteArrayItem(this.addTags, tag);
						this.cantDeleTip = false;
					} else {
						this.cantDeleTip = true;
					}
				}
			},
			//点击确定
			confirm() {
				if(this.value == "") {
					this.value = this.history
				}
				let stringName = apiMethods.getBackstageName(this.name.id);
				var data = {
					save_label: 1,
					label_name: stringName
				}
				data[stringName] = JSON.stringify(this.addTags);
				apiMethods.editTagArr(data, (resp) => {
					console.log(data)
				})
				this.$emit('my-add', [this.value, this.name.id, this.addTags]);
			},
			//点击取消
			cancel() {
				this.$emit('my-cancle', [this.name.id, this.addTags]);
			},
			//得到删除之后的数组
			deleteArrayItem(arr = [], item) {
				arr.forEach((items, index) => {
					if(items === item) {
						arr.splice(index, 1);
						return;
					}
				});
				return arr;
			},
			//点击删除
			showDeleteSelect() {
				this.beforDeleteTags = this.addTags.slice();
				this.deleteTags = this.addTags.slice()
				$(".tag").removeClass("selected").addClass("selecteDelete");
				this.showDelete = false;
			},
			//点击删除之后恢复原来状态
			afterShowDelete() {
				$(".tag").removeClass("selecteDelete");
				for(var i in $(".tag")) {
					if($(".tag")[i].innerText == this.history) {
						$(".tag")[i].classList.add("selected")
					}
				}
				this.cantDeleTip = false;
				this.cantAddTip = false;
			},
			//确定删除
			confirmDelete() {
				this.afterShowDelete();
				this.addTags = this.deleteTags
				this.showDelete = true;
			},
			//取消删除
			cancelDelete() {
				this.afterShowDelete();
				this.addTags = this.beforDeleteTags
				this.showDelete = true;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import 'src/styles/mixin.scss';
	.mask {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 150%;
		z-index: 9990;
		background: rgba(0, 0, 0, 0.5);
	}
	
	.messageBox {
		width: 540px;
		min-height: 450px;
		position: absolute;
		top:250px;
		left: 690px;
		background: #FFFFFF;
		z-index: 9991;
	}
	
	.heade {
		font-family: MicrosoftYaHei;
		font-size: 16px;
		color: #FFFFFF;
		letter-spacing: 0.57px;
		text-align: center;
		background: #5A8CFF;
		height: 40px;
		line-height: 40px;
	}
	
	.main {
		padding-left: 80px;
		font-size: 14px;
	}
	
	.add {
		width: 100%;
		margin: 40px 0 20px;
	}
	
	.el-button {
		width: 60px;
		height: 34px;
		color: #4877E7;
		border: 1px solid #4877E7;
	}
	
	.el-button:hover {
		color: #4877E7;
		border: 1px solid #4877E7;
	}
	
	.btn .el-button,
	.deleteBtn .el-button {
		color: #4877E7;
		width: 160px;
		height: 40px;
	}
	
	.el-button.confirm_btn {
		background: #4877E7;
		color: #FFFFFF;
		margin-right: 60px;
	}
	
	.btn {
		margin-top: 20px;
	}
	
	.deleteBtn {
		margin-top: 70px;
	}
	
	.tag {
		position: relative;
		padding: 5px 10px 5px;
		color: #4877E7;
		font-size: 13px;
		text-align: center;
		vertical-align: middle;
		margin: 0 5px 10px;
		border-radius: 5px;
		border: 1px solid #4877E7;
		display: inline-block;
	}
	
	.tagGroup {
		width: 400px;
		list-style: none;
	}
	
	.tag.selected:after {
		content: "";
		width: 12px;
		height: 12px;
		background: url(img/select.png) no-repeat;
		z-index: 9992;
		position: absolute;
		top: 0;
		right: 0;
	}
	
	.red {
		font-size: 14px;
		color: #E7487E;
	}
	
	.inputContainer {
		.add-btn {
			@include wh(60px, 34px);
			@include fc(14px, #5a8cff);
			line-height: 34px;
			text-align: center;
			border: 1px solid #5a8cff;
			margin-left: 20px;
			margin-right: 10px;
			cursor: pointer;
			display: inline-block;
		}
		
	}
	
	.left {
		float: left;
	}
	
	.delete_btn {
		position: absolute;
		top: 50px;
		left: 450px;
	}
	
	.deleteSelect {
		position: absolute;
		top: 50px;
		left: 440px;
	}
	
	.blue {
		font-size: 14px;
		color: #4877E7;
		margin-right: 10px;
	}
	
	.selecteDelete {
		border: 1px solid #E7487E !important;
		color: #E7487E !important;
	}
	
	.tips {
		color: red;
		font-size: 12px;
	}
</style>
<style lang="scss">
	.el-input {
		width: 300px;
		height: 34px;
	}
</style>