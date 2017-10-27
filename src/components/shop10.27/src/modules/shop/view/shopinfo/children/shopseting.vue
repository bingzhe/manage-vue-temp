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
						<button type="button" class="start" v-for="(item,index)  in buttons" 
							@click='satrt(index)' :class="{'active':Zindex==index}">{{item}}</button>
						<p class="injection">注：选暂停时，客人手机上会显示为系统升级维护中</p>
					</el-form-item>
					<el-form-item class='main' label='启用支付方式'>
						<el-checkbox-group v-model="pay">
							<el-checkbox-button v-for="payment in Payments" :label="payment.idx" :key="payment.text">
								{{payment.text}}
							</el-checkbox-button>
						</el-checkbox-group>
					</el-form-item>
					<el-form-item class='main' label='订单付款时间'>
						<el-checkbox-group v-model="timePay">
							<el-checkbox-button v-for="paytimed in Paytime" :label="paytimed.idx " :key="paytimed.text ">
								{{paytimed.text}}
							</el-checkbox-button>
						</el-checkbox-group>
					</el-form-item>
					<el-form-item class='main' label='销售方式'>
						<el-checkbox-group v-model="dinner">
							<el-checkbox-button v-for="sells in sell" :label="sells.idx " 

:key="sells.text ">{{sells.text}}</el-checkbox-button>
						</el-checkbox-group>
					</el-form-item>
					<el-form-item class='main' label='餐厅标签'>
						<el-checkbox-group v-model="shoplabel">
							<el-checkbox-button v-for="rastuan in restauran " 

:label="rastuan.text " :key="rastuan.text">{{rastuan.text}}</el-checkbox-button>
							<span class="add" @click="addlabel"></span>
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
							<el-checkbox :label="Dinnertime.MORN" name="type">{{Dinnertime.toString(Dinnertime.MORN)}}</el-checkbox>
							<el-time-picker v-model="value4" :picker-options="{
						      selectableRange: '00:00:00 - 23:59:59'
						    }">
							</el-time-picker>
							<el-time-picker v-model="value5" :picker-options="{
						      selectableRange: '00:00:00 - 23:59:59'
						    }">
							</el-time-picker>
							<el-checkbox :label="Dinnertime.NOON" name="type">{{Dinnertime.toString(Dinnertime.NOON)}}</el-checkbox>
							<el-time-picker v-model="value6" :picker-options="{
						      selectableRange: '10:01:00 - 23:59:59'
						    }">
							</el-time-picker>
							<el-time-picker v-model="value7" :picker-options="{
						      selectableRange: '10:01:00 - 23:59:59'
						    }">
							</el-time-picker>
							<el-checkbox :label="Dinnertime.EVEN" name="type">{{Dinnertime.toString(Dinnertime.EVEN)}}</el-checkbox>
							<el-time-picker v-model="value8" :picker-options="{
						      selectableRange: '16:30:00 - 23:59:59'
						    }">
							</el-time-picker>
							<el-time-picker v-model="value9" :picker-options="{
						      selectableRange: '16:31:00 - 23:59:59'
						    }">
							</el-time-picker>
							<el-checkbox :label="Dinnertime.NIGHT" name="type">{{Dinnertime.toString(Dinnertime.NIGHT)}}</el-checkbox>
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
						<button type="button" class='noInvoice left' @click='shows' 

:class="{'active':show===Invoce.NO}">{{Invoce.toString(Invoce.NO)}}</button>
						<span class="line"></span>
						<button type="button"  class="paperInvoice" @click='showInvos' 

:class="{'selectd':showinvos===Invoce.PAPERINVOICE}">{{Invoce.toString(Invoce.PAPERINVOICE)}}</button>
						<button type="button"  class="electronicInvoice" @click='addCls' 

:class="{'selectd':showinvs===Invoce.ELECTRONICINVOICE}" >{{Invoce.toString(Invoce.ELECTRONICINVOICE)}}</button>
					</el-form-item>
					<el-form-item class='paperTickets' label="纸票" v-show='showvos'>
						<el-checkbox-group v-model="invoicetype">
							<el-checkbox-button v-for="papers in paper" :label="papers.idx" 

