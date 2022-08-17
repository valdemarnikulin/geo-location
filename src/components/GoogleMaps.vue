<template>
<div>
    <div class="gmaps">
        <GmapMap ref="gmap" :options="optionsMaps" :center="center" :zoom="zoom" map-type-id="terrain" style="width: 100%; height: 500px; margin-top: 10px">
        </GmapMap>
        <GmapAutocomplete ref="address" placeholder="Search" @place_changed="getAddressData" :selectFirstOnEnter="true" />
        <b-button class="map-geolocate" variant="primary" size="sm" @click="geolocate">
            <font-awesome-icon icon="fa-solid fa-map-pin" />
        </b-button>
        <div class="btns">
            <div class="draw-area">
                <b-button id="draw-btn" class="maps__btn btn-wide" variant="primary" size="sm" @click.prevent="drawArea">
                    <font-awesome-icon icon="fa-solid fa-pencil" /> Draw area</b-button>
            </div>
            <div ref="forms" :class="{ 'overflow-forms': isResizeDiv }">
                <b-input-group id="inputs" v-for="(item, i) in items" :key="i" size="sm" class="mt-3 forms-top" @mouseover="hoverPolygon(i)" @mouseleave="unHoverPolygon" novalidate>
                    <b-form-input v-model="item.name" :disabled="item.isDisabledForm" @click="goToArea(item)" placeholder="Enter name area" v-on:keyup.enter="saveName(item, i)" ref="input" class="google__input" style="padding-right: 0 !important" :class="{ 'is-invalid': item.name.length > 2 ? false : true }">
                    </b-form-input>
                    <b-input-group-append>
                        <b-button size="sm" :variant="item.isDisabledForm ? '' : 'success'" @click="saveName(item, i)" :disabled="item.name.length <= 2">
                            <b-icon :icon="item.isDisabledForm ? 'pencil-square' : 'check2'"></b-icon>
                        </b-button>
                        <b-button size="sm" variant="danger" @click="delAreaOfIndex(i)">
                            <b-icon icon="x"></b-icon>
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
import {
    BButton,
  BFormInput,
  BInputGroup,
  BInputGroupAppend,
  BIcon
} from 'bootstrap-vue';
import {
    getGoogleMapsAPI,
   
} from "gmap-vue";
import { mapState } from 'vuex';
import {
    FontAwesomeIcon
} from "@fortawesome/vue-fontawesome";
export default {
    name: "GoogleMaps",
    components:{
BButton,
BFormInput,
BInputGroup,
BInputGroupAppend, 
BIcon,
FontAwesomeIcon
    },
    data() {
        return {
            // paths: [], 
            polygons: [],
            items: [], ///< array includes: names areas, areas and visibility button for edit and deleting
            isResizeDiv: false, ///< for visible scroll where set inputs of areas
            // address: "", 
            map: null,
            center: {
                lat: 20,
                lng: 20
            },
            optionsMaps: {
                draggable: true,
                zoomControl: true,
                scrollwheel: true,
                disableDoubleClickZoom: false,
                fullscreenControl: true,
                streetViewControl: false,
                mapTypeControl: false,
                clickableIcons: false,
            },
            zoom: 2
        };
    },
    mounted() {
        /// clear all data for add new data
        this.polygons = [];
        this.items = [];
///check old areas
        this.showOldArea();
        ///calculate current geolocation user if it is new task on map 
        if (this.MyStatus !== 'edit') {
            this.geolocate();
        }
    },
    methods: {
        
        showOldArea() {
            if (this.MyStatus == 'edit') {
                if (this.item.Areas) {/// if we have data from vuex
                    this.items = [...this.items, ...this.item.Areas]
                    this.getDatas()
                    this.zoom = 12;
                    this.goToArea(this.items[0])
                }
            }
        },
        // go to the area by click input
        goToArea(item) {
            let {
                coords
            } = item;
            let [center] = coords;
            this.center.lat = center.lat
            this.center.lng = center.lng
            this.zoom = 12
        },
        //add old areas from server on map
        addPolyOnMap() {
            let newPolygons = this.items;
            newPolygons.forEach((poly) => {
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
            let findPoly = newPolygons.find(el => el)
            this.center = {
                lat: findPoly.coords[0].lat,
                lng: findPoly.coords[0].lng
            }
        },
        /// need refactoring function getDatas
        getDatas() {
            setTimeout(this.addPolyOnMap, 500)
        },
        saveName(item) {
            item.isDisabledForm = !item.isDisabledForm;
            if (item.isDisabledForm) { 
                /// add areas to array from parent component for send in common object on the server
                this.$emit('addDataArea', this.items);
            }
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
            this.items.splice(index, 1)
            let removePoly = this.polygons.splice(index, 1);
            removePoly[0].setMap(null);
        },
        drawFreeHand() {
            
            ///create polyline for drawing on the map
            let poly = new google.maps.Polyline({
                map: this.$refs.gmap.$mapObject,
                strokeColor: "#0e0f3e",
                strokeOpacity: 1.0,
                strokeWeight: 2,
                clickable: false,
            });
            poly.setMap(this.$refs.gmap.$mapObject);
            //move-listener for drawing on the map
            const move = google.maps.event.addListener(
                this.$refs.gmap.$mapObject,
                "mousemove",
                (e) => {
                    /// add all coordinates from drawed line in array path from polyline
                    poly.getPath().push(e.latLng);
                }
            );
            
            /**
             * mouseup-listener
             * delete polyline from map and set her data paths
             *  to create polygon
             */
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
                    this.enable(); /// enable default options of map
                    this.polygons.push(poly);
                    let coords = this.getPolygonCoords(poly);
                    this.items.push({
                        name: "",
                        isDisabledForm: false,
                        coords: coords,
                    });
                    let map = this.$refs.gmap.$mapObject;
                    map.setOptions({
                        draggableCursor: "default"
                    });
                }
            );
        },
        ///get coordinates from polygon
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
        ///disable options of google maps
        disable() {
            (this.optionsMaps.draggable = false),
            (this.optionsMaps.zoomControl = false),
            (this.optionsMaps.scrollwheel = false),
            (this.optionsMaps.disableDoubleClickZoom = false);
        },
        ///enable options of goole maps
        enable() {
            (this.optionsMaps.draggable = true),
            (this.optionsMaps.zoomControl = true),
            (this.optionsMaps.scrollwheel = true),
            (this.optionsMaps.disableDoubleClickZoom = true);
        },
        drawArea() {
            this.disable(); /// disable options of map for better drawing
            let map = this.$refs.gmap.$mapObject;
            ///set cursor crosshair for visible what you can start draw
            map.setOptions({
                draggableCursor: "crosshair"
            });
            google.maps.event.addDomListener(
                this.$refs.gmap.$mapObject.getDiv(),
                "mousedown",
                (e) => {
                    this.drawFreeHand();
                }
            );
            this.resizeForms(); /// calculate height div in where place all inputs of name areas
        },
            ///calculate size container for inputs on map
        resizeForms() {
            let height = this.$refs.forms.clientHeight;
            if (height > 280) {
                this.isResizeDiv = true;
            }
        },
        ///get address from input search cities, countries 
        getAddressData(addressData, placeResultData, id) {
            this.center.lat = addressData.geometry.location.lat;
            this.center.lng = addressData.geometry.location.lng;
        },
        ///calculate current geolocation user
        geolocate() {
            navigator.geolocation.getCurrentPosition((position) => {
                this.center = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                this.zoom = 12
            })
        },
    },

    computed: {
        ...mapState({
            MyStatus: state => state.mapsModule.status,
            item: state => state.oldTasks.item
        }),
        google: getGoogleMapsAPI,
    },
};
</script>

<style>
.map-geolocate {
    position: absolute;
    top: 0;
    margin-top: 12px;
    left: 52%;
}
.pac-target-input {
    padding: 8px 0 8px 10px;
    top: 0;
    position: absolute;
    left: 0;
    /* margin: 10px; */
    width: 50%;
    border: 1px solid #000;
    border-radius: 5px;
    margin: 10px;
}
@import "../assets/googleMaps.scss";
</style>
