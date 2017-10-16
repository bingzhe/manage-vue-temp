import { getTableList, deleteTableList, changeStatus } from './api';
import { SaleStatus } from "@/config/cfg";
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
                item.addIcon = true;
                item.editorIcon = false;
                item.deleteIcon = false;
            } else if (len === 3) {
                item.addIcon = true;
                item.editorIcon = false;
                item.deleteIcon = false;
            } else if (len === 4) {
                item.addIcon = true;
                item.editorIcon = true;
                item.deleteIcon = false;
            } else if (len === 5) {
                item.addIcon = false;
                item.editorIcon = true;
                item.deleteIcon = true;
            }

            if (item.hasOwnProperty('list') && item.list.length > 0) {
                this.selectIcon(item.list);
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
        dinnerTimeData.forEach((item) => {
            let val = item.value;

            dinnerTimeArr.forEach((items) => {
                if (val === Number(items)) {
                    arr.push(item);
                }
            });
        });

        return arr;
    }
};