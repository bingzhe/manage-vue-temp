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
//Util.DataEncSubmit('shopinfo_get_001.php',data,(resp)=>{
//		if (callback && typeof callback === "function") {
//      callback(resp)
//    }
//	});
	
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
	},{
        encmode: "encrypt1"
    });
};

export const Bindemail = function(data,callback){
	Util.DataEncSubmit('user_info.php',data,(resp)=>{
		if (callback && typeof callback === "function") {
        callback(resp)
      }
	});
};

export const Unbindemail = function(data,callback){
	Util.DataEncSubmit('user_info.php',data,(resp)=>{
		if (callback && typeof callback === "function") {
        callback(resp)
      }
	});
};

export const Bindemailok = function(data,callback){
	Util.DataEncSubmit('bind_mail.php',data,(resp)=>{
		if (callback && typeof callback === "function") {
        callback(resp)
      }
	});
};

//绑定手机号码验证接口
export const BindPhone = function(data,callback){
	Util.DataEncSubmit('customer_save.php',data,(resp)=>{
		if (callback && typeof callback === "function") {
        callback(resp)
      }
	});
};

export const BindPhones = function(data,callback){
	Util.DataEncSubmit('user_info.php',data,(resp)=>{
		if (callback && typeof callback === "function") {
        callback(resp)
      }
	});
};

export const UnbindPhone = function(data,callback){
	Util.DataEncSubmit('user_info.php',data,(resp)=>{
		if (callback && typeof callback === "function") {
        callback(resp)
      }
	});
};

//解绑手机号验证接口
export const UNbindPhone = function(data,callback){
	Util.DataEncSubmit('customer_save.php',data,(resp)=>{
		if (callback && typeof callback === "function") {
        callback(resp)
      }
	});
};
