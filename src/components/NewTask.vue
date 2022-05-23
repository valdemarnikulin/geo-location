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
          <div class="forms__intensy" style="grid-template: 1fr/1fr 1fr 1fr">
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
          <div class="forms__intensy" style="grid-template: 1fr/1fr 1fr 1fr">
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
              <Treeselect
                input-id="selectDay"
                v-model="selectedDay"
                :options="optionsDay"
                :clearable="false"
              />
            </div>
            <div>
              <Treeselect
                input-id="selectCome"
                v-model="selectedCome"
                :options="optionsCome"
                :clearable="false"
              />
            </div>
            <div>
              <label for="selectDayNight"><strong>More tests at</strong></label>
              <Treeselect
                :clearable="false"
                input-id="selectDayNight"
                v-model="selectedDayNight"
                :options="optionsDayNight"
              />
            </div>
          </div>
        </b-form-group>
        <b-form-checkbox v-model="showMap" toggle
          >Test in a certain area, in the city.</b-form-checkbox
        >
        <google-maps class="mt-4" v-if="showMap == true"  @checkArray="changeState"></google-maps>
        <b-form-group class="my-4">
          <label for="intensy" style="font-size:inherit"
            >Testing Sources<span class="text-danger">*</span></label
          >
          <div style="opacity: 0.7; font-size: 12px">
            You can create your own testing source <a href="#">here</a>
          </div>
          <div class="my-2">
            <a class="links mr-4" href="#">Clear All</a>
            <a class="links" href="#">Close All</a>
          </div>
          <div  >
            <div class="forms__intensy" style="grid-template: 1fr/1fr 1fr 1fr 1.5fr">
              <Treeselect
              :multiple="true"
                :clearable="false"
                v-model="selectedFiles"
                :options="optionsFiles"
              />
              
              <Treeselect
              :multiple="true"
                :clearable="false"
                v-model="selectedUrls"
                :options="optionsUrls"
              />
              
              <Treeselect
              :multiple="true"
                :clearable="false"
                v-model="selectedCountry"
                :options="optionsCountry"
                :show-count="true"
              ><label slot="optionsCountry" 
              slot-scope="{ shouldShowCount, count, labelClassName, countClassName }" 
              :class="labelClassName">
    
    <span v-if="shouldShowCount" :class="countClassName">{{ count }}</span>
  </label></Treeselect>
              
            </div>
          </div>
        </b-form-group>
        <b-button class="mr-3" variant="primary" :disabled="isReady || checkName" @click="sendData"
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
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
const baseURL = "http://localhost:3000/media";
export default {
  components: { GoogleMaps, Treeselect },
  data() {
    return {
      numberTasks: 5,
      selectedDay: ['a'],
      selectedCome: ['d'],
      selectedDayNight: ['e'],
      selectedCountry: ['f'],
      selectedFiles: null,
      selectedUrls: null,
      showMap: false,
      name: '',
      datepicker: null,
      timepicker: null,
    isReady: true,
    items: [],
    polygons:[],
      optionsCountry: [
        { id:"f", label: "Countries", children:[{
          id:"f-kaz",
          label:"Kazakhstan"
        },
        {id:"f-us",
          label:"USA"},
          {id:"f-rus",
          label:"Russia"}]},
       
      ],
      optionsFiles: [
        { id:"j", label: "Files" },
        { id:"k", label: "Every 5 days" },
        { id:"l", label: "Every week" },
      ],
      optionsUrls: [
        { id:"z", label: "URLs" },
        { id:"x", label: "Every 5 days" },
        { id:"v", label: "Every week" },
      ],
      optionsDay: [
        {label: "Per Day", id:"a" },
        { label: "For Period", id:"b"},
        { label: "As soon as possible", id:"c"},
      ],
      optionsCome: [
        {label: "Come Down", id:"d"}
      ],
      optionsDayNight: [
        {label: "Day", id:"e"},
        {label: "Night", id:"f"}
      ],
      valueType: ["All Net Types"],
      valueOperators: ["KZ_KCELL"],
    };
  },
  
  methods: {
    dateNow() {
      this.datepicker = Date.now();
    },
    changeState(data){
     
      this.isReady = data.isReady;
      this.items = data.items;
      this.polygons = data.polygons;
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
  computed: {
    checkName() {
      if(this.name.length === 0){
        return  true;
      } else {
        return  false;
      }
      // (this.name.length === 0) ? this.isReady = true : this.isReady = false,
      },
  },
};
</script>

<style>
@import "../assets/newTask.scss";
</style>
