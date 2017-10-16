<template>
	<div id="shopSeting" class="warp">
		<nav class="nvs">
			<el-breadcrumb separator=">">
				<el-breadcrumb-item :to="{ path: '/shop' }">店铺管理</el-breadcrumb-item>
				<el-breadcrumb-item :to="{path:'/shop/shopinfo'}">店铺信息</el-breadcrumb-item>
				<el-breadcrumb-item>编辑店铺设置</el-breadcrumb-item>
			</el-breadcrumb>
		</nav>
		<div class="title">
			编辑店铺设置
		</div>
		<section class="shopSeting">
			<div class="setInfo">
				<el-form label-width='110px'>
					<el-form-item class='main ' id='top' label="点餐系统">
						<button class="start" v-for="(item,index)  in buttons" @click='satrt(index)' :class="{'active':Zindex==index}">{{item}}</button>
						<p class="injection">注：选暂停时，客人手机上会显示为系统升级维护中</p>
					</el-form-item>
					<el-form-item class='main' label='启用支付方式'>
						<el-checkbox-group v-model="checkboxGroup1">
							<el-checkbox-button v-for="payment in Payments" :label="payment.idx" :key="payment.text">{{payment.text}}</el-checkbox-button>
						</el-checkbox-group>
					</el-form-item>
					<el-form-item class='main' label='订单付款时间'>
						<el-checkbox-group v-model="checkboxGroup2">
							<el-checkbox-button v-for="paytimed in Paytime" :label="paytimed.idx " :key="paytimed.text ">{{paytimed.text}}</el-checkbox-button>
						</el-checkbox-group>
					</el-form-item>
					<el-form-item class='main' label='销售方式'>
						<el-checkbox-group v-model="checkboxGroup3">
							<el-checkbox-button v-for="sells in sell" :label="sells.idx " :key="sells.text ">{{sells.text}}</el-checkbox-button>
						</el-checkbox-group>
					</el-form-item>
					<el-form-item class='main' label='餐厅标签'>
						<el-checkbox-group v-model="checkboxGroup4">
							<el-checkbox-button v-for="rastuan in restauran " :label="rastuan.text " :key="rastuan.text">{{rastuan.text}}</el-checkbox-button>
						</el-checkbox-group>
					</el-form-item>
					<el-form-item class='businessTime' label="营业时间">
						<el-time-picker v-model="value2" :picker-options="{
						      selectableRange: '06:00:00 - 23:59:59'
						    }">
						</el-time-picker>
						<el-time-picker v-model="value3" :picker-options="{
						      selectableRange: '00:00:00 - 23:59:59'
						    }">
						</el-time-picker>
					</el-form-item>
					<el-form-item class='dateSet' label="餐时设置">
						<el-checkbox-group v-model="type">
							<el-checkbox label="早市" name="type"></el-checkbox>
							<el-time-picker v-model="value4" :picker-options="{
						      selectableRange: '00:00:00 - 23:59:59'
						    }">
							</el-time-picker>
							<el-time-picker v-model="value5" :picker-options="{
						      selectableRange: '00:00:00 - 23:59:59'
						    }">
							</el-time-picker>
							<el-checkbox label="午市" name="type"></el-checkbox>
							<el-time-picker v-model="value6" :picker-options="{
						      selectableRange: '10:01:00 - 23:59:59'
						    }">
							</el-time-picker>
							<el-time-picker v-model="value7" :picker-options="{
						      selectableRange: '10:01:00 - 23:59:59'
						    }">
							</el-time-picker>
							<el-checkbox label="晚市" name="type"></el-checkbox>
							<el-time-picker v-model="value8" :picker-options="{
						      selectableRange: '16:30:00 - 23:59:59'
						    }">
							</el-time-picker>
							<el-time-picker v-model="value9" :picker-options="{
						      selectableRange: '16:00:00 - 23:59:59'
						    }">
							</el-time-picker>
							<el-checkbox label="夜宵" name="type"></el-checkbox>
							<el-time-picker v-model="value10" :picker-options="{
						      selectableRange: '21:00:00 - 06:00:00'
						    }">
							</el-time-picker>
							<el-time-picker v-model="value11" :picker-options="{
						      selectableRange: '03:00:00 - 06:00:00'
						    }">
							</el-time-picker>
						</el-checkbox-group>
					</el-form-item>
					<el-form-item class='invoice nomain clearfix' label="发票">
						<button class='noInvoice left' @click='shows' :class="{'active':show===Invoce.NO}">不提供发票</button>
						<span class="line"></span>
						<button class="paperInvoice" @click='showInvos' :class="{'selectd':showinvos===Invoce.YES}">纸质发票</button>
						<button class="electronicInvoice" @click='addCls' :class="{'selectd':showinvs===Invoce.YES}" >电子发票</button>
					</el-form-item>
					<el-form-item class='paperTickets' label="纸票" v-show='showinvos'>
						<el-checkbox-group v-model="checkboxGroup6">
							<el-checkbox-button v-for="papers in paper" :label="papers.idx" :key="papers.text">{{papers.text}}</el-checkbox-button>
						</el-checkbox-group>
						 
					</el-form-item>
					<el-form-item label="发票备注">
						<el-input type='textarea' v-model='remark' placeholder='备注文字总数不得超过120字'>

						</el-input>
					</el-form-item>
					<el-form-item class='clearfix' label="店铺图片">
						<div class="busPic left">
							<img :src="imgbase_url + '/img_get.php?img=1&height=69&width=69&imgname=' + shopsystem.img_list[0] " alt="商家图片" />
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
					<div class="bottom">
						<button class="blue" @click="save">保存</button>
						<button class="default" @click="goBack">取消</button>
					</div>
				</el-form>
			</div>
		</section>
	</div>
