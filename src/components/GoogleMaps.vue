<template>
<div>
  <GmapAutocomplete @place_changed="setPlace" style="width: 50%"></GmapAutocomplete>
  <div class="gmaps"> 
    <GmapMap
      ref="gmap"
      :options="optionsMaps"
      :center="{ lat: 43.226100828005, lng: 76.95916673589507 }"
      :zoom="12"
      map-type-id="terrain"
      style="width: 100%; height: 400px; margin-top: 10px;"
    >
    </GmapMap>
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
            placeholder="Enter name area"
            v-on:keyup.enter="saveName(item, i)"
            ref="input"
            class="google__input"
            :class="{ 'is-invalid': item.name.length > 2 ? false : true }"
          ></b-form-input>

          <b-input-group-append>
            <b-button
              size="sm"
              :variant="item.isDisabledForm ? '' : 'success'"
              @click="saveName(item, i)"
              :disabled="!item.name.length > 0"
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
    <div>{{ items }}</div>
    <b-button variant="success" @click="sendData"
      >Send data</b-button
    >
    <b-button variant="warning" @click="getData"
      >GET data</b-button
    >
    <b-button variant="warning" @click="checkArray"
      >checkArray</b-button
    >
  </div>
  </div>
</template>
<script
  type="text/javascript"
  src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"
></script>
<script>
import { getGoogleMapsAPI } from "gmap-vue";

export default {
  name: "GoogleMaps",
  props:{
    isReady: Boolean,
  },
  data() {
    return {
      items: [],
      item: null,
      paths: [],
      polygons: [],
      connection: null,
      isResizeDiv: false,
      currentPlace: null,
      optionsMaps: {
        draggable: false,
        zoomControl: true,
        scrollwheel: false,
        disableDoubleClickZoom: false,
        fullscreenControl: true,
        mapTypeControl: false,
        scaleControl: true,
        rotateControl: false,
        disableDefaultUi: false, // not need
        clickableIcons: false,
      },
    };
  },
  //  async created() {
  //   try {
  //     const res = await axios.get(baseURL);

  //     this.items = res.data;
  //   } catch (e) {
  //     console.error(e);
  //   }
  // },
  methods: {
   setPlace(place) {
      this.currentPlace = place;
    },
    
   async getData() {
      try {
      const res = await axios.get(baseURL);
res.data.forEach((item1)=>{
this.items.
  this.items.push(item1);
})
      // this.items = res.data;
      console.log("🚀 ~ file: GoogleMaps.vue ~ line 135 ~ getData ~ this.items", this.items)
    } catch (e) {
      console.error(e);
    }
    },
    editName(item) {
      item.isDisabledForm = false;
    },
    checkArray(){    
 let chekedForm = this.items.find((item)=> {
   if(item.isDisabledForm === false){
     this.isReady = false;
     return item
   }
   });
  this.$emit('checkArray', {items: this.items, isReady: this.isReady, polygons: this.polygons});
  console.log("🚀 ~ file: GoogleMaps.vue ~ line 142 ~ checkArray ~ this.polygons", this.polygons)
    },
    saveName(item) {
     
      if (item.name.length <= 0) {
        return;
      }
      item.isDisabledForm = !item.isDisabledForm;
     this.checkArray();
     
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

          this.items.push(
            (this.item = {
              name: "",
              isDisabledForm: false,
              coords: coords.Coordinates,
            })
          );
          let map = this.$refs.gmap.$mapObject;
          map.setOptions({ draggableCursor: "default" });
        }
      );
    },
    getPolygonCoords(poly) {
      let len = poly.getPath().getLength();
      let Coordinates = "";
      for (var i = 0; i < len; i++) {
        Coordinates += "{" + poly.getPath().getAt(i).toUrlValue(6) + "}, ";
      }
      let coords = { Coordinates };
      return coords;
    },

    disable() {
      (this.optionsMaps.draggable = false),
        (this.optionsMaps.zoomControl = false),
        (this.optionsMaps.scrollwheel = false),
        (this.optionsMaps.disableDoubleClickZoom = false);
    },
    enable() {
      (this.optionsMaps.draggable = true),
        (this.optionsMaps.zoomControl = true),
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
      if (height > 280) {
        this.isResizeDiv = true;
      }
    },
  },
  mounted() {},
  computed: {
    google: getGoogleMapsAPI,
    nameState() {
      return item.name.length > 2 ? true : false;
    },
  },
};
</script>
<style scoped>
@import "../assets/googleMaps.scss";
</style>
