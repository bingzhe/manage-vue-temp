<template>
    <div id="draft-table">

        <!-- 面包屑 start -->
        <el-breadcrumb separator=">" class="breadcrumb">
            <el-breadcrumb-item>店铺管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/shop/good' }">菜品管理</el-breadcrumb-item>
            <el-breadcrumb-item>菜品草稿列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 面包屑 end -->

        <div class="content-box">
            <h3 class="title">菜品草稿列表</h3>

            <!-- table start -->
            <div class="table-content">

                <el-table class="table-list" :data="list" stripe height="600" @selection-change="handleSelectionChange">

                    <el-table-column type="selection" align="center" width="38"></el-table-column>

                    <el-table-column min-width="80" align="center" label="编号">
                        <template scope="scope">
                            <span>{{ scope.row.food_id}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column min-width="80" align="center" label="图片">
                        <template scope="scope">
                            <img :src="scope.row.food_img_list[0]" alt="菜品图片">
                        </template>
                    </el-table-column>

                    <el-table-column min-width="93" align="center" label="名称">
                        <template scope="scope">
                            <span>{{ scope.row.food_name}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column min-width="100" align="center" label="价格">
                        <template scope="scope">
                            <span>{{ scope.row.food_price.original_price}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column min-width="80" align="center" label="商品类别">
                        <template scope="scope">
                            <span>{{ scope.row.category_name[0]}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column min-width="140" align="center" label="操作">
                        <template scope="scope">
                            <span class="blue-text">
                                <router-link v-if="scope.row.type === goodType.DISH" :to="{path:'/good',query: { foodId:scope.row.food_id}}">
                                    编辑
                                </router-link>
                                <router-link v-if="scope.row.type === goodType.DISH" :to="{path:'/good/accesseditor',query: { foodId:scope.row.food_id}}">
                                    编辑
                                </router-link>
                                <router-link v-if="scope.row.type === goodType.DISH" :to="{path:'/good/accesseditor',query: { foodId:scope.row.food_id}}">
                                    编辑
                                </router-link>
                            </span>
                            <span @click="deleteFood(scope.row.food_id)" class="red-text" style="padding-left:10px;padding-top:10px;">删除</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- table end -->

            <!-- 分页 starat -->
            <div class="pagination-container">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,40]" :page-size="pageSize" layout="sizes, jumper, prev, pager, next" :total="total">
                </el-pagination>
            </div>
            <!-- 分页 end -->
        </div>
    </div>
</template>

<script>
import { getTableList } from '../../api';
import { GoodList } from '../../index.js';
import { GoodType } from '@/config/cfg';

export default {
    data() {
        return {
            list: null, //表格数据
            multipleSelection: [],  //存放多选选中数据
            goodType: GoodType,  //food type
            total: null,   //分页总条数
            listQuery: {
                page: 1,
                limit: null,
                importance: undefined,
                title: undefined,
                type: undefined,
                sort: '+id'
            },
        };
    },
    computed: {
        pageSize() {
            return this.$store.state.good.pageSize;
        },
        foodType() {
            return this.$store.state.good.type;
        },
    },
    created() {
        this.getList();
        this.initPageSize();
    },
    methods: {
        //多选
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        //拉取草稿数据
        getList() {
            let data = {
                foodlist: 1,
                is_draft: 1,
                page_size: this.pageSize,
            };

            getTableList(data, this.tableHander);
        },
        tableHander(resp) {
            if (resp.ret === 0) {
                this.list = resp.data.list || [];
                this.total = this.list.length;
            } else {
                console.log("获取表格数据!");
            }
        },
        //删除
        deleteFood(foodId) {
            let foodArr = [];
            foodArr.push(foodId);
            GoodList.deleteFoodItems(foodArr, this.deleteFoodHander);
        },
        deleteFoodHander() {
            this.getList();
        },

        //分页事件处理，条数和当前页数改变触发
        handleSizeChange(val) {
            this.listQuery.limit = val;
            this.$store.commit('CHANGE_PAGESIZE', val);
            this.getList();
        },
        handleCurrentChange(val) {
            this.listQuery.page = val;
            // console.log(val);
            // this.getList();
        },
        //初始化pageSize
        initPageSize() {
            this.listQuery.limit = this.pageSize;
        }
    }
};
</script>

<style lang="scss" scoped>
@import 'src/styles/mixin.scss';

.breadcrumb {
    margin-bottom: 14px;
}

.content-box {
    background: #FFFFFF;
    box-shadow: 0 2px 4px 0 #BECAEB;
}

.title {
    @include fc(14px, #666666);
    background-color: #F6F8FC;
    height: 40px;
    line-height: 40px;
    padding-left: 14px;
}

.table-content {
    padding: 20px 14px;
}

.red-text {
    @include fc(14px, #E7487E);
    cursor: pointer;
}

.blue-text {
    @include fc(14px, #4877E7);
    cursor: pointer;

    a {
        @include fc(14px, #4877E7);
    }
}

.pagination-container {
    text-align: center;
}
</style>

<style lang="scss">
@import 'src/styles/mixin.scss';

#draft-table {
    .el-breadcrumb {
        @include fc(12px, #333333);
    }

    .el-breadcrumb__item:last-child .el-breadcrumb__item__inner {
        color: #4877E7;
    }

    .el-breadcrumb__item__inner:hover {
        color: #4877E7;
    }

    .el-pagination {
        padding-top: 30px;
        padding-bottom: 14px;
    }
    .el-pagination__jump {
        margin-left: 5px;
        margin-right: 15px;
    }
}
</style>