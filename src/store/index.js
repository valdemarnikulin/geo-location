import Vue from 'vue';
import Vuex from 'vuex';
import mapsModule from './mapsModule';
// import mapsModule from './mapsModule';
import taskModule from './tasks/taskModule';
import oldTask from './tasks/oldTask';
// import taskModule from './tasks/taskModule';
// import oldTask from './tasks/oldTask';
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        mapsModule,
        taskModule,
        oldTask
    }
})