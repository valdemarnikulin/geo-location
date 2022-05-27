
<template>
  <div>
    <div class="gmaps">
      <GmapMap
        ref="gmap"
        :options="optionsMaps"
        :center="center"
        :zoom="12"
        map-type-id="terrain"
        style="width: 100%; height: 500px; margin-top: 10px"
      >
        <!-- <gmap-polygon v-for="(poly, i) in this.polygons" :key="i" :paths="polygoneCoords"></gmap-polygon> -->
      </GmapMap>
      <vue-google-autocomplete
        ref="address"
        id="map"
        class="autocomplete-google"
        classname="form-control"
        placeholder="Please type your cities"
        v-on:placechanged="getAddressData"
        types="(cities)"
        style="width: 50%"
      ></vue-google-autocomplete>
      <div class="btns">
        <div class="draw-area">
          <b-button
            class="maps__btn btn-wide"
            variant="primary"
            size="sm"
            @click.prevent="drawArea"
            ><font-awesome-icon icon="fa-solid fa-pencil" /> Draw area</b-button
          >
        </div>
        <div ref="forms" :class="{ 'overflow-forms': isResizeDiv }">
          <b-input-group
            v-for="(item, i) in this.$store.state.mapsModule.items"
            :key="i"
            size="sm"
            class="mt-3 forms-top"
            @mouseover="hoverPolygon(i)"
            @mouseleave="unHoverPolygon"
            novalidate
          >
            <b-form-input
              v-model="item.name"
              :disabled="item.isDisabledForm"
              placeholder="Enter name area"
              v-on:keyup.enter="saveName(item, i)"
              ref="input"
              class="google__input"
              style="padding-right: 0 !important"
              :class="{ 'is-invalid': item.name.length > 2 ? false : true }"
            ></b-form-input>

            <b-input-group-append>
              <b-button
                size="sm"
                :variant="item.isDisabledForm ? '' : 'success'"
                @click="saveName(item, i)"
                :disabled="item.name.length <= 2"
                ><b-icon
                  :icon="item.isDisabledForm ? 'pencil-square' : 'check2'"
                ></b-icon>
              </b-button>

              <b-button size="sm" variant="danger" @click="delAreaOfIndex(i)"
                ><b-icon icon="x"></b-icon>
              </b-button>
            </b-input-group-append>

            <!-- <div v-if="item.name.length <= 2"
            class="error">Error</div> -->
          </b-input-group>
        </div>
      </div>
    </div>
    <b-button @click="getDatas">get data</b-button>
    <div>{{ this.$store.state.mapsModule.items }}</div>
  </div>
</template>

<script
  type="text/javascript"
  src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"
></script>
<script>
import { getGoogleMapsAPI } from "gmap-vue";
import VueGoogleAutocomplete from "vue-google-autocomplete";
import { mapActions, mapMutations } from "vuex";

