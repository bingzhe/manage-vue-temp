import Vue from 'vue';

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
        let keyArr = key.split('-');
        return keyArr.length;
    },

    /**
     * init treeData
     * @param {Array} treeData 
     * @return {Array}
     */
    initTreeData(treeData = []) {
        treeData = treeData.map((item) => {
            item.canEditor = false;
            item.addIcon = false;
            item.editorIcon = false;
            item.deleteIcon = false;

            if (item.hasOwnProperty('list') && item.list.length > 0) {
                this.initTreeData(item.list, item.key);
            }
            return item;
        });

        return treeData;
    }
};