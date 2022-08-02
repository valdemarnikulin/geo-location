//send data
//input with coords
<template>
  <div class="new-task" v-if="this.$store.state.taskModule.isNewTask" >
        <div >
      <b-card
      ref="newTask"
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
                v-model="form.message"
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
              <date-picker
               class="w-100"
            :clearable="false"
            range
            type="date"
            appendToBody
            format="[on] YYYY-MM-DD"
            :minute-step="1"
            
            :input-attr="{required: true}"
                size="sm"
                id="datepicker-placeholder"
                v-model="form.datepicker.period"
                button-variant="secondary"
              ></date-picker>
            </div>
            <div>
              <label for="timepicker-placeholder"
                >Select Time<span class="text-danger">*</span></label
              >
              <date-picker
              :clearable="false"
            range
            type="time"
            format="HH:mm"
            :shortcuts=[]
            :minute-step="1"
            placeholder="Select Time"
                size="sm"
                id="timepicker-placeholder"
                v-model="form.timepicker.time_range"
                button-variant="primary"
              ></date-picker>
            </div>
          </div>
        </b-form-group>
        <b-form-group size="sm">
          <div
            class="forms__intensy"
            style="grid-template: 1fr/ 0.8fr 1.2fr 1fr"
          >
            <!-- <div>
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
            </div> -->
            <!-- <div>
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
            </div> -->
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
                v-model="form.numberTasks"
                size="sm"
              ></b-form-input>
            </div>
            <div>
              <Treeselect
                input-id="selectDay"
                v-model="form.selectedDay"
                :options="optionsDay"
                :clearable="false"
              />
            </div>
            <div>
              <Treeselect
                input-id="selectCome"
                v-model="form.selectedCome"
                :options="optionsCome"
                :clearable="false"
              />
            </div>
            <div>
              <label for="selectDayNight"><strong>More tests at</strong></label>
              <Treeselect
                :clearable="false"
                input-id="selectDayNight"
                v-model="form.selectedDayNight"
                :options="optionsDayNight"
              />
            </div>
          </div>
        </b-form-group>
        <b-form-checkbox v-model="form.showMap" toggle
          >Test in a certain area, in the city.</b-form-checkbox
        >
        <google-maps class="mt-4" v-if="form.showMap == true" @addDataArea="addDataArea"></google-maps>
        <!-- <b-form-group class="my-4">
          <label for="intensy" style="font-size: inherit"
            >Testing Sources<span class="text-danger">*</span></label
          >
          <div style="opacity: 0.7; font-size: 12px">
            You can create your own testing source <a href="#">here</a>
          </div>
          <div class="my-2">
            <a class="links mr-4" href="#">Clear All</a>
            <a class="links" href="#">Close All</a>
          </div>
          <div>
            <div
              class="forms__intensy"
              style="grid-template: 1fr/1fr 1fr 1fr 1.5fr"
            >
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
                ><label
                  slot="optionsCountry"
                  slot-scope="{
                    shouldShowCount,
                    count,
                    labelClassName,
                    countClassName,
                  }"
                  :class="labelClassName"
                >
                  <span v-if="shouldShowCount" :class="countClassName">{{
                    count
                  }}</span>
                </label></Treeselect
              >
            </div>
          </div>
        </b-form-group> -->
        <div class="mt-4">
        <b-button
          class="mr-3"
          variant="primary"
          :disabled="false"
          @click="sendDatas"
          ><font-awesome-icon class="mr-1" icon="fa-solid fa-pen-to-square" />
          Ready</b-button
        >
        <b-button variant="danger" @click="closeCurrentTask">Close</b-button>
        </div>
        <div>

          {{this.$store.state.mapsModule.nameTask}}
        </div>
      </b-card>
      </div>
     
  </div>
</template>

<script>
import GoogleMaps from "../GoogleMaps.vue";
import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { mapActions,
 mapGetters,
 mapMutations,
  } from "vuex";

