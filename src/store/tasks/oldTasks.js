import axios from "axios";
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
  const res =   await axios.get(baseURL);
  const {data} = res;
  state.state.oldTasks = [...data]
} catch (error) {
  console.log('error from oldTask.js 28',error);
}
      },
      async getCurrentTask(state, payload) {
        try { 
          state.state.item = [];
                const res =   await axios.get(baseURL);
               const {data} = res;
            let findObj = data.find(el => el.id === payload.id)
               state.state.item = findObj;
      } catch (error) {
          console.log('error from oldTask.js 39',error);
        }
      },
      async deleteTask({commit}, payload) {
        await axios.delete(`${baseURL}/${payload.id}`)
        commit('DELETE_ITEM', payload)
      }
    }
}
