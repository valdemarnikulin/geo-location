<template>
  <div class="gmaps">
    <GmapMap
      ref="gmap"
      :options="optionsMaps"
      :center="{ lat: 43.226100828005, lng: 76.95916673589507 }"
      :zoom="12"
      map-type-id="terrain"
      style="width: 100%; height: 400px"
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
      <b-input-group
        v-for="(form, i) in formsArray"
        :key="form.i"
        size="sm"
        class="mt-3"
        
        @mouseover="hoverPolygon(i)"
        @mouseleave="unHoverPolygon"
      >
        <b-form-input
        :readonly="isButtonDisabled"
          v-model="form.i"
          placeholder="Enter name area"
        ></b-form-input>
        <b-input-group-append>
          <b-button size="sm" id="index" variant="success" @click="saveName(i)"
            ><font-awesome-icon icon="fa-solid fa-check" />
          </b-button>
          <b-button size="sm" variant="danger" @click="delAreaOfIndex(i)"
            ><font-awesome-icon icon="fa-solid fa-xmark" />
          </b-button>
        </b-input-group-append>
      </b-input-group>
    </div>
    <div>{{ coordinatesArray }}</div>
    <b-button variant="success" @click="webSocketSend('Hello world')"
      >Send data</b-button
    >
    <!-- <div v-for="(poly, index) in polygons" :key="index"></div> -->
  </div>
</template>
<script
  async
  src="https://maps.googleapis.com/maps/api/js?v=weekly
        &key=AIzaSyDLEvPNQnvOtKO4wp1XBfVTQdZIsf3gr6U&libraries=drawing&callback=initMap"
></script>
<script
  type="text/javascript"
  src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"
></script>
<script>
import { getGoogleMapsAPI } from "gmap-vue";

export default {
  name: "GoogleMaps",
  data() {
    return {
      paths: [],
      polygons: [],
      coordinatesArray: [],
      formsArray: [],
      oneFrom: null,
      formNames: [],
      connection: null,
      optionsMaps: {
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUi: true,
        draggable: false,
        scrollwheel: false,
        disableDoubleClickZoom: false,
      },
    };
  },
  created: function () {
    console.log("Starting connection to WebSocket Server");
    this.connection = new WebSocket("wss://echo.websocket.org");

    this.connection.onmessage = function (event) {
      console.log(event);
    };

    this.connection.onopen = function (event) {
      console.log(event);
      console.log("Successfully connected to the echo websocket server...");
    };
  },
  methods: {
    webSocketSend(message) {
      console.log("connection",this.connection);
      this.connection.send(message);
    },
    saveName(index) {
      let findPoly = this.polygons[index];
      this.getPolygonCoords(findPoly);
      let findName = this.formsArray[index];
      console.log("findName.i", findName.i);
    let findCoord = this.coordinatesArray[index];
console.log("findCoord", findCoord);
    findCoord.name = findName.i;
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
      console.log("findedPoly", findedPolygon);
      findedPolygon.setOptions({
        fillOpacity: 0.7,
      });
    },
    delAreaOfIndex(index) {
      let removePoly = this.polygons.splice(index, 1);
      console.log("removePoly", removePoly);
      removePoly[0].setMap(null);
      console.log("after remove splice", this.polygons);
      
      this.formsArray.splice(index, 1);
      console.log("forms after splice", this.formsArray);
      this.coordinatesArray.splice(index, 1);
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
            editable: true,
          });
          google.maps.event.clearListeners(
            this.$refs.gmap.$mapObject.getDiv(),
            "mousedown"
          );
          this.enable();
          this.polygons.push(poly);
          this.createButton();
          console.log("polygons array - ", this.polygons);
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
      console.log("name from getpolycoords", coords);
      this.coordinatesArray.push(coords);
    },

    disable() {
      (this.optionsMaps.draggable = false),
        (this.optionsMaps.zoomControl = false),
        (this.optionsMaps.scrollwheel = false),
        (this.optionsMaps.disableDoubleClickZoom = false),
        console.log("disable");
    },
    enable() {
      (this.optionsMaps.draggable = true),
        (this.optionsMaps.zoomControl = true),
        (this.optionsMaps.scrollwheel = true),
        (this.optionsMaps.disableDoubleClickZoom = true),
        console.log("enable");
    },
    drawArea() {
      console.log("draws");

      this.disable();
      let map = this.$refs.gmap.$mapObject;
      map.setOptions({ draggableCursor: "crosshair" });
      google.maps.event.addDomListener(
        this.$refs.gmap.$mapObject.getDiv(),
        "mousedown",
        (e) => {
          this.drawFreeHand();
          console.log("freeHand");
        }
      );
    },
    createButton() {
      //### Add a input on Google Maps ...
      
      let inputGroup = document.createElement("form");
      this.oneFrom = inputGroup;
      console.log(this.oneFrom); //consolellllllllll
      this.formsArray.push(this.oneFrom);
      console.log("fromsArray - ", this.formsArray);
    },
  },
  mounted() {},
  computed: {
    google: getGoogleMapsAPI,
  },
  
};
</script>
<style scoped>
.input-group-append {
  background-color: #fff;
}
.disabledClass{
  border-color: rgb(116, 116, 116) !important;
  background-color: rgb(116, 116, 116) !important;
  opacity: 0.9 !important;
}
.map__wrapper {
  position: relative;
}
.btns {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 10px;
  margin: 20px;
  position: absolute;
  top: 0;
  left: 0;
}
.btn-primary {
  -webkit-box-shadow: 0 0.125rem 0.625rem rgba(14, 15, 62, 0.6),
    0 0.0625rem 0.125rem #0e0f3e;
  box-shadow: 0 0.125rem 0.625rem rgba(14, 15, 62, 0.6),
    0 0.0625rem 0.125rem #0e0f3e;
  background-color: #07071f;
  border-color: #050514;
}
.btn-primary:hover,
.btn-primary:active,
.btn-primary:focus,
.btn-primary:not(:disabled):not(.disabled):active,
.btn-primary:not(:disabled):not(.disabled).active,
.show > .btn-primary.dropdown-toggle {
  background-color: #070952;
  border-color: #070952;
}

.btn__show {
  border-color: #07071f;
  color: #07071f;
}
.btn-outline-primary:focus {
  box-shadow: none;
}
.btn__show:hover {
  background-color: #070952;
  border-color: #070952;
}
.btn-outline-secondary:focus {
  box-shadow: 0 0 0 0.2rem rgb(7, 7, 31, 1 / 50%);
}
.xmark {
  cursor: crosshair;
}
.gmaps {
  position: relative;
}
.btn-primary.btn-shadow,
.btn-primary.btn-shadow:hover {
  -webkit-box-shadow: 0 0.125rem 0.625rem rgb(14 15 62 / 60%),
    0 0.0625rem 0.125rem #0e0f3e;
  box-shadow: 0 0.125rem 0.625rem rgb(14 15 62 / 60%),
    0 0.0625rem 0.125rem #0e0f3e;
}
.btn.btn-wide {
  padding: 0.375rem 1.5rem;
  font-size: 0.8545454545rem;
  line-height: 1.5;
  border-radius: 0.25rem;
}
</style>
