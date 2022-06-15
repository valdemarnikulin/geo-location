export default {
    state:{
        isNewTask: false,
    },
    getters: {},
    mutations: {
showNewTask(state) {
state.isNewTask = true;
},
closeNewTask(state) {
    state.isNewTask = false;
},
    },
}