<template>
    <div id="good-table">
        <div class="table-title">详情列表</div>

        <!-- 表格搜索btn start -->
        <div class="search-content clearfix">
            <div class="search-left left clearfix">
                <el-input v-model="searchName" placeholder="名称或者编号" class="left"></el-input>

                <!-- 上下架下拉框选择 -->
                <el-select width="180px" class="sale-status left" v-model="saleStatus" placeholder="上/下架状态">
                    <el-option v-for="item in saleStatusItem" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>

                <el-button class="" @click="serchGetList">搜索</el-button>
            </div>

            <div class="search-right right">
                <el-button @click="goGoodEditor">创建</el-button>
                <el-button>草稿</el-button>
                <el-button @click="stateOn">批量上架</el-button>
                <el-button @click="stateOff">批量下架</el-button>
                <el-button @click="multipleDeleteFood">删除</el-button>
            </div>
        </div>
        <!-- 表格搜索btn end -->

        <!-- table start -->
        <el-table class="table-list" :data="list" stripe height="600" @selection-change="handleSelectionChange">
            <el-table-column type="selection" align="center" width="38"></el-table-column>
            <el-table-column width="80" align="center" label="编号">
                <template scope="scope">
                    <span>{{ scope.row.food_sn}}</span>
                </template>
            </el-table-column>
            <el-table-column width="80" align="center" label="图片">
                <template scope="scope">
                    <img :src="scope.row.food_img_list[0]" alt="菜品图片">
                </template>
            </el-table-column>
            <el-table-column width="93" align="center" label="名称">
                <template scope="scope">
                    <span>{{ scope.row.food_name}}</span>
                </template>
            </el-table-column>
            <el-table-column width="100" align="center" label="价格">
                <template scope="scope">
                    <span>原价:{{ scope.row.food_price.original_price}}</span>
                </template>
            </el-table-column>
            <el-table-column width="60" align="center" label="规格">
                <template scope="scope">
                    <span>{{ scope.row.food_unit}}</span>
                </template>
            </el-table-column>
            <el-table-column width="80" align="center" label="商品类别">
                <template scope="scope">
                    <span>{{ scope.row.category_name[0]}}</span>
                </template>
            </el-table-column>
            <el-table-column width="80" align="center" label="当日销量">
                <template scope="scope">
                    <span>{{ scope.row.food_num_day}}</span>
                </template>
            </el-table-column>
            <el-table-column width="80" align="center" label="周销量">
                <template scope="scope">
                    <span>{{ scope.row.food_num_week}}</span>
                </template>
            </el-table-column>
            <el-table-column width="80" align="center" label="月销量">
                <template scope="scope">
                    <span>{{ scope.row.food_num_mon}}</span>
                </template>
            </el-table-column>
            <el-table-column width="80" align="center" label="月销量">
                <template scope="scope">
                    <span>{{ scope.row.food_num_mon}}</span>
                </template>
            </el-table-column>
            <el-table-column width="80" align="center" label="月销量">
                <template scope="scope">
                    <span>{{ scope.row.food_num_mon}}</span>
                </template>
            </el-table-column>
            <el-table-column width="80" align="center" label="余量数">
                <template scope="scope">
                    <span>{{ scope.row.stock_num}}</span>
                </template>
            </el-table-column>
            <el-table-column width="80" align="center" label="分享数">
                <template scope="scope">
                    <span>{{ scope.row.share_num}}</span>
                </template>
            </el-table-column>
            <el-table-column width="80" align="center" label="收藏数">
                <template scope="scope">
                    <span>{{ scope.row.favorites_num}}</span>
                </template>
            </el-table-column>
            <el-table-column width="80" align="center" label="评论数">
                <template scope="scope">
                    <span>{{ scope.row.comment_num}}</span>
                </template>
            </el-table-column>
            <el-table-column width="80" align="center" label="二维码">
                <template scope="scope">
                    <img :src="scope.row.code_img" alt="二维码">
                </template>
            </el-table-column>
            <el-table-column min-width="140" align="center" label="操作">
                <template scope="scope">
                    <span @click="stateSingleOff(scope.row.food_id)" v-if="scope.row.sale_off === SaleStatusCfg.YES" class="red-text" style="padding-right:10px;padding-bottom:10px;">下架</span>
                    <span @click="stateSingleOn(scope.row.food_id)" v-else class="blue-text" style="padding-right:10px;padding-bottom:10px;">上架</span>
                    <span class="blue-text">预览</span>
                    <br>
                    <span class="blue-text">
                        <router-link :to="{path:'/good',query: { foodId:scope.row.food_id}}">
                            编辑
                        </router-link>
                    </span>
                    <span @click="deleteFood(scope.row.food_id)" class="red-text" style="padding-left:10px;padding-top:10px;">删除</span>
                </template>
            </el-table-column>
        </el-table>
        <!-- table end -->

        <!-- 分页 starat -->
        <div class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,40]" :page-size="listQuery.limit" layout="sizes, jumper, prev, pager, next" :total="total">
            </el-pagination>
        </div>
        <!-- 分页 end -->
    </div>
</template>

