//send data
//input with coords
<template>
  <div class="new-task">
    <b-collapse class="map__wrapper" id="collapse-2">
      <b-card
        class="mx-3 my-4 velmld-parent shadow"
        shadow="lg"
        body-class="text-left"
      >
        <h4 class="card-title">Task</h4>
        <b-form-group>
          <div class="forms__intensy">
            <div>
              <label for="nameId"
                >Name <span class="text-danger">*</span></label
              >
              <b-form-input
                id="nameId"
                size="sm"
                v-model="name"
                placeholder="Enter name"
              ></b-form-input>
            </div>
          </div>
        </b-form-group>
        <b-form-group>
          <div class="forms__intensy">
            <div>
              <label for="datepicker-placeholder"
                >Select Date Span<span class="text-danger">*</span></label
              >
              <b-form-datepicker
                size="sm"
                id="datepicker-placeholder"
                v-model="datepicker"
                button-variant="secondary"
              ></b-form-datepicker>
            </div>
            <div>
              <label for="timepicker-placeholder"
                >Select Time<span class="text-danger">*</span></label
              >
              <b-form-timepicker
                size="sm"
                id="timepicker-placeholder"
                v-model="timepicker"
                button-variant="primary"
              ></b-form-timepicker>
            </div>
          </div>
        </b-form-group>
        <b-form-group size="sm">
          <div
            class="forms__intensy"
            style="grid-template: 1fr/ 0.8fr 1.2fr 1fr"
          >
            <div>
              <label for="tags-operators"
                >Operators<span class="text-danger">*</span>
              </label>
              <b-form-tags
                size="sm"
                input-id="tags-operators"
                v-model="valueOperators"
                placeholder=""
                tag-variant="light"
              ></b-form-tags>
            </div>
            <div>
              <label for="tags-net-type"
                >Net Type<span class="text-danger">*</span></label
              >
              <b-form-tags
                size="sm"
                input-id="tags-net-type"
                v-model="valueType"
                placeholder=""
                squared
                separator="| "
                tag-variant="light"
              ></b-form-tags>
            </div>
          </div>
        </b-form-group>
        <b-form-group>
          <div class="forms__intensy">
            <div>
              <label for="intensy"
                >Intensity(Tasks for one user per day)<span class="text-danger"
                  >*</span
                ></label
              >
              <b-form-input
                input-id="intensy"
                v-model="numberTasks"
                size="sm"
              ></b-form-input>
            </div>
            <div>
              <label for="selectDay"></label>
              <b-form-select
                size="sm"
                input-id="selectDay"
                v-model="selected"
                :options="options"
              ></b-form-select>
            </div>
          </div>
        </b-form-group>
        <b-form-checkbox v-model="showMap" toggle switch
          >Specify on the map</b-form-checkbox
        >
        <google-maps class="mt-4" v-if="showMap == true"  @checkArray="changeState"></google-maps>
        <b-form-group class="my-4">
          <label for="intensy"
            >Testing Sources<span class="text-danger">*</span></label
          >
          <div style="opacity: 0.7">
            You can create your own testing source <a href="#">here</a>
          </div>
          <div class="my-2">
            <a class="links mr-4" href="#">Clear All</a>
            <a class="links" href="#">Close All</a>
          </div>
          <div class="forms__intensy">
            <div class="forms__intensy">
              <b-form-select
                size="sm"
                v-model="selectedFiles"
                :options="optionsFiles"
              >
              </b-form-select>
              <b-form-select
                size="sm"
                v-model="selectedUrls"
                :options="optionsUrls"
              >
              </b-form-select>
              <b-form-select
                size="sm"
                v-model="selectedCountry"
                :options="optionsCountry"
              >
              </b-form-select>
            </div>
          </div>
        </b-form-group>
        <b-button class="mr-3" variant="primary" :disabled="isReady" @click="sendData"
          ><font-awesome-icon class="mr-1" icon="fa-solid fa-pen-to-square" />
          Ready</b-button
        >
        <b-button variant="danger">Close</b-button>
      </b-card>
    </b-collapse>
  </div>
</template>

<script>
import GoogleMaps from "./GoogleMaps.vue";
import axios from "axios";
const baseURL = "http://localhost:3000/media";
export default {
  components: { GoogleMaps },
  data() {
    return {
      numberTasks: 5,
      selected: null,
      selectedCountry: null,
      selectedFiles: null,
      selectedUrls: null,
      showMap: false,
      name: null,
      datepicker: null,
      timepicker: null,
    isReady: true,
    items: [],
    polygons:[],
      optionsCountry: [
        { text: "Countries" },
        { text: "Every 5 days" },
        { text: "Every week" },
      ],
      optionsFiles: [
        { text: "Files" },
        { text: "Every 5 days" },
        { text: "Every week" },
      ],
      optionsUrls: [
        { text: "URLs" },
        { text: "Every 5 days" },
        { text: "Every week" },
      ],
      options: [
        { text: "Every 3 days" },
        { text: "Every 5 days" },
        { text: "Every week" },
      ],
      valueType: ["All Net Types"],
      valueOperators: ["KZ_KCELL"],
    };
  },
  methods: {
    changeState(data){
      // this.isReady = data;
      this.isReady = data.isReady;
      this.items = data.items;
      this.polygons = data.polygons;
      console.log("🚀 ~ file: NewTask.vue ~ line 209 ~ changeState ~ data.polygons", data.polygons)
      console.log("🚀 ~ file: NewTask.vue ~ line 207 ~ changeState ~ data.items", data.items)
      console.log("🚀 ~ file: NewTask.vue ~ line 206 ~ changeState ~ data.isReady", data.isReady)
    
    },
    async sendData() {
            try {
              
        const res = await axios.post(baseURL, this.items );

        this.items = [...this.items, res.data];

        this.items = [];
      this.polygons.forEach((poly) => {
        poly.setMap(null);
      });
      } catch (e) {
        console.error(e);
      } 
    },
    toggleShowMap() {
      this.showMap = !this.showMap;
    },
  },
};
</script>

<style>
@import "../assets/newTask.scss";
</style>
