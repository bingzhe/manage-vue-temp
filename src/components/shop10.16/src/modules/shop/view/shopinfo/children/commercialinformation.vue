<template>
	<div id="commercial" class="warp">
		<nav class="nvs">
			<el-breadcrumb separator=">">
				<el-breadcrumb-item :to="{ path: '/shop' }">店铺管理</el-breadcrumb-item>
				<el-breadcrumb-item :to="{path:'/shop/shopinfo'}">店铺信息</el-breadcrumb-item>
				<el-breadcrumb-item>编辑工商信息</el-breadcrumb-item>
			</el-breadcrumb>
		</nav>
		<section class="commercialinformation">
			<div class="title">
				编辑工商信息
			</div>
			<div class="info">
				<el-form label-width="155px">
					<el-form-item label="企业名称">
						<el-input v-model='forms.company_name'></el-input>
					</el-form-item>
					<el-form-item label="法人代表">
						<el-input v-model='forms.legal_person'></el-input>
					</el-form-item>
					<el-form-item label="法人手机号">
						<el-input v-model='forms.legal_phone'></el-input>
					</el-form-item>
					<el-form-item label="法人身份证号码">
						<el-input v-model='forms.legal_card'></el-input>
					</el-form-item>
					<el-form-item label="法人身份证照片">
						<div class="main clearfix">
							<div class="frontFace left" v-for='(item,index) in main'>
								<h3 class=" titles">{{item.text}}</h3>
								<div class="photo1 left">
									<img :src='item.imgs' alt="" />
								</div>
								<el-upload class="upload-demo" action="http://www.ob.com:8080/php/shopinfo_save.php" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
									<el-button size="small" type="primary">{{item.upload}}</el-button>
								</el-upload>
							</div>
							<div class="text-warp left">
								<p class="text">注：支持JPG、JPEG、PNG文件格式，每张大小不得大于2M</p>
							</div>
						</div>
					</el-form-item>
					<el-form-item label="营业执照注册号">
						<el-input v-model='forms.business_num'></el-input>
					</el-form-item>
					<el-form-item class='dates' label="营业期限">
						<span class="start"></span><i class="starts">从</i>
						<el-date-picker class='ipt' type="date" v-model='date1'></el-date-picker>
						<span class="start1"></span><i class="starts2">至</i>
						<el-date-picker class='ipt' type="date" v-model='date2'></el-date-picker>
					</el-form-item>
					<el-form-item label="营业执照扫描件">
						<div class="busPic left">
							<img :src="busPic" alt="" />
						</div>
						<div class="picInfo left">
							<el-upload class="upload-demo" action="http://www.ob.com:8080/php/shopinfo_save.php" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
								<el-button size="small" type="primary">上传</el-button>
							</el-upload>
							<div class="text-warp">
								<p class="text top">注：支持JPG、JPEG、PNG文件格式，大小不得大于2M</p>
							</div>
						</div>
					</el-form-item>
					<el-form :inline="true">
						<el-form-item class='citys' label='餐饮服务许可证编号'>
							<el-select v-model="value" placeholder="省份(简称)">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item class='citys cit' label='餐证字'>
							<el-date-picker v-model="value5" align="right" type="year" placeholder="发证年份">
							</el-date-picker>
						</el-form-item>
						<el-form-item class='cityd' label='第'>
							<el-input placeholder='输入行政区域代码及发证顺序编号' v-model='forms.repast_permit_num'></el-input>
						</el-form-item>
						<el-form-item label='号'>

						</el-form-item>
					</el-form>

					<el-form-item label="餐饮服务许可证扫描件">
						<div class="busPic left">

						</div>
						<div class="picInfo left">
							<el-upload class="upload-demo" action="https://baidu.com">
								<el-button size="small" type="primary">上传</el-button>
							</el-upload>
							<div class="text-warp">
								<p class="text top">注：支持JPG、JPEG、PNG文件格式，大小不得大于2M</p>
							</div>
						</div>
					</el-form-item>
					<el-form-item label="确认书扫描件">
						<div class="busPic left">

						</div>
						<div class="picInfo left">
							<el-upload class="upload-demo" action="https://baidu.com">
								<el-button size="small" type="primary">上传</el-button>
							</el-upload>
							<div class="downLoad">
								下载确认书模板
							</div>
							<div class="text-warp">
								<p class="text">注：支持JPG、JPEG、PNG文件格式，大小不得大于2M</p>
							</div>
						</div>
					</el-form-item>
					<el-form-item label="经营范围">
						<el-input v-model='forms.business_scope'></el-input>
					</el-form-item>
					<div class="bottom">
						<button class="blue" @click='onSubmit'>提交审核</button>
						<button class="default" @click='goBack'>关闭</button>
					</div>
				</el-form>
			</div>
		</section>
	</div>
</template>