:key="papers.text">{{papers.text}}</el-checkbox-button>
						</el-checkbox-group>
						 
					</el-form-item>
					<el-form-item label="发票备注">
						<el-input type='textarea' v-model='remark' placeholder='备注文字总数不得超过120字'></el-input>
					</el-form-item>
					<el-form-item class='clearfix' label="店铺图片">
						<div class="busPic left">
							<img :src="imgbase_url + '/img_get.php?img=1&height=69&width=69&imgname=' + shopsystem.img_list[0] " alt="商家图片" />
						</div>
						<div class="picInfo left">
							<el-upload class="upload-demo" action="https://baidu.com"><!-- 暂未实现-->
								<el-button size="small" type="primary">上传</el-button>
							</el-upload>
							<div class="text-warp">
								<p class="text top">注：支持JPG、JPEG、PNG文件格式，大小不得大于2M</p>
							</div>
						</div>
					</el-form-item>
					<div class="bottom">
						<button type="button" class="blue" @click="save">保存</button>
						<button type="button" class="default" @click="goBack">取消</button>
					</div>
				</el-form>
			</div>
		</section>
		 <!-- 餐厅标签编辑弹窗 -->
        <tg
        :dialogVisible="dialogVisible"
        :selectArr="shoplabel"
        :tagObj="labelObj"
        @on-close="hideDialog"
        @on-change='getLabel'
        ></tg>
	</div>
</template>

