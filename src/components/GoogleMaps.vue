// add button geolocate, no mounted
<template>
  <div>
    <div class="gmaps">
      <GmapMap
        ref="gmap"
        :options="optionsMaps"
        :center="center"
        :zoom="zoom"
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
      <b-button
            class="map-geolocate"
            variant="primary"
            size="sm"
            @click="geolocate"
            >
            <font-awesome-icon icon="fa-solid fa-map-pin" /></b-button
          >
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
            v-for="(item, i) in items"
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
             @click="goToArea(item)"
              
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
          </b-input-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script
  type="text/javascript"
  src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"
></script>
<script>
// import { async } from 'gmap-vue';
import { getGoogleMapsAPI } from "gmap-vue";
import VueGoogleAutocomplete from "vue-google-autocomplete";
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  components: { VueGoogleAutocomplete },
  name: "GoogleMaps",
  data() {
    return {
      zoom: 5,
      item: null,
      paths: [],
      polygons: [],
      items:[],
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
    this.polygons = [];
      this.items = [];
    this.$refs.address.focus();
    this.showOldArea();
 
  },
  watch: {
   
  },
  
  methods: {
    ...mapMutations(["activeButton", "unActiveButton", "deletePoly", "deleteItem", "pushItemArea"]),
    ...mapActions(["getData","getDataOnce"]),
    showOldArea(){
      if(this.$store.state.mapsModule.status = 'edit'){
        this.getDatas()
       Object.assign(this.items, this.returnData)
        this.zoom = 12;
      } 
      
    },
    goToArea(item) {
      if(item.isDisabledForm == true){
      }
let {coords} = item;
let [center] = coords;
this.center.lat = center.lat
this.center.lng = center.lng
this.zoom = 12
    },
    addPolyOnMap(){
      this.items.forEach((poly) => {
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
        
        this.polygons.push(newPoly);
        
      });
      let findPoly = this.items.find(el=>el)
      this.center = {
        lat:findPoly.coords[0].lat,
        lng:findPoly.coords[0].lng
      }
    },
   getDatas() {
      setTimeout(this.addPolyOnMap,500)
     },

    saveName(item) {
      item.isDisabledForm = !item.isDisabledForm;
      this.pushItemArea(item);
    },
    unHoverPolygon() {
      this.polygons.forEach((polygon) => {
        polygon.setOptions({
          fillOpacity: 0.35,
        });
      });
    },
    hoverPolygon(index) {
      let findedPolygon = this.polygons[index];
      findedPolygon.setOptions({
        fillOpacity: 0.7,
      });
    },
    delAreaOfIndex(index) {
      let removePoly = this.polygons.splice(index, 1);
      removePoly[0].setMap(null);
      this.items.splice(index, 1);
    },
    drawFreeHand() {
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
          this.polygons.push(poly);
          let coords = this.getPolygonCoords(poly);
          this.items.push({
            name: "",
            isDisabledForm: false,
            coords: coords,
          });
          let map = this.$refs.gmap.$mapObject;
          map.setOptions({ draggableCursor: "default" });
        }
      );
    },
   
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
    },
    resizeForms() {
      let height = this.$refs.forms.clientHeight;
      if (height > 275) {
        this.isResizeDiv = true;
      }
    },
    getAddressData(addressData, placeResultData, id) {
      this.center.lat = addressData.latitude;
      this.center.lng = addressData.longitude;
      this.zoom = 12;      
    },
    geolocate() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
      this.zoom = 12
    },
  },

  computed: {
    ...mapState([
'itemsArea',

    ]),
    returnData() {
      return this.$store.state.mapsModule.itemsArea
    },
    google: getGoogleMapsAPI,
  },
  destroyed() {
      console.log('Do you Really want to leave?')
    },
};
</script>
<style scoped>
.map-geolocate {
  position: absolute;
  top: 0;
  margin-top: 12px;
  left: 52%;
}
@import "../assets/googleMaps.scss";
</style>
