import axios from "axios";
const baseURL = "http://localhost:3000/media";
export default {
    state: {
        isReady: true,
        items: [],
    },
    getters: {//computed
getButtonVisible: (state) => state.isReady,
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
            try {
            const res = await axios.post(baseURL, state.items);
      
            console.log("🚀 ~ file: mapsModule.js ~ line 27 ~ sendData ~ state.items", state.items)
              state.items = [...state.items, res.data];
            //   this.items = [];
            //   this.polygons.forEach((poly) => {
            //     poly.setMap(null);
            //   });
            } catch (e) {
              console.error(e);
            }
          },
    },
}