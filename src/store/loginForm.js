import axios from "axios";
const baseURL = "http://localhost:3000/users";

export default {
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    user: {},
  },
  mutations: {
    AUTH_REQUEST(state) {
      state.status = "loading";
    },
    AUTH_SUCCESS(state, token, user) {
      state.status = "success";
      state.token = token;
      state.user = user;
    },
    AUTH_ERROR(state) {
      state.status = "error";
    },
    LOGOUT(state) {
      state.user = null;
      state.token = "";
    },
  },
  actions: {
    login({ commit }, user) {
      console.log("🚀 ~ file: loginForm.js ~ line 26 ~ login ~ user", user);
      return new Promise((resolve, reject) => {
        commit("AUTH_REQUEST");
        const email = user.email;
        axios
          .get(`${baseURL}?email=${email}`)
          .then((resp) => {
            console.log(
              "🚀 ~ file: loginForm.js ~ line 31 ~ .then ~ resp",
              resp
            );
            console.log(
              "🚀 ~ file: loginForm.js ~ line 71 ~ .then ~ resp",
              resp
            );
            const token = resp.data.token;
            const user = resp.data.user;
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = token;
            commit("AUTH_SUCCESS", token, user);
            // let {
            //   data: [currentUser],
            // } = resp;
            // if (currentUser == undefined) {
            //   commit("AUTH_ERROR");
            //   reject("User is not found");
            // } else {
            //   commit("AUTH_SUCCESS", currentUser);
            //   localStorage.setItem("user", JSON.stringify(currentUser));
            //   resolve(currentUser);
            // }
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
        // axios({
        //   url: "http://localhost:4000/users",
        //   data: user,
        //   method: "POST",
        // })
        axios
          .post("http://localhost:4000/users", user)
          .then((resp) => {
            resolve(resp);
            console.log(
              "🚀 ~ file: loginForm.js ~ line 71 ~ .then ~ resp",
              resp
            );
            const token = resp.data.token;
            const user = resp.data.user;
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = token;
            commit("AUTH_SUCCESS", token, user);
          })
          .catch((err) => {
            commit("AUTH_ERROR", err);
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit("LOGOUT");
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"]
          .then(() => {
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    // LOGOUT({ commit }) {
    //   commit("LOGOUT");
    //   localStorage.removeItem("user");
    // },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
  },
};
