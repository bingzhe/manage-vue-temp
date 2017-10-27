<template>
	<div class="table_list">
		<!--头部搜索-->
		<div class="search">
			<div class="btn left">
				<!--餐桌类型-->
				<span>餐桌区域</span>
				<el-select allow-create v-model="table_region" placeholder="全部">
					<el-option label="全部" value="全部">
					</el-option>
					<el-option v-for="item in  tableData " :label="item" :value="item" :key="item">
					</el-option>
				</el-select>
				<!--名称或编号-->
				<!--<el-select allow-create v-model="num" placeholder="请输入名称或编号" clearable filterable remote :remote-method="remoteMethod">
					<el-option v-for="item in  options " :label="item" :value="item" :key="item">
					</el-option>
				</el-select>-->

				<el-input placeholder="请输入名称或编号" v-model="num"></el-input>

				<!--搜索按钮-->
				<button class="blue search_button" @click="handleFilter">
					搜索
				</button>
			</div>
			<div class="btn right">
				<!--创建-->
				<router-link :to="{path:'/table/edit'}">
					<button class="blue create_button">
						新建
					</button>
				</router-link>
				<!--导出二维码-->
				<button class="blue export_button" @click="handleDownload">
						<span v-if="!multipleSelection.length">导出二维码</span>
						<a :href="downLoad" class="downLoad" v-if="multipleSelection.length">导出二维码</a>
				</button>
				<!--删除-->
				<button class=" red delete_button" @click="deleteDatasInBtnGroup()">
					删除
				</button>
			</div>
		</div>

		<!--列表-->
		<div class="table_info">
			<el-table :data="tableList" @selection-change="selectItem" style="width: 100%" stripe min-height="570" ref="tableList" @select="selectRow">
				<el-table-column type="selection" min-width="35">
				</el-table-column>
				<el-table-column prop="seat_id" label="编号" align="center" min-width="180" sortable :default-sort="{prop: 'date', order: 'descending'}">
				</el-table-column>
				<el-table-column prop="seat_name" label="餐桌台号" align="center" min-width="180">
				</el-table-column>
				<el-table-column prop="seat_region" label="餐桌区域" align="center" min-width="180">
				</el-table-column>
				<el-table-column prop="seat_type" label="餐桌类型" align="center" min-width="180">
				</el-table-column>
				<el-table-column prop="seat_shape" label="桌型" align="center" min-width="180">
				</el-table-column>
				<el-table-column prop="seat_size" label="可供就餐人数" align="center" min-width="180" sortable :default-sort="{prop: 'date', order: 'descending'}">
				</el-table-column>
				<el-table-column prop="price" label="餐位费" align="center" min-width="180" :default-sort="{prop: 'date', order: 'descending'}">
					<template scope="scope">
						<span style="margin-left: 10px">{{scope.row.price}}</span>
						<span v-if="scope.row.price_type==type.PEOPLENUM">元/人</span>
						<span v-else-if="scope.row.price_type==type.FIXED">元/桌</span>
						<span v-else-if="scope.row.price_type==type.PERCENTAGE">%</span>
						<span v-else></span>
					</template>
				</el-table-column>
				<el-table-column label="二维码" inline-template align="center" min-width="180" class="code">
					<span class="blue" type="text" size="small" @click="getQR($index,row)"><span>点击预览</span></span>
				</el-table-column>
				<el-table-column label="操作" inline-template align="center" min-width="190">
					<div class="btng">
						<span class="blue" type="text" size="small">
					
					<router-link :to="{path:'/table/edit',query:{id:row.seat_id}}">
					编辑
					</router-link>
					
				</span>
						<span class="red" type="text" size="small" @click="confirmDelete(row)">
					删除
				</span>

					</div>
				</el-table-column>
			</el-table>
			<!--分页弹框-->
			<div class="pagination-container">
				<el-pagination small @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[20,30,40,50]" :page-size="listQuery.limit" layout="sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>
		<!--删除信息弹框-->
		<div class="messageBox" v-if="deleted">
			<div class="deleteMessage">
				<div class="messageHeader">删除提醒</div>
				<p class="tableInfor">确定删除餐桌<span v-for="(id,index) in multipleSelection">{{id.seat_id}}</span>号的信息？</p>
				<div class="btn">
					<el-button @click="confirm">确定</el-button>
					<el-button @click="cancel">取消</el-button>
				</div>
			</div>
		</div>
		<!--点击预览二维码-->
		<div class="showQR" v-if="showQr">
			<span class="QR"></span>
			<button class="red close_btn" @click="closeQr">关闭</button>
		</div>
	</div>
</template>