<script>
	import { saveShopinfo } from '../../../api';
	import { getShopinfo } from '../../../api';
	export default {
		data() {
			return {
				options: [{
					value: '京'
				}, {
					value: '津'
				}, {
					value: '渝'
				}, {
					value: '沪'
				}, {
					value: '冀'
				},{
					value:'晋'
				},
				{
					value:'辽'
				},
				{
					value:'吉'
				},{
					
				},{
					value:'黑'
				},{
					value:'苏'
				},{
					value:'浙'
				},{
					value:'皖'
				},{
					value:'闽'
				},{
					value:'赣'
				},{
					value:'鲁'
				},{
					value:'豫'
				},{
					value:'鄂'
				},{
					value:'湘'
				},{
					value:'粤'
				},{
					value:'琼'
				},{
					value:'川'
				},{
					value:'贵'
				},{
					value:'云'
				},{
					value:'陕'
				},{
					value:'甘'
				},{
					value:'青'
				},{
					value:'内蒙古'
				},{
					value:'桂'
				},{
					value:'宁'
				},{
					value:'新'
				},{
					value:'藏'
				},{
					value:'港'
				},{
					value:'澳'
				}
				],
				value: '',
				date1: '',
				date2: '',
				value5:'',
				forms: {
					company_name: '',
					legal_person: '',
					legal_phone: '',
					legal_card: '',
					business_num: '',
					repast_permit_identity: '',
					repast_permit_year: '',
					repast_permit_num: '',
					business_scope: ''
				},
				shopsbusiness: {},
				main: [{
						text: '正面',
						upload: '上传',
						imgs: ''
					},
					{
						text: '反面',
						upload: '上传',
						imgs: ''
					}
				],
				busPic: '',
				dates: [],
				years:''

			};
		},
		created() {
			let _this = this;
			getShopinfo({
				userid: 1, //临时数据
				get_shop_business: 1,
			}, function(resp) {
				_this.shopsbusiness = resp.data.shopsbusiness;
				_this.forms.company_name = _this.shopsbusiness.company_name;
				_this.forms.legal_person = _this.shopsbusiness.legal_person;
				_this.forms.legal_phone = _this.shopsbusiness.legal_phone;
				_this.forms.legal_card = _this.shopsbusiness.legal_card;
				_this.forms.business_num = _this.shopsbusiness.business_num;
				_this.forms.business_scope = _this.shopsbusiness.business_scope;
				_this.value5 = new Date(String(_this.shopsbusiness.repast_permit_year)) ;
				_this.value = _this.shopsbusiness.repast_permit_identity;
				_this.forms.repast_permit_num = _this.shopsbusiness.repast_permit_num;
				let time1 = _this.shopsbusiness.business_date.slice(1, length - 1);
				let arr = time1.split(',');
				let time2 = arr[0];
				let stime = new Date();
				stime.setTime(time2 * 1000);
				_this.date1 = stime.toString();
				let time3 = arr[1];
				let etime = new Date();
				etime.setTime(time3 * 1000);
				_this.date2 = etime.toString();
			});
		},
		methods: {
			handleAvatarSuccess(res, file) {
				this.main[0].imgs = URL.createObjectURL(file.raw);
				this.main[1].imgs = URL.createObjectURL(file.raw);
				this.busPic = URL.createObjectURL(file.raw);
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg' || 'image/png' || 'image/jpg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if(!isJPG) {
					this.$message.error('上传头像图片必须是 JPG,JPEG,PNG 格式!');
				}
				if(!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			onSubmit() {
				let t = new Date(this.date1);
				let startTime = t.getFullYear() + '-' + (t.getMonth() + 1) + '-' + t.getDate();
				let statime = startTime;
				let sta1 = Date.parse(new Date(statime));
				sta1 = sta1 / 1000;
				let t2 = new Date(this.date2);
				let endTime = t2.getFullYear() + '-' + (t2.getMonth() + 1) + '-' + t2.getDate();
				let entime = endTime;
				let sta2 = Date.parse(new Date(entime));
				sta2 = sta2 / 1000;
				this.dates.push(sta1, sta2);
				let t3 = new Date(this.value5);
				 this.years = t3.getFullYear();
				let data = {
					save_shop_business: 1,
					userid: 1, //临时数据
					company_name: this.forms.company_name,
					legal_person: this.forms.legal_person,
					legal_phone: this.forms.legal_phone,
					legal_card: this.forms.legal_card,
					business_num: this.forms.business_num,
					repast_permit_identity: this.value,
					repast_permit_year:this.years,
					repast_permit_num: this.forms.repast_permit_num,
					business_scope: this.forms.business_scope,
					business_date: this.dates
				};
				saveShopinfo(data, this.alts);
				//console.log(data)
			},
			alts(resp) {
				if(resp.ret === 0) {
					this.$router.push({
						path: '/shop'
					});
				} else {
					alert('保存失败');
				}
			},
			goBack() {
				this.$router.push({
					path: '/shop'
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import 'src/styles/mixin.scss';
	.warp {
		.nvs {
			background: #EFF3FA;
			height: 26px;
		}
		button {
			cursor: pointer;
		}
		.text-warp {
			@include fc(12px, #9b9b9b);
		}
		background:#fff;
		.commercialinformation {
			text-indent: 14px;
			.title {
				@include fc($sizes, $grey);
				height: 40px;
				line-height: 40px;
				background: #F6F8FC;
			}
			.info {
				margin: 40px 0 0 118px;
				.main {
					width: 600px;
					margin-left: 14px;
					text-indent: 0;
					.reverseSide {
						margin-left: 40px;
					}
					.frontFace {
						width: 200px;
						@include fc(14px, #333333);
						text-align: center;
						&:first-child {
							margin-right: 40px;
						}
					}
					.buttons,
					.buttond {
						width: 200px;
						text-align: center;
					}
					.photo1 {
						@include wh(200px, 120px);
						background: #e1e1e1;
						margin-bottom: 10px;
						img {
							width: 100%;
							height: 100%;
							display: block;
						}
					}
				}
				.busPic {
					@include wh(200px, 120px);
					background: #e1e1e1;
					margin-left: 14px;
					img {
						width: 100%;
						height: 100%;
						display: block;
					}
				}
				.downLoad {
					@include fc(14px, #4877E7);
					margin-bottom: 14px;
					margin-top: 10px;
				}
				.top {
					margin-top: 60px;
				}
				.start {
					position: relative;
					&:before {
						position: absolute;
						content: '';
						height: 30px;
						left: 14px;
						top: -7px;
						z-index: 10;
						display: inline-block;
						background: #eeeeee;
						@include wh(36px, 30px);
						line-height: 30px;
					}
				}
				.start1 {
					position: relative;
					&:before {
						position: absolute;
						content: '';
						height: 30px;
						left: 14px;
						top: -7px;
						z-index: 10;
						display: inline-block;
						background: #eeeeee;
						@include wh(36px, 30px);
						line-height: 30px;
					}
				}
				.starts {
					position: absolute;
					left: 10px;
					color: #333333;
					font-size: 14px;
					z-index: 20;
				}
				.starts2 {
					position: absolute;
					left: 207px;
					color: #333333;
					font-size: 14px;
					z-index: 20;
				}
				.bottom {
					width: 80%;
					text-align: center;
					margin-bottom: 30px;
					margin-left: 40px;
					.blue {
						@include fc(16px, #ffffff);
						background: #4877E7;
						@include wh(160px, 40px);
						line-height: 40px;
						border-radius: 6px;
					}
					.default {
						@include fc(14px, #4877E7);
						background: #ffffff;
						@include wh(160px, 40px);
						line-height: 40px;
						border-radius: 6px;
						border: 1px solid #4877E7;
						margin-left: 50px;
					}
				}
			}
		}
	}
</style>
<style lang="scss">
	@import 'src/styles/mixin.scss';
	#commercial {
		.el-form {
			overflow: hidden;
		}
		.el-button {
			@include wh(60px, 30px);
			background: #ffffff;
			@include fc(14px, #4877E7);
			line-height: 30px;
			border-radius: 0;
			padding: 0;
		}
		.el-input__inner {
			border: 1px solid #d9d9d9;
			border-radius: 0;
			@include wh(280px, 34px);
		}
		.el-form--inline .el-form-item {
			margin-right: -30px;
		}
		.el-form-item__label {
			padding: 11px 0;
		}
		.el-form-item {
			margin-bottom: 20px;
		}
		.ipt input {
			@include wh(180px, 30px);
			text-indent: 36px;
		}
		.citys input {
			@include wh(120px, 34px);
			cursor: pointer;
		}
		.cityd input {
			@include wh(250px, 34px);
		}
		.dates .el-icon-date:before {
			position: absolute;
			left: 8px;
			top: 6px;
			content: '';
			display: inline-block;
			vertical-align: middle;
			padding: 0 10px;
			background: url(../../img/date.png)no-repeat;
			@include wh(20px, 20px);
			background-size: 20px 20px;
		}
		.dates .el-input__icon {
			top: 2px;
			width: 36px;
			height: 30px;
			background: #EEEEEE;
		}
		.el-breadcrumb__item__inner,
		.el-breadcrumb__item__inner a {
			color: #333;
			font-size: 12px;
		}
		.el-breadcrumb__separator {
			margin: 0 5px;
			color: #333;
		}
		.el-breadcrumb__item:last-child .el-breadcrumb__item__inner,
		.el-breadcrumb__item:last-child .el-breadcrumb__item__inner a,
		.el-breadcrumb__item:last-child .el-breadcrumb__item__inner a:hover,
		.el-breadcrumb__item:last-child .el-breadcrumb__item__inner:hover {
			color: #4877E7;
		}
		.citys .el-date-editor.el-input{
			@include wh(120px,34px);
		}
		.citys .el-icon-date:before{
			content:"";
			position: absolute;
			top:0px;
			right:-13px;
			@include wh(34px,34px);
			background: url(../../img/sanjiao.png)no-repeat;
			cursor: pointer;
		}
		.el-icon-caret-top:before{
			content: '';
			position: absolute;
			top:0px;
			right:0px;
			@include wh(34px,34px);
			background: url(../../img/sanjiao.png)no-repeat;
		}
		.el-select .el-input .el-input__icon{
			transform:inherit;
			top:0;
			/*background:#eee;*/
		}
	}
</style>