</template>

<script>
	import { shopSeting } from '../../../api';
	import { Subtime } from '../../../index';
	import { Tranobj } from '../../../index';
	import { getShopinfo } from '../../../api';
	import { Util } from '@/config/util';
	import { Invoce } from '@/config/cfg';
	export default {
		data() {
			return {
				show: 1,
				showinvos:0,
				showinvs:0,
				buttons: ['启用', '暂停'],
				checkboxGroup1: [],
				Payments: [{
						text: '现金支付',
						idx: 1
					},
					{
						text: '刷卡支付',
						idx: 2
					},
					{
						text: '支付宝支付',
						idx: 3
					},
					{
						text: '微信支付',
						idx: 4
					}
				],
				checkboxGroup2: [],
				Paytime: [{
						text: '餐前支付',
						idx: 1
					},
					{
						text: '餐后支付',
						idx: 2
					}
				],
				checkboxGroup3: [],
				sell: [{
						text: '在店吃',
						idx: 1
					},
					{
						text: '打包',
						idx: 2
					},
					{
						text: '自提',
						idx: 3
					},
					{
						text: '外卖',
						idx: 4
					}
				],
				checkboxGroup4: [],
				restauran: [{
						text: '湘菜',
						idx: 1
					},
					{
						text: '粤菜',
						idx: 2
					},
					{
						text: '川菜',
						idx: 3
					}
				],
				checkboxGroup6: [],
				paper: [{
						text: '增值税普通发票',
						idx: 1
					},
					{
						text: '增值税专用发票',
						idx: 2
					}
				],
				Zindex: 2,
				shopsystem: {
					img_list:[]
				},
				value2: '',
				value3: '',
				value4: '',
				value5: '',
				value6: '',
				value7: '',
				value8: '',
				value9: '',
				value10: '',
				value11: '',
				type: [],
				times: [],
				remark: '',
				values: '',
				imgbase_url: imgbase_url 
			};
		},
		created() {
			let _this = this;
			let t = new Date();
			let year = t.getFullYear();
			let mon = t.getMonth()+1;
			let dats = t.getDate();
		getShopinfo({
				userid: 1, //临时数据
				get_shopinfo_edit: 1
			}, function(resp) {
				_this.shopsystem = resp.data.shopinfo;
				console.log(_this.shopsystem)
				_this.Zindex = _this.shopsystem.suspend;
				_this.show = _this.shopsystem.is_invoice_vat;
				_this.checkboxGroup1 = _this.shopsystem.shop_pay_way;
				_this.checkboxGroup2 = _this.shopsystem.pay_time;
				_this.checkboxGroup3 = _this.shopsystem.sale_way;
				_this.checkboxGroup4 = _this.shopsystem.shop_label;
				_this.times = _this.shopsystem.open_time;
				_this.remark = _this.shopsystem.invoice_remark;
				_this.show = _this.shopsystem.is_invoice_vat[0].is_invoice;
						let arr = Tranobj(_this.times[0]).split(',');
						 let hour = arr[0];
						 let min = arr[1];
						 let second = arr[2];
				_this.value2 = new Date(year,mon,dats,hour,min,second);
						let arr2 = Tranobj(_this.times[1]).split(',');
						 let hours = arr2[0];
						 let mins = arr2[1];
						 let secons = arr2[2];
				_this.value3 = new Date(year,mon,dats,hours,mins,secons);
			})
		},
		mounted() {

		},
		computed: {
			Invoce() {
				return Invoce;
			}
		},
		methods: {
			shows() {
				this.show = 0;
			},
			satrt(index) {
				this.Zindex = index;
			},
			save() {
				let time1 = Subtime(this.value2);
				let time2 = Subtime(this.value3);
				this.times.push(time1, time2);
				let data = {
					shopinfo_save: 1,
					userid: 1, //临时数据
					suspend: this.Zindex,
					is_invoice_vat:[
									{
										'is_invoice':!this.show,
										'"invoice_type':[this.showinvos,this.checkboxGroup6,this.showinvs]
									}
								],
					shop_pay_way: this.checkboxGroup1,
					pay_time: this.checkboxGroup2,
					sale_way: this.checkboxGroup3,
					shop_label: this.checkboxGroup4,
					open_time: this.times,
					invoice_remark: this.remark,
					opening_time:[]
				};
				shopSeting(data, this.alts);
				console.log(this.type)
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
			},
			showInvos(){
				if(this.showinvos===0){
					this.showinvos=1;
				}else{
					this.showinvos=0;
				}
			},
			addCls(){
				if(this.showinvs===0){
					this.showinvs=1;
				}else{
					this.showinvs=0;
				}
			}

		}
	};
