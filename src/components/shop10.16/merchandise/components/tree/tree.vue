<template>
    <div class="tree">
        <tree-node :tree-data="treeData"></tree-node>
    </div>
</template>

<script>
import TreeNode from './tree-node';
import { Tree } from './tree';

export default {
    name: "tree",
    components: { TreeNode },
    props: {
        treeData: Array,
    },
    watch: {
        treeData: {
            handler: function(data) {
                // this.treeData = Tree.selectIcon(data);
                // this.treeDataA = Tree.initTreeData(this.treeData);
            },
            deep: true
        }
    },
    created() {
        this.isTree = true;
        // Tree.generateKey(this.TreeData, 0);
        // this.treeDataA = Tree.initTreeData(this.treeData);
    },
    data() {
        return {
            store: {
                root: [],
            },
            treeDataA: [],
        };
    },
    methods: {
        initData() {
            // let treeDataB = [];
            // treeDataB[0] = Tree.addCategoryFirst(this.treeData);
            
        }
    }
};
</script>

<style lang="scss" scoped>
.tree {
    margin-left: 14px;
    max-height: 730px;
    overflow-y: scroll;
}
</style>
