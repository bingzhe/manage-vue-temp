export const Subtime = function(data){
	let str = String(data).substring(16,24);
		return str;
};

export const Tranobj = function(data){
	let obj = data.substring(0,8),
		obj2 = obj.replace(/:/g,',');
	return obj2;
};
