
const good = {
    state: {
        selectCategoryId: '',
    },

    mutations: {
        CHANGE_ID: (state, selectCategoryId) => {
            state.selectCategoryId = selectCategoryId;
        },
    },

    actions: {}
};

export default good;
