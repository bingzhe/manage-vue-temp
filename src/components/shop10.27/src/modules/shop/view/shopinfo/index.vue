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
					<img :src="imgbase_url + '/img_get.php?img=1&height=69&width=69&imgname=' + imageUrl " alt="" />
				</div>
				<div class="info left">
					<div class="name">
						<h3 class="shopName">{{shopinfo.shop_name}}</h3>
					</div>
					<div class="content left">
						<p class="user grey">账号：<span class="black">{{shopinfo.username}}</span>
							<span class="changePassword bl rfs" @click="showPsd">修改密码</span>
						</p>
						<p class="contactspanerson grey">联系人：<span class="black">{{shopinfo.contact}}</span></p>
						<p class="spanhone grey">电话：<span v-if="shopinfo.telephone" class="call nobind lfs">{{shopinfo.telephone}}</span><span v-else class="call nobind">( 未绑定 )</span>
							<span class="unbundling bl rfs bd" @click='showPhone' v-if='!shopinfo.telephone'>绑定</span>
							<span v-else class="unbundling bl rfs cal" @click='showbindPhone'>解绑</span>
						</p>
						<p class="weChat grey">微信：<span class="bund nobind lfs" v-if='!shopinfo.is_weixin'>( 未绑定 )</span>
							<span v-else class="bund gr lfs">( 已绑定 )</span>
							<span class="unbundling bl rfs bds " @click='showWechat' v-if='!shopinfo.is_weixin'>绑定</span>
							<span v-else class="unbundling bl rfs wx" @click='nobinds'>解绑</span>
						</p>
					</div>
				</div>
			</div>
			<div class="content left rf">
				<p class="shopId grey">店铺ID：<span class="black">{{shopinfo.shop_id}}</span></p>
				<p class="email grey">邮箱：<span class="nobind">{{shopinfo.email}}</span>
					<span v-if='shopinfo.email' class="unbundling bl rfs" @click='showBind'>解绑</span>
					<span v-else class="unbundling bl rfs" @click='bindEmails'>绑定</span></p>
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
					<p class="legalpersonNum grey">企业法人身份证号码:<span class="black">{{shopsbusiness.legal_card}}</span> <span class="unbundling nobind">(未认证)</span></p>
					<p class="legalpersonCard grey">法人身份证件：<span class="nobind">(未认证)</span></p>
					<div class="photos">
						<div class="dentificationCard" v-for='item in shopsbusiness.legal_card_photo'>
							<img :src="imgbase_url + '/img_get.php?img=1&height=69&width=69&imgname=' + item" alt="" />
						</div>
					</div>
					<p class="businessScope grey">经营范围：{{shopsbusiness.business_scope}}</p>
				</div>
				<div class="content left rf">
					<p class="businessLicense grey">营业执照注册号：<span class="black">{{shopsbusiness.business_num}}</span> <span class="or nobind">(未认证)</span></p>
					<p class="businessTerm grey">营业期限：<span class="black" v-for='(item,index) in dates'>{{item}} <i v-if="index < dates.length - 1" >至 </i> </span> <span class="unbundling or nobind">(未认证)</span> </p>
					<p class="scanning grey">营业执照扫描件：<span class="or nobind">(未认证)</span></p>
					<div class="dentificationCard">
						<img :src="imgbase_url + '/img_get.php?img=1&height=69&width=69&imgname=' + shopsbusiness.business_photo" alt="" />
					</div>
					<p class="permit grey">餐饮服务许可证编号: <span class="black">{{shopsbusiness.repast_permit_identity}}餐证字 ({{shopsbusiness.repast_permit_year}}) 第{{shopsbusiness.repast_permit_num}}号</span> <span class="or nobind">(未认证)</span></p>
					<p class="scanningPermit grey">餐饮服务许可证扫描件：<span class="or nobind">(未认证)</span></p>
					<div class="dentificationCard noTop">
						<img :src="imgbase_url + '/img_get.php?img=1&height=69&width=69&imgname=' + shopsbusiness.repast_permit_photo" alt="" />
					</div>
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
					<p class="whenThemeal grey">餐时：<span class="black" style="padding: 0 10px;" v-for='item in Times'>{{item}}</span></p>
					<p class="orderSystem grey">点餐系统：<span class="black">{{system[shopsystem.suspend]}}</span></p>
					<p class="modeofPayment grey">启用支付方式：<span class="black" v-for='(item,index) in shopsystem.shop_pay_way'>{{pay[item]}}<i v-if="index < shopsystem.shop_pay_way.length - 1">、</i></span></p>
					<p class="timeofPayment">付款时机: <span class="black" v-for='(item,index) in shopsystem.pay_time'>{{paytime[item]}}<i v-if="index < shopsystem.pay_time.length - 1">、</i></span></p>
					<p class="invoice">是否提供发票：<span class="black">{{invos[shopsystem.is_invoice_vat.is_invoice]}}</span></p>
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
		<!--朦层-->
		<div class="mask" v-show="showDialog"></div>
		<!--朦层-->
		<!--修改密码弹窗 start-->
		<div class="dialog" v-show="showPwd">
			<div class="titles blue">
				<span>修改密码</span>
			</div>
			<el-form label-width="180px">
				<el-form-item label="原密码">
					<el-input @change="clearErrTip" placeholder='请输入旧密码' :class="{errtip: isShowErrtip}" type='password' v-model='form.old_password'></el-input>
				</el-form-item>
				<el-form-item label="新密码">
					<el-input @change="clearErrTip" placeholder='请输入新密码' :class="{errtip: isShowErrtip}" type='password' v-model='form.new_password'></el-input>
				</el-form-item>
				<el-form-item label="确认密码">
					<el-input @change="clearErrTip" placeholder='再次输入新密码' :class="{errtip: isShowErrtip}" type='password' v-model='form.new_password_again'></el-input>
				</el-form-item>
				<div class="text">
					<span class="nobind sz rt" v-if='error3'>输入不能为空</span>
					<span class="nobind sz" v-else-if='error'>原密码输入错误</span>
					<span class="nobind sz lt" v-else-if='error2'>两次密码输入不一致</span>
				</div>
				<div class="bottom">
					<button type="button" class="primary"  @click="show">确定</button>
					<button type="button" class="default" @click="close">取消</button>
				</div>
			</el-form>
			
		</div>
		<div class="ok" v-show="showPwdok">
				<div class="header">
			 		<span class="pwd">密码修改成功</span>
			    </div>
			    <div class="bottom">
					<button type="button" class="primary"  @click="close">确定</button>
				</div>
			</div>
		<!--修改密码弹窗 end-->
		<!--绑定解绑手机start-->
		<div class="phone" v-show='showCall'>
			<div class="titles blue">
				<span v-if='showCallok'>绑定手机</span>
				<span v-if='bindCall'>解绑手机</span>
			</div>
			<el-form label-width="180px" v-show='showCall'>
				<el-form-item label="图形验证码">
					<el-input placeholder='输入图形验证码，获取短信验证码' @change="clearErrTip" :class="{errtip: isShowErrtip}" v-model='form.code'></el-input>
				</el-form-item>
				<el-form-item class='clearfix'>
					<div class="confimIcon left">
						<img :src="codeimgurl" alt="验证图片" />
					</div>
					<div class="reset left">
                        <img @click="changeCheckImg" src="../img/rennew.png" alt="刷新" />
                    </div>
				</el-form-item>
				<el-form-item style='position: relative;' label="手机号">
					<el-input placeholder='输入手机号码' v-model='phone' @change="clearErrTip" :class="{errtip: isShowErrtip}" v-show='showCallok'></el-input>
					<span class="black" v-show='showBindPhone'>{{shopinfo.telephone}}</span>
					<span class="rew" v-show='showCallok' @click="bindPhone">{{checkMsg}}</span>
					<span class="rew sss" v-show='showBindPhone' @click="uNbindPhone">{{checkMsg}}</span>
					<span class="unbd" v-show='rewshow'>{{rewMsg}}</span>
				</el-form-item>
				<el-form-item label="短信验证码">
					<el-input placeholder='输入短信验证码' @change="clearErrTip" :class="{errtip: isShowErrtip}" v-model='phone_code'></el-input>
				</el-form-item>
			</el-form>
			<div class="txt">
					<span class="nobind sz rd" v-if='error3'>输入不能为空</span>
					<span class="nobind sz ld" v-else-if='error'>图形验证码输入错误</span>
					<span class="nobind sz ph" v-else-if='error4'>手机号码有误</span>
					<span class="nobind sz lt" v-else-if='error2'>短信验证码输入错误</span>
			</div>
			<div class="dialog-footer" v-show='showCall'>
				<button type="button" class="primary" v-show='showCallok' @click='bindPhones'>绑定</button>
				<button type="button" class="primary ttt" v-show='bindCall' @click='unbindPhone'>解绑</button>
				<button type="button" class="default" @click="close">取消</button>
			</div>
		</div>
		<div class="ok" v-show="showPhones">
			<div class="header">
		 		<span class="pwd" v-show='unbindOk'>手机号解绑成功</span>
		 		<span class="pwd" v-show='bindOk'>手机号绑定成功</span>
		    </div>
		    <div class="bottom">
		    	<button type="button" class="primary" v-show='unbindOk' @click="bindsPhones" >绑定其他手机号</button>
				<button type="button" class="primary" v-show='confims'  @click="close">确定</button>
				<button type="button" class="default" v-show='cls' @click="close">关闭</button>
			</div>
		</div>
		<!--绑定解绑手机 end-->
		<!--绑定解绑邮箱 start-->
		<div class="emails" v-show='showEmail'>
				<div class="titles blue">
					<span v-if='bindEml'>绑定邮箱</span>
					<span v-if='unbindEml'>解绑邮箱</span>
				</div>
				<el-form label-width='180px'>
					<el-form-item label='邮箱'>
						<el-input placeholder='输入邮箱账号'  v-if='bindEml' v-model='email'></el-input>
						<span class="nobind" v-if='unbindEml'>{{shopinfo.email}}</span>
					</el-form-item>
				</el-form>
				<div class="dialog-footer">
				<button type="button" class="primary" v-if='bindEml'  @click='bindMail'>绑定</button>
				<button type="button" class="primary ttt" v-if='unbindEml'@click='unbindEmail' >解绑</button>
				<button type="button" class="default" @click="close">取消</button>
			</div>
		</div>
		<div class="ok" v-show="showEmailoks">
			<div class="header">
		 		<p class="text" v-if='send'>已向邮箱：<a class="email":href="hrf" >{{email}}</a>发送一封确认邮件，请进入您的邮箱点击邮件里的链接完成下一步</p>
		 		<p class="text" v-else='sends'>已向邮箱：<a class="email":href="hrf" >{{shopinfo.email}}</a>发送一封确认邮件，请进入您的邮箱点击邮件里的链接完成下一步</p>
		    </div>
		    <div class="bottom">
		    	<a class="primary" v-show='send' :href="hrf" target="_blank" @click='bindok' >登录邮箱</a>
		    	<a class="primary" v-show='sends' :href="hrf" target="_blank" @click='bindok' >登录邮箱</a>
				<button type="button" class="primary" v-show='confims'  @click="close">确定</button>
				<button type="button" class="default" @click="close">关闭</button>
			</div>
		</div>
		<!--绑定解绑邮箱 end-->	
	</div>
	<!--包裹层 end-->
