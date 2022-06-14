import mapsModule from "./mapsModule"
import axios from "axios";
const baseURL = "http://localhost:3000/media";

export default {
    state: {
      dateToday: '',
      timeToday: '',
        oldTasks: [
            {
              Name: "test2121",
              data: "2021 Dec 02 – 2022 Jan 02 ",
              time: "00:00 – 23:59",
              type_of_test: "site, files	",
              net_type: "All Net Types	",
              intensity: "100",
              id: 1,
              // Status: "NEW",
              // on_off: { on: true, off: false },
            },
            {
              Name: "test1000",
              data: "2021 Dec 02 – 2022 Jan 02 ",
              time: "00:00 – 23:59",
              type_of_test: "site, files	",
              net_type: "All Net Types	",
              intensity: "100",
              id: 2,
              // Status: "NEW",
              // on_off: { on: true, off: false },
            },
            {
              Name: "test4343",
              data: "2021 Dec 02 – 2022 Jan 02 ",
              time: "00:00 – 23:59",
              type_of_test: "site, files	",
              net_type: "All Net Types	",
              intensity: "100",
              id: 3,
              // Status: "NEW",
              // on_off: { on: true, off: false },
            },
          ],
    },
    getters: {
      getDate(state) {
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        console.log("🚀 ~ file: oldTask.js ~ line 55 ~ getDate ~ date", date)
        state.dateToday = date;
    },
    getTime(state) {
      const today = new Date();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      console.log("🚀 ~ file: oldTask.js ~ line 60 ~ getTime ~ time", time)
      state.timeToday = time
    },
    },
    mutations: {
     deleteItem(state, payload) {
       let item = payload - 1;
       console.log("🚀 ~ file: oldTask.js ~ line 62 ~ deleteItem ~ item", item)
       console.log("🚀 ~ file: oldTask.js ~ line 61 ~ deleteItem ~ payload", payload)
       let findItem = state.oldTasks.find(el => el.id == payload)
       if(state.oldTasks.length == 1){
payload = 0,
state.oldTasks.splice(payload,1);
       }
       console.log("🚀 ~ file: oldTask.js ~ line 62 ~ deleteItem ~ findItem", findItem)
       state.oldTasks.splice(item,1);
       console.log("🚀 ~ file: oldTask.js ~ line 51 ~ deleteItem ~ state.oldTasks", state.oldTasks)
     },
        addNewTask(state, store) {
          console.log("🚀 ~ file: oldTask.js ~ line 68 ~ addNewTask ~ store", store)
          // console.log("🚀 ~ file: oldTask.js ~ line 68 ~ addNewTask ~ getters", getters)
          // getters.getDate();
          // getters.getTime();
state.oldTasks.push( {
    Name: mapsModule.state.message,
    //this.$store.state.mapsModule.message,
    data: state.dateToday,
    time: state.timeToday,
    type_of_test: "site, files	",
    net_type: "All Net Types	",
    intensity: "100",
    // Status: "NEW",
    // on_off: { on: true, off: false },
  })
  state.oldTasks.forEach((el,i) => el.id = i + 1)
  console.log("🚀 ~ file: oldTask.js ~ line 65 ~ addNewTask ~ state.oldTasks", state.oldTasks)
        },
    },
    actions: {
     async getAllData(state, payload) {
     console.log("🚀 ~ file: oldTask.js ~ line 72 ~ getAllData ~ payload", payload)
     console.log("🚀 ~ file: oldTask.js ~ line 72 ~ getAllData ~ state", state)
try {
  const res =   await axios.get(baseURL);
  console.log("🚀 ~ file: oldTask.js ~ line 74 ~ getAllData ~ res", res)
} catch (error) {
console.log("🚀 ~ file: oldTask.js ~ line 75 ~ getAllData ~ error", error)
  
}
      }
    }
}