<script>
import { SaleStatus } from "@/config/cfg";
import { getTableList, getTableCategory} from '../api';
import { GoodList } from '../index.js';

export default {
    data() {
        return {
            searchName: "",  //搜索名称或者编号
            saleStatus: "",  //上下架状态，0上架, 1下架 ,2全部
            SaleStatusCfg: SaleStatus,
            saleStatusItem: [{
                value: 2,
                label: '全部'
            }, {
                value: 0,
                label: '上架'
            }, {
                value: 1,
                label: '下架'
            }],
            list: null,
            total: null, //分页总条数
            listQuery: {
                page: 1,
                limit: 10,
                importance: undefined,
                title: undefined,
                type: undefined,
                sort: '+id'
            },
            multipleSelection: [],  //存放多选选中数据
        };
    },
    created() {
        this.getList();
        //<<<<<<<<<<<<<<<<<<<<<
        // this.getCategory();
    },
    methods: {
        //拉取table数据
        getList() {
            let data = {
                foodlist: 1,
                page_size: 100
            };
            getTableList(data, this.tableHander);
        },
        tableHander(resp) {
            if (resp.ret === 0) {
                this.list = resp.data.list || [];
                this.total = this.list.length;
            } else {
                console.log("错误! ");
            }
        },
        //搜索拉取列表
        serchGetList() {
            GoodList.searchGetList(this.saleStatus, this.searchName, this.tableHander);
        },
        //删除food
        deleteFood(foodId) {
            let foodArr = [];
            foodArr.push(foodId);
            GoodList.deleteFoodItems(foodArr, this.deleteFoodHander);
        },
        deleteFoodHander() {
            this.getList();
        },
        //批量删除
        multipleDeleteFood() {
            let foodArr = this.multipleSelection.map(function(item) {
                return item.food_id;
            });
            GoodList.deleteFoodItems(foodArr, this.deleteFoodHander);
        },
        //批量更改状态
        stateSingleOn(foodId) {
            let foodArr = [];
            foodArr.push(foodId);

            GoodList.changeStatusOn(foodArr, this.deleteFoodHander);
        },
        stateSingleOff(foodId) {
            let foodArr = [];
            foodArr.push(foodId);

            GoodList.changeStatusOff(foodArr, this.deleteFoodHander);
        },
        stateOn() {
            let foodArr = this.multipleSelection.map(function(item) {
                return item.food_id;
            });

            GoodList.changeStatusOn(foodArr, this.deleteFoodHander);
        },
        stateOff() {
            let foodArr = this.multipleSelection.map(function(item) {
                return item.food_id;
            });

            GoodList.changeStatusOff(foodArr, this.deleteFoodHander);
        },
        //拉取分类
        getCategory() {
            getTableCategory(this.categoryHander);
        },
        categoryHander(resp) {
            if (resp.ret === 0) {
                console.log(resp.data);
            }
        },
        //分页事件处理，条数和当前页数改变触发
        handleSizeChange(val) {
            this.listQuery.limit = val;
            // this.getList();
        },
        handleCurrentChange(val) {
            this.listQuery.page = val;
            // this.getList();
        },
        goGoodEditor() {
            this.$router.push({ path: '/good' });
        },
        //多选
        handleSelectionChange(val) {
            this.multipleSelection = val;
        }
    }
};

</script>

<style lang="scss" scoped>
@import 'src/styles/mixin.scss';

#good-title {
    width: 100%;
}

.table-list {
    // margin: 0 14px;
}

.table-title {
    @include wh(100%, 40px);
    @include fc(14px, #666666);
    line-height: 40px;
    background-color: #F6F8FC;
    padding-left: 14px;
}

.search-content {
    padding: 0 14px;

    .search-left {
        padding: 20px 0;
        min-width: 500px;
    }

    .search-right {
        padding: 20px 0;
        min-width: 558px;
    }
}

.pagination-container {
    margin: 50px 0 14px 20%;
}

.red-text {
    @include fc(14px, #E7487E);
    cursor: pointer;
}

.red-text:nth-child(even) {
    padding-right: 10px;
    padding-bottom: 10px;
}

// .red-text:nth-child(even){
//     padding-left: 10px;
//     padding-top: 10px;
// }
.blue-text {
    @include fc(14px, #4877E7);
    cursor: pointer;

    a {
        @include fc(14px, #4877E7);
    }
}
</style>

<style lang="scss">
@import 'src/styles/mixin.scss';

#good-table {
    .search-content {
        font-size: 0;

        .el-input {
            font-size: 14px;
            width: inherit;

            input {
                @include wh(180px, 34px);
                border-radius: 0;
            }
        }

        .el-select {
            padding: 0 20px; // @include wh(180px, 34px);
        }

        .el-button {
            @include wh(100px, 34px);
            border: 1px solid #4877E7;
            color: #4877E7;
            border-radius: 0;
            font-size: 14px;
        }
    }

    .el-table {
        width: inherit;
    }

    .el-table .cell {
        padding-right: 0;
        padding-left: 0;
    }
    .el-select-dropdown {
        min-width: 181px !important;
    }
}
</style>