<script>
	import { apiMethods } from '../api';
	import { commonMethods } from '../index'
	import { Public } from '@/config/public'
	import { ls } from "@/config/pageStore";
	import { seatPriceType } from "@/config/cfg"
	export default {
		data() {
			return {
				downLoad: "", //下载链接
				deleted: false, //显示删除弹框
				showQr: false, //预览二维码开关
				type: "", //餐位费支付方式
				num: "", //名称或编号
				table_region: "", //餐桌区域
				deleteNo: "", //单个删除的编号
				total: 10, //总页数
				options: [], //搜索中编号和名称对应项的集合
				tableData: [], //餐桌列表信息(搜索下拉框list)
				tableList: [], //列表中显示数据
				testList: [], //用于分页list过滤
				arr: [], //餐桌列表信息(搜索下拉框list)
				multipleSelection: [], //勾选的集合（多选）
				selectIndex: {}, //记录某页的勾选项
				tagInTableList: {}, //三个可编辑的标签历史选项，便于删除标签时查看
				listQuery: {
					page: 1,
					limit: 20
				},
			};
		},
		created() {
			console.log("刷新啦")
			this.initTableData()
		},
		methods: {
			//初始化表格信息
			initTableData() {
				//获取每页选择显示的条目数的历史记录
				if(ls.getItem("itemNum") != null) {
					this.listQuery.limit = Number(ls.getItem("itemNum"))
				}
				//获取每页选择页面的历史记录
				if(ls.getItem("pageNum") != null) {
					this.listQuery.page = Number(ls.getItem("pageNum"))
				}
				//初始化表格
				apiMethods.getTableData({
					get_seat_list: 1
				}, (resp) => {
					this.tableList = resp.data.seatlist;
					this.testList = resp.data.seatlist;
					this.total = commonMethods.getTotal(this.testList);
					this.tableList = commonMethods.getPageList(this.testList, this.listQuery.limit, this.listQuery.page);
					this.type = seatPriceType;
					this.tagInTableList = apiMethods.getUniqueList(resp.data.seatlist)
					console.log(this.tagInTableList)
					ls.setItem("hisTagObj", this.tagInTableList)
					this.tableData = apiMethods.objTansToArr(this.tagInTableList)[0];
					let arr1 = [],
						arr2 = [];
					arr1 = apiMethods.objTansToArr(this.tagInTableList)[4]
					arr2 = apiMethods.objTansToArr(this.tagInTableList)[3]
					this.arr = apiMethods.getUniqueType(arr1, arr2)
				})

			},
			//复选框
			selectItem(val) {
					this.multipleSelection = val;
					this.getSelectedIds();
			},
			//获取选中的列表的id
			getSelectedIds() {
					let array = []
					this.multipleSelection.forEach((res) => {
						array.push(res.seat_id)
					})
					return array
			},
			//单个删除
			confirmDelete(item) {
					this.deleted = true;
					this.multipleSelection = [item]
			},
			//点击确定
			confirm() {
					this.deleted = false;
					apiMethods.changeTableData({
						seat_delete: 1,
						seat_id_list: JSON.stringify(this.getSelectedIds())
					}, (resp) => {
						this.initTableData();
					})
			},
			//选择每一行，记录页面上面的选中项
			selectRow(selection, row) {
					var arr = [];
					this.testList.forEach((r, index) => {
						for(var i = 0; i < this.testList.length; i++) {
							if(r == selection[i]) {
								arr.push(index)
							}
						}
					});
					this.selectIndex[this.listQuery.page] = arr;
			},
			//点击取消
			cancel() {
					this.deleted = false;
			},
			//多选删除
			deleteDatasInBtnGroup() {
					if(!this.multipleSelection.length) {
						alert("你还没有勾选任何选项")
						return;
					}
					this.deleted = true;
			},
			//获取二维码
			getQR(index, row) {
					let shopiin = Public.getShopinfo();
					this.showQr = true
					var img = '<img src="http://www.ob.com:8080/php/img_get.php?get_seat_qrcode=1&shop_id=4&seat_id=' + row.seat_id + '" class="img"/>'
					apiMethods.getQrCode({
						shop_id: shopiin.shopinfo.shop_id,
						seat_id: row.seat_id
					}, (resp) => {
						$(".QR").html(img)
							$(".img").css({"position": "absolute",'left': '800px','top': '300px','height': '400px','width': '400px'})
					})
			},
			//点击关闭二维码
			closeQr() {
					this.showQr = false
			},
			//根据输入框的值进行搜索
			remoteMethod(query) {
					if(query !== '') {
						setTimeout(() => {
							this.options = this.arr.filter(item => {
								return item.indexOf(query) > -1;
							});
						}, 500);
					} else {
						query = "";
						this.options = [];
					}
					this.num = query
			},
			//点击搜索
			handleFilter() {
					this.total = commonMethods.getTotal(this.testList)
					this.tableList = apiMethods.search(this.table_region, this.num, this.testList)
			},

			//选择每页显示的条目数
			handleSizeChange(val) {
					this.listQuery.limit = val;
					ls.setItem("itemNum", this.listQuery.limit);
					this.tableList = commonMethods.getPageList(this.testList, this.listQuery.limit, this.listQuery.page);
					this.total = commonMethods.getTotal(this.testList)
			},
			//选择当前页码
			handleCurrentChange(val) {
					this.listQuery.page = val;
					this.total = commonMethods.getTotal(this.testList)
					this.tableList = commonMethods.getPageList(this.testList, this.listQuery.limit, this.listQuery.page);
					var allSelectIndex = this.selectIndex[val];
					var indexArr = [];
					if(allSelectIndex !== undefined) {
						for(var i in this.selectIndex[val]) {
							let index = Number(this.selectIndex[val][i] + 1)
							$(".el-checkbox__input").eq(index).addClass("is-checked")
						}
					}
					ls.setItem("pageNum", this.listQuery.page)
			},
			//点击导出
			handleDownload() {
					if(!this.multipleSelection.length) {
						alert("你还没有勾选任何选项")
						return;
					} else {
						$(".downLoad").attr("qrcode", "download")
						this.downLoad = "http://www.ob.com:8080/php/img_get.php?batch_export_seat_qrcode=1&seat_list=" + encodeURIComponent(JSON.stringify(this.getSelectedIds())) + "&shop_id='4'"
					}
			},

		},
		//	beforeRouteLeave(to, from, next) {
		//		console.log("进入之前")
		//		         // 设置下一个路由的 meta
		//		        to.meta.keepAlive = true;  // 让 A 缓存，即不刷新
		//		        console.log(this.$route.meta.keepAlive)
		//		        next();
		// 		},
		mounted() {

		}
	};
