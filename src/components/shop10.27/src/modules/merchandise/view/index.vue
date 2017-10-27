<template>
    <div id="merchandise">
        <good-tree class="good-tree"></good-tree>
        <access-table v-if="type === GoodType.ACCESSORY" class="good-table"></access-table>
        <good-table v-else class="good-table"></good-table>
    </div>
</template>

<script>
import GoodTree from './goodTree';
import GoodTable from './goodTable';
import AccessTable from './accessTable';
import { GoodType } from '@/config/cfg';

export default {
    components: {
        GoodTree,
        GoodTable,
        AccessTable,
    },
    data() {
        return {
            GoodType: GoodType,  //菜品类型cfg
        };
    },
    computed: {
        type() {
            return this.$store.state.good.type;
        }
    },
    watch: {

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