export default {
  components: { GoogleMaps, Treeselect, DatePicker },
  data() {
    return {
      
      showNewTask: true,
      
      selectedCountry: ["f"],
      selectedFiles: null,
      selectedUrls: null,
form: {
message: '',
numberTasks: 1000,
      areas:[],
  datepicker: {
    period:[]
  },
  timepicker: {
    time_range:[]
  },
  selectedDay: ["a"],
      selectedCome: ["d"],
      selectedDayNight: ["e"],
      showMap: false,
},
      // optionsCountry: [
      //   {
      //     id: "f",
      //     label: "Countries",
      //     children: [
      //       {
      //         id: "f-kaz",
      //         label: "Kazakhstan",
      //       },
      //       { id: "f-us", label: "USA" },
      //       { id: "f-rus", label: "Russia" },
      //     ],
      //   },
      // ],
      // optionsFiles: [
      //   { id: "j", label: "Files" },
      //   { id: "k", label: "Every 5 days" },
      //   { id: "l", label: "Every week" },
      // ],
      // optionsUrls: [
      //   { id: "z", label: "URLs" },
      //   { id: "x", label: "Every 5 days" },
      //   { id: "v", label: "Every week" },
      // ],
      optionsDay: [
        { label: "Per Day", id: "a" },
        { label: "For Period", id: "b" },
        { label: "As soon as possible", id: "c" },
      ],
      optionsCome: [{ label: "Come Down", id: "d" }],
      optionsDayNight: [
        { label: "Day", id: "e" },
        { label: "Night", id: "f" },
      ],
      valueType: ["All Net Types"],
      valueOperators: ["KZ_KCELL"],
    };
  },
mounted() {
this.showOldTask()
if(this.$store.state.mapsModule.status === 'add') {
  const period = this.form.period = [
          this.$DateTime.local()
            .set({
              hour: 0,
              minute: 0,
              second: 0,
            }).toJSDate(),
          this.$DateTime.local()
            .plus({
              month: 1,
            })
            .set({
              hour: 23,
              minute: 59,
              second: 59,
            }).toJSDate(),
        ]

     const time = this.form.time_range = [
          this.$DateTime.local()
            .set({
              hour: 0,
              minute: 0,
              second: 0,
            }).toJSDate(),
          this.$DateTime.local()
            .plus({
              month: 1,
            })
            .set({
              hour: 23,
              minute: 59,
              second: 59,
            }).toJSDate()
        ]
        this.form.datepicker.period = period
        this.form.timepicker.time_range = time
}
},
  methods: {
    ...mapActions(["sendData",'addNewTask',"getCurrentTask","editTask","getAllData"]),
    ...mapMutations(['setForm',"closeNewTask", "PUSH_ITEM_TO_OLD_TASK","CHANGE_SHOW_OLD_TASK"]),
    ...mapGetters(["getButtonVisible"]),
    addDataArea(items){
        this.areas = items;
      },
      
    showOldTask(){
			if(this.$store.state.mapsModule.status === 'edit'){
      // await  this.getCurrentTask()
     const period = this.form.period = [
          this.$DateTime.local()
            .set({
              hour: 0,
              minute: 0,
              second: 0,
            }).toJSDate(),
          this.$DateTime.local()
            .plus({
              month: 1,
            })
            .set({
              hour: 23,
              minute: 59,
              second: 59,
            }).toJSDate(),
        ]

     const time = this.form.time_range = [
          this.$DateTime.local()
            .set({
              hour: 0,
              minute: 0,
              second: 0,
            }).toJSDate(),
          this.$DateTime.local()
            .plus({
              month: 1,
            })
            .set({
              hour: 23,
              minute: 59,
              second: 59,
            }).toJSDate()
        ]

console.log("🚀 ~ file: NewTask.vue ~ line 345 ~ showOldTask ~ this.returnData", this.returnData)
       this.form = {
         message: this.returnData.Name,
numberTasks: this.returnData.intensity,
      areas:this.returnData.Areas,
  datepicker: {
    period: period,
  },
  timepicker: {
    time_range:time,
  },
  selectedDayNight: [this.returnData.selectedDayNight],
    selectedCome: [this.returnData.selectedCome],
    selectedDay: [this.returnData.selectedDay],
     showMap: this.returnData.showMap,
     id: this.returnData.id,
  }
} 
		},
async sendDatas() {
        const date_from = this.$DateTime
        .fromJSDate(this.form.datepicker.period[0])
        .setLocale('en-GB')
        .toLocaleString(this.$DateTime.DATE_MED);
        const date_to = this.$DateTime
        .fromJSDate(this.form.datepicker.period[1])
        .setLocale('en-GB')
        .toLocaleString(this.$DateTime.DATE_MED);

        const time_from = this.$DateTime
        .fromJSDate(this.form.timepicker.time_range[0])
        .toLocaleString(this.$DateTime.TIME_24_WITH_SECONDS);
        const time_to = this.$DateTime
        .fromJSDate(this.form.timepicker.time_range[1])
        .toLocaleString(this.$DateTime.TIME_24_WITH_SECONDS);
const params = {
    Name: this.form.message,
    showMap: this.form.showMap,
    date_from: date_from,
    date_to: date_to,
    time_from: time_from,
    time_to: time_to,
    intensity: this.form.numberTasks,
    Areas: this.areas,
    selectedDayNight: this.form.selectedDayNight,
    selectedCome: this.form.selectedCome,
    selectedDay: this.form.selectedDay,
  }
  if(this.$store.state.mapsModule.status == 'add'){
    await this.addNewTask(params);
  } else {
    params.id = this.form.id
  await  this.editTask(params);
  }
  // this.$emit('updateComponent', params);
  // this.getAllData();
  this.$emit('updateDisableBtn', false);
  // this.PUSH_ITEM_TO_OLD_TASK(params)
  // if(this.showMap == true){
  //   this.sendData();
  // }
    this.closeNewTask();
},
closeCurrentTask() {
   this.$emit('updateDisableBtn', false);
   this.closeNewTask();
},
  },
  computed: {
  //   showMap: {
  //   get () {
  //     return this.$store.state.mapsModule.showMap
  //   },
  //   set (value) {
  //     this.$store.commit('updateShowMap', value)
  //   }
  // },
  returnData() {
    return this.$store.state.oldTasks.item
  },
  statusTask() {
      return this.$store.state.mapsModule.status 
  }
  },
};
</script>

<style>
@import "../../assets/newTask.scss";
</style>
