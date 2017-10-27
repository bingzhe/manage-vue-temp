export const commonMethods ={
	//获取总的条目数
	getTotal:function(testList) {
				 var tot = 0;
			    for (var i =0 ;i<testList.length;i++){
			    	tot++;
			    }
			     return tot;
	},
		//获取每页显示的相对应条目的内容
	getPageList:function(testList,limit,page){
		var tableList =[];
		 tableList=testList.filter((item, index) => index <limit * page && index >= limit * (page - 1));
		 return tableList;
	}
}
