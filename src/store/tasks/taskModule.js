export default {
  state: {
    isNewTask: false,
  },
  getters: {},
  mutations: {
    SHOW_NEW_TASK(state) {
      state.isNewTask = true;
    },
    CLOSE_NEW_TASK(state) {
      state.isNewTask = false;
    },
  },
};
