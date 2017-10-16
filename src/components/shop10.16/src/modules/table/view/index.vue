<template>
	<div class="table_list">
		<!--头部搜索-->
		<div class="search">
			<div class="btn">
				<!--名称或编号-->
				<el-select allow-create filterable v-model="no" placeholder="名称或编号">
					<el-option label="全部" :value="no">
					</el-option>
					<el-option v-for="item in  tableData " :label="item.seat_id" :value="item.seat_id" :key="item.seat_id">
					</el-option>

				</el-select>
				<!--餐桌类型-->
				<el-select allow-create filterable v-model="table" placeholder="餐桌类型">
					<el-option label="全部" :value="table">
					</el-option>
					<el-option v-for="item in  tableData " :label="item.seat_name" :value="item.seat_name" :key="item.seat_name">
					</el-option>
				</el-select>
				<!--搜索按钮-->
				<button  class="blue search_button" @click="handleFilter">
					搜索
				</button>
			</div>
			<div class="btn">
				<!--创建-->
				<router-link :to="{path:'/table/edit'}">
					<button  class="blue create_button">
						创建
					</button>
				</router-link>
				<!--导出二维码-->
				<button class="blue export_button" @click="handleDownload">
					导出二维码
				</button>
				<!--删除-->
				<button  class=" red delete_button"@click="deleteDatasInBtnGroup()">
					删除
				</button>
			</div>
		</div>

		<!--列表-->
		<div class="table_info">
			<el-table :data="tableList" @selection-change="selectItem" :row-class-name="tableRowClassName" style="width: 100%" highlight-current-row>
				<el-table-column type="selection" width="35">
				</el-table-column>
				<el-table-column prop="seat_id" label="编号" align="center" width="180" sortable  
					:default-sort = "{prop: 'date', order: 'descending'}">
				</el-table-column>
				<el-table-column prop="seat_name" label="餐桌台号" align="center" width="180">
				</el-table-column>
				<el-table-column prop="seat_region" label="餐桌区域"align="center"width="180" >
				</el-table-column>
				<el-table-column prop="seat_type" label="餐桌类型" align="center"width="180">
				</el-table-column>
				<el-table-column prop="seat_shape" label="桌型" align="center" width="180">
				</el-table-column>
				<el-table-column prop="seat_size" label="可供就餐人数" align="center" width="180" sortable 
					 :default-sort = "{prop: 'date', order: 'descending'}">
				</el-table-column>
				<el-table-column prop="price" label="餐位费" align="center" width="180" sortable 
					 :default-sort = "{prop: 'date', order: 'descending'}">
				</el-table-column>
				<el-table-column  label="二维码" inline-template align="center" width="180" class="code">
					<span class="blue QR" type="text" size="small" @click="getQR($index,row)"><span>点击预览</span></span>
					
				</el-table-column>
				<el-table-column  label="操作"  inline-template align="center" width="190">
				<div class="btng">
				<span class="blue" type="text" size="small">
					<router-link :to="{path:'/table/edit',query:{id:row}}">
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
			 	<el-pagination small @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
			        :page-sizes="[5,10]" :page-size="listQuery.limit" layout="sizes, prev, pager, next, jumper" :total="total">
			      </el-pagination>
			 </div>
		</div>
		<!--删除信息弹框-->
		<div class="messageBox" v-if="deleted">
			<div class="deleteMessage">
				<div class="messageHeader">删除提醒</div>
				<p class="tableInfor">确定删除餐桌<span>{{deletedNo}}号</span>的信息？</p>
				<div class="btn">
					<el-button @click="confirm" >确定</el-button>
					<el-button @click="cancel">取消</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { apiMethods } from'../api';
