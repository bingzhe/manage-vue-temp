/*
 * 各页面业务代码
 * @author RR
 */
import { Util } from './util';
// import { IsVipCustomer, FoodType, IsSizeSpec } from './cfg';

export const Public = {
    LoginInfo: new function () {
        this.Str = function () {
            var userid = parseInt(window.Store.GetGlobalData('userid', 0));
            if (userid > 0) {
                var username = window.Store.GetGlobalData('username') || userid;
                var str = "用户ID : " + userid + "\n"
                    // + "登录IP：" + info.login_ip + "\n"
                    // + "登录时间：" + Util.TimeTo(info.login_time, "yyyy-MM-dd hh:mm  ")
                    + "";
                return "<font color=blue title='" + str + "'>" + username + "</font>，迎欢您！";
            }
            else {
                return "<a href='login.php'><font color=red>未登录</font></a>";
            }
        };
    },
    // 显示登录窗口
    ShowLoginBox: function (opt) {
        opt = opt || {};
        if (opt.relogin) {
            window.Store.SetGlobalData("userid", "");
        }
        if (window.LoginBox) {
            window.LoginBox.Open();
            return;
        }
        $.get('box.login.html?' + Util.GetTimestamp(), function (resp) {
            if ($("#id_login_box_create_flag").length > 0) {
                return;
            }
            resp += "<div id='id_login_box_create_flag'></div>";
            $(resp).appendTo($("body"));
        });
    },
    // 提示信息窗口
    MsgBox: function (msg, opt) {
        if (window.MsgBox) {
            window.MsgBox.Show(msg, opt);
            return;
        }
        $.get('box.msg.html?' + Util.GetTimestamp(), function (resp) {
            if ($("#id_msg_box_create_flag").length > 0) {
                return;
            }
            resp += "<div id='id_msg_box_create_flag'></div>";
            $(resp).appendTo($("body"));
            window.MsgBox.Show(msg, opt);
        });
    },

    //   * vip可以用的价格
    //   * @param {Stirng} key 价格类型
    //   * @author RR
    //   */
    isVipPrice: function (key) {
        if (key === "discount_price" || key === "festival_price" || key === "original_price" || key === "vip_price") {
            return true;
        } else {
            return false;
        }
    },

    /**
     * 非vip可以用的价格
     * @param {String} key 价格类型
     * @author RR
     */
    isNotVipPrice: function (key) {
        if (key === "discount_price" || key === "festival_price" || key === "original_price") {
            return true;
        } else {
            return false;
        }
    },
    /**
     * 校验输入用户名
     * 校验输入4-20个汉字英文下划线中划线;
     * @param { String } str 用户名
     * @return { Boolean }  true/false
     */
    checkName: function (str) {
        let namestr = str.trim();
        // let reg = /^([\u4e00-\u9fa5]{2,18}|[a-zA-Z]{1}[\w-]{3,17})$/;
        let reg = /^[\u4e00-\u9fa5\w-]{4,20}$/;
        return reg.test(namestr);
    },

    /**
     * 校验手机号
     * @param { Number } num 手机号
     * @return { Boolean } true/false
     */
    checkPhoneNum: function (num) {
        let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        return reg.test(num);
    }

};