export default {
  components: { VueGoogleAutocomplete },
  name: "GoogleMaps",
  // props: {
  //   isSend: {Boolean,
    
  //   deep: true,
  //   },
  // },
  data() {
    return {
      // items: [],
      // polygoneCoords: [
      //   { lat: 43.22608519272654, lng: 76.94577714895546 },
      //   { lat: 43.22076896557207, lng: 76.94959661455647 },
      //   { lat: 43.221175516959775, lng: 76.96182748754842 },
      //   { lat: 43.226960762144486, lng: 76.96092626532796 },
      // ],
      item: null,
      paths: [],
      polygons: [],
      connection: null,
      isResizeDiv: false,
      currentPlace: null,
      address: "",
      map: null,
      center: { lat: 0, lng: 0 },

      optionsMaps: {
        draggable: false,
        zoomControl: true,
        scrollwheel: false,
        disableDoubleClickZoom: false,
        fullscreenControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        // scaleControl: false,
        // rotateControl: false,
        // disableDefaultUi: false, // not need
        clickableIcons: false,
      },
    };
  },
  mounted() {
    this.$refs.address.focus();
    this.geolocate();
  },
  //  async created() {
  //   try {
  //     const res = await axios.get(baseURL);

  //     this.items = res.data;
  //   } catch (e) {
  //     console.error(e);
  //   }
  // },
//   watch: {
// isSend(newVal, oldVal) {
// console.log("🚀 ~ file: GoogleMaps.vue ~ line 147 ~ oldVal", oldVal)
// console.log("🚀 ~ file: GoogleMaps.vue ~ line 147 ~ newVal", newVal)
// console.log("🚀 ~ file: GoogleMaps.vue ~ line 147 ~ isSend ~ isSend", this.isSend)
//   if(isSend == true){
// this.polygons.forEach((poly)=>{
//   poly.setMap(null);
// })
// }
//   console.log("🚀 ~ file: GoogleMaps.vue ~ line 152 ~ this.polygons.forEach ~ this.polygons", this.polygons)
// }
//   },
  methods: {
// isSendFunc() {
//   if(this.isSend){
//     this.polygons.forEach((poly)=>{
//   poly.setMap(null);
// })
//   }
// },
    ...mapMutations(["activeButton", "unActiveButton"]),
    ...mapActions(["getData"]),
    async getDatas() {
      await this.getData();
      let newPolygons = this.$store.state.mapsModule.items;
      console.log(
        "🚀 ~ file: GoogleMaps.vue ~ line 151 ~ getDatas ~ newPolygons",
        newPolygons
      );
      console.log("this.polygons", this.polygons);
      newPolygons.forEach((poly) => {
        console.log("poly", poly);
       let newPoly = new google.maps.Polygon({
          map: this.$refs.gmap.$mapObject,
          path: poly.coords,
          strokeColor: "#0e0f3e",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#0e0f3e",
          fillOpacity: 0.35,
          editable: false,
        });
       console.log("🚀 ~ file: GoogleMaps.vue ~ line 168 ~ newPolygons.forEach ~ newPoly", newPoly)
        this.$store.state.mapsModule.polygons.push(newPoly);
        console.log(
          "🚀 ~ file: GoogleMaps.vue ~ line 169 ~ newPolygons.forEach ~ this.polygons",
          this.polygons
        );
      });
      console.log("newPolygons after draw", newPolygons);
      // this.polygons = [...newPolygons];
      // console.log(
      //   "🚀 ~ file: GoogleMaps.vue ~ line 171 ~ getDatas ~ this.polygons",
      //   this.polygons
      // );
      // [this.polygons, ...newPolygons];
      // console.log(
      //   "🚀 ~ file: GoogleMaps.vue ~ line 171 ~ getDatas ~ this.polygons",
      //   this.polygons
      // );
      // let arr = this.polygons.concat(newPolygons);
      // console.log("🚀 ~ file: GoogleMaps.vue ~ line 176 ~ getDatas ~ arr", arr);
      // console.log(
      //   "🚀 ~ file: GoogleMaps.vue ~ line 170 ~ getDatas ~ this.polygons",
      //   this.polygons
      // );
    },
    // async getData() {
    //   try {
    //     const res = await axios.get(baseURL);
    //     res.data.forEach((item1) => {
    //       this.items.this.items.push(item1);
    //     });
    //     // this.items = res.data;
    //     console.log(
    //       "🚀 ~ file: GoogleMaps.vue ~ line 135 ~ getData ~ this.items",
    //       this.items
    //     );
    //   } catch (e) {
    //     console.error(e);
    //   }
    // },

    saveName(item) {
      item.isDisabledForm = !item.isDisabledForm;
      this.checkArray();
    },
    unHoverPolygon() {
     
      this.$store.state.mapsModule.polygons.forEach((polygon) => {
        polygon.setOptions({
          fillOpacity: 0.35,
        });
      });
    },
    hoverPolygon(index) {
     
      let findedPolygon = this.$store.state.mapsModule.polygons[index];
      console.log("🚀 ~ file: GoogleMaps.vue ~ line 247 ~ hoverPolygon ~ this.$store.state.mapsModule.polygons", this.$store.state.mapsModule.polygons)
      console.log("🚀 ~ file: GoogleMaps.vue ~ line 247 ~ hoverPolygon ~ findedPolygon", findedPolygon)
      findedPolygon.setOptions({
        fillOpacity: 0.7,
      });
    },
    delAreaOfIndex(index) {
      let removePoly = this.$store.state.mapsModule.polygons.splice(index, 1);
      removePoly[0].setMap(null);
      this.$store.state.mapsModule.items.splice(index, 1);
      // this.lastItemInput();
    },
    drawFreeHand() {
      // this.activeButton();
      // this.checkArray();
      // console.log(
      //   "🚀 ~ file: GoogleMaps.vue ~ line 180 ~ drawFreeHand ~ this.changeIsReady",
      //   this.activeButton
      // );
      // console.log("isReady", this.$store.state.isReady);
      // this.isReady = true;
      // this.$emit("checkArray", {
      //   isReady: this.isReady,
      // });

      //the polygon
      let poly = new google.maps.Polyline({
        map: this.$refs.gmap.$mapObject,
        strokeColor: "#0e0f3e",
        strokeOpacity: 1.0,
        strokeWeight: 2,
        clickable: false,
      });
      poly.setMap(this.$refs.gmap.$mapObject);
      //move-listener
      const move = google.maps.event.addListener(
        this.$refs.gmap.$mapObject,
        "mousemove",
        (e) => {
          poly.getPath().push(e.latLng);
        }
      );
      //mouseup-listener
      google.maps.event.addListenerOnce(
        this.$refs.gmap.$mapObject,
        "mouseup",
        (e) => {
          google.maps.event.removeListener(move);
          let path = poly.getPath();
          poly.setMap(null);
          poly = new google.maps.Polygon({
            map: this.$refs.gmap.$mapObject,
            path: path,
            strokeColor: "#0e0f3e",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#0e0f3e",
            fillOpacity: 0.35,
            editable: false,
          });
          google.maps.event.clearListeners(
            this.$refs.gmap.$mapObject.getDiv(),
            "mousedown"
          );
          this.enable();
          console.log("this.$refs.gmap.$mapObject", this.$refs.gmap.$mapObject);
          this.$store.state.mapsModule.polygons.push(poly);
          console.log(
            "🚀 ~ file: GoogleMaps.vue ~ line 234 ~ drawFreeHand ~ this.polygons",
            this.polygons
          );
          let coords = this.getPolygonCoords(poly);

          // this.items.push(
          //   (this.item = {
          //     name: "",
          //     isDisabledForm: false,
          //     coords: coords,
          //   })
          // );
          console.log(
            "🚀 ~ file: GoogleMaps.vue ~ line 240 ~ drawFreeHand ~ this.$store.state.items",
            this.$store.state.mapsModule.items
          );
          this.$store.state.mapsModule.items.push({
            name: "",
            isDisabledForm: false,
            coords: coords,
          });
          console.log(
            "🚀 ~ file: GoogleMaps.vue ~ line 248 ~ drawFreeHand ~  this.$store.state.mapsModule.items",
            this.$store.state.mapsModule.items
          );

          let map = this.$refs.gmap.$mapObject;
          map.setOptions({ draggableCursor: "default" });
        }
      );
    },
    // getPolygonCoords(poly) {
    //   let len = poly.getPath().getLength();
    //   let Coordinates = "";
    //   for (var i = 0; i < len; i++) {
    //     Coordinates += "{" + poly.getPath().getAt(i).toUrlValue(6) + "}, ";
    //   }
    //   let coords = { Coordinates };
    //   return coords;
    // },
    getPolygonCoords(poly) {
      let paths = poly.getPath();

      let arrayCoordinates = [];
      for (let i = 0; i < paths.length; i++) {
        let Coordinates = {
          lat: paths.getAt(i).lat(),
          lng: paths.getAt(i).lng(),
        };
        arrayCoordinates.push(Coordinates);
      }
      console.log(
        "🚀 ~ file: GoogleMaps.vue ~ line 241 ~ getPolygonCoords ~ arrayCoordinates",
        arrayCoordinates
      );
      return arrayCoordinates;
    },
    disable() {
      (this.optionsMaps.draggable = false),
        // (this.optionsMaps.zoomControl = false),
        (this.optionsMaps.scrollwheel = false),
        (this.optionsMaps.disableDoubleClickZoom = false);
    },
    enable() {
      (this.optionsMaps.draggable = true),
        // (this.optionsMaps.zoomControl = true),
        (this.optionsMaps.scrollwheel = true),
        (this.optionsMaps.disableDoubleClickZoom = true);
    },
    drawArea() {
      this.disable();

      let map = this.$refs.gmap.$mapObject;
      map.setOptions({ draggableCursor: "crosshair" });
      google.maps.event.addDomListener(
        this.$refs.gmap.$mapObject.getDiv(),
        "mousedown",
        (e) => {
          this.drawFreeHand();
        }
      );
      this.resizeForms();
      this.checkArray();
      // this.$emit("drawArea", {
      //   isReady: this.isReady,
      // });
      // this.isReady = false;
    },
    resizeForms() {
      let height = this.$refs.forms.clientHeight;
      if (height > 275) {
        this.isResizeDiv = true;
      }
    },
    getAddressData(addressData, placeResultData, id) {
      console.log(
        "🚀 ~ file: GoogleMaps.vue ~ line 301 ~ getAddressData ~ this.center",
        this.center
      );

      this.center.lat = addressData.latitude;
      this.center.lng = addressData.longitude;
      console.log(
        "🚀 ~ file: GoogleMaps.vue ~ line 301 ~ getAddressData ~ this.center",
        this.center
      );
    },
    geolocate() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    },
  },

  computed: {
    google: getGoogleMapsAPI,
    checkArray() {
      this.$store.state.mapsModule.items.find((item) => {
        if (item.isDisabledForm === false) {
          return this.unActiveButton();
          // return item;
        } else {
          return this.activeButton();
        }
      });
      // this.$emit("checkArray", {
      //   items: this.items,
      //   isReady: this.isReady,
      //   polygons: this.polygons,
      // });
    },
    // lastItemInput() {
    //   // this.items.length === 0 ? (this.isReady = true) : (this.isReady = false);
    //   // console.log(
    //   //   "🚀 ~ file: GoogleMaps.vue ~ line 323 ~ lastItemInput ~ this.items.length ",
    //   //   this.items.length
    //   // );
    //   // console.log(
    //   //   "🚀 ~ file: GoogleMaps.vue ~ line 322 ~ lastItemInput ~ this.isReady",
    //   //   this.isReady
    //   // );
    //   // this.$emit("checkArray", {
    //   //   isReady: this.isReady,
    //   // });
    // },
  },
};
</script>
<style scoped>
@import "../assets/googleMaps.scss";
</style>
