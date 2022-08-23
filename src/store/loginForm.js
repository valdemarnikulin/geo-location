import axios from "axios";
const baseURL = "http://localhost:3000/users";

export default {
  state: {
    status: "",
    user: {},
  },
  mutations: {
    AUTH_REQUEST(state) {
      state.status = "loading";
    },
    AUTH_SUCCESS(state, user) {
      state.status = "success";
      state.user = user;
    },
    AUTH_ERROR(state) {
      state.status = "error";
    },
    LOGOUT(state) {
      state.user = null;
    },
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("AUTH_REQUEST");
        axios
          .get(`${baseURL}?email=${user.email}`)
          .then((resp) => {
            let {
              data: [currentUser],
            } = resp;
            if (currentUser == undefined) {
              commit("AUTH_ERROR");
              reject("User is not found");
            } else {
              commit("AUTH_SUCCESS", currentUser);
              localStorage.setItem("user", JSON.stringify(currentUser));
              resolve(currentUser);
            }
          })
          .catch((err) => {
            commit("AUTH_ERROR");
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("AUTH_REQUEST");
        axios({
          url: "http://localhost:3000/users",
          data: user,
          method: "POST",
        })
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            commit("AUTH_ERROR", err);
            reject(err);
          });
      });
    },
    LOGOUT({ commit }) {
      commit("LOGOUT");
      localStorage.removeItem("user");
    },
  },
};