</template>

<script>
	import { getShopinfo, Changepassword , Bindemail , Unbindemail, BindPhone,BindPhones,UnbindPhone,UNbindPhone} from '../../api';
	import { Startsystem, Payway, PayTime, Saleway, Invoce, Dinnertime, Certificationstatus, errcode } from '@/config/cfg';
	import { Util } from '@/config/util';
	import { Confimemail, Hash,ConfimPhone } from '../../index';
	import { ls } from '@/config/pageStore';
	export default {
		data() {
			return {
				showDialog: false,
				showPwdok:false,
				showEmailoks:false,
				send:false,
				sends:false,
				unbindOk:false,
				showPhones:false,
				bindOk:false,
				cls:false,
				showCall: false,
				showCallok: false,
				bindPhoneok:false,
				unBindPhone:false,
				unBindPhoneok:false,
				bindEmail:false,
				bindCall:false,
				showPwd: false,
				showEmail:false,
				bindEml:false,
				closeEml:false,
				unbindEml:false,
				confims:false,
				showBindPhone: false,
				rewshow:false,
				error: false,
				error2: false,
				error3: false,
				error4: false,
				isShowErrtip: false,
				checkMsg:'获取验证码',
				rewMsg:'',
				shopinfo: {},
				shopsystem: {
					is_invoice_vat:{
						is_invoice:""
					}
				},
				shopsbusiness: {},
				system: "",
				pay: '',
				paytime: '',
				sale: '',
				invos: '',
				rutime:'',
				form: {
					old_password: '',
					new_password: '',
					new_password_again: '',
					code:''
				},
				imageUrl: '',
				imgbase_url: imgbase_url,
				dates: [],
				email:'',
				hrf:'',
				phone:'',
				codeimgurl:'',
				token:'',
				phone_code:'',
				sTime:[],
				Times:[]
			};
		},
		created() {
			this.getData();
			this.initCheckImg();
		},
		computed: {
			Startsystem() {
				return Startsystem;
			},
			Payway() {
				return Payway;
			},
			PayTime() {
				return PayTime;
			},
			Saleway() {
				return Saleway;
			},
			Invoce() {
				return Invoce;
			},
			Certificationstatus() {
				return Certificationstatus;
			},
			errcode() {
				return errcode;
			},
			Dinnertime(){
				return Dinnertime;
			}
		},
		methods: {
			initCheckImg() {
            this.token = Util.creatToken();
            this.codeimgurl = base_url + "/code.php?height=35&width=160&fontsize=20&codelen=4&token=" + this.token + "&is_plain=1";
        },
        changeCheckImg() {
            this.codeimgurl = base_url + "/code.php?height=35&width=160&fontsize=20&codelen=4&token=" + this.token + "&is_plain=1" + "&" + Math.random();
        },
			showPsd() {
				this.showDialog = true;
				this.showPwd = true;
				this.form.old_password = '';
				this.form.new_password = '';
				this.form.new_password_again = '';
			},
			close(){
				this.showDialog = false;
				this.unBindPhoneok = false;
				this.showPwdok = false; 
				this.showEmail = false;
				this.showPwd = false;
				this.showCall = false;
				this.showEmailoks = false;
				this.showPhones = false;
			},
			
/*修改密码*/
			show() {
				if(this.form.old_password === '' && this.form.new_password === '' && this.form.new_password_again === "") {
					this.isShowErrtip = true;
					this.error3 = true;
					return
				} else if(this.form.new_password !== this.form.new_password_again) {
					this.error2 = true;
					this.isShowErrtip = true;
				}

				let data = {
					save_password: 1,
					old_password: this.form.old_password,
					new_password: this.form.new_password,
					new_password_again: this.form.new_password_again
				}
				Changepassword(data, this.showk);
			},
			showk(resp) {
				if(resp.ret === 0) {
					this.showPwd = false;
					this.showPwdok = true;
				} else if(resp.ret === errcode.USER_PASSWD_ERR) {
					this.error = true;
					this.isShowErrtip = true;
				}
			},
/*修改密码*/

/*绑定手机的样式显示*/
			showPhone() {
				this.showDialog = true;
				this.showCall = true;
				this.showCallok = true;
				this.bindCall = false;
				this.showBindPhone = false;
			},
			bindsPhone(){
				this.showDialog = true;
				this.showCall = true;
				this.showCallok = true;
				this.bindCall = false;
				this.unBindPhoneok = false;
			},
			bindsPhones(){
				this.showDialog = true;
				this.showCall = true;
				this.showCallok = true;
				this.bindCall = false;
				this.phone = '';
				this.form.code = '';
				this.phone_code = '';
				this.showPhones = false;
				this.unbindOk = false;
				this.showBindPhone = false;
			},
/*绑定手机的样式显示*/
			showWechat() {
				this.showDialog = true;
				this.showWhat = true;
				this.showCall = false;
				this.showOk = true;
				this.showPwd = false;
			},
           bindEmails(){
           	this.showDialog = true;
           	this.showEmail = true;
           	this.bindEml= true;
           },
           bindsEml(){
           	this.showDialog = true;
           	this.showEmail = true;
           	this.bindEml= true;
           	this.unbindEml = false;
           	this.showEmailoks = false;
           },
           
/*解绑手机的样式显示*/
			showBind() {
				this.showDialog = true;
				this.showEmail = true;
				this.unbindEml = true;
				this.bindEml = false;
				this.showEmailoks = false;
				this.send = false;
			},
			showbindPhone() {
				this.showDialog = true;
				this.bindCall = true;
				this.showBindPhone = true;
				this.showPwd = false;
				this.bindOk = false;
				this.showCall = true;
				this.showCallok = false;
				this.showPhones = false;
				this.unbindOk = false;
			},
/*解绑手机的样式显示*/
			nobinds(){
				this.showOk = true;
				this.showDialog = true;
				this.showConfim = true;
				this.showCall = false;
				this.showEml = false;
				this.showPwd = false;
				this.showWhat = false;
				this.showWx = true;
				this.confims = true;
			},
			getData() {
				let _this = this;
				getShopinfo({
					get_shopinfo_base: 1
				}, function(resp) {
					_this.shopinfo = resp.data.shopinfo;
					_this.imageUrl = _this.shopinfo.shop_logo;
					if(_this.phone===''){
						_this.phone = _this.shopinfo.telephone;
					}
					
				});
				getShopinfo({
					get_shopinfo_edit: 1
				}, function(resp) {
					_this.shopsystem = resp.data.shopinfo;
					_this.system = Startsystem.code;
					_this.pay = Payway.code;
					_this.paytime = PayTime.code;
					_this.sale = Saleway.code;
					_this.invos = Invoce.code;
					_this.rutime = Dinnertime.code;
					_this.shopsystem.opening_time.forEach((item)=>{
						let typ = _this.rutime[item.type];
						let Shh = item.from.hh;
						let Smm = item.from.mm;
						let Sss = item.from.ss;
						let Ehh = item.to.hh;
						let Emm = item.to.mm;
						let Ess = item.to.ss;
						let Stime = `${Shh}:${Smm}:${Sss}`;
						let Etime = `${Ehh}:${Emm}:${Ess}`;
						_this.sTime.push(typ,Stime,Etime);
					});
						let mo = _this.sTime[0];
						let mstimes = _this.sTime[1];
						let metimes = _this.sTime[2];
						let moTime = `${mo}:${mstimes} - ${metimes}`;
						let no = _this.sTime[3];
						let nstimes = _this.sTime[4];
						let netimes = _this.sTime[5];
						let noTime = `${no}:${nstimes} - ${netimes}`; 
						let evo = _this.sTime[6];
						let evstimes = _this.sTime[7];
						let evetimes = _this.sTime[8];
						let evoTime = `${evo}:${evstimes} - ${evetimes}`; 
						let nio = _this.sTime[9];
						let nistimes = _this.sTime[10];
						let nietimes = _this.sTime[11];
						let nioTime = `${nio}:${nistimes} - ${nietimes}`;
						if(moTime!=='undefined'){
							_this.Times.push(moTime);
						}
						if(noTime!=='undefined'){
							_this.Times.push(noTime);
						}
						if(evoTime!=='undefined'){
							_this.Times.push(evoTime);
						}
						if(nioTime!=='undefined'){
							_this.Times.push(nioTime);
						}
				});
				getShopinfo({
					get_shop_business: 1,
				}, function(resp) {
					_this.shopsbusiness = resp.data.shopsbusiness
					let time1 = _this.shopsbusiness.business_date.slice(1, length - 1);
					let arr = time1.split(',');
					let time2 = arr[0];
					let time3 = arr[1];
					let stime = Util.TimeTo(time2, 'yyyy-MM-dd');
					let etime = Util.TimeTo(time3, 'yyyy-MM-dd');
					_this.dates.push(stime, etime);
				});
			},
			clearErrTip() {
				this.isShowErrtip = false;
				this.error = false;
				this.error2 = false;
				this.error3 = false;
				this.error4 = false;
			},

/*绑定邮箱*/
			bindMail(){
				if(!Confimemail(this.email)){
					return ;
				};
				let data = {
					bind_email:1,
					shop_id:this.shopinfo.shop_id,
					email:this.email
				}
			
				Bindemail(data,this.showEmailok)
			},
			showEmailok(resp){
				if(resp.ret===0){
					this.showDialog = true;
					this.send = true;
					this.showEmailoks = true;
					this.showEmail = false;
					this.unbindOk = false;
					let Email = this.email.split('@')[1];
					this.hrf = Hash[Email];
					let _this = this;
					let timer = setTimeout(_this.getData,2000);
					if(this.shopinfo.email!==''){
						clearInterval(timer)
					}
				}else{
					alert('保存失败')
				}
			},
/*绑定邮箱*/

/*解绑邮箱*/
			unbindEmail(){
				let data = {
					unbind_email:1,
					shop_id:this.shopinfo.shop_id
				}
				Unbindemail(data,this.showUnbindEmail);
			},
			showUnbindEmail(resp){
				if(resp.ret===0){
					this.showDialog = true;
					this.sends = true;
					this.showEmailoks = true;
					this.showEmail = false;
					this.unbindOk = false;
					let Email = this.shopinfo.email.split('@')[1];
					this.hrf = Hash[Email];
					let _this = this;
					let timer = setTimeout(_this.getData,2000);
					if(this.shopinfo.email!==''){
						clearInterval(timer)
					}
				}else{
					alert('保存失败')
				}
			},
/*解绑邮箱*/			
			bindok(){
				this.bindPhoneok= false;
				this.showDialog = false;
				this.showEmailoks = false;
			},
/*绑定手机号验证*/
			bindPhone(){
				if(!ConfimPhone(this.phone)){
					this.error4 = true;
					this.isShowErrtip = true;
					return;
				}
				this.token=window.Store.GetGlobalData('token');
				let data = {
					get_coke:1,
					phone:this.phone,
					page_code:this.form.code,
					token:this.token
				}
				BindPhone(data,this.BindPhone);
			},
			BindPhone(resp){
				if(resp.ret===errcode.IMG_ERRL){
					this.error = true;
					this.isShowErrtip = true;
				}else{
					this.setTimerDown();
				}
			},
			 //60s验证码
        setTimerDown() {
            let sec = 60;
            for (let i = 0; i <= 60; i++) {
                setTimeout(() => {
                    if (sec != 0) {
                        // debugger;
                        this.rewshow = true;
                        this.rewMsg = sec + "s 后重新获取";
                        sec--;
                    } else {
                        sec = 60;//如果倒计时结束就让  获取验证码显示出来
                        this.showCallok = true;
                        this.rewshow = false;
                        this.checkMsg = "获取验证码"
                    }
                }, i * 1000)
            }
        },
			bindPhones(){
				if(this.form.code===''&& this.phone===''&& this.phone_code===''){
					this.isShowErrtip = true;
					this.error3 = true;
					return;
				}
				let data = {
					bind_phone:1,
					token:this.token,
					phone:this.phone,
					phone_code:this.phone_code
				}
				BindPhones(data,this.BindPhones);
			},
			
			BindPhones(resp){
			if(resp.ret===errcode.MESSAGE_ERR){
					this.error2 = true;
					this.isShowErrtip = true;
				}else if(resp.ret===0){
					this.bindPhoneok = true;
					this.showCallok = true;
					this.showCall = false;
					this.bindOk = true;
					this.showPhones = true;
					this.unbindOk = false;
					this.confims = true;
					this.cls = false;
				}
			},
/*绑定手机号验证*/			
/*解绑手机号验证*/
			unbindPhone(){
				let data = {
					unbind_phone:1,
					token:this.token,
					phone_code:this.phone_code
				}
				UnbindPhone(data,this.UnbindPhone);
			},
			UnbindPhone(resp){
				if(resp.ret===0){
					this.unBindPhoneok = true;
					this.unBindPhone = true;
					this.showCall = false;
					this.unbindEml = false;
					this.showPhones = true;
					this.unbindOk = true;
					this.cls = true;
				}else{
					alert('失败')
				}
			},
			
			uNbindPhone(){
				let data = {
					get_unbind_code:1,
					token:this.token,
					page_code:this.form.code
				}
				UNbindPhone(data,this.UNbindPhone);
			},
			UNbindPhone(resp){
				if(resp.ret===errcode.IMG_ERRL){
					this.error = true;
					this.isShowErrtip = true;
				}else{
					this.setTimerDown();
					this.showCallok = false;
					
				}
			}
/*解绑手机号验证*/
		}
	};
