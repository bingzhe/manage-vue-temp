export const commonMethods ={
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
			testList.filter((item, index) => index <limit * page && index >= limit * (page - 1))
		}
}
