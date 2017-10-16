import { Util }from '@/config/util';
import Vue from 'vue';
export const apiMethods ={
	//获取餐桌列表
	getTableData: function(data, callback) {

		Util.DataEncSubmit('seat_get.php', data, (resp) => {
			if(callback && typeof callback === "function") {
				callback(resp);
			}
		});
	},
	//数据改动之后保存
	changeTableData: function(data,callback) {
		Util.DataEncSubmit('seat_save.php', data, (resp) => {
			if(callback && typeof callback === "function") {
				callback(resp);
			}
		});
	},
	//操作数据之后刷新页面
	shallowRefresh:function(name) {
    	router.replace({ path: '/refresh', query: { name: name }})
  	},
  	//获取二维码
  	getQrCode:function(data,callback) {
  		Util.DataEncSubmit('img_get.php', data, (resp) => {
			if(callback && typeof callback === "function") {
				callback(resp);
			}
		});
  	},
  	//新建获取id
	getId:function(data,callback) {
		Util.DataEncSubmit('gen_id.php',data, (resp) => {
			if(callback && typeof callback === "function") {
				callback(resp);
			}
		});
	},
  	//搜索列表
  	search :function(value1,value2,dataList) {
  		var list=[];
  		var searchRegex1 = new RegExp(value1,"g");
  		var searchRegex2 = new RegExp(value2,"g");
  		for(var i =0;i<dataList.length;i++){
			if(searchRegex1.exec(dataList[i].seat_id)!=null&&searchRegex2.exec(dataList[i].seat_name)!=null){
				list.push(dataList[i])
			}
		}
  		return list;
  	},
  		//获取总的条目数
		getTotal:function(testList) {
				 var tot = 1;
			    for (var i =0 ;i<testList.length;i++){
			    	tot++;
			    }
			     this.total = tot;
			     return this.total;
			},
		//获取每页显示的相对应条目的内容
		getPageList:function(testList,limit,page){
//			console.log(testList)
			testList.filter((item, index) => index <limit * page && index >= limit * (page - 1))
		}
}