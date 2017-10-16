import { Util } from '@/config/util';
/* author rr */

/**
 * 拉取详情列表table表格数据
 * @param {Object} data 请求参数
 * @param {Function} callback 请求成功回调
 */
export const getTableList = function (data, callback) {
    Util.DataEncSubmit('menu_get.php', data, (resp) => {
        if (callback && typeof callback === "function") {
            callback(resp);
        }
    });
};

/**
 * 拉取菜品分类
 */

export const getTableCategory = function (callback) {
    let data = {
        list: 1,
    };
    Util.DataEncSubmit('category_get.php', data, (resp) => {
        if (callback && typeof callback === "function") {
            callback(resp);
        }
    });
};

/**
 * 拉取菜品编辑信息
 * @param {String} foodId 菜品id
 * @param {Function} callback 回调
 */
export const getFoodEditor = function (foodId, callback) {
    let data = {
        foodinfo: 1,
        food_id: foodId
    };
    Util.DataEncSubmit('menu_get.php', data, (resp) => {
        if (callback && typeof callback === "function") {
            callback(resp);
        }
    });
};

/**
 * 删除详情列表table表格数据
 * @param {Object} data 请求参数
 * @param {Function} callback 请求成功回调
 */
export const deleteTableList = function (data, callback) {
    Util.DataEncSubmit('menu_save.php', data, (resp) => {
        if (callback && typeof callback === "function") {
            callback(resp);
        }
    });
};

/**
 * 批量上下架
 * @param {Object} data 请求参数 
 * @param {Function} callback 回调
 */
export const changeStatus = function (data, callback) {
    Util.DataEncSubmit('menu_save.php', data, (resp) => {
        if (callback && typeof callback === "function") {
            callback(resp);
        }
    });
};

/**
 * 修改，增加分类
 */
export const editorCategory = function (data, callback) {
    Util.DataEncSubmit('category_save.php', data, (resp) => {
        if (callback && typeof callback === "function") {
            callback(resp);
        }
    });
};