import Vue from 'vue';
import Vuex from 'vuex';
import mapsModule from './mapsModule';
import taskModule from './taskModule';
import oldTask from './oldTask';
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        mapsModule,
        taskModule,
        oldTask
    }
})