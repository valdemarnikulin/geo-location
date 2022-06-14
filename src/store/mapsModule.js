import axios from "axios";
// import { getGoogleMapsAPI } from "gmap-vue";
const baseURL = "http://localhost:3000/media";
// import {google} from "gmap-vue";
export default {
    
    state: {
        message:"",
        isReady: true,
        items: [],
    polygons:[],
    showMap: false
        // map: this.$refs.gmap.$mapObject,
    },
    getters: {//computed
getButtonVisible(state){
    console.log("🚀 ~ file: mapsModule.js ~ line 18 ~ getButtonVisible ~ state.showMap", state.showMap)
 return   state.showMap
},
createNameTask(state) {
    console.log("🚀 ~ file: mapsModule.js ~ line 18 ~ createNameTask ~ tate.nameTask", state.nameTask)
    return state.message
}
// google:getGoogleMapsAPI,
        //filter
    },
    mutations: {//methods
        updateShowMap(state, message) {
            state.showMap = message
        },
        activeButton(state) {
            state.isReady = false;
        },
        unActiveButton(state) {
            state.isReady = true;
        },
        setForm(state, payload) {
            state.message = payload
        }
    },
    actions: {
        //async fetch server
        async sendData(state) {
            console.log("🚀 ~ file: mapsModule.js ~ line 23 ~ sendData ~ state", state)
            try {
                console.log("🚀 ~ file: mapsModule.js ~ line 24 ~ sendData ~ state.items", state.state.items)
                
                const params = {
                    
                    taskName: state.state.message,
                    Areas: state.state.items
                }
                console.log("🚀 ~ file: mapsModule.js ~ line 37 ~ sendData ~ state.nameTask", state.state.nameTask)
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


          async getData(state,payload) {
              console.log("🚀 ~ file: mapsModule.js ~ line 65 ~ getData ~ payload", payload)
              try {
                  
                  console.log("🚀 ~ file: mapsModule.js ~ line 68 ~ getData ~ baseURL", baseURL)
                const res =   await axios.get(baseURL);
                console.log("🚀 ~ file: mapsModule.js ~ line 42 ~ getData ~ res", res)
               let {data} = res;
               console.log("🚀 ~ file: mapsModule.js ~ line 72 ~ getData ~ data", data)
            let findObj = data.find(el => el.id === payload)
            console.log("🚀 ~ file: mapsModule.js ~ line 74 ~ getData ~ findObj", findObj)
               //   let currentItem = res.data.splice(i,1);
            //   console.log("🚀 ~ file: mapsModule.js ~ line 72 ~ getData ~ currentItem", currentItem)
                // let {data:[{...item}]} = res
                // console.log("🚀 ~ file: mapsModule.js ~ line 46 ~ getData ~ item", item)
                findObj.Areas.forEach(el => {
            state.state.items.push(el)
        });
                // state.state.items.push(item)
                // console.log("🚀 ~ file: mapsModule.js ~ line 48 ~ getData ~  state.state.items",  state.state.items)
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