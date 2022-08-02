import axios from "axios";
const baseURL = "http://localhost:3000/Areas";
export default {
    
    state: {
        message:"",
        isReady: true,
        itemsArea: [],
    polygons:[],
    showMap: false,
    status: null,
    },
    getters: {//computed
getButtonVisible(state){
 return   state.showMap
},
createNameTask(state) {
    return state.message
}

    },
    mutations: {//methods
pushItemArea(state, payload){
    if(state.itemsArea.includes(payload)){
        return
}
state.itemsArea.push(payload);
},
        addNewStatus(state, payload){
            state.status = payload
        },
        updateMessage(state, message) {
            state.message = message
        },
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
        },
        changeIsShowMap(state) {
state.showMap = true
        },
        DELETE_AREA(state, payload) {      
            let findItem = state.itemsArea.findIndex(el => el.id == payload.id)     
            state.itemsArea.splice(findItem,1);
          }, 
        
    },
    actions: {
        //async fetch server
        async sendData(state) {
            try {
                const params = {   
                    // taskName: state.state.message,
                    Areas: state.state.itemsArea
                }
                await axios.post(baseURL, params);
              state.state.itemsArea = [];
              state.state.polygons.forEach((poly) => {
                poly.setMap(null);
              });
            } catch (e) {
              console.error(e);
            }
          },
          async getData(state,payload) {
            state.state.itemsArea = [];
              try { 
                      const res =   await axios.get(baseURL);
                     const {data} = res;
                  let findObj = data.find(el => el.id === payload)
                      findObj.Areas.forEach(el => {
                  state.state.itemsArea.push(el)
                });
            } catch (error) {
                console.error(error);
              }
          }, 
          async deleteArea({commit}, payload) {
            console.log("🚀 ~ file: mapsModule.js ~ line 88 ~ deleteArea ~ payload", payload)
            await axios.delete(`${baseURL}/${payload.id}`)
            commit('DELETE_AREA', payload)
          }
    },
}