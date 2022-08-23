import axios from "axios";
import store from "..";
const baseURL = "http://localhost:3000/tasks";

export default {
  state: {
    oldTasks: [],
    item: [],
    showOldTask: true,
  },
  getters: {},
  mutations: {
    DELETE_ITEM(state, payload) {
      let findItem = state.oldTasks.findIndex((el) => el.id == payload.id);
      state.oldTasks.splice(findItem, 1);
    },
    CHANGE_SHOW_OLD_TASK(state, payload) {
      state.showOldTask = payload;
    },
    PUSH_ITEM_TO_OLD_TASK(state, payload) {
      state.oldTasks.push(payload);
    },
  },

  actions: {
    async editTask(state, payload) {
      let user = store.state.loginForm.user;
      payload.userEmail = user.email;
      await axios
        .put(`${baseURL}/${payload.id}`, payload)
        .then(() => {
          console.log("SUCCESS from edit task!!");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async addNewTask(state, payload) {
      let user = store.state.loginForm.user;
      payload.userEmail = user.email;
      await axios
        .post(baseURL, payload)
        .then(() => {
          console.log("SUCCESS!!");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getAllData(state) {
      let user = store.state.loginForm.user;

      await axios
        .get(`${baseURL}?userEmail=${user.email}`)
        .then((res) => {
          const { data } = res;
          state.state.oldTasks = [...data];
          console.log("SUCCESS from get all data!!");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getCurrentTask(state, payload) {
      state.state.item = [];
      await axios
        .get(`${baseURL}/${payload.id}`, payload)
        .then((res) => {
          const { data } = res;
          state.state.item = data;
          console.log("SUCCESS from get current task!!");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async deleteTask({ commit }, payload) {
      await axios
        .delete(`${baseURL}/${payload.id}`)
        .then(() => {
          commit("DELETE_ITEM", payload);
          console.log("SUCCESS!!");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
