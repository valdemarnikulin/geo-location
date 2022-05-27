import axios from "axios";
// import { getGoogleMapsAPI } from "gmap-vue";
const baseURL = "http://localhost:3000/media";
// import {google} from "gmap-vue";
export default {
    
    state: {
        nameTask:"",
        isReady: true,
        items: [],
    polygons:[],
        // map: this.$refs.gmap.$mapObject,
    },
    getters: {//computed
getButtonVisible: (state) => state.isReady,
// google:getGoogleMapsAPI,
        //filter
    },
    mutations: {//methods
        activeButton(state) {
            state.isReady = false;
        },
        unActiveButton(state) {
            state.isReady = true;
        },
    },
    actions: {
        //async fetch server
        async sendData(state) {
            console.log("🚀 ~ file: mapsModule.js ~ line 23 ~ sendData ~ state", state)
            try {
                console.log("🚀 ~ file: mapsModule.js ~ line 24 ~ sendData ~ state.items", state.state.items)
                
                const params = {
                    nameTask: state.nameTask,
                    Areas: state.state.items
                }
                const res = await axios.post(baseURL, params);
            console.log("🚀 ~ file: mapsModule.js ~ line 25 ~ sendData ~ res", res)
            
            
            // state.state.items = {...state.state.items, data:res.data};
            // console.log("🚀 ~ file: mapsModule.js ~ line 27 ~ sendData ~ state.items", state.state.items)
      
              state.state.items = [];
              state.state.polygons.forEach((poly) => {
                poly.setMap(null);
              });
            } catch (e) {
              console.error(e);
            }
          },
          async getData(state) {
              try {
                const res =   await axios.get(baseURL);
                console.log("🚀 ~ file: mapsModule.js ~ line 42 ~ getData ~ res", res)
                let {data:[[...item]]} = res
                console.log("🚀 ~ file: mapsModule.js ~ line 46 ~ getData ~ item", item)
        item.forEach(el => {
            state.state.items.push(el)
        });
                // state.state.items.push(item)
                console.log("🚀 ~ file: mapsModule.js ~ line 48 ~ getData ~  state.state.items",  state.state.items)
//                 state.state.items = res.data;
//                 console.log("🚀 ~ file: mapsModule.js ~ line 43 ~ getData ~ state.state.items", state.state.items)
// let [[deepfirst]] = state.state.items || [];
// console.log("🚀 ~ file: mapsModule.js ~ line 46 ~ getData ~ deepfirst", deepfirst)
// state.state.items.push(deepfirst)
// console.log("🚀 ~ file: mapsModule.js ~ line 48 ~ getData ~ state.state.items", state.state.items)
            } catch (error) {
                console.error(error);
              }
          }, 
    },
}