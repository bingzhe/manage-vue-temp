import { Util }from '@/config/util';



export const saveShopinfo = function(data,callback){
	Util.DataEncSubmit('shopinfo_save.php',data,(resp)=>{
		if (callback && typeof callback === "function") {
            callback(resp);
        }
	});
};

export const getShopinfo = function(data,callback){
	Util.DataEncSubmit('shopinfo_get.php',data,(resp)=>{
		if (callback && typeof callback === "function") {
        callback(resp)
      }
	});
	
};

export const shopSeting = function(data,callback){
	Util.DataEncSubmit('shopinfo_save.php',data,(resp)=>{
		if (callback && typeof callback === "function") {
            callback(resp);
        }
	});
};

export const getshopInfo = function(data,callback){
	Util.DataEncSubmit('shopinfo_get.php',data,(resp)=>{
		if (callback && typeof callback === "function") {
        callback(resp)
      }
	});
};


export const Changepassword = function(data,callback){
	Util.DataEncSubmit('user_info.php',data,(resp)=>{
		if (callback && typeof callback === "function") {
        callback(resp)
      }
	});
};
