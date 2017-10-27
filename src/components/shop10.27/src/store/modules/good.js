
const good = {
    state: {
        selectCategoryId: "",  //树结构选中的分类id,
        type: 1,   //菜品类型
        pageSize: 10,  //分页条数
    },

    mutations: {
        CHANGE_ID: (state, selectCategoryId) => {
            state.selectCategoryId = selectCategoryId;
        },
        CHANGE_TYPE: (state, type) => {
            state.type = type;
        },
        CHANGE_PAGESIZE: (state, pageSize) => {
            state.pageSize = pageSize;
        }
    },

    actions: {}
};

export default good;
