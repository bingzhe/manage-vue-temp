import { getTableList, deleteTableList, changeStatus } from './api';
import { SaleStatus, GoodType, Dinnertime } from "@/config/cfg";
import Vue from "vue";
import { Util } from '@/config/util';

export const GoodList = {

    /**
     * 模拟锚跳转
     * @param { Object } ele Dom元素
     * @param { String } selector 选择符
     */

    goAnchor: function (ele, selector) {
        let anchor = ele.querySelector(selector);

        document.body.scrollTop = anchor.offsetTop;  //chrome
        document.documentElement.scrollTop = anchor.offsetTop; //firefox
    },

    /**
     *  删除菜品
     * @param { Array } foodIdArr  要删除的id
     * @param { Function } callback 回调 
     */
    deleteFoodItems: function (foodIdArr, callback) {
        let data = {
            del_food: 1,
            food_id_list: foodIdArr
        };
        deleteTableList(data, callback);
    },

    /**
     * 搜索
     * @param {Number} saleStatus //上下架状态
     * @param {String} searchName //名称或者编号
     * @param {Function} callback //回调
     */
    searchGetList: function (saleStatus, searchName, callback) {
        let data = null;

        if (saleStatus !== SaleStatus.YES && saleStatus !== SaleStatus.NO) {
            data = {
                foodlist: 1,
                food_name: searchName,
            };
        } else {
            data = {
                foodlist: 1,
                food_name: searchName,
                sale_off: saleStatus
            };
        }

        getTableList(data, callback);
    },

    /**
     * 上架
     * @param { Array } foodIdArr  要上架的id
     * @param { Function } callback 回调 
     */
    changeStatusOn: function (foodIdArr, callback) {
        let data = {
            sale_off_opr: 1,
            food_id_list: foodIdArr,
            is_sale_off: SaleStatus.YES,
        };

        changeStatus(data, callback);
    },
    /**
    * 下架
    * @param { Array } foodIdArr  要上架的id
    * @param { Function } callback 回调 
    */
    changeStatusOff: function (foodIdArr, callback) {
        let data = {
            sale_off_opr: 1,
            food_id_list: foodIdArr,
            is_sale_off: SaleStatus.NO,
        };

        changeStatus(data, callback);
    },

    /**
     * 建立分类索引
     * @param { Array } treeData
     * @return { Object } 
     */
    treeDataById: function (treeData = []) {
        let treeDataById = {};

        const _saveNode = (item) => {
            item.forEach((items) => {
                if (items.hasOwnProperty('category_id')) {
                    treeDataById[items.category_id] = items;
                }

                if (items.hasOwnProperty('list') && items.list.length > 0) {
                    _saveNode(items.list);
                }
            });
        };

        _saveNode(treeData);

        return treeDataById;
    },

    /**
     * init treeData
     * @param {Array} treeData 
     * @return {Array}
     */
    initTreeData(treeData = []) {
        treeData = treeData.map((item) => {
            Vue.set(item, 'canEditor', false);
            Vue.set(item, 'addIcon', true);
            Vue.set(item, 'editorIcon', true);
            Vue.set(item, 'deleteIcon', true);
            Vue.set(item, "isShowBtn", false);
            Vue.set(item, 'isActive', false);
            Vue.set(item, 'breakshow', false);
            Vue.set(item, 'lunckshow', false);
            Vue.set(item, 'dinnershow', false);
            Vue.set(item, 'nightshow', false);
            Vue.set(item, 'allShow', false);
            let len = this.getKeylength(item.key);

            if (len === 5) {
                Vue.set(item, 'isThree', true);
            } else {
                Vue.set(item, 'isThree', false);
            }

            if (item.hasOwnProperty('list') && item.list.length > 0) {
                this.initTreeData(item.list);
            }
            return item;
        });

        return treeData;
    },

    /**
     * generate key 0-1-2
     * @param {Array} treeData
     * @param {String} parentKey
     * @returns {Array}
     */
    generateKey(treeData = [], parentKey) {
        treeData = treeData.map((item, i) => {
            item.key = parentKey + '-' + i.toString();
            if (item.hasOwnProperty('list') && item.list.length > 0) {
                this.generateKey(item.list, item.key);
            }
            return item;
        });
        return treeData;
    },

    /**
     * get key length
     * @param {String} key 
     * @return {Number}
     */
    getKeylength(key) {
        if (!Util.isEmpty(key)) {
            let keyArr = key.split('-');
            return keyArr.length;
        }
    },

    /**
     * select icon btn
     */
    selectIcon(treeData = []) {
        treeData = treeData.map((item) => {

            let len = this.getKeylength(item.key);

            if (len === 2) {
                item.addIcon = false;
                item.editorIcon = false;
                item.deleteIcon = false;
            } else if (len === 3) {
                item.addIcon = true;
                item.editorIcon = false;
                item.deleteIcon = false;
            } else if (len === 4) {
                item.addIcon = true;
                item.editorIcon = true;
                item.deleteIcon = true;
            } else if (len === 5) {
                item.addIcon = false;
                item.editorIcon = true;
                item.deleteIcon = true;
            }

            //配件不能增加三级菜单
            if (len === 4 && item.type === GoodType.ACCESSORY) {
                item.addIcon = false;
                item.editorIcon = true;
                item.deleteIcon = true;
            }

            //配件不能增加修改
            if (len === 4 && item.entry_type === 1) {
                item.addIcon = false;
                item.editorIcon = false;
                item.deleteIcon = false;
            }

            //三级显示
            if (item.hasOwnProperty('list') && item.list.length > 0) {
                this.selectIcon(item.list);
            }

            //图标显示
            let openArr = item.opening_time || [];
            if (openArr.indexOf(Dinnertime.MORN) !== -1 || openArr.indexOf("1") !== -1) {
                item.breakshow = true;
            }
            if (openArr.indexOf(Dinnertime.NOON) !== -1 || openArr.indexOf("2") !== -1) {
                item.lunckshow = true;
            }
            if (openArr.indexOf(Dinnertime.EVEN) !== -1 || openArr.indexOf("3") !== -1) {
                item.dinnershow = true;
            }
            if (openArr.indexOf(Dinnertime.NIGHT) !== -1 || openArr.indexOf("4") !== -1) {
                item.nightshow = true;
            }
            if (openArr.length === 4) {
                item.breakshow = false;
                item.lunckshow = false;
                item.dinnershow = false;
                item.nightshow = false;
                item.allShow = true;
            }
        });

        return treeData;
    },

    /**
     * 选择
     * @param {Array} dinnerTimeData 
     * @param {Array} dinnerTimeArr 
     */
    selectdinnerTime(dinnerTimeData = [], dinnerTimeArr = []) {
        let arr = [];
        if (dinnerTimeArr == null) {
            return;
        }
        dinnerTimeData.forEach((item) => {
            let val = item.value;

            dinnerTimeArr.forEach((items) => {
                if (val === Number(items)) {
                    arr.push(item);
                }
            });
        });

        return arr;
    },

    /**
    *添加最顶层商品分类
    * @param {Array} treeData 
    * @return {Object}
    */
    addCategoryFirst(treeData = []) {
        let treeDataA = {};
        Vue.set(treeDataA, 'category_name', '商品');
        Vue.set(treeDataA, 'list', treeData);
        Vue.set(treeDataA, 'opening_time', [1, 2, 3, 4]);
        Vue.set(treeDataA, 'category_id', '0');
        return treeDataA;
    },

    /**
     * 修改选中状态
     * @param {Object} node  选中节点
     * @param {Object} treeDataById  所有数据
      */
    changeSelecte(node = {}, treeDataById = {}) {
        let id = node.category_id;

        for (let item in treeDataById) {
            if (treeDataById.hasOwnProperty(item)) {

                if (id === item) {
                    treeDataById[item].isActive = true;
                } else {
                    treeDataById[item].isActive = false;
                }
            }
        }
    },

    /**
     * 删除数组中的某一项
     */
    deleteArrayItem(arr = [], item) {
        arr.forEach((items, index) => {
            if (items === item) {
                arr.splice(index, 1);
                return;
            }
        });

        return arr;
    },

    isEmpty: function (value) {
        var comparable = [null, 'undefined', undefined, 'N/A', 'null'];
        return !(comparable.indexOf(value) < 0);
    },

    //check number
    clearNoNum: function (value) {
        value = String(value);
        value = value.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
        value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
        value = value
            .replace(".", "$#$")
            .replace(/\./g, "")
            .replace("$#$", ".");
        value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3"); //只能输入两个小数
        if (value.indexOf(".") < 0 && value !== "") {
            //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
            value = parseFloat(value);
        }
        return value;
    },

    //check Round number 整数
    checkRound: function (value) {
        value = String(value);
        value = value.replace(/[^\d]/g, ""); //清除“数字”和“.”以外的字符
        if (value.indexOf(".") < 0 && value !== "") {
            //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
            value = parseFloat(value);
        }
        return value;
    },
};