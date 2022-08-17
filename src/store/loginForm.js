import axios from "axios";
const baseURL = "http://localhost:3000/users";
// const secret = "C5037E52C6154E7AB14CFDA89F39CB06"
// const jwt = require('jsonwebtoken');
// import { Jwt } from 'jsonwebtoken';

export default {
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    user: {},
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, user) {
      state.status = "success";
      //   state.token = token;
      state.user = user;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.user = null;
      //   state.status = "";
      //   state.token = "";
    },
  },
  actions: {
    login({ commit }, user) {
      console.log("🚀 ~ file: loginForm.js ~ line 33 ~ login ~ user", user);
      return new Promise((resolve, reject) => {
        commit("auth_request");
        //   .post(baseURL, user) // change put
        axios
          //   .get(`${baseURL}/${user}`)
          .get(`${baseURL}?email=${user.email}`)
          //   .get(baseURL)

          .then((resp) => {
            let {
              data: [currentUser],
            } = resp;
            if (currentUser == undefined) {
              commit("auth_error");
              reject("User is not found");
            } else {
              commit("auth_success", currentUser);
              localStorage.setItem("user", JSON.stringify(currentUser));
              resolve(currentUser);
            }
          })
          // const token = resp.token;
          // const user = resp.user;
          // localStorage.setItem("token", token);
          // axios.defaults.headers.common["Authorization"] = token;
          // commit("auth_success", user);
          // resolve(resp);
          .catch((err) => {
            commit("auth_error");
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    // register({commit}, user){
    // const token = jwt.sign({ sub: user.name }, secret, { expiresIn: '7d' });
    // user.token = token
    // return new Promise((resolve, reject) => {
    // commit('auth_request')
    // axios.post(baseURL, user)
    // .then(resp => {
    // const token = resp.data.token
    // const user = resp.data.user
    // localStorage.setItem('token', token)
    // axios.defaults.headers.common['Authorization'] = token
    // commit('auth_success', token, user)
    // resolve(resp)
    // })
    // .catch(err => {
    // commit('auth_error', err)
    // localStorage.removeItem('token')
    // reject(err)
    // })
    // })
    //  },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "http://localhost:3000/users",
          data: user,
          method: "POST",
        })
          .then((resp) => {
            const token = resp.data.token;
            const user = resp.data.user;
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = token;
            commit("auth_success", token, user);
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error", err);
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    logout({ commit }) {
      //   return new Promise((resolve) => {
      //     commit("logout");
      //     localStorage.removeItem("token");
      //     delete axios.defaults.headers.common["Authorization"];
      //     resolve();
      //   });
      commit("logout");
      localStorage.removeItem("user");
    },
  },
  //   getters: {
  //     isLoggedIn: (state) => !!state.token,
  //     authStatus: (state) => state.status,
  //   },
};
