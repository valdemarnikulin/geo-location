export default {
    state: {
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
    mutations: {
        addNewTask(state) {
state.oldTasks.push( {
    Name: "test1000",
    data: "2021 Dec 02 – 2022 Jan 02 ",
    time: "00:00 – 23:59",
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