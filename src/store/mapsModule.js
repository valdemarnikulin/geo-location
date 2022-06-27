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
    showMap: false,
    status: null,
        // map: this.$refs.gmap.$mapObject,
    },
    getters: {//computed
getButtonVisible(state){
 return   state.showMap
},
createNameTask(state) {
    return state.message
}
// google:getGoogleMapsAPI,
        //filter
    },
    mutations: {//methods
        editStatus(state){
            state.status = 'edit'
        },
        addNewStatus(state){
            state.status = 'new task'
        },
        updateMessage(state, message) {
            state.message = message
        },
        updateShowMap(state, message) {
            console.log("🚀 ~ file: mapsModule.js ~ line 27 ~ updateShowMap ~ message", message)
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
        },
        changeIsShowMap(state) {
state.showMap = true
console.log("map cahnge")
        }
        
    },
    actions: {
        //async fetch server
        async sendData(state) {
            try {
                
                const params = {
                    
                    taskName: state.state.message,
                    Areas: state.state.items
                }
                // const res = 
                await axios.post(baseURL, params);
              state.state.items = [];
              state.state.polygons.forEach((poly) => {
                poly.setMap(null);
              });
            } catch (e) {
              console.error(e);
            }
          },


          async getData(state,payload) {
            
            console.log("🚀 ~ file: mapsModule.js ~ line 66 ~ getData ~ state", state)

               // eslint-disable-next-line no-debugger
            //    debugger;
              console.log("🚀 ~ file: mapsModule.js ~ line 63 ~ getData ~ payload", payload)
              try {
                  
                      
                      const res =   await axios.get(baseURL);
                     const {data} = res;
                     console.log("🚀 ~ file: mapsModule.js ~ line 66 ~ getData ~ data", data)
                  let findObj = data.find(el => el.id === payload)
                  console.log("🚀 ~ file: mapsModule.js ~ line 67 ~ getData ~ findObj", findObj)
                      findObj.Areas.forEach(el => {
                  state.state.items.push(el)
              });
              console.log("🚀 ~ file: mapsModule.js ~ line 82 ~ getData ~ state", state)

            } catch (error) {
                console.error(error);
              }
          }, 
          async getDataOnce(state) {
              try {
                const res =   await axios.get(baseURL);
                const {data} = res;
                state.state.items.push(data)
              } catch (error) {
              console.log("🚀 ~ file: mapsModule.js ~ line 92 ~ getDataOnce ~ error", error)
                  
              }
          },
    },
}