<template>
    <div id="merchandise">
        <good-tree class="good-tree"></good-tree>
        <good-table class="good-table"></good-table>
    </div>
</template>

<script>
import GoodTree from './goodTree';
import GoodTable from './goodTable';

export default {
    components: {
        GoodTree,
        GoodTable
    },
    data() {
        return {
        };
    },
    created() {
    },
    methods: {
    }
};
</script>

<style lang="scss" scoped>
@import 'src/styles/mixin.scss';

#merchandise {
    position: relative;
    @include wh(100%, 100%);
}

.good-tree {
    width: 343px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    background-color: #fff;
}

.good-table {
    margin-left: 357px; // height: 1052px;
    background-color: #fff;
}
</style>