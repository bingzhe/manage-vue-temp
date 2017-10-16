import { Util } from '@/config/util';
/* author rr */

/**
 * @param {String} username 用户名
 * @param {String} password 密码
 * @param {String} checkcode 验证码
 * @param {Function} callback 请求成功回调
 */
export const loginByUsername = function (username, password, checkcode, callback) {
    let data = {
        login: 1,
        username: username,
        password_md5: password,
        page_code: checkcode
    };

    Util.DataEncSubmit('login_save.php', data, (resp) => {
        if (callback && typeof callback === "function") {
            callback(resp);
        }
    }, {
        encmode: "encrypt1"
    });
    // <<<<<<<<<<<<<<<<<<<<<做成下面的修改：
    // Util.EncSubmit(base_url + '/login_save.php', data, (resp) => {
    //     if (callback && typeof callback === "function") {
    //         callback(resp);
    //     }
    // });
    /*
    // 定义一函数来调用Util.EncSubmit，把base_url封装在函数内部，不要每个地方都来做一样的字符串拼接，如：

    先：
    func DataEncSubmit(url, data, resp_func)
    {
        return Util.EncSubmit(base_url + "/" + url, data, resp_func);
    }

    再：
    调用时（隐藏了base_url部分）：
    DataEncSubmit('login_save.php', data, (resp) => {
        if (callback && typeof callback === "function") {
            callback(resp);
        }
    });

    */
};