import { TOGGLE_SHRINK } from "../mutation-types";

const app = {
  state: {
    shrink: false
  },
  mutations: {
    [TOGGLE_SHRINK](state) {
      state.shrink = !state.shrink;
    }
  },
  actions: {},
  getters: {}
};

export default app;