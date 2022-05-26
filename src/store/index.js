import Vue from 'vue';
import Vuex from 'vuex';
import mapsModule from './mapsModule';
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        mapsModule,
    }
})