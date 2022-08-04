import Vue from "vue";
import App from "./App.vue";
import GmapVue from "gmap-vue";
import router from './router'
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { DateTime } from "luxon"
import { library } from "@fortawesome/fontawesome-svg-core";
import { faXmark,
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
  faMapPin
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import axios from 'axios';
import VueAxios from 'vue-axios';
import store from './store';
import VueScrollTo from 'vue-scrollto';
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
  y: true
})
Vue.use(VueAxios, axios);
library.add(faXmark, faMapPin, faPencil, faPlus, faPenToSquare, faTrashCan, faBars, faAngleRight, faTowerBroadcast, faGlobe, faCheck, faComments );
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.config.productionTip = false;
Object.defineProperty(Vue.prototype, '$DateTime', { value: DateTime });
Vue.use(GmapVue, {
  load: {
    // [REQUIRED] This is the unique required value by Google Maps API
    key: "AIzaSyDLZeaDGySyzjTZSFlGzLu6GwrWyUI4Ym8",
    // key: "AIzaSyDLEvPNQnvOtKO4wp1XBfVTQdZIsf3gr6U",
    // [OPTIONAL] This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
    libraries: "places, drawing",

    // [OPTIONAL] If you want to set the version, you can do so:
    v: "3.26",

    // This option was added on v3.0.0 but will be removed in the next major release.
    // If you already have an script tag that loads Google Maps API and you want to use it set you callback
    // here and our callback `GoogleMapsCallback` will execute your custom callback at the end; it must attached
    // to the `window` object, is the only requirement.
    customCallback: "MyCustomCallback",
  },

  // [OPTIONAL] If you intend to programmatically custom event listener code
  // (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  // instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  // you might need to turn this on.
  autoBindAllEvents: false,

  // [OPTIONAL] If you want to manually install components, e.g.
  // import {GmapMarker} from 'gmap-vue/src/components/marker'
  // Vue.component('GmapMarker', GmapMarker)
  // then set installComponents to 'false'.
  // If you want to automatically install all the components this property must be set to 'true':
  installComponents: true,

  // Load the Google Maps API dynamically, if you set this to `true` the plugin doesn't load the Google Maps API
  dynamicLoad: false,
});

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.prototype.$http = axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}
new Vue({
  render: (h) => h(App),
  store, 
  router,
}).$mount("#app");
