import Vue from 'vue';
import Vuex from 'vuex';
import mapsModule from './mapsModule';
import loginForm from './loginForm';
import sidebar from './sidebar';
import taskModule from './tasks/taskModule';
import oldTasks from './tasks/oldTasks';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        mapsModule,
        taskModule,
        oldTasks,
        loginForm,
        sidebar
    }
})