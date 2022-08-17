import axios from "axios";
import store from "..";
const baseURL = "http://localhost:3000/users";

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
      await axios
        .put(`${baseURL}/${payload.id}`, payload)
        .then(() => {
          console.log("SUCCESS!!");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async addNewTask(state, payload) {
      const user = store.state.loginForm.user;
      console.log("🚀 ~ file: oldTasks.js ~ line 38 ~ addNewTask ~ user", user);
      await axios
        // .post(`${baseURL}/${user}/${user.tasks}`, payload)
        .post(`${baseURL}?tasks=${user.tasks}`, payload)

        .then(() => {
          console.log("SUCCESS!!");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getAllData(state) {
      await axios
        .get(baseURL)
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
        .get(baseURL)
        .then((res) => {
          const { data } = res;
          let findObj = data.find((el) => el.id === payload.id);
          state.state.item = findObj;
          console.log("SUCCESS!!");
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
