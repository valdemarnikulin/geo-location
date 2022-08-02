import axios from "axios";
// import mapsModule from "../mapsModule";
const baseURL = "http://localhost:3000/oldTasks";

export default {
    state: {
        oldTasks: [],
        item: [],
        showOldTask: true,
    },
    getters: {
    },
    mutations: {
     DELETE_ITEM(state, payload) {      
       let findItem = state.oldTasks.findIndex(el => el.id == payload.id)     
       state.oldTasks.splice(findItem,1);
     },
     CHANGE_SHOW_OLD_TASK(state,payload) {
state.showOldTask = payload
     },
     PUSH_ITEM_TO_OLD_TASK(state, payload) {
state.oldTasks.push(payload)
     },   
    },

    actions: {
      async editTask(state,payload) {
      await  axios.put(`${baseURL}/${payload.id}`, payload)
      
      },
      async addNewTask(state,payload) {
await axios.post(baseURL, payload);
      },
     async getAllData(state) {
try {
  console.log("start get data all from server")
  const res =   await axios.get(baseURL);
  const {data} = res;
  // state.state.oldTasks.push(data);
  state.state.oldTasks = [...data]
  console.log("🚀 ~ file: oldTasks.js ~ line 41 ~ getAllData ~ state.state.oldTasks", state.state.oldTasks)
} catch (error) {
  console.log('error from oldTask.js 28',error);
}
      },
      async getCurrentTask(state, payload) {
        // state.state.oldTasks.Areas = [];
        try { 
          state.state.item = [];
                const res =   await axios.get(baseURL);
               const {data} = res;
               console.log("🚀 ~ file: oldTasks.js ~ line 47 ~ getCurrentTask ~ data", data)
            let findObj = data.find(el => el.id === payload.id)
            console.log("🚀 ~ file: oldTasks.js ~ line 48 ~ getCurrentTask ~ findObj", findObj)
               state.state.item = findObj;
      } catch (error) {
          console.log('error from oldTask.js 39',error);
        }
      },
      async deleteTask({commit}, payload) {
        // if(payload.showMap == true){
        // await mapsModule.actions.deleteArea(payload);
        // } 
        await axios.delete(`${baseURL}/${payload.id}`)
        commit('DELETE_ITEM', payload)
      }
    }
}
