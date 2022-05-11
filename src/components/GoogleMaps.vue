// [ ] add button Clear map // [ ] add button Clear Area // [ ] add button Send
to Back
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
      <!-- <b-button
          v-for="(btn, i) in buttons"
          :key="btn.i"
          size="sm"
          variant="success"
          @mouseover="hoverPolygon(i)"
          @mouseleave="unHoverPolygon"
          @click="delAreaOfIndex(i)"
          ><font-awesome-icon icon="fa-solid fa-xmark" /> {{ btn.title }}
          {{ i + 1 }}</b-button
        > -->
      <b-input-group
        v-for="(form, i) in formsArray"
        :key="form.i"
        size="sm"
        class="mt-3"
        @mouseover="hoverPolygon(i)"
        @mouseleave="unHoverPolygon"
      >
        <b-form-input
          v-model="form.i"
          placeholder="Enter name area"
        ></b-form-input>
        <b-input-group-append>
          <b-button size="sm" variant="danger" @click="delAreaOfIndex(i)"
            ><font-awesome-icon icon="fa-solid fa-xmark" />
          </b-button>
        </b-input-group-append>
      </b-input-group>
    </div>

    <div>{{ coordinatesArray }}</div>
    <div>{{ newArrayObject }}</div>

    <b-button variant="success" @click="sendData(this.coordinatesArray)"
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
      polygonObj: {},
      polygons: [],
      deleteInput: true,
      buttons: [],
      button: null,
      coordinatesArray: [],
      selectedPolygon: null,
      selectedBtn: null,
      isNameArea: "",
      formsArray: [],
      oneFrom: null,
      formNames: [],
      newArrayObject: "",
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
  methods: {
    webSocketSend(message) {
      this.connection.send(message);
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
      console.log("buttons before splice", this.buttons);
      this.buttons.splice(index, 1);
      console.log("buttons after splice", this.buttons);
      this.formsArray.splice(index, 1);
      console.log("forms after splice", this.formsArray);
    },
    concatArrays() {
      this.formsArray.forEach((form) => {
        let nameArea = { name: form.i };
        console.log("form name propertie", nameArea);

        this.formNames.push(nameArea);
        console.log("array names with propertie", this.formNames);
      });

      // this.coordinatesArray.forEach((a1) => {
      //   a1.name = this.formNames.find(
      //     (el, index) => el[index] == a1[index]
      //   ).name;
      // });

      for (let index = 0; index < this.coordinatesArray.length; index++) {
        let element = this.coordinatesArray[index];
        console.log("one loop");
        for (let j = 0; j < this.formNames.length; j++) {
          let el = this.formNames[j];

          let findIndex = function (el, index) {
            if (el[index] == element[index]) {
              element.name = el.name;
              console.log(
                "index",
                index,
                "el.name",
                el.name,
                "element.name",
                element.name
              );
            }
          };
        }
        // element.name = this.formNames.find(findIndex).name;
        // console.log("coords with name after concat new array", element.name);
      }

      console.log("coords with name after concat", this.coordinatesArray);
      // let newArrayCoords = this.formNames.map((obj) => {
      // let matchinEl = this.coordinatesArray.find(
      //   (el, index) => el[index] === obj[index]

      //   // Object.assign({}, obj, el)
      // );
      // this.coordinatesArray.map((el, i) => {
      //   if (el[i] === obj[i]) {
      //     Object.assign({}, obj, el);
      //   }
      // });
      // console.log("coords with name after concat", this.coordinatesArray);
      // console.log("matching EL", matchinEl);
      // return Object.assign({}, obj, matchinEl);
      // });
      // this.newArrayObject = newArrayCoords;
      // console.log("new array coords", newArrayCoords);
    },
    sendData() {
      this.polygons.forEach((polygon) => {
        this.getPolygonCoords(polygon);
        // this.polygons.push(polygon);
        // this.nameArray();
      });
      // this.nameArray();
      this.concatArrays();
      // this.polygons.concat(this.formsArray);
      // console.log("formsArray", this.formsArray);
      // console.log("concat Arrays", this.polygons);
      this.webSocketSend(message);
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
      let Area = "";
      for (var i = 0; i < len; i++) {
        Area += "{" + poly.getPath().getAt(i).toUrlValue(6) + "}, ";
        //Use this one instead if you want to get rid of the wrap > new google.maps.LatLng(),
        //htmlStr += "" + myPolygon.getPath().getAt(i).toUrlValue(5);
      }
      let coords = { Area };
      coords.name = "";
      // coords.joke = "form";
      console.log("name from getpolycoords", coords);
      this.coordinatesArray.push(coords);

      // this.formsArray.forEach((form) => {
      //   console.log("form value", form.i);
      // });
      // console.log("forms array", this.formsArray);
      // console.log("form value", this.formsArray.value);
      // this.coordinatesArray.concat(this.formsArray.value);
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
    deletePolygonFromArray(polygonToRemove) {
      this.polygons.filter((poly) => poly !== polygonToRemove);
      if (this.selectedPolygon === polygonToRemove) {
        this.selectedPolygon = null;
      }
      console.log(this.polygons);
    },
    createButton() {
      // let map = this.$refs.gmap.$mapObject;

      //### Add a button on Google Maps ...
      let controlText = document.createElement("button");
      // controlText.title = "Area";
      let inputGroup = document.createElement("form");
      this.oneFrom = inputGroup;
      // this.oneFrom.$set({ value: "" });
      console.log(this.oneFrom);

      this.formsArray.push(this.oneFrom);
      // this.formsArray.push({ value: "" });
      console.log("fromsArray - ", this.formsArray);
      //myLocationControlDiv.appendChild(controlText);
      // this.uniqueInput();
      // map.controls[google.maps.ControlPosition.LEFT_TOP].push(controlTrashUI);
      // map.controls[google.maps.ControlPosition.TOP_RIGHT].push(controlText);
      console.log("createButton"); //?
      this.button = controlText;
      // if (!this.buttons.includes(this.button)) {
      this.buttons.push(this.button);
      console.log("buttons", this.buttons);
      // this.hoverPolygon();
      // }
    },
  },
  mounted() {},
  computed: {
    google: getGoogleMapsAPI,
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
};
</script>
<style scoped>
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