</script>

<style lang="scss" scoped>
	@import 'src/styles/mixin.scss';
	.warp {
		button {
			cursor: pointer;
			outline: none;
		}
		.active {
			background: #4877E7 !important;
			color: #fff !important;
			border-radius: 2px !important;
		}
		.selectd{
			color: #4877E7;
			background-color: #fff;
			border-color: #4877E7 !important;
			box-shadow: none;
			position: relative;
			&:after {
				position: absolute;
				right: 0;
				top: 0;
				content: '';
				@include wh(12px, 12px);
				background: url(../../img/select.png)no-repeat;
			}
		}
		.nvs {
			background: #EFF3FA;
			height: 26px;
		}
		background:#fff;
		.title {
			text-indent: 14px;
			@include fc($sizes, $grey);
			height: 40px;
			line-height: 40px;
			background: #F6F8FC;
		}
		.shopSeting {
			margin: 40px 0 0 162px;
			min-width: 760px;
			max-width: 800px;
			.injection {
				@include fc(12px, #9b9b9b);
			}
			.start {
				@include wh(80px, 30px);
				line-height: 30px;
				@include fc(14px, #666);
				border: 1px solid #d8d8d8;
				background: #fff;
				&:first-child {
					margin-right: 10px;
				}
			}
			.line {
				float: left;
				display: inline-block;
				height: 30px;
				width: 1px;
				background: #d8d8d8;
				margin: 4px 20px 0 20px;
			}
			.paperInvoice,.electronicInvoice{
				@include wh(100px,30px);
				background: #fff;
				border: 1px solid #d8d8d8;
			}
			.paperInvoice{
				margin-right:6px;
			}
			.shopPic {
				@include wh(100px, 100px);
				background: #e1e1e1;
			}
			.busPic {
				@include wh(100px, 100px);
				background: #e1e1e1;
				img{
					width:100%;
					height:100%;
					display: block;
				}
			}
			.text-warp {
				@include fc(12px, #9b9b9b);
				margin-top: 40px;
			}
			.picInfo {
				width: 54%;
				margin-left: 20px;
			}
			.noInvoice {
				@include wh(100px, 30px);
				line-height: 30px;
				@include fc(14px, #666);
				background: #fff;
				border: 1px solid #d8d8d8;
				margin-top: 4px;
			}
		}
		.bottom {
			width: 100%;
			text-align: center;
			margin-bottom: 30px;
			margin-left: 280px;
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
</style>

<style lang="scss">
	@import 'src/styles/mixin.scss';
	#shopSeting {
		#top {
			margin-bottom: 5px;
		}
		.dateSet .el-input__inner {
			@include wh(120px, 34px);
			margin: 5px;
		}
		.el-input__inner {
			border-radius: 0;
		}
		.businessTime .el-input__inner {
			@include wh(120px, 34px);
			margin-right: 10px;
		}
		.el-checkbox__label {
			padding-left: 9px;
		}
		.el-textarea__inner {
			@include wh(400px, 100px);
			resize: none;
			border-radius: 0;
			border: 1px solid #D9D9D9;
		}
		.picInfo .el-button {
			width: 60px;
			height: 30px;
			background: #ffffff;
			font-size: 14px;
			color: #4877E7;
			line-height: 30px;
			border-radius: 0;
			padding: 0;
			border-color: #4877E7;
		}
		.el-button {
			border: 1px solid #D8D8D8;
			border-radius: 2px;
			padding: 0;
		}
		.main .el-checkbox-button__inner {
			padding: 0;
			@include wh(80px, 30px);
			line-height: 30px;
			color: #666;
			border: 1px solid #d8d8d8;
			border-radius: 2px;
		}
		.el-checkbox-button.is-checked .el-checkbox-button__inner {
			color: #4877E7;
			background-color: #fff;
			border-color: #4877E7;
			box-shadow: none;
			position: relative;
			&:after {
				position: absolute;
				right: 0;
				content: '';
				@include wh(12px, 12px);
				background: url(../../img/select.png)no-repeat;
			}
		}
		.paperTickets .el-checkbox-button__inner {
			@include wh(160px, 30px);
			padding: 0;
			line-height: 30px;
			color: #666;
			border: 1px solid #d8d8d8;
			border-radius: 2px;
		}
		.invoice .invoce{
			@include wh(160px, 30px);
			padding: 0;
			line-height: 30px;
			color: #666;
			border: 1px solid #d8d8d8;
			border-radius: 2px;
			margin-right:10px;
		}
		.nomain .el-checkbox-button__inner {
			@include wh(100px, 30px);
			padding: 0;
			line-height: 30px;
			color: #666;
			border: 1px solid #d8d8d8;
			border-radius: 2px;
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
		.el-date-editor.el-input {
			width: 120px;
			margin-right: 8px;
		}
		.el-checkbox-group {
			float: left;
		}
		.el-checkbox-button,
		.el-checkbox-button__inner {
			margin-right: 6px;
		}
		.el-checkbox {
			color: #333;
		}
		.el-checkbox__inner::after {
			border: 2px solid #4877E7;
			border-left: 0;
			border-top: 0;
		}
		.el-checkbox__input.is-checked .el-checkbox__inner {
			background: #fff;
			border-color: #4877E7;
		}
	}
</style>