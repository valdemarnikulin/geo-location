import Vue from "vue";
import App from "./App.vue";
import GmapVue from "gmap-vue";
import router from "./router";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { DateTime } from "luxon";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import axios from "axios";
import VueAxios from "vue-axios";
import store from "./store";
import VueScrollTo from "vue-scrollto";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import {
  faXmark,
  faPencil,
  faPlus,
  faPenToSquare,
  faTrashCan,
  faBars,
  faAngleRight,
  faCheck,
  faTowerBroadcast,
  faGlobe,
  faComments,
  faMapPin,
  faSearch,
  faTimes,
  faPaperPlane,
  faSmile,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";

Vue.directive("click-outside", {
  bind(el, binding) {
    el.addEventListener("mousedown", (e) => e.stopPropagation());
    el.addEventListener("mouseup", (e) => e.stopPropagation());
    el.addEventListener("click", (e) => e.stopPropagation());
    el.addEventListener("select", (e) => e.stopPropagation());
    document.addEventListener("mouseup", binding.value);
    document.addEventListener("mousedown", binding.value);
    document.addEventListener("click", binding.value);
    document.addEventListener("select", binding.value);
  },
  // },
  unbind(el, binding) {
    document.removeEventListener("mouseup", binding.value);
    document.removeEventListener("mousedown", binding.value);
    document.removeEventListener("click", binding.value);
    document.removeEventListener("select", binding.value);
  },
});
Vue.use(VueScrollTo, {
  container: "body",
  duration: 500,
  easing: "ease",
  offset: 0,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true,
});
Vue.use(VueAxios, axios);
library.add(
  faXmark,
  faPaperPlane,
  faSmile,
  faPaperclip,
  faTimes,
  faSearch,
  faMapPin,
  faPencil,
  faPlus,
  faPenToSquare,
  faTrashCan,
  faBars,
  faAngleRight,
  faTowerBroadcast,
  faGlobe,
  faCheck,
  faComments
);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("indexForm", () => import("@/pages/IndexForm.vue"));
Vue.component("NotFound", () => import("@/pages/NotFound.vue"));
Vue.component("MainPage", () => import("@/pages/MainPage.vue"));
Vue.component("RegistrationPage", () => import("@/pages/RegistrationPage.vue"));
Vue.component("AuthorizationPage", () =>
  import("@/pages/AuthorizationPage.vue")
);
Vue.config.productionTip = false;
Object.defineProperty(Vue.prototype, "$DateTime", { value: DateTime });
Vue.use(GmapVue, {
  load: {
    key: "AIzaSyDLZeaDGySyzjTZSFlGzLu6GwrWyUI4Ym8",
    libraries: "places, drawing",
    v: "3.26",
    customCallback: "MyCustomCallback",
  },
  autoBindAllEvents: false,
  installComponents: true,
  dynamicLoad: false,
});

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
// const token = localStorage.getItem("token");
// if (token) {
//   axios.defaults.headers.common["Authorization"] = token;
// }

const firebaseConfig = {
  apiKey: "AIzaSyCbJaBlSpAqfhb9dmN2pWQOdzyuSyyvIMA",
  authDomain: "my-app--maps.firebaseapp.com",
  projectId: "my-app--maps",
  storageBucket: "my-app--maps.appspot.com",
  messagingSenderId: "735582969026",
  appId: "1:735582969026:web:485be50c62ebeb113aaf5b",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
// firebase().firestore().settings({
//   experimentalForceLongPolling: true, // this line
//   useFetchStreams: false, // and this line
// })

export { auth, db };

const app = firebase.auth().onAuthStateChanged(() =>
  new Vue({
    render: (h) => h(App),
    store,
    router,
  }).$mount("#app")
);
if (window.Cypress) {
  // only available during E2E tests
  window.app = app;
}
