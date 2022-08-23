export default {
  state: {
    status: null,
  },
  mutations: {
    ADD_NEW_STATUS(state, payload) {
      state.status = payload;
    },
  },
};