export default {
	data() {
		return {
			deleted:false,
			deletedNo:"",
			no: "",//名称或编号
			table: "",//餐桌类型
			total: 10,//总页数
			tableData: [],//餐桌列表信息
			tableList:[],
			testList:[],
			multipleSelection:[],//勾选的集合（多选）
			listQuery: {
		        page: 1,
		        limit: 5,
		        sort: '+id'
		      },
		      
		};
	},
	methods: {
			
			//表格斑马线
			tableRowClassName(row, index) {
				if (index % 2 === 0) {
					return "info-row";
				} else if (index % 2 === 1) {
					return "positive-row";
				}
			},
			//复选框
			selectItem(val) {
				this.multipleSelection = val;
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
				this.deleted=true;
				this.deletedNo=item.seat_id;
      		},
      		//点击确定
      		confirm() {
      			this.deleted=false;
      				apiMethods.changeTableData({
		        		seat_delete:1,
		        		seat_id_list:JSON.stringify([this.deletedNo])
		        	},(resp)=>{
			      	setTimeout(() => {
		             apiMethods.shallowRefresh(this.$route.name)
		            }, 50)
	      		
		        })
      		},
		    //点击取消
		    cancel() {
		    	this.deleted=false;
		    	
		    },
      		//多选删除
      		deleteDatasInBtnGroup() {
      			 if (!this.multipleSelection.length) {
			          alert("你还没有勾选任何选项")
			          return;
		        }
      			console.log(this.getSelectedIds())
	      		apiMethods.changeTableData({
	      			seat_delete:1,
		        	seat_id_list:JSON.stringify(this.getSelectedIds())
	      		},(resp)=>{
      				setTimeout(() => {
		             apiMethods.shallowRefresh(this.$route.name)
		            }, 50)
	      		})
      		},
			//获取二维码
			getQR(index,row) {
				var img ='<img src="http://www.ob.com:8080/php/img_get.php?get_seat_qrcode=1&shop_id=4&seat_id=4" class="img"/>'
				apiMethods.getQrCode({
					shop_id:4,	/********数据不齐全为写死状态*********/
					seat_id:4  /********数据不齐全为写死状态*********/
				},(resp)=>{
					$(".QR").eq(index).html(img)
					$(".img").eq(index).css({"height":"60px"})
				})
				
			},
			//点击搜索
			handleFilter() {
				this.listQuery.page = 1;
				this.tableList = apiMethods.search(this.no,this.table,this.tableData)
			},
			//获取总条目数
			getTotal() {
				 var tot = 0;
			    for (var i = 0 ;i < this.testList.length;i++){
			    	tot++
			    }
			     this.total = tot;
			     return this.total;
			},
			//选择每页显示的条目数
			handleSizeChange(val) {
				console.log(this.listQuery.page)
			     this.listQuery.limit = val;
			     this.tableList=this.testList.filter((item, index) => index < this.listQuery.limit * this.listQuery.page && index >= this.listQuery.limit * (this.listQuery.page - 1))
			     this.getTotal()
			     console.log(this.tableList)
			},
			//选择当前页码
			handleCurrentChange(val) {
				 this.listQuery.page  = val
				 console.log(this.tableList)
				this.tableList=this.testList.filter((item, index) => index < this.listQuery.limit * this.listQuery.page && index >= this.listQuery.limit * (this.listQuery.page - 1))
				this.getTotal()
				console.log(val)
			},
			//点击导出
			handleDownload() {

			}
	},
	created() {
			
			//初始化表格
			apiMethods.getTableData({
				get_seat_list:1,
				userid:1  /********数据为写死状态*********/
			},(resp)=>{
				this.tableData = resp.data.seatlist
				this.tableList = resp.data.seatlist
				this.testList = resp.data.seatlist
			})
			this.tableList=this.testList.filter((item, index) => index < this.listQuery.limit * this.listQuery.page && index >= this.listQuery.limit * (this.listQuery.page - 1))
			
			
//			console.log(this.total)
			
	},
	mounted() {
//		this.getTotal()
	}
}; 
</script>

<style lang="scss" scoped>
@import 'src/styles/mixin.scss';
*{
	padding: 0;
	margin: 0;
}
.table_list {
	background: #FFFFFF;
	padding: 20px;
	
}

.el-select {
	width: 160px;
	height: 34px;
	margin-right: 10px;
}
.search{
	display: flex;
	justify-content: space-between
}
.btn button{
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
	color: #E7487E ;
	border: 1px solid #E7487E ;
}
.blue{
	font-size: 14px;
	color:  #4877E7;
}

.red {
	font-size: 14px;
	color: #E7487E ;
	
}
.btng span{
	width: 29px;
	height: 19px;
	margin-right: 20px;
	box-sizing: border-box;
}
.table_info {
	padding-top: 20px;
	box-sizing: border-box;
}
.table_info .el-table-column{
	padding: 0;
}

.el-table .info-row {
	background: white;
}

.el-table .positive-row {
	background: #F6F8FC ;
}
.pagination-container{
	margin-top: 50px;
	font-family: MicrosoftYaHei;
	font-size: 12px;
	color: #666666;
	letter-spacing: 0.43px;
}
.pageSize{
	font-size: 12px;
	width: 70px;
	height: 34px;
	margin-right: 10px;
}
.el-table .cell.img{
	width: 60px ;
	height: 60px;
}
div.el-select.el-input{
	font-size: 12px;
}
.jump{
	font-size: 12px;
	margin-right: 10px;
}
.jump .el-input{
	font-size: 12px;
	width: 80px;
	height: 34px;
}
.jump .el-button{
	font-size: 12px;
	width: 30px;
	height: 34px;
	background: #F3F3F3;
}
.messageBox{
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	background: rgba(0,0,0,0.5);
	z-index: 9993;
}
.deleteMessage{
	z-index: 9995;
	background: #FFFFFF;
	width:540px;
	height: 264px;
	margin: 300px 609px;
}
.messageHeader{
	width: 540px;
	height: 40px;
	background: #5A8CFF;
	color: white;
	font-size: 16px;
	text-align: center;
	line-height: 40px;
}
.tableInfor{
	margin: 69px 130px;
}
.deleteMessage .btn{
	margin-left: 130px;
}
</style>