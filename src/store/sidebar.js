export default {
  state: {
    showSideBar: false,
  },
  mutations: {
    CHANGE_SHOW(state) {
      state.showSideBar = !state.showSideBar;
    },
  },
};
