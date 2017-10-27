import { Util } from '@/config/util';
import { chooseAll } from '@/config/cfg'
import Vue from 'vue';
export const apiMethods = {
	
	//获取餐桌列表
	getTableData: function(data, callback) {

		Util.DataEncSubmit('seat_get.php', data, (resp) => {
			if(callback && typeof callback === "function") {
				callback(resp);
			}
		});
	},
	
	
	//数据改动之后保存
	changeTableData: function(data, callback) {
		Util.DataEncSubmit('seat_save.php', data, (resp) => {
			if(callback && typeof callback === "function") {
				callback(resp);
			}
		});
	},
	
	
	//操作数据之后刷新页面
	shallowRefresh: function(name) {
		router.replace({
			path: '/refresh',
			query: {
				name: name
			}
		})
	},
	
	
	//获取二维码
	getQrCode: function(data, callback) {
		Util.DataEncSubmit('img_get.php', data, (resp) => {
			if(callback && typeof callback === "function") {
				callback(resp);
			}
		});
	},
	
	
	//新建获取id
	getId: function(data, callback) {
		Util.DataEncSubmit('gen_id.php', data, (resp) => {
			if(callback && typeof callback === "function") {
				callback(resp);
			}
		});
	},
	
	
	//搜索列表
	search: function(value1, value2, dataList) {
		var list = [];
		for(var i in dataList) {
			if((!value1 || value1 == chooseAll.code[0]) && value2 == "") {
				list = dataList;
			} else if(dataList[i].seat_region.indexOf(value1) > -1 && (dataList[i].seat_id.indexOf(value2) > -1 || dataList[i].seat_name.indexOf(value2) > -1)) {
				list.push(dataList[i])
			} else if(value1 == chooseAll.code[0] && (dataList[i].seat_id.indexOf(value2) > -1 || dataList[i].seat_name.indexOf(value2) > -1)) {
				list.push(dataList[i])
			}
		}
		return list;
	},
	
	
	//获取传给编辑页面的信息
	getTableEditor: function(data, callback) {
		Util.DataEncSubmit('seat_get.php', data, (resp) => {
			if(callback && typeof callback === "function") {
				callback(resp);
			}
		});
	},
	
	
	//换页记忆
	changePage: function(selectIndex, page, val) {
		for(var x in selectIndex) {
			selectIndex[x] = Number(selectIndex[x] + 1);
			if(page == val) {
				$(".el-checkbox__input").eq(selectIndex[x]).addClass("is-checked")
			} else {
				$(".el-checkbox__input").eq(selectIndex[x]).removeClass("is-checked")
			}
		}
	},
	
	
	//	编辑标签
	editTagArr: function(data, callback) {
		Util.DataEncSubmit('shopinfo_save.php', data, (resp) => {
			if(callback && typeof callback === "function") {
				callback(resp);
			}
		});
	},
	
	
	//获取标签
	getTagArr: function(data, callback) {
		Util.DataEncSubmit('shopinfo_get.php', data, (resp) => {
			if(callback && typeof callback === "function") {
				callback(resp);
			}
		});
	},
	
	
	//tag标签名称对应
	getBackstageName: function(webName) {
		if("SEAT_REGION" == webName) {
			webName = "shop_seat_region";
		} else if("SEAT_TYPE" == webName) {
			webName = "shop_seat_type"
		} else if("TABLE_TYPE" == webName) {
			webName = "shop_seat_shape"
		}
		return webName;
	},
	
	
	//记录所有列表中显示的历史标签并去重
	getUniqueList: function(arr) {
		var res = {},a = 0,SEAT_TYPE = [],SEAT_REGION = [],TABLE_TYPE = [],TABLE_NO = [],SEAT_NAME = [];
		for(var a = 0; a < arr.length; a++) {
			if(SEAT_TYPE.indexOf(arr[a].seat_type) == -1) {
				SEAT_TYPE.push(arr[a].seat_type)
			}
			if(SEAT_REGION.indexOf(arr[a].seat_region) == -1) {
				SEAT_REGION.push(arr[a].seat_region)
			}
			if(TABLE_TYPE.indexOf(arr[a].seat_shape) == -1) {
				TABLE_TYPE.push(arr[a].seat_shape)
			}
			if(TABLE_NO.indexOf(arr[a].seat_id) == -1) {
				TABLE_NO.push(arr[a].seat_id)
			}
			if(SEAT_NAME.indexOf(arr[a].seat_name) == -1) {
				SEAT_NAME.push(arr[a].seat_name)
			}
		}
		res["SEAT_REGION"] = SEAT_REGION;
		res["SEAT_TYPE"] = SEAT_TYPE;
		res["TABLE_TYPE"] = TABLE_TYPE;
		res["TABLE_NO"] = TABLE_NO;
		res["SEAT_NAME"] = SEAT_NAME;
		return res;
	},
	
	
	//	去重
	getUniqueType: function(arr1,arr2) {
		const check = value =>arr2.indexOf(value) == -1;
		let filtered = arr1.filter(check).concat(arr2);
		return filtered;
		
	},
	
	
	//对象配置成数组
	objTansToArr: function(obj) {
		var dataArr = [];
		for(var i in obj) {
			dataArr.push(obj[i])
		}
		return dataArr
	}

}