</script>

<style lang="scss" scoped>
	@import 'src/styles/mixin.scss';
	* {
		padding: 0;
		margin: 0;
	}
	
	.table_list {
		height: 100%;
		background: #FFFFFF;
		padding: 20px 20px 0 20px;
	}
	
	.btn button {
		width: 100px;
		height: 34px;
		border-radius: 3px;
		background: #FFFFFF;
	}
	
	.btn .blue {
		margin-right: 10px;
		color: #4877E7;
		border: 1px solid #4877E7;
	}
	
	.btn .red {
		margin-right: 0px;
		color: #E7487E;
		border: 1px solid #E7487E;
	}
	
	.blue {
		font-size: 14px;
		color: #4877E7;
	}
	
	.red {
		font-size: 14px;
		color: #E7487E;
	}
	
	.btng span {
		width: 29px;
		height: 19px;
		margin-right: 20px;
		box-sizing: border-box;
	}
	
	.table_info {
		margin-top: 35px;
		padding: 20px 0;
		box-sizing: border-box;
	}
	
	.table_info .el-table-column {
		padding: 0;
	}
	
	.pagination-container {
		margin: 50px 0 20px 689px;
		font-family: MicrosoftYaHei;
		font-size: 12px;
		color: #666666;
		letter-spacing: 0.43px;
	}
	
	.pageSize {
		font-size: 12px;
		width: 70px;
		height: 34px;
		margin-right: 10px;
	}
	
	.el-table .cell.img {
		width: 60px;
		height: 60px;
	}
	
	div.el-select.el-input {
		font-size: 12px;
	}
	
	.jump {
		font-size: 12px;
		margin-right: 10px;
	}
	
	.jump .el-input {
		font-size: 12px;
		width: 80px;
		height: 34px;
	}
	
	.jump .el-button {
		font-size: 12px;
		width: 30px;
		height: 34px;
		background: #F3F3F3;
	}
	
	.messageBox {
		width: 100%;
		height: 150%;
		position: absolute;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 9993;
	}
	
	.deleteMessage {
		z-index: 9995;
		background: #FFFFFF;
		width: 540px;
		height: 264px;
		margin: 300px 609px;
	}
	
	.messageHeader {
		width: 540px;
		height: 40px;
		background: #5A8CFF;
		color: white;
		font-size: 16px;
		text-align: center;
		line-height: 40px;
	}
	
	.tableInfor {
		margin: 69px 130px;
	}
	
	.deleteMessage .btn {
		margin-left: 130px;
	}
	
	.showQR {
		background: rgba(0, 0, 0, 0.5);
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 9990;
	}
	
	.close_btn {
		width: 100px;
		height: 34px;
		position: absolute;
		top: 720px;
		left: 950px;
		z-index: 9991;
	}
</style>

<style lang="scss" scoped>
	.el-option {
		height: 34px;
	}
	
	.el-select {
		width: 180px;
		margin-left: 10px;
		margin-right: 20px;
	}
	
	.el-input {
		width: 180px;
		height: 34px;
		margin-right: 20px;
	}
</style>