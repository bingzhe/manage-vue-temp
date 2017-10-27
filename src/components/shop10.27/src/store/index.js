import Vue from 'vue';
import Vuex from 'vuex';
import good from './modules/good';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        good,
        
    },
    getters
});

export default store;