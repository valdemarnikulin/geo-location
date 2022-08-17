<template>
<div class="new-task" v-if="this.$store.state.taskModule.isNewTask">
    <div>
        <b-card ref="newTask" class="mx-3 my-4 velmld-parent shadow" shadow="lg" body-class="text-left">
            <h4 class="card-title">Task</h4>
            <b-form-group>
                <div class="forms__intensy-name forms__intensy" >
                    <div>
                        <label for="nameId">Name <span class="text-danger">*</span></label>
                        <b-form-input id="nameId" size="sm" v-model="form.nameTask" placeholder="Enter name"></b-form-input>
                    </div>
                </div>
            </b-form-group>
            <b-form-group>
                <div class="forms__intensy forms__intensy-name">
                    <div>
                        <label for="datepicker-placeholder">Select Date Span<span class="text-danger">*</span></label>
                        <date-picker class="w-100" :clearable="false" range type="date" appendToBody format="[on] YYYY-MM-DD" :minute-step="1" :input-attr="{required: true}" size="sm" id="datepicker-placeholder" v-model="form.datepicker.period" button-variant="secondary"></date-picker>
                    </div>
                    <div>
                        <label for="timepicker-placeholder">Select Time<span class="text-danger">*</span></label>
                        <date-picker :clearable="false" range type="time" format="HH:mm" :shortcuts=[] :minute-step="1" placeholder="Select Time" size="sm" id="timepicker-placeholder" v-model="form.timepicker.time_range" button-variant="primary"></date-picker>
                    </div>
                </div>
            </b-form-group>
            <b-form-group size="sm">
            </b-form-group>
            <b-form-group>
                <div class="forms__intensy">
                    <div>
                        <label for="intensy">Intensity(Tasks for one user per day)<span class="text-danger">*</span></label>
                        <b-form-input input-id="intensy" v-model="form.intensity" size="sm"></b-form-input>
                    </div>
                    <div>
                        <Treeselect input-id="selectDay" v-model="form.selectedDay" :options="optionsDay" :clearable="false" />
                    </div>
                    <div>
                        <Treeselect input-id="selectCome" v-model="form.selectedCome" :options="optionsCome" :clearable="false" />
                    </div>
                    <div>
                        <label for="selectDayNight"><strong>More tests at</strong></label>
                        <Treeselect :clearable="false" input-id="selectDayNight" v-model="form.selectedDayNight" :options="optionsDayNight" />
                    </div>
                </div>
            </b-form-group>
            <b-form-checkbox v-model="form.showMap" toggle>Test in a certain area, in the city.</b-form-checkbox>
            <google-maps id="google-map" class="mt-4" v-if="form.showMap == true" @addDataArea="addDataArea"></google-maps>
            <div class="mt-4">
                <b-button class="mr-3" variant="primary" :disabled="false" @click="sendDatas">
                    <font-awesome-icon class="mr-1" icon="fa-solid fa-pen-to-square" />
                    Ready</b-button>
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
import {
    FontAwesomeIcon
} from "@fortawesome/vue-fontawesome";
import {
    mapActions,
    mapMutations,
} from "vuex";
import {
    BFormCheckbox,
  BFormGroup,
  BFormInput,
  BButton,
  BCard
} from 'bootstrap-vue';

export default {
    components: {
        GoogleMaps,
        Treeselect,
        DatePicker,
        BCard,
        BFormGroup,
        BFormInput,
        FontAwesomeIcon,
        BFormCheckbox,
        BButton
    },
    data() {
        return {
            showNewTask: true, ///< show block "new task"
            form: { ///< form for  block new task
                nameTask: '',
                intensity: 1000,
                areas: [], ///< Areas from the map
                datepicker: {
                    period: []
                },
                timepicker: {
                    time_range: []
                },
                selectedDay: ["a"],
                selectedCome: ["d"],
                selectedDayNight: ["e"],
                showMap: false,///< show map for drawing areas
            },
            optionsDay: [{
                    label: "Per Day",
                    id: "a"
                },
                {
                    label: "For Period",
                    id: "b"
                },
                {
                    label: "As soon as possible",
                    id: "c"
                },
            ],
            optionsCome: [{
                label: "Come Down",
                id: "d"
            }],
            optionsDayNight: [{
                    label: "Day",
                    id: "e"
                },
                {
                    label: "Night",
                    id: "f"
                },
            ],
            valueType: ["All Net Types"],
            valueOperators: ["KZ_KCELL"],
        };
    },
    mounted() {
        /**
         * method take data from server
         *  and save in local variables
         */
        this.showOldTask()
        ///if status === add, then set time and date default for form
        if (this.$store.state.mapsModule.status === 'add') {
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
        ...mapActions(["sendData", 'addNewTask', "editTask"]),
        ...mapMutations(["closeNewTask"]),
       /// get data Areas from child google maps
        addDataArea(items) {
            this.areas = items;
        },
        
        showOldTask() {
            ///if user change old task
            if (this.$store.state.mapsModule.status === 'edit') {
                //set default time and date for form
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
                // set local data from old task data
                this.form = {
                    nameTask: this.returnData.Name,
                    intensity: this.returnData.intensity,
                    areas: this.returnData.Areas,
                    datepicker: {
                        period: period,
                    },
                    timepicker: {
                        time_range: time,
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
            //set easy time and date
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
                
            const params = { ///< object for send to server
                Name: this.form.nameTask,
                showMap: this.form.showMap,
                date_from: date_from,
                date_to: date_to,
                time_from: time_from,
                time_to: time_to,
                intensity: this.form.intensity,
                Areas: this.areas,
                selectedDayNight: this.form.selectedDayNight,
                selectedCome: this.form.selectedCome,
                selectedDay: this.form.selectedDay,
            }
            if (this.$store.state.mapsModule.status == 'add') {
                await this.addNewTask(params); 
            } else {
                params.id = this.form.id
                await this.editTask(params);
            }
            ///undisable "edit" button from component "oldTasks" 
            this.$emit('updateDisableBtn', false);
            this.closeNewTask();
        },
        closeCurrentTask() { ///< close block "newTask"
        ///undisable "edit" button from component "oldTasks" 
            this.$emit('updateDisableBtn', false);
            this.closeNewTask();
        },
    },
    computed: {
        //  return data from vuex selected task from list "oldTasks"
        returnData() {
            return this.$store.state.oldTasks.item
        }
    },
};
</script>

<style lang='scss'>
@import "../../assets/newTask.scss";
</style>
