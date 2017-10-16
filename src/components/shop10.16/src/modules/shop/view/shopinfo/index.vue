<template>
	<!--包裹层 start-->
	<div class="warp" id="main">
		<!--基础信息 start-->
		<section class="basicInformation clearfix">
			<div class="title clearfix">
				<span class="header left">基础信息</span>
				<router-link :to='{path:"/shopinfo/basicinformation"}'>
					<span class="edit right">编辑</span>
				</router-link>
				
			</div>
			<div class="main clearfix left">
				<div class="shopIcon left">
					<img :src="imgbase_url + '/img_get.php?img=1&height=69&width=69&imgname=' + imageUrl "alt="" />
				</div>
				<div class="info left">
					<div class="name">
						<h3 class="shopName">{{shopinfo.shop_name}}</h3>
					</div>
					<div class="content left">
						<p class="user grey">账号：<span class="black">{{shopinfo.username}}</span><span class="changePassword bl rfs" @click="showPsd">修改密码</span></p>
						<p class="contactspanerson grey">联系人：<span class="black">{{shopinfo.contact}}</span></p>
						<p class="spanhone grey">电话：<span v-if="shopinfo.telephone" class="call nobind lfs">{{shopinfo.telephone}}</span><span v-else class="call nobind">( 未绑定 )</span><span class="unbundling bl rfs" @click='showPhone' v-if='!shopinfo.telephone'>绑定</span><span v-else class="unbundling bl rfs" @click='showPhone' >解绑</span></p>
						<p class="weChat grey">微信：<span class="bund nobind lfs" v-if='!shopinfo.is_weixin'>( 未绑定 )</span><span v-else class="bund gr lfs">( 已绑定 )</span><span class="unbundling bl rfs " @click='showWechat' v-if='!shopinfo.is_weixin'>绑定</span><span v-else class="unbundling bl rfs " @click='showWechat'>解绑</span></p>
					</div>
				</div>
			</div>
			<div class="content left rf">
					<p class="shopId grey">店铺ID：<span class="black">{{shopinfo.shop_id}}</span></p>
					<p class="email grey">邮箱：<span class="nobind">{{shopinfo.email}}</span><span v-if='!shopinfo.email' class="unbundling bl rfs" @click='showEmail'>绑定</span><span v-else class="unbundling bl rfs" @click='showEmail'>解绑</span> </p>
					<p class="area grey">面积：<span class="black">{{shopinfo.shop_area}}M²</span></p>
					<p class="address grey">地址：<span class="black">{{shopinfo.address}}</span></p>
			</div>
		</section>
		<!--基础信息 end-->
		<!--工商信息 start-->
		<section class="industrialInformation">
			<div class="title clearfix">
				<span class="header left">工商信息</span>
				<router-link :to='{path:"/shopinfo/commercialinformation"}'>
					<span class="edit right">编辑</span>
				</router-link>
			</div>
			<div class="info clearfix">
				<div class="content left lf">
					<p class="enterpriseName grey">企业名称：<span class="black">{{shopsbusiness.company_name}}</span> <span class="changePassword nobind">(未认证)</span></p>
					<p class="legalrePresentative grey">法人代表：<span class="black">{{shopsbusiness.legal_person}}</span> <span class="nobind">(未认证)</span></p>
					<p class="legalpersonPhone grey">法人手机号：<span class="black call">{{shopsbusiness.legal_phone}}</span> <span class="unbundling nobind">(未认证)</span></p>
					<p class="legalpersonNum grey">企业法人身份证号码:<span class="black">{{shopsbusiness.legal_card}}</span>  <span class="unbundling nobind">(未认证)</span></p>
					<p class="legalpersonCard grey">法人身份证件：<span class="nobind">(未认证)</span></p>
					<div class="photos">
						<div class="dentificationCard">
							<img :src="imgbase_url + '/img_get.php?img=1&height=69&width=69&imgname=' + shopsbusiness.legal_card_photo" alt="" />
						</div>
						<div class="dentificationCard">
							<!--<img :src="imgbase_url + '/img_get.php?img=1&height=69&width=69&imgname=' + shopsbusiness.legal_card_photo" alt="" />-->
						</div>
					</div>

					<p class="businessScope grey">经营范围：{{shopsbusiness.business_scope}}</p>
				</div>
				<div class="content left rf">
					<p class="businessLicense grey">营业执照注册号：<span class="black">{{shopsbusiness.business_num}}</span> <span class="or nobind">(未认证)</span></p>
					<p class="businessTerm grey">营业期限：<span class="black" v-for='(item,index) in dates'>{{item}} <i v-if="index < dates.length - 1" >至 </i> </span> <span class="unbundling or nobind">(未认证)</span> </p>
					<p class="scanning grey">营业执照扫描件：<span class="or nobind">(未认证)</span></p>
					<div class="dentificationCard"></div>
					<p class="permit grey">餐饮服务许可证编号: <span class="black">{{shopsbusiness.repast_permit_identity}}餐证字 ({{shopsbusiness.repast_permit_year}}) 第{{shopsbusiness.repast_permit_num}}号</span> <span class="or nobind">(未认证)</span></p>
					<p class="scanningPermit grey">餐饮服务许可证扫描件：<span class="or nobind">(未认证)</span></p>
					<div class="dentificationCard noTop"></div>
				</div>
			</div>
		</section>
		<!--工商信息 end-->
		<!--店铺设置 satrt-->
		<section class="shopSeting">
			<div class="title clearfix">
				<span class="header left">店铺设置</span>
				<router-link :to='{path:"/shopinfo/shopseting"}'>
					<span class="edit right">编辑</span>
				</router-link>
			</div>
			<div class="info clearfix">
				<div class="content left lf">
					<p class="businessHours grey">营业时间：<span class="black" v-for='(item,index) in shopsystem.open_time'>{{item}} <i v-if="index < shopsystem.open_time.length - 1">- </i></span></p>
					<p class="whenThemeal grey">餐时：<span class="black" style="padding: 0 20px;">早市: 6:00-10:00</span><span class="black">午市:10:00-14:00</span></p>
					<p class="orderSystem grey">点餐系统：<span class="black">{{system[shopsystem.suspend]}}</span></p>
					<p class="modeofPayment grey">启用支付方式：<span class="black" v-for='(item,index) in shopsystem.shop_pay_way'>{{pay[item]}}<i v-if="index < shopsystem.shop_pay_way.length - 1">、</i></span></p>
					<p class="timeofPayment">付款时机: <span class="black" v-for='(item,index) in shopsystem.pay_time'>{{paytime[item]}}<i v-if="index < shopsystem.pay_time.length - 1">、</i></span></p>
					<p class="invoice">发票：<span class="black" v-for='item in shopsystem.is_invoice_vat'>{{item}}</span></p>
				</div>
				<div class="content left rf">
					<p class="salesWay grey">销售方式：<span class="black" v-for='(item,index) in shopsystem.sale_way'>{{sale[item]}}<i v-if="index < shopsystem.sale_way.length - 1">、</i></span></p>
					<p class="shopLabelling grey">店铺标签：<span class="black" v-for='(item,index) in shopsystem.shop_label'>{{item}}<i v-if="index < shopsystem.shop_label.length - 1">、</i></span></p>
					<p class="invoiceRemark grey">发票备注：<span class="black">{{shopsystem.invoice_remark}}</span></p>
					<p class="shopImg grey">店铺图片：</p>
					<div class="shopPhotos">
						<ul class="clearfix">
							<li class="img-list" v-for='item in shopsystem.img_list'>
								<img :src="imgbase_url + '/img_get.php?img=1&height=69&width=69&imgname=' + item " alt="商家店铺图" />
							</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
		<!--店铺设置 end-->
		<!--公众号设置 start-->
		<section class="publicNumber">
			<div class="title clearfix">
				<span class="header left">公众号设置</span>
				<span class="edit right">编辑</span>
			</div>
			<div class="info">
				<p class=" publicName grey">店铺公众名称：<span class="black">新吃货</span></p>
				<p class="code grey">店铺公众号二维码：</p>
				<div class="codeIcon">
				</div>
				<p class="shopIntroduction">店铺简介：<span class="black">你付款哪个服你您你牛农夫你方柏霓吧放不进还不结婚不会比较好讲课费科技非农空间内部科技你看你看见 吧空间不能看饿饭看见你发你发科技那可就发给你讲课费你看见你看见你肯定你看见过你看见你接口你看你看(说明文字总数不得超过120字)</span></p>
			</div>
		</section>
		<!--公众号设置 end-->
		<!--朦层-->
		<div class="mask" v-show="showDialog"></div>
		<!--朦层-->
		<!--修改密码弹窗 start-->
		<div class="dialog" v-show="showWindow">
			<div class="titles blue">
				<span v-if="showPwd">修改密码</span>
				<span v-else-if="showCall">绑定手机号</span>
				<span v-else-if='showEmail'>绑定邮箱</span>
			</div>
			<el-form label-width="180px" v-if='showPwd'>
				<el-form-item  label="原密码">
					<el-input placeholder='请输入旧密码' v-model='form.old_password'></el-input>
				</el-form-item>
				<el-form-item  label="新密码">
					<el-input placeholder='请输入新密码' v-model='form.new_password'></el-input>
				</el-form-item>
				<el-form-item  label="新密码确定">
					<el-input placeholder='再次输入新密码' v-model='form.new_password_again'></el-input>
				</el-form-item>
			</el-form>
			<el-form label-width="180px" v-else-if='showCall'>
				<el-form-item label="图形验证码">
					<el-input placeholder='输入图形验证码，获取短信验证码'></el-input>
				</el-form-item>
				<el-form-item>
					<span class="confimIcon left"></span>
				</el-form-item>
				<el-form-item style='position: relative;' label="手机号" >
					<el-input placeholder='输入手机号码'></el-input>
					<span class="rew">获取验证码</span>
				</el-form-item>
				<el-form-item label="短信验证码">
					<el-input placeholder='输入短信验证码'></el-input>
				</el-form-item>
			</el-form>
			<el-form label-width='180px' v-else-if='showEmail'>
				<el-form-item label='邮箱'>
					<el-input placeholder='输入邮箱账号'></el-input>
				</el-form-item>
			</el-form>
			<div class="dialog-footer">
				<button class="primary" @click='show' v-if='showPwd'>确定</button>
				<button class="primary" @click='show' v-else='showCall'>绑定</button>
				<button class="default" @click="hidePsd">取消</button>
			</div>
		</div>
		<!--修改密码弹窗 end-->
		<!--修改密码成功AND微信绑定成功AND手机号绑定成功弹窗 start-->
		<div class="ok" v-show="showOk">
			<div class="header">
				<span class="pwd" v-if='showPwd'>密码修改成功</span>
				<span class="pwd" v-else-if='showCall'>手机号绑定成功</span>
				<span class="pwd" v-else-if='showWhat'>微信绑定成功</span>
				<p class="text" v-else-if='showEml'>已向邮箱：<span class="email">123456789123456789@163.com</span>发送一封确认邮件，请进入您的邮箱点击邮件里的链接完成下一步</p>
				<span class="pwd" v-else-if='showEml'>邮箱绑定成功</span>
			</div>
			<div class="bottom">
				<button class="primary" v-if='showEml'>登录邮箱</button>
				<button class="default" v-if='showEml' @click="hidePsd">关闭</button>
				<button class="primary" @click="hidePsd" v-else>确定</button>
				
			</div>
		</div>
		<!--修改密码成功AND微信绑定成功AND手机号绑定成功弹窗end-->
	</div>
	<!--包裹层 end-->
