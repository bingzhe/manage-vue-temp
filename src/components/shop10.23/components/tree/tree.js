import Vue from 'vue';
import { Util } from '@/config/util';

export const Tree = {

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
    }
};