</script>

<style lang="scss" scoped>
	@import 'src/styles/mixin.scss';
	.warp {
		background: #fff;
		.nobind {
			color: $rd;
			letter-spacing: 0.44px;
		}
		.sz {
			font-size: 12px;
		}
		.lt {
			padding-left: 24px;
		}
		.rt {
			margin-right: 12px;
		}
		.cal{
			margin-left: 10px;
		}
		.wx{
			margin-left: 40px;
		}
		.bd{
			margin-left: 38px;
		}
		.bds{
			margin-left: 40px;
		}
		.rd{
			margin-right:16px;
		}
		.ld{
			margin-left:24px;
		}
		.ph{
			margin-right: 14px;
		}
		.unbd{
			background:#9b9b9b;
			position: absolute;
			right: 90px;
			top: 5px;
			display: inline-block;
			@include wh(100px,
			24px);
			@include fc(12px,
			#fff);
			line-height: 24px;
			border-radius: 2px;
			cursor: pointer;
			text-align: center;
		}
		button{
			cursor: pointer;	
		}
		.reset {
            height: 35px;
            padding-top: 6px;
            margin-left: 20px;

            img {
                @include wh(24px, 24px);
                cursor: pointer;
            }
        }
		.title {
			@include fc($sizes, $grey);
			height: 40px;
			line-height: 40px;
			background: #F6F8FC;
			.edit {
				cursor: pointer;
				position: relative;
				color: $blue;
				padding-right: 14px;
				&:before {
					position: absolute;
					left: -8px;
					top: 10px;
					content: '';
					@include wh(20px, 20px);
					background: url('../img/edit.png')no-repeat;
				}
			}
		}
		.basicInformation {
			text-indent: 14px;
			.main {
				width: 50%;
				height: 318px;
			}
			.shopIcon {
				@include wh(100px,
				100px);
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
						@include fc(16px,
						#333333);
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
				margin-top: 94px;
				width: 50%;
			}
			.rfs {
				position:relative;
				display: inline-block;
				width: 88px;
				text-align: right;
			}
			.changePassword {
				width: 160px;
				margin-left: 17px;
			}
		}
		.industrialInformation {
			text-indent: 14px;
			padding-top: 40px;
			.info {
				.lf {
					width: 50%;
				}
				.rf {
					width: 50%;
				}
				.content {
					.dentificationCard {
						margin-left: 14px;
						margin-bottom: 10px;
						@include wh(200px,
						120px);
						background: #e1e1e1;
						img {
							width: 100%;
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
				.lf {
					width: 50%;
				}
				.rf {
					width: 50%;
				}
				.shopPhotos {
					.img-list {
						float: left;
						@include wh(100px,
						100px);
						background: #e1e1e1;
						margin: 0 10px 15px 15px;
						img {
							width: 100%;
							height: 100%;
							display: block;
						}
					}
				}
			}
		}
		.publicNumber {
			padding-top: 40px;
			text-indent: 14px;
			.info {
				@include fc($sizes,
				$grey);
				padding-bottom: 50px;
				.code {
					padding-top: 20px;
				}
				.codeIcon {
					@include wh(100px,
					100px);
					background: #e1e1e1;
					margin: 10px 0 20px 14px;
				}
				.shopIntroduction {
					line-height: 20px;
				}
			}
		}
	}
	/*朦层*/
	
	.mask {
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
	
	.dialog {
		position: absolute;
		z-index: 10000000;
		left: 50%;
		top: 30%;
		width: 540px;
		margin-left: -270px;
		background: #ffffff;
		text-align: center;
		.titles {
			height: 40px;
			line-height: 40px;
			@include fc(16px,
			#ffffff);
			text-align: center;
		}
		.text {
			width: 450px;
			line-height: 36px;
		}
		.error {
			@include fc(12px,
			$rd);
			padding-right: 110px;
		}
		.blk {
			@include fc(14px,
			#000000);
		}
		.confimIcon {
			position: relative;
			display: inline-block;
			@include wh(160px,
			34px);
			background: #eeeeee;
		}
		.rew {
			position: absolute;
			right: 90px;
			top: 5px;
			background: #4877E7;
			display: inline-block;
			@include wh(100px,
			24px);
			@include fc(12px,
			#fff);
			line-height: 24px;
			border-radius: 2px;
			cursor: pointer;
			text-align: center;
		}
	}
	.phone{
		    position: absolute;
    z-index: 10000000;
    left: 50%;
    top: 30%;
    width: 540px;
    margin-left: -270px;
    background: #ffffff;
    text-align: center;
    .titles {
			height: 40px;
			line-height: 40px;
			@include fc(16px,
			#ffffff);
			text-align: center;
		}
		.rew {
			position: absolute;
			right: 90px;
			top: 5px;
			background: #4877E7;
			display: inline-block;
			@include wh(100px,
			24px);
			@include fc(12px,
			#fff);
			line-height: 24px;
			border-radius: 2px;
			cursor: pointer;
			text-align: center;
		}
			.dialog-footer {
			padding: 46px 0 50px 0;
			font-size: 0;
			.primary {
			
				background: $blue;
				@include wh(160px,
				40px);
				line-height: 40px;
				@include fc(14px,
				#ffffff);
				border: 1px solid $blue;
				border-radius: 5px;
				cursor: pointer;
			}
			.default {
				@include wh(160px,
				40px);
				background: #fff;
				border: 1px solid $blue;
				@include fc(14px,
				$blue);
				border-radius: 5px;
				margin-left: 60px;
				cursor: pointer;
			}
		}
	}
	.emails{
		position: absolute;
    z-index: 10000000;
    left: 50%;
    top: 30%;
    width: 540px;
    margin-left: -270px;
    background: #ffffff;
    text-align: center;
    .titles {
			height: 40px;
			line-height: 40px;
			@include fc(16px,
			#ffffff);
			text-align: center;
		}
		.dialog-footer {
			padding: 46px 0 50px 0;
			font-size: 0;
			.primary {
			
				background: $blue;
				@include wh(160px,
				40px);
				line-height: 40px;
				@include fc(14px,
				#ffffff);
				border: 1px solid $blue;
				border-radius: 5px;
				cursor: pointer;
			}
			.default {
				@include wh(160px,
				40px);
				background: #fff;
				border: 1px solid $blue;
				@include fc(14px,
				$blue);
				border-radius: 5px;
				margin-left: 60px;
				cursor: pointer;
			}
		}
	}
	.ok {
		position: absolute;
		z-index: 10000001;
		left: 50%;
		top: 50%;
		@include wh(440px,
		280px);
		background: #ffffff;
		border-top: 4px solid $blue;
		margin-left: -220px;
		margin-top: -140px;
		text-align: center;
		.header{
			padding-top:76px;
			@include fc(14px,#666);
			.pwd {
				position: relative;
				padding-left: 70px;
				&:before {
					position: absolute;
					left: 0px;
					top: -16px;
					content: '';
					@include wh(50px,
					50px);
					background: url(../img/success.png)no-repeat;
				}
			}
		}
		.bottom{
			margin-top: 50px;
			.primary {
					display: inline-block;
				background: $blue;
				@include wh(160px,
				40px);
				line-height: 40px;
				color: #fff;
				border: 1px solid $blue;
				border-radius: 5px;
				cursor: pointer;
			}
		}
			
			.weixin{
				position: relative;
				padding-left: 70px;
				&:before {
					position: absolute;
					left: 0px;
					top: -16px;
					content: '';
					@include wh(50px,
					50px);
					background: url(../img/question_img_normal.png)no-repeat;
				}
			}
			.text {
				@include wh(380px,
				38px);
				@include fc(14px,
				#333);
				margin: 0 auto;
				text-align: justify;
				letter-spacing: 0.5px;
			}
			.email {
				color: $rd;
			}
		
		
	}
	.bottom {
			padding:30px 0 50px 0;
			.primary {
					display: inline-block;
				background: $blue;
				@include wh(160px,
				40px);
				line-height: 40px;
				color: #fff;
				border: 1px solid $blue;
				border-radius: 5px;
				cursor: pointer;
			}
			.default {
				@include fc(14px,
				#4877E7);
				background: #ffffff;
				@include wh(160px,
				40px);
				line-height: 40px;
				border-radius: 6px;
				border: 1px solid #4877E7;
				margin-left: 50px;
			}
		}
	/*公用样式*/
	
	.black {
		@include fc($sizes,
		$black);
	}
	
	.or {
		@include fc($sizes,
		$or);
	}
	
	.blue {
		background: $blue;
	}
	
	.gr {
		color: $green;
	}
	
	.content {
		@include fc($sizes,
		$grey);
		p {
			line-height: 34px;
		}
	}
	
	.info {
		margin-top: 40px;
	}
	
	input {
		border: 1px solid #d9d9d9;
		@include wh(280px,
		34px);
		line-height: 34px;
		@include fc(12px,
		#d9d9d9);
		margin-left: 14px;
		padding-left: 10px;
	}
	.txt {
			width: 450px;
			line-height: 36px;
		}
</style>
<style lang="scss">
	@import 'src/styles/mixin.scss';
	#main {
		form {
			margin-top: 40px;
		}
		.el-input,
		.el-input__inner {
			@include wh(280px, 34px);
			border-radius: 0;
			display: inherit;
			@include fc(12px, #000000);
		}
		.el-form-item {
			margin-top: 20px;
			margin-bottom: 0;
		}
		.el-form-item__content {
			line-height: 36px;
			position: relative;
			font-size: 14px;
			text-align: left;
		}
		.errtip {
			.el-input-group__prepend {
				border-color: red;
			}
			input {
				border-color: red;
			}
			input.el-input__inner:hover {
				border-color: red;
			}
			input.el-input__inner:focus {
				border-color: red;
			} 
		}
	}
</style>