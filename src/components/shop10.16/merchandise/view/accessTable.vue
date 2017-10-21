<template>
    <div id="access-table">
        <div class="table-title">详情列表</div>

        <!-- 表格搜索btn start -->
        <div class="search-content clearfix">
            <div class="search-left left clearfix">
                <el-input v-model="searchName" placeholder="名称或者编号" class="left"></el-input>

                <el-button class="searchBtn" @click="serchGetList">搜索</el-button>
            </div>

            <div class="search-right right">
                <el-button @click="goAccessEditor">创建</el-button>
                <el-button @click="goDraft">草稿</el-button>
                <el-button class="red" @click="multipleDeleteFood">删除</el-button>
            </div>
        </div>
        <!-- 表格搜索btn end -->

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
                    <img :src="imgbase_url + '/img_get.php?img=1&height=69&width=69&imgname=' + scope.row.food_img_list[0]" alt="菜品图片">
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

            <el-table-column min-width="80" align="center" label="余量数">
                <template scope="scope">
                    <span>{{ scope.row.stock_num}}</span>
                </template>
            </el-table-column>

            <el-table-column min-width="140" align="center" label="操作">
                <template scope="scope">
                    <span class="blue-text">
                        <router-link :to="{path:'/good/accesseditor',query: { foodId:scope.row.food_id}}">
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
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,40]" :page-size="listQuery.limit" layout="sizes, jumper, prev, pager, next" :total="total">
            </el-pagination>
        </div>
        <!-- 分页 end -->
    </div>
</template>

<script>
import { getTableList, getTableCategory } from "../api";
import { GoodList } from "../index.js";

export default {
  data() {
    return {
      searchName: "", //搜索名称或者编号
      list: null, //表格数据
      total: null, //分页总条数
      listQuery: {
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id"
      },
      multipleSelection: [], //存放多选选中数据
      imgbase_url: imgbase_url //图片路径
    };
  },
  computed: {
    selectCategoryId() {
      return this.$store.state.good.selectCategoryId;
    },
    pageSize() {
      return this.$store.state.good.pageSize;
    }
  },
  created() {
    this.getList();
    this.initPageSize();
  },
  watch: {
    selectCategoryId: function(val) {
      this.getListById(val);
    }
  },
  methods: {
    //拉取表格数据
    getList() {
      let data = {
        foodlist: 1,
        page_size: this.pageSize,
        category_id: this.selectCategoryId
      };
      getTableList(data, this.tableHander);
    },

    tableHander(resp) {
      if (resp.ret === 0) {
        this.list = resp.data.list || [];
        this.total = this.list.length;
      } else {
        console.log("获取表格数据错误!");
      }
    },
    //id拉取
    getListById(id) {
      let data = {
        foodlist: 1,
        category_id: id,
        page_size: this.pageSize
      };
      getTableList(data, this.tableHander);
    },
    //搜索
    serchGetList() {
      let data = {
        foodlist: 1,
        page_size: this.pageSize,
        category_id: this.selectCategoryId,
        food_name: this.searchName
      };
      getTableList(data, this.tableHander);
    },
    //新建跳转
    goAccessEditor() {
      this.$router.push({ path: "/good/accesseditor" });
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
    //批量删除
    multipleDeleteFood() {
      let foodArr = this.multipleSelection.map(function(item) {
        return item.food_id;
      });
      GoodList.deleteFoodItems(foodArr, this.deleteFoodHander);
    },
    //分页事件处理，条数和当前页数改变触发
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.$store.commit("CHANGE_PAGESIZE", val);
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      // this.getList();
    },
    //多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //去草稿页面
    goDraft() {
      this.$router.push({ path: "/good/draft" });
    },
    //初始化pageSize
    initPageSize() {
      this.listQuery.limit = this.pageSize;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/styles/mixin.scss";

#access-table {
  background: #ffffff;
  box-shadow: 0 2px 4px 0 #becaeb;
}

#access-title {
  width: 100%;
}

.table-title {
  @include wh(100%, 40px);
  @include fc(14px, #666666);
  line-height: 40px;
  background-color: #f6f8fc;
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
    min-width: 320px;
  }

  .searchBtn {
    margin-left: 20px;
  }
}

.pagination-container {
  text-align: center;
}

.red-text {
  @include fc(14px, #E7487E);
  cursor: pointer;
}

.blue-text {
  @include fc(14px, #4877e7);
  cursor: pointer;

  a {
    @include fc(14px, #4877e7);
  }
}
.table-content {
  padding-left: 14px;
  padding-right: 14px;

  table {
    img {
      @include wh(60px, 60px);
      vertical-align: middle;
      margin: 10px 0;
    }
  }
}
</style>

<style lang="scss">
@import "src/styles/mixin.scss";

#access-table {
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

    .el-button {
      @include wh(100px, 34px);
      border: 1px solid #4877e7;
      color: #4877e7;
      border-radius: 0;
      font-size: 14px;
    }
    .el-button.red {
      color: #e7487e;
      border-color: #e7487e;
    }
  }
  .el-pagination {
    padding-top: 50px;
    padding-bottom: 14px;
  }
  .el-pagination__jump {
    margin-left: 5px;
    margin-right: 15px;
  } // .el-table {
  //     width: inherit;
  // }
  // .el-table .cell {
  //     padding-right: 0;
  //     padding-left: 0;
  // }
  // .el-select-dropdown {
  //     min-width: 181px !important;
  // }
}
</style>