</template>

<script>
	import { getShopinfo } from '../../api';
	import { Changepassword } from '../../api';
	import { Startsystem } from '@/config/cfg';
	import { Payway} from '@/config/cfg';
	import { Paytime} from '@/config/cfg';
	import { Saleway} from '@/config/cfg';
	import { Invoce } from '@/config/cfg';
	import { Dinnertime } from '@/config/cfg';
	import { Certificationstatus } from '@/config/cfg';
	import { Util } from '@/config/util';
	export default {
		data(){
			return{
				showDialog:false,
				showWindow:false,
				showError:false,
				showOk:false,
				showCall:false,
				showPwd:false,
				showWhat:false,
				showEml:false,
				shopinfo:{},
				shopsystem:{},
				shopsbusiness:{},
				system:"",
				pay:'',
				paytime:'',
				sale:'',
				invos:'',
				form:{
					old_password:'',
					new_password:'',
					new_password_again:''
				},
				imageUrl: '',
				imgbase_url: imgbase_url ,
				dates:[]
			};
		},
		created(){
			
			let _this = this;
			getShopinfo({
				userid:1,  //临时数据
				get_shopinfo_base:1
			},function(resp){
				_this.shopinfo = resp.data.shopinfo;
				_this.imageUrl = _this.shopinfo.shop_logo;
				
			});
			getShopinfo({
				userid:1, //临时数据
				get_shopinfo_edit:1
			},function(resp){
				_this.shopsystem = resp.data.shopinfo;
				_this.system = Startsystem.code;
				_this.pay = Payway.code;
				_this.paytime = Paytime.code;
				_this.sale = Saleway.code;
				_this.invos = Invoce.code;
			});
			getShopinfo({
				userid:1,  //临时数据
				get_shop_business:1,	
			},function(resp){
				_this.shopsbusiness = resp.data.shopsbusiness
				let time1 = _this.shopsbusiness.business_date.slice(1,length-1);
				let arr = time1.split(',');
				let time2 = arr[0];
				let time3 = arr[1];
				let stime = Util.TimeTo(time2,'yyyy-MM-dd');
				let etime = Util.TimeTo(time3,'yyyy-MM-dd');
				_this.dates.push(stime,etime);
				console.log(_this.shopsbusiness)
			});
		},
		computed:{
			Startsystem(){
			return Startsystem;
			},
			Payway(){
				return Payway;
			},
			Paytime(){
				return Paytime;
			},
			Saleway(){
				return Saleway;
			},
			Invoce() {
				return Invoce;
			},
			Certificationstatus(){
				return Certificationstatus;
			}
		},
		methods:{
			showPsd(){
				this.showDialog = true;
				this.showPwd = true;
				this.showWindow = true;
			},
			hidePsd(){
				this.showWindow = false;
				this.showDialog = false;
				this.showOk = false;
			},
			show(){
//				this.showWindow = false;
//				this.showWhat = false;
				let data = {
					save_password:1,
					userid:1, // 临时数据
					old_password:this.form.old_password,
					new_password:this.form.new_password,
					new_password_again:this.form.new_password_again
				}
				Changepassword(data,this.showk);
			},
			showk(resp){
				if(resp.ret === 0) {
					this.showOk = true;
				} else {
					alert('保存失败');
				}
			},
			showPhone(){
				this.showDialog = true;
				this.showWindow = true;
				this.showCall = true;
				this.showPwd = false;
			},
			showWechat(){
				this.showDialog = true;
				this.showWhat = true;
				this.showCall = false;
				this.showOk = true;
				this.showPwd = false;
			},
			showEmail(){
				this.showWindow = true;
				this.showDialog = true;
				this.showPwd = false;
				this.showEml = true;
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import 'src/styles/mixin.scss';
	.warp {
		background:#fff;
		.nobind{
						color: $rd;
					letter-spacing: 0.44px;
					}
		.title {
			@include fc($sizes, $grey);
			height: 40px;
			line-height: 40px;
			background: #F6F8FC;
			.edit {
				cursor: pointer;
				position:relative;
				color: $blue;
				padding-right: 14px;
				&:before{
					position: absolute;
					left:-8px;
					top:10px;
					content: '';
					@include wh(20px,20px);
					background:url('../img/edit.png')no-repeat;
				}
			}
		}
		.basicInformation {
			text-indent: 14px;
			.main{
				width:50%;
				height:318px;
			}
			.shopIcon {
				@include wh(100px, 100px);
				margin: 40px 0 0 14px;
				img {
					width: 100%;
					height: 100%;
					display: block;
				}
			}
			.info {
				.name {
					.shopName {
						@include fc(16px, #333333);
						font-weight: bold;
						margin-bottom: 34px;
					}
				}
				
				
			}
			.content {
					.green {
						color: $green;
					}
					.bl {
						color: $blue;
						cursor: pointer;
					}
				}
			.rf {
					margin-top:94px;
					width:50%;
					
				}
			.rfs{
				display:inline-block;
				width:88px;
				text-align: right;
			}
			.lfs{
				display: inline-block;
				width:83px;
				text-align: left;
			}
			.changePassword{
				width:160px;
			}
		}
		.industrialInformation {
			text-indent: 14px;
			padding-top: 40px;
			.info {
				.lf{
					width:50%;
				}
				.rf {
					width: 50%;
				}
				.content {
					.dentificationCard {
						margin-left: 14px;
						margin-bottom: 10px;
						@include wh(200px, 120px);
						background: #e1e1e1;
						img{
							width:100%;
							height: 100%;
							display: block;
						}
						&:last-child {
							margin: 10px 0 20px 14px;
						}
					}
					.noTop {
						margin-top: 0 !important;
					}
				}
			}
		}
		.shopSeting {
			padding-top: 40px;
			text-indent: 14px;
			.info {
					.lf{
					width:50%;
				}
				.rf {
					width: 50%;
				}
				.shopPhotos{
					.img-list{
						float: left;
						@include wh(100px,100px);
						background: #e1e1e1;
						margin:0 10px 15px 15px;
						img{
							width:100%;
							height:100%;
							display: block;
						}
					}
				}
			}
		}
		.publicNumber{
			padding-top: 40px;
			text-indent: 14px;
			.info{
				@include fc($sizes, $grey);
				.code{
				padding-top:20px;
			}
			.codeIcon{
				@include wh(100px,100px);
				background: #e1e1e1;
				margin:10px 0  20px 14px;
			}
			.shopIntroduction{
				line-height:20px;
			}
			}
			
		}
	}
	
	/*朦层*/
	.mask{
		position: fixed;
		width: 100%;
		height: 100%;
		z-index: 8000;
		left: 0;
		top: 0;
		background: #000000;
		opacity: 0.5;
	}
	/*模态框*/
	.dialog{
		position: absolute;
		z-index: 10000000;
		left: 50%;
		top:30%;
		width:540px;
		margin-left:-270px;
		background: #ffffff;
		text-align: center;
		.titles{
			height:40px;
			line-height: 40px;
			@include fc(16px,#ffffff);
			text-align: center;
		}
		.error{
			@include fc(12px,$rd);
			padding-right: 110px;
		}
		.blk{
			@include fc(14px,#000000);
		}
		.confimIcon{
			position: relative;
			display: inline-block;
			@include wh(160px,34px);
			background:#eeeeee;
			&:after{
				position: absolute;
				right:-44px;
				top: 6px;
				content: '';
				display: inline-block;
				@include wh(24px,24px);
				background: url(../img/rennew.png)no-repeat;
			}
		}
		.rew{
			position: absolute;
			right:90px;
			top:5px;
			background:#4877E7;
			display: inline-block;
			@include wh(100px,24px);
			@include fc(12px,#fff);
			line-height: 24px;
			border-radius: 2px;
			cursor: pointer;
		}
		.dialog-footer{
			padding:46px 0 50px 0;
			font-size:0;
			.primary{
				background:$blue;
				@include wh(160px,40px);
				line-height:40px;
				@include fc(14px,#ffffff);
				border: 1px solid $blue;
				border-radius: 5px;
				
				cursor: pointer;
			}
			.default{
				@include wh(160px,40px);
				background: #fff;
				border: 1px solid $blue;
				@include fc(14px,$blue);
				border-radius: 5px;
				margin-left:60px;
				cursor: pointer;
			}
		}
	}
	.ok{
		position: absolute;
		z-index: 10000001;
		left: 50%;
		top:50%;
		@include wh(440px,280px);
		background:#ffffff;
		border-top: 4px solid $blue;
		margin-left:-220px;
		margin-top: -140px;
		text-align: center;
		.header{
			padding-top: 90px;
			@include fc(14px,#666666);
			.pwd{
				position:relative; 
				padding-left:70px; 
				&:before{
					position: absolute;
					left: 0px;
					top: -16px;
					content:'';
					@include wh(50px,50px);
					background: url(../img/success.png)no-repeat;
				}
			}
			.text{
				@include wh(380px,38px);
				@include fc(14px,#333);
				margin: 0 auto;
				text-align: justify;
				letter-spacing: 0.5px;
			}
			.email{
				color: $rd;
			}
		}
		.bottom{
			padding-top:77px;
				.primary{
				background:$blue;
				@include wh(160px,40px);
				line-height:40px;
				color:#fff;
				border: 1px solid $blue;
				border-radius: 5px;
				cursor: pointer;
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
	
	
	/*公用样式*/
	.black {
		@include fc($sizes, $black);
	}
	
	.or {
		@include fc($sizes, $or);
	}
	
	.blue{
		background: $blue;
	}
	.gr {
		color: $green;
	}

	.content {
		@include fc($sizes, $grey);
		p {
			line-height: 34px;
		}
	}
	.info{
		margin-top: 40px;
	}
	input{
		border: 1px solid #d9d9d9;
		@include wh(280px,34px);
		line-height: 34px;
		@include fc(12px,#d9d9d9);
		margin-left: 14px;
		padding-left: 10px;
	}
</style>
<style lang="scss">
	@import 'src/styles/mixin.scss';
	#main{
		form{
			margin-top: 40px;
		}
		.el-input, .el-input__inner{
			@include wh(280px,34px);
			border-radius:0;
			display:inherit;
			@include fc(12px,#000000);
		}
		.el-form-item{
			margin-bottom: 20px;
		}
	}
</style>