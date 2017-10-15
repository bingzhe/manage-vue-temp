<template>
    <div class="tree">
        <tree-node :tree-data="TreeData"></tree-node>
    </div>
</template>

<script>
import TreeNode from './tree-node';
import { Tree } from './tree';

export default {
    name: "tree",
    components: { TreeNode },
    props: {

    },
    created() {
        this.isTree = true;
        Tree.generateKey(this.TreeData, 0);
        Tree.initTreeData(this.TreeData);
    },
    data() {
        return {
            TreeData: [{
                category_name: "商品",

                list: [{
                    category_id: "11",
                    category_name: "菜品",
                    delete: null,
                    food_id_list: null,
                    lastmodtime: 1494757422,
                    opening_time: null,
                    parent_id: "0",
                    printer_id: "13",
                    shop_id: "4",
                    sortval: null,
                    type: null,
                    list: [{
                        category_id: "64",
                        category_name: "热菜",
                        delete: null,
                        food_id_list: null,
                        lastmodtime: 1499964796,
                        opening_time: null,
                        parent_id: "11",
                        printer_id: null,
                        shop_id: "4",
                        sortval: null,
                        type: null,
                        list: [{
                            category_id: "16",
                            category_name: "干锅",
                            delete: null,
                            food_id_list: ["76"],
                            lastmodtime: 1505444681,
                            opening_time: ["1", "2", "3", "4"],
                            parent_id: "11",
                            printer_id: null,
                            shop_id: "4",
                            sortval: 5,
                            type: 1,
                            list: [],
                        }]
                    }, {
                        category_id: "18",
                        category_name: "凉菜",
                        delete: null,
                        food_id_list: null,
                        lastmodtime: 1494911136,
                        opening_time: null,
                        parent_id: "11",
                        printer_id: "",
                        shop_id: "4",
                        sortval: null,
                        type: null,
                        list: []
                    }]
                }, {
                    category_id: "35",
                    category_name: "酒水"
                }, {
                    category_id: "145",
                    category_name: "配件"
                }]
            }],
            store: {
                root: [],
            }
        };
    },
    methods:{

    }
};
</script>

<style lang="scss" scoped>
.tree{
    margin-left: 14px;
}
</style>