<script>
	import { shopSeting,getShopinfo } from '../../../api';
	import { Subtime,addZero,Tranobj } from '../../../index';
	import tg  from '../../../../merchandise/components/tagEditor';
	import { Util } from '@/config/util';
	import { Invoce,Startsystem,Payway,PayTime,Saleway,Restauran,Invoice,Dinnertime } from '@/config/cfg';
	export default {
		components:{
			tg
		},
		data() {
			return {
				dialogVisible:false,
				show:Invoce.YES,
				showinvos:Invoce.NO,
				showvos:Invoce.SHOWPAPERINVOICE,
				showinvs:Invoce.NO,
				buttons: [Startsystem.toString(Startsystem.START),Startsystem.toString(Startsystem.PAUSE)],
/*支付方式*/
				pay: [],
				Payments: [{
						text:Payway.toString(Payway.CASHPAYMENT),
						idx: Payway.CASHPAYMENT
					},
					{
						text:Payway.toString(Payway.CARDPAYMENT),
						idx:Payway.CARDPAYMENT
					},
					{
						text: Payway.toString(Payway.ALIPAY),
						idx: Payway.ALIPAY
					},
					{
						text:Payway.toString(Payway.WECHATPAY),
						idx: Payway.WECHATPAY
					}
				],
/*支付方式*/

/*付款时机*/
				timePay: [],
				Paytime: [{
						text:PayTime.toString(PayTime.BEFOREPAY),
						idx: PayTime.BEFOREPAY
					},
					{
						text:PayTime.toString(PayTime.AFTERPAY),
						idx:PayTime.AFTERPAY
					}
				],
/*付款时机*/

/*用餐方式*/
				dinner: [],
				sell: [{
						text:Saleway.toString(Saleway.SHOPEAT),
						idx:Saleway.SHOPEAT
					},
					{
						text:Saleway.toString(Saleway.PACKAGING),
						idx: Saleway.PACKAGING
					},
					{
						text:Saleway.toString(Saleway.TAEOUT),
						idx: Saleway.TAEOUT
					},
					{
						text:Saleway.toString(Saleway.PICKUP),
						idx: Saleway.PICKUP
					}
				],
/*用餐方式*/

/*餐厅标签*/
				shoplabel: [],
				restauran: [{
						text:Restauran.toString(Restauran.HUNANCUISINE),
						idx: Restauran.HUNANCUISINE
					},
					{
						text:Restauran.toString(Restauran.CANTONESE),
						idx:Restauran.CANTONESE
					},
					{
						text:Restauran.toString(Restauran.SZECHUANCUISINE),
						idx:Restauran.SZECHUANCUISINE
					}
				],
/*餐厅标签*/
/*发票分类*/
				invoicetype:[],
				paper: [{
						text:Invoice.toString(Invoice.PLIANINVOICE),
						idx: Invoice.PLIANINVOICE
					},
					{
						text: Invoice.toString(Invoice.SPECIALINVOICE),
						idx: Invoice.SPECIALINVOICE
					}
				],
/*发票分类*/
				Zindex: 2, //控制启用 还是暂停系统 ， 默认是未知。
				shopsystem: {
					img_list:[]   //店铺图片
				},
	/*获取时间*/
				value2: '', //营业时间开始
				value3: '', //营业时间结束
				value4: '',//早市开始时间
				value5: '',//早市结束时间
				value6: '',//午市开始时间
				value7: '',//午市结束时间
				value8: '',//晚市开始时间
				value9: '',//晚市结束时间
				value10: '',//夜宵开始时间
				value11: '',//夜宵结束时间
    /*获取时间*/
				type:[],      //选中的餐时保存数组  如：早市
				times: [],     //营业时间
				remark: '',    //发票备注
				imgbase_url: imgbase_url , //图片路径
				opening_time:[], //餐时设置
				invoies:{    //发票
						is_invoice:Invoce.YES, //支持与不支持发票
						invoice_type:[]  //支持发票类型
				        },
				startHH:[], //餐时设置开始的小时数组
				startMM:[],//餐时设置开始的分钟数组
				startSS:[],//餐时设置开始的秒数组
				endHH:[],//餐时设置结束的小时数组
				endMM:[],//餐时设置结束的分钟数组
				endSS:[],//餐时设置结束的秒数组
				labelObj:{
					name:'餐厅标签',
					value:'shop_label',
					limitNum: 30,
				    limitWord: 5,
				    limitSelect: 5
				}
			};
		},
		created() {
			this.getData();  //调用请求数据
		},
		mounted() {

		},
		computed: {
			Invoce() {
				return Invoce;
			},
			Startsystem(){
				return Startsystem;
			},
			Payway(){
				return Payway;
			},
			PayTime(){
				return PayTime;
			},
			Saleway(){
				return Saleway;
			},
			Restauran(){
				return Restauran;
			},
			Invoice(){
				return Invoice;
			},
			Dinnertime(){
				return Dinnertime;
			}
		},
		methods: {
	//不提供发票点击事件
			shows() {
				this.show = Invoce.NO;
				this.showinvos = Invoce.NO;
				this.showinvs = Invoce.NO;
				this.showvos = Invoce.NO;
			},
	//系统按钮点击事件
			satrt(index) {
				this.Zindex = index;
			},
	//保存数据
			save() {
				let time1 = Subtime(this.value2);
				let time2 = Subtime(this.value3);
				this.times = [];
				if(time1!==''&&time2!==''){
					this.times.push(time1, time2);
				}
				
				
				if(this.times.length!==0 && this.pay.length!==0 && this.shoplabel.length!==0 && this.pay.length!==0 && this.timePay.length!==0 && this.opening_time.length!==0){
					this.$router.go(-1);
				}
				if(this.show !== Invoce.YES || this.showinvos !== Invoce.NO || this.showinvs!==Invoce.NO) {
								this.$router.go(-1);
				}
				
				if(this.show === Invoce.YES && this.showinvs!==Invoce.NO && this.invoicetype.indexOf(this.showinvs)===-1){
					this.invoicetype.push(this.showinvs)
				}
				this.invoies.invoice_type = this.invoicetype;	
				let data = {
					shopinfo_save: 1,
					suspend: this.Zindex,
					is_invoice_vat:this.invoies,
					shop_pay_way: this.pay,
					pay_time: this.timePay,
					sale_way: this.dinner,
					shop_label: this.shoplabel,
					open_time: this.times,
					invoice_remark: this.remark,
					opening_time:this.opening_time
				};
				this.getInfo();
				shopSeting(data, this.alts);
			},
			//保存数据成功的回调
			alts(resp) {
					if(resp.ret === 0) {
						
					}else {
						alert('保存失败');
				    }
					
			},
			
	//遍历选中餐时	
		getInfo(){
			this.setStime();
			this.setEtime();
			this.type.forEach((item,index)=>{
			let time = {
					type:null,
					from:{},
					to:{}
			};
			let froms = {},tos = {};
			froms.hh = this.startHH[index];
			froms.mm = this.startMM[index];
			froms.ss = this.startSS[index];
			tos.hh = this.endHH[index];
			tos.mm = this.endMM[index];
			tos.ss = this.endSS[index];
			time.from = froms;
			time.to = tos;
			time.type = item;
			this.opening_time.push(time);
		});
			
    },
     
	//保存餐时开始的时间
	    setStime(){
	    		let t1 = new Date(this.value4);
				let hh1 = addZero(t1.getHours().toString());
				let mm1 = addZero(t1.getMinutes().toString());
				let ss1 = addZero(t1.getSeconds().toString());
				let t2 = new Date(this.value6)
				let hh2 = addZero(t2.getHours().toString());
				let mm2 = addZero(t2.getMinutes().toString());
				let ss2 = addZero(t2.getSeconds().toString());
				let t3 = new Date(this.value8);
				let hh3 = addZero(t3.getHours().toString());
				let mm3 = addZero(t3.getMinutes().toString());
				let ss3 = addZero(t3.getSeconds().toString());
				let t4 = new Date(this.value10)
				let hh4 = addZero(t4.getHours().toString());
				let mm4 = addZero(t4.getMinutes().toString());
				let ss4 = addZero(t4.getSeconds().toString());
				this.startHH.push(hh1,hh2,hh3,hh4);//4个餐时的开始小时
				this.startMM.push(mm1,mm2,mm3,mm4);//4个餐时的开始分钟
				this.startSS.push(ss1,ss2,ss3,ss4);//4个餐时的开始秒
	    },
		
	//保存餐时结束的时间
	     setEtime(){
	     		let e1 = new Date(this.value5);
				let hh1 = addZero(e1.getHours().toString());
				let mm1 = addZero(e1.getMinutes().toString());
				let ss1 = addZero(e1.getSeconds().toString());
				let e2 = new Date(this.value7)
				let hh2 = addZero(e2.getHours().toString());
				let mm2 = addZero(e2.getMinutes().toString());
				let ss2 = addZero(e2.getSeconds().toString());
				let e3 = new Date(this.value9);
				let hh3 = addZero(e3.getHours().toString());
				let mm3 = addZero(e3.getMinutes().toString());
				let ss3 = addZero(e3.getSeconds().toString());
				let e4 = new Date(this.value11)
				let hh4 = addZero(e4.getHours().toString());
				let mm4 = addZero(e4.getMinutes().toString());
				let ss4 = addZero(e4.getSeconds().toString());
				this.endHH.push(hh1,hh2,hh3,hh4);//4个餐时的结束小时
				this.endMM.push(mm1,mm2,mm3,mm4);//4个餐时的结束分钟
				this.endSS.push(ss1,ss2,ss3,ss4);//4个餐时的结束秒
	     },
	//获取数据
			getData(){
					let _this = this;
					let t = new Date();
					let year = t.getFullYear();
					let mon = t.getMonth()+1;
					let dats = t.getDate();
					getShopinfo({
					get_shopinfo_edit: 1
					}, function(resp) {
					_this.shopsystem = resp.data.shopinfo;
					_this.Zindex = _this.shopsystem.suspend;
					_this.invoies = _this.shopsystem.is_invoice_vat;
					_this.show = _this.invoies.is_invoice;
					_this.invoicetype = _this.invoies.invoice_type;
					if(_this.invoicetype.length>=3){    //如果长度大于等于3 就把从数组删除
						_this.showinvs = _this.invoicetype.pop();
					}
					if(_this.invoicetype.length===1 && _this.invoicetype.indexOf(Invoce.ELECTRONICINVOICE)!==-1){//如果长度等于1并且第一个下标的数字是3改变纸质发票的选中状态 纸票子类的显示与隐藏
						_this.showinvs = _this.invoicetype.pop();
						_this.showinvos = Invoce.NO;
						_this.showvos = Invoce.NO;
					}
					if(_this.invoicetype.indexOf(Invoce.YES)!==-1||_this.invoicetype.indexOf(Invoce.PAPERINVOICE)!==-1){//如果数组里面有1或2就改变纸质发票的选中状态
					 	_this.showinvos = Invoce.PAPERINVOICE;
					 }
					if(_this.show===Invoce.NO){
					 	_this.showinvos = Invoce.NO;
					 	_this.showvos = Invoce.NO;
					}
					_this.pay = _this.shopsystem.shop_pay_way;
					_this.timePay = _this.shopsystem.pay_time;
					_this.dinner = _this.shopsystem.sale_way;
					_this.shoplabel = _this.shopsystem.shop_label;
					_this.times = _this.shopsystem.open_time;
					_this.remark = _this.shopsystem.invoice_remark;
					if(_this.times.length!==0){
						let arr = Tranobj(_this.times[0]).split(',');
					let hour = arr[0];
					let min = arr[1];
					let second = arr[2];
					_this.value2 =new Date(year,mon,dats,hour,min,second);
					
					let arr2 = Tranobj(_this.times[1]).split(',');
					let hours = arr2[0];
					let mins = arr2[1];
					let secons = arr2[2];
					_this.value3 = new Date(year,mon,dats,hours,mins,secons);	
					}
					
/*餐时设置*/
					_this.shopsystem.opening_time.forEach((item)=>{
					let typ = item.type;
					if(typ!==0){
						_this.type.push(typ);
					}
				 });
				 	if(_this.shopsystem.opening_time.length!==0){
				 	let msHH = ((_this.shopsystem.opening_time[0]||{}).from||{}).hh;
					let msMM = ((_this.shopsystem.opening_time[0]||{}).from||{}).mm;
					let msSS = ((_this.shopsystem.opening_time[0]||{}).from||{}).ss;
					_this.value4 = new Date(year,mon,dats,msHH,msMM,msSS);
					}
				 	if(_this.shopsystem.opening_time.length!==0){
					let meHH = ((_this.shopsystem.opening_time[0]||{}).to||{}).hh;
					let meMM = ((_this.shopsystem.opening_time[0]||{}).to||{}).mm;
					let meSS = ((_this.shopsystem.opening_time[0]||{}).to||{}).ss;
					_this.value5 = new Date(year,mon,dats,meHH,meMM,meSS);
					}
				 	if(_this.shopsystem.opening_time.length!==0){
					let nsHH = ((_this.shopsystem.opening_time[1]||{}).from||{}).hh;
					let nsMM = ((_this.shopsystem.opening_time[1]||{}).from||{}).mm;
					let nsSS = ((_this.shopsystem.opening_time[1]||{}).from||{}).ss;	
					_this.value6 = new Date(year,mon,dats,nsHH,nsMM,nsSS);
					}
				 	if(_this.shopsystem.opening_time.length!==0){
					let neHH = ((_this.shopsystem.opening_time[1]||{}).to||{}).hh;
					let neMM = ((_this.shopsystem.opening_time[1]||{}).to||{}).mm;
					let neSS = ((_this.shopsystem.opening_time[1]||{}).to||{}).ss;
					_this.value7 = new Date(year,mon,dats,neHH,neMM,neSS);
					}
				 	if(_this.shopsystem.opening_time.length!==0){
					let esHH = ((_this.shopsystem.opening_time[2]||{}).from||{}).hh;
					let esMM = ((_this.shopsystem.opening_time[2]||{}).from||{}).mm;
					let esSS = ((_this.shopsystem.opening_time[2]||{}).from||{}).ss;	
					_this.value8 = new Date(year,mon,dats,esHH,esMM,esSS);
					}
				 	if(_this.shopsystem.opening_time.length!==0){
					let eeHH = ((_this.shopsystem.opening_time[2]||{}).to||{}).hh;
					let eeMM =((_this.shopsystem.opening_time[2]||{}).to||{}).mm;
					let eeSS = ((_this.shopsystem.opening_time[2]||{}).to||{}).mm;	
					_this.value9 = new Date(year,mon,dats,eeHH,eeMM,eeSS);
					}
				 	if(_this.shopsystem.opening_time.length!==0){
					let gsHH = ((_this.shopsystem.opening_time[3]||{}).from||{}).hh;
					let gsMM = ((_this.shopsystem.opening_time[3]||{}).from||{}).mm;
					let gsSS = ((_this.shopsystem.opening_time[3]||{}).from||{}).ss;	
					_this.value10 = new Date(year,mon,dats,gsHH,gsMM,gsSS);
					}
				 	if(_this.shopsystem.opening_time.length!==0){
					let geHH = ((_this.shopsystem.opening_time[3]||{}).to||{}).hh;
					let geMM = ((_this.shopsystem.opening_time[3]||{}).to||{}).mm;
					let geSS = ((_this.shopsystem.opening_time[3]||{}).to||{}).ss;	
					_this.value11 = new Date(year,mon,dats,geHH,geMM,geSS);
				 	}
					
/*餐时设置*/
				});
			},
			
	//跳转回店铺信息页面
			goBack() {
				this.$router.go(-1);
			},
	//纸质发票
			showInvos(){
				if(this.showinvos === Invoce.NO){
				    this.showinvos = Invoce.PAPERINVOICE;
					this.showvos = Invoce.SHOWPAPERINVOICE;
					this.show = Invoce.YES;
				}else{
					this.showinvos = Invoce.NO;
					this.showvos = Invoce.NO;
				}
			},
	//电子发票
			addCls(){
				if(this.showinvs === Invoce.NO ){
					this.showinvs = Invoce.ELECTRONICINVOICE;
					this.show = Invoce.YES;
				}else{
					this.showinvs = Invoce.NO;

				}
			},
			addlabel(){
				this.dialogVisible = true;
			},
			hideDialog() {
      			this.dialogVisible = false;
    		},
			getLabel(select){
				debugger
				this.shoplabel = select;
			}

		},
		watch:{
			show:function(newVal){
				this.invoies.is_invoice = newVal;
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
		.add{
			display: inline-block;
			@include wh(24px,24px);
			background: url(../../img/add.png)no-repeat;
			vertical-align: middle;
			cursor: pointer;
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
			padding-bottom: 50px;
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
		  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__body {
    padding: 0;
  }
  .dialog-add .el-input__inner {
    @include wh(300px, 34px);
    border-radius: 0;
  }
	}
</style>