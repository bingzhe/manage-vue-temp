import './jquery.md5';
import './utilPageStore';
import { Public } from './public';
import { decrypt, encrypt } from './encrypt';
import { JSEncrypt } from './jsencrypt';
import { errcode } from './cfg';
// import { IsVipCustomer, FoodType, IsSizeSpec } from './cfg';

// /**  添加公共方法示例
//  * method statement
//  * @param {*} data   
//  * @return {*} 
//  * @author author 
//  */
// functionName: function(data){
//     ...
// }

export const Util = {
    /*
     *  功能：重写Util.Alert()，方便调试
     *  编写：Rocky 2009-12-07
     */
    Alert: function (/* 可变参数 */) {
        Util.Alert.i = (Util.Alert.i || 0) + 1;
        alert('----------[' + Util.Alert.i + ']----------\r\n' + '[' + [].slice.call(arguments).join(']\r\n******[') + ']');
    },
    // 取[begin, end]间的数据整数
    GetRandom: function (begin, end) {
        var num = Math.random() * 100000000;
        return Math.floor(num % (end - begin + 1) + begin);
    },
    // 取len长的随机字符串
    GetRandString: function (len, range) {
        range = range || "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var s = range.split('');
        var ret = '';
        for (var i = 0; i < len; i++) {
            ret += s[this.GetRandom(0, s.length - 1)];
        }
        return ret;
    },
    // 变量已定义，返回true
    IsDefine: function (a) {
        return typeof (a) !== 'undefined';
    },

    /*
    * other : {
    *      //dataType: xxx,
    *      mimeType: xxx,
    *      is_get_param: 1,            // 只返回要提交的参数（不执行提交动作）
    *      async: true                 // [true-异步, false-同步]
    *      encmode: xxx                // 数据加密方式[""|encrypt1]
    *      ...
    * }
    */
    EncSubmit: function (url, data, resp_func/*, other --> {dataType:xxx, mimeType:xxx, ...}*/) {
        if (!(data instanceof Object)) {
            // param err
            return;
        }
        // var THIS = this;

        // 当前终端的标识
        var token = window.Store.GetGlobalData("token");
        if (!token) {
            token = "T1" + Util.GetRandString(14);
            window.Store.SetGlobalData("token", token);
        }

        // 前后台数据加密（验证）用随机密码
        var key = window.Store.GetGlobalData('key');
        if (!key) {
            ////////////// 下面几步使用同步请求方式 //////////////
            // 取公钥
            var publickey = (function () {
                var pubkey = "";
                $.ajax({
                    // url: "rsa_info.php?" + Util.GetRandString(3),
                    url: base_url + "/rsa_info.php?" + Util.GetRandString(3),
                    dataType: "json",
                    async: false,
                    data: {
                        "publickey": 1
                    },
                    success: function (resp) {
                        pubkey = resp.data.publickey;
                    }
                });
                return pubkey;
            })();

            // 加载rsa操作类（注：因rsa不常用，故动太加载，同步方式）
            $.ajax({
                // url: "js/jsencrypt.js?" + Util.GetRandString(3),
                url: "@/config/jsencrypt.js?" + Util.GetRandString(3),
                // url: "./jsencrypt.js?" + Util.GetRandString(3),
                dataType: "script",
                async: false
            });

            // 提交key到服务器
            var submit_key_ok = (function () {
                key = Util.GetRandString(16); // 随机key
                console.log("key:" + key);
                var rsa = new JSEncrypt();
                rsa.setPublicKey(publickey);
                var key_enc = rsa.encrypt(key);//加密
                var ok = false;
                $.ajax({
                    // url: "rsa_info.php?" + Util.GetRandString(3),
                    url: base_url + "/rsa_info.php?" + Util.GetRandString(3),
                    dataType: "json",
                    async: false,
                    data: {
                        "save_key": 1,
                        "is_plain": 1, // 是明文（配合后台DecSubmitData()用）
                        "key_enc": key_enc,
                        "token": token
                    },
                    success: function (/*response, status*/) {
                        ok = true;
                    }
                });
                return ok;
            })();

            if (!submit_key_ok) {
                return;
            }
            window.Store.SetGlobalData('key', key);
        }

        var data_type = null;
        var mime_type = null;
        var is_get_param = null;
        var is_async = true; // 默认异步
        var encmode = "";
        if (arguments.length > 3 && $.isPlainObject(arguments[3])) // 可变参数时
        {
            data_type = "json"; //arguments[3].dataType;
            mime_type = arguments[3].mimeType;
            is_get_param = arguments[3].is_get_param;
            if (Util.IsDefine(arguments[3].async)) {
                is_async = arguments[3].async;
            }
            encmode = arguments[3].encmode;
        }

        var datastr = $.param(data);
        if ("encrypt1" === encmode) {
            datastr = encrypt(key, datastr);
        }
        var param = {
            token: token,
            userid: window.Store.GetGlobalData('userid'),
            encmode: encmode,
            data: datastr,
            sign: $.md5(datastr + key)
        };

        // 只取参数
        if (is_get_param) {
            return param;
        }

        $.ajax({
            url: url + "?" + (new Date()).getTime(),
            type: "POST",
            async: is_async,
            dataType: data_type || "json",
            mimeType: mime_type,
            timeout: 60000000,
            data: param,
            success: function (resp) {
                resp = resp || {};
                if (-10020 === resp.ret)  // USER_NOLOGIN
                {
                    Public.ShowLoginBox();  // public.js
                    //return;
                }
                else if (-20011 === resp.ret)  // USER_PERMISSION_ERR
                {
                    var html = "<div style='margin:40px; font-size:32px; color:red;'>"
                        + errcode.toString(resp.ret)
                        + " <span style='font-size:20px; color:red; font-style: italic;'>"
                        + "[<a href='#' onclick='Public.ShowLoginBox({relogin:1})'>重新登录</a>]"
                        + "</span>"
                        + "</div>"
                        + "";
                    Public.MsgBox(html, { bt_close: true });
                }
                else if (-10022 === resp.ret)  // DATA_KEY_NOT_EXIST
                {
                    window.Store.SetGlobalData('key', '');
                }
                if ($.isFunction(resp_func)) {
                    if (0 === resp.ret && resp.crypt === "1" && resp.data !== "") {
                        resp.data = JSON.parse(decrypt(key, resp.data));
                        delete resp.crypt;
                    }
                    return resp_func(resp);
                }
            },
            error: function (resp) {
                if ($.isFunction(resp_func)) {
                    var ret = {
                        ret: -1,
                        data: "resp.responseText: " + resp.responseText
                    };
                    return resp_func(ret);
                }
            }
        });// end of $.ajax({...
    },// end of EncSubmit : function(...

    // 判断是否是无效的空值
    // if(isEmpty(value)){...}
    isEmpty: function (value) {
        var comparable = [null, 'undefined', undefined, 'N/A', '0', 0, 'null'];
        return !(comparable.indexOf(value) < 0);
    },

    // 取时间戳(秒)
    //  timestr = '2014-04-23 18:55:49:123';
    GetTimestamp: function (timestr) {
        var t;
        if (timestr) {
            t = new Date(timestr);
        }
        else {
            t = new Date();
        }

        return parseInt(t.getTime() / 1000);
    },
    /* 时间格式转换
    *
    * 对Date的扩展，将 Date 转化为指定格式的String
    * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
    * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
    * 例子：
    * (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
    * (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
    *
    * 参考: http://www.cnblogs.com/zhangpengshou/archive/2012/07/19/2599053.html
    */
    TimeTo: function (timestamp, format) {
        var t = timestamp > 0 ? new Date(timestamp * 1000) : new Date();
        var o = {
            "M+": t.getMonth() + 1,                      //月份
            "d+": t.getDate(),                           //日
            "h+": t.getHours(),                          //小时
            "m+": t.getMinutes(),                        //分
            "s+": t.getSeconds(),                        //秒
            "q+": Math.floor((t.getMonth() + 3) / 3),    //季度
            "S": t.getMilliseconds()                     //毫秒
        };
        var fmt = format || "yyyy.MM.dd hh:mm:ss";
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (t.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    },

    /**
     * 封装base_url
     * @param {String} url 接口
     * @param {Object} data 参数
     * @param {Function}  resp_func 回调函数
     * @param {Object} options 请求选项配置
     */
    DataEncSubmit: function(url, data, resp_func, options){
        for( let item in data){
            if(typeof(data[item]) !== "string" && typeof(data[item]) !== "number" && typeof(data[item]) !== "boolean"){
                data[item] = JSON.stringify(data[item]);
            }
        }
        return Util.EncSubmit(base_url + "/" + url, data, resp_func, options);
    },
    
    /**
     * 遍历对象自身可枚举的属性
     * @param {Object} objItem 要遍历的对象
     * @param {Function} func 迭代是调用的函数，传入3个参数：(value, key, object)
     * @author RR
     */
    forOwn: function (objItem, func) {
        let obj = objItem || {};

        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (!Util.isEmpty(func) && typeof func === "function") {
                    func(obj[key], key, obj);
                }
            }
        }
    },

    /**
     * 本地终端生成token
     * @return token
     */
    creatToken: function () {
        // 当前终端的标识
        let token = window.Store.GetGlobalData("token");
        if (!token) {
            token = "T1" + Util.GetRandString(14);
            window.Store.SetGlobalData("token", token);
        }

        return token;
    },

    /**
     *  前后台数据加密key
     *  @return key
     */
    creatKey: function () {
        let key = window.Store.GetGlobalData('key');
        let token = Util.creatToken();

        if (!key) {
            ////////////// 下面几步使用同步请求方式 //////////////
            // 取公钥
            var publickey = (function () {
                var pubkey = "";
                $.ajax({
                    // url: "rsa_info.php?" + Util.GetRandString(3),
                    url: base_url + "/rsa_info.php?" + Util.GetRandString(3),
                    dataType: "json",
                    async: false,
                    data: {
                        "publickey": 1
                    },
                    success: function (resp) {
                        pubkey = resp.data.publickey;
                    }
                });
                return pubkey;
            })();

            // 加载rsa操作类（注：因rsa不常用，故动太加载，同步方式）
            // $.ajax({
            //     // url: "js/jsencrypt.js?" + Util.GetRandString(3),
            //     // url: "@/config/jsencrypt.js?" + Util.GetRandString(3),
            //     url: "config/jsencrypt.js?" + Util.GetRandString(3),
            //     dataType: "script",
            //     async: false
            // });

            // 提交key到服务器
            var submit_key_ok = (function () {
                key = Util.GetRandString(16); // 随机key
                console.log("key:" + key);
                var rsa = new JSEncrypt();
                rsa.setPublicKey(publickey);
                var key_enc = rsa.encrypt(key);//加密
                var ok = false;
                $.ajax({
                    // url: "rsa_info.php?" + Util.GetRandString(3),
                    url: base_url + "/rsa_info.php?" + Util.GetRandString(3),
                    dataType: "json",
                    async: false,
                    data: {
                        "save_key": 1,
                        "is_plain": 1, // 是明文（配合后台DecSubmitData()用）
                        "key_enc": key_enc,
                        "token": token
                    },
                    success: function (/*response, status*/) {
                        ok = true;
                    }
                });
                return ok;
            })();

            if (!submit_key_ok) {
                return;
            }
            window.Store.SetGlobalData('key', key);
        }

        return key;
    }

};