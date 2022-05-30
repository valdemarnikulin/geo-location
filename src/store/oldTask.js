import mapsModule from "./mapsModule"

export default {
    state: {
      dateToday: '',
      timeToday: '',
        oldTasks: [
            {
              Name: "test1000",
              data: "2021 Dec 02 – 2022 Jan 02 ",
              time: "00:00 – 23:59",
              type_of_test: "site, files	",
              net_type: "All Net Types	",
              intensity: "100",
              Status: "NEW",
              on_off: { on: true, off: false },
            },
            {
              Name: "tetetest",
              data: "2021 Dec 02 – 2022 Jan 02 ",
              time: "00:00 – 23:59",
              type_of_test: "site",
              net_type: "All Net Types	",
              intensity: "3",
              Status: "NEW",
              on_off: "on/off",
            },
            {
              Name: "popopopop",
              data: "2021 Dec 02 – 2022 Jan 02 ",
              time: "00:00 – 23:59",
              type_of_test: "files",
              net_type: "All Net Types	",
              intensity: "30",
              Status: "NEW",
              on_off: "on/off",
            },
            {
              Name: "qwerty",
              data: "2021 Dec 02 – 2022 Jan 02 ",
              time: "00:00 – 23:59",
              type_of_test: "files",
              net_type: "All Net Types	",
              intensity: "5",
              Status: "NEW",
              on_off: "on/off",
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
    Status: "NEW",
    on_off: { on: true, off: false },
  })
        },
    },
    actions: {}
}