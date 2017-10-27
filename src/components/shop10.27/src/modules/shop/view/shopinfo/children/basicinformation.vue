<template>
	<div class="warp">
		<nav class="nvs">
			<el-breadcrumb separator=">">
				<el-breadcrumb-item :to="{ path: '/shop' }">店铺管理</el-breadcrumb-item>
				<el-breadcrumb-item :to="{path:'/shop/shopinfo'}">店铺信息</el-breadcrumb-item>
				<el-breadcrumb-item>编辑基础信息</el-breadcrumb-item>
			</el-breadcrumb>
		</nav>
		<section class="basicinformation">
			<div class="title">
				编辑基础信息
			</div>
			<div class="info-warp">
				<div class="shopTitle">{{shopinfo.shop_name}}</div>
				<div class="shopInfo">
					<p class="shops">
						<span class="shopId">店铺ID</span>
						<span class="shopNumber">{{shopinfo.shop_id}}</span>
					</p>
				</div>
				<el-form ref="form" label-width="90px" :model='form'>
					<el-form-item label="店铺名称">
						<el-input v-model='form.shop_name'></el-input>
					</el-form-item>
					<el-form-item label="商户标志">
						<div class="shopPic left">
								<img :src="imgbase_url + '/img_get.php?img=1&height=69&width=69&imgname=' + imageUrl " alt="" />
						</div>
						<div class="picInfo left">
							<el-upload class="upload-demo" action="http://www.ob.com:8080/php/shopinfo_save.php" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">

								<el-button size="small" type="primary">更换</el-button>
							</el-upload>
							<div class="text-warp">
								<p class="text">一个月内只能更换一次，文件类型必须为JPG、JPEG、PNG，宽500像素，高500像素，文件大小不得超过1M</p>
							</div>
						</div>
					</el-form-item>
					<el-form-item label="联系人">
						<el-input v-model='form.contact'></el-input>
					</el-form-item>
					<el-form-item label="店铺面积" class='area'>
						<el-input v-model='form.shop_area'></el-input>
						<span class="pinfan">m²</span>
					</el-form-item>
					<el-form-item class='rel' label="地址">
						<el-input v-model='form.address'></el-input>
						<span class="ardess"></span>
					</el-form-item>
					<el-form-item label="门牌号">
						<el-input v-model='form.address_num'></el-input>
					</el-form-item>
					<div class="bottom">
						<button class="blue" type="button" @click='onSubmit'>保存</button>
						<button class="default" type="button" @click="goBack">取消</button>
					</div>
	
				</el-form>
			</div>

		</section>
	</div>
</template>

<script>
	import { saveShopinfo,getShopinfo} from '../../../api';
	import {  Confimshoparea } from '../../../index';
	export default {

		data() {
			return {
				form: {
					shop_name: '',   //店铺 名字
					contact: '',    //联系人
					shop_area: '', //店铺面积
					address: '',  //店铺地址
					address_num: '' //店铺门牌号
				},
				shopinfo: {},   //用来接收请求过来的对象
				imageUrl: '',  //默认图片地址
				imgbase_url: imgbase_url //图片地址
			};
		},
		created(){
			
			this.getData();
		},
		methods: {
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type ==='image/jpeg'||file.type==='image/png'||file.type==='image/jpg';
				const isLt1M = file.size / 1024 / 1024 < 1;

				if(!isJPG) {
					this.$message.error('上传头像图片必须是 JPG,JPEG,PNG 格式!');
				}
				if(!isLt1M) {
					this.$message.error('上传头像图片大小不能超过 1MB!');
				}
				return isJPG && isLt1M;
			},
/*保存店铺信息*/
			onSubmit() {
				if(!Confimshoparea(this.form.shop_area)){
					alert('请输入正确的信息！！')
					return;
				}
				let data = {
					shopinfo_save: 1,
					shop_initname: '毛毛快餐',
					shop_name: this.form.shop_name,
					contact: this.form.contact,
					shop_area: this.form.shop_area,
					address: this.form.address,
					address_num: this.form.address_num
				};
				saveShopinfo(data, this.alts);
			},
			alts() {
				if(this.form.shop_name!=='' && this.imageUrl!=='' && this.form.contact!=='' && this.form.shop_area!=='' && this.form.address!=='' && this.form.address_num!==''){
					this.$router.go(-1);
				} else {
					alert('保存失败,所有内容必须填！！');
				}
				
			},
/*保存店铺信息*/
 //跳转到店铺信息
			goBack(){
				this.$router.go(-1);
			},
 //获取数据
			getData(){
				let _this = this;
				getShopinfo({
					get_shopinfo_base: 1
				}, function(resp) {
					_this.shopinfo = resp.data.shopinfo;
					_this.form.shop_name = _this.shopinfo.shop_name;
					_this.form.contact = _this.shopinfo.contact;
					_this.form.shop_area = _this.shopinfo.shop_area;
					_this.form.address = _this.shopinfo.address;
					_this.form.address_num = _this.shopinfo.address_num;
					_this.imageUrl = _this.shopinfo.shop_logo;
				});
		    }

}

};</script>

<style lang="scss" scoped>
	@import 'src/styles/mixin.scss';
	.warp {
		.nvs {
			background: #EFF3FA;
			height: 26px;
		}
		background:#fff;
		.basicinformation {
			text-indent: 14px;
			.title {
				@include fc($sizes, $grey);
				height: 40px;
				line-height: 40px;
				background: #F6F8FC;
			}
			.info-warp {
				margin: 40px 0 0 148px;
				.shopTitle {
					@include fc(16px, #333333);
					font-weight: bold;
					margin-bottom: 18px;
					margin-left: 14px;
				}
				.shopPic {
					@include wh(100px, 100px);
					background: #e1e1e1;
					margin-left: 14px;
					img{
						width:100%;
						height: 100%;
						display: block;
					}
				}
				.shopInfo {
					.shops {
						@include fc(14px, #000000);
						margin-left: 34px;
						margin-bottom: 20px;
						.shopNumber {
							padding-left: 14px;
						}
					}
				}
				.area{
					position: relative;
					.pinfan{
						position: absolute;
						left: 290px;
						top: 0;
					}
				}
				.picInfo {
					text-indent: 0;
					padding-left: 20px;
				}
				.text-warp {
					width: 280px;
				}
				.text {
					padding-top: 20px;
					@include fc(12px, #9b9b9b);
					line-height: 16px;
					white-space: inherit;
				}
				.rel {
					position: relative;
					.ardess {
						position: absolute;
						left: 310px;
						top: 0;
						@include wh(32px, 32px);
						background: url(../../img/arrdess.png)no-repeat;
					}
				}
				button {
					cursor: pointer;
				}
				.bottom {
					width: 80%;
					text-align: center;
					margin-top: 140px;
					margin-left: 40px;
					margin-bottom: 50px;
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
	.warp {
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
		.el-form-item__label {
			padding: 11px 0;
		}
		.el-form-item {
			margin-bottom: 20px;
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
	}
</style>