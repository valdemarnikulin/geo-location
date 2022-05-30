// switch checkbox
<template>
  <div class="col my-header py-3">
    <div class="circle-wrapper">
      <div class="circle-my">
        <!-- <b-icon
          icon="check-circle"
          style="z-index: 100; background-color: #fff"
        ></b-icon> -->
        <font-awesome-icon
          icon="fa-solid fa-comments"
          style="z-index: 100; color: #fff"
        />
      </div>
    </div>
    <div class="main-header mx-4 my-4">
      <div class="main-header-left">
        <ul class="nav custom-nav nav-pills">
          <li class="nav-item" style="font-size: 0.9rem">
            <a href="#" class="nav-link router-link-exact-active task__link">
              <b>TASKS</b>
            </a>
          </li>
        </ul>
      </div>
      <div class="main-header-right">
        <h5 class="mb-1">Tasks</h5>
        <div class="opacity-7 text-right">Data Testing</div>
      </div>
    </div>
    <b-card class="mx-3 my-4 velmld-parent shadow">
      <div class="tasks__head">
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <div style="display: flex; align-items: center; gap: 10px">
            <div class="tasks__icon">
              <b-icon
                icon="check-circle"
                style="border-radius: 0.25rem"
                font-scale="5"
                class="blue-side p-3 border"
                variant="light"
              ></b-icon>
            </div>
            <div>
              <h4>Tasks</h4>
              <div>Data testing</div>
            </div>
          </div>

          <b-button
            style="padding: 0.375rem 1.5rem"
            class="m-1 shadow"
            size="sm"
            variant="primary"
            @click="scrollToNewTask"
            :disabled="this.$store.state.taskModule.isNewTask"
            ><b-icon icon="plus" class="opacity-7 pr-2" scale="3" />
            New
          </b-button>
        </div>
        <div class="opacity-7 pt-4" style="font-size: 0.94rem">
          <p>
            In this section you can create tasks for making calls to your
            network.
          </p>
          <p>
            Select a task name, specify dates, testing time, select call
            directions (RINGAPP - calls to current subscribers of your network,
            SIP trunk - calls come to SIP trunk, call forwarding - setting up
            short-term call forwarding). Select intensity, and call sources.
          </p>
          <p>
            If the "automatic route selection" function is enabled, the network
            and subscriber A will be selected taking into account the
            maximization of fraud events.
          </p>
        </div>
      </div>
      <b-button @click="checkItems">Check Items</b-button>
      <b-table responsive="sm" :items="this.$store.state.oldTask.oldTasks" :fields="fields">
        <template #cell(Status)="{ item }">
          <span
            class="badge badge-primary align-text-bottom ml-1"
            style="
              background: transparent;
              border: 1px solid rgb(14, 15, 62);
              color: rgb(14, 15, 62);
            "
          >
            {{ item.new }}NEW
          </span>
        </template>
        <template #cell(Name)="{ item }">
          <span>{{ item.Name }}</span>
          <div class="mt-1 small">
            {{ item.data }}
            <span class="opacity-7 ml-2"> {{ item.time }}</span>
          </div>
        </template>
        <template #cell(Actions)="{ item }">
          <b-button class="border-none" size="sm" variant="outline-primary"
            ><font-awesome-icon icon="fa-solid fa-pen-to-square" />{{
              item.new
            }}</b-button
          >
          <b-button class="border-none icon-red" size="sm" variant="danger"
            ><font-awesome-icon icon="fa-solid fa-trash-can" />{{
              item.new
            }}</b-button
          >
        </template>
        <!-- <template #cell(Actions)="btn">
          <b-button
            disabled
            class="btn__news"
            size="sm"
            variant="outline-primary"
            ><font-awesome-icon class="mr-1" icon="fa-solid fa-pen-to-square" />b-button>
        </template> -->
        <template #cell(on_off)="on_off">
          <b-form-checkbox size="lg" switch class="switch__body"
            >{{ on_off.on_off }}
            <span class="switch__label">asdasdas</span></b-form-checkbox
          >
        </template>
      </b-table>
    </b-card>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      fields: [
        "Name",
        "type_of_test",
        "net_type",
        "intensity",
        "Status",
        "on_off",
        "Actions",
      ],
      isswitch: null,
      
    };
  },
  methods: {
    ...mapMutations(["showNewTask","addNewTask"]),
    ...mapActions(["getData"]),
    // async getDatas() {
    //   await this.getData();
    //   let newPolygons = this.$store.state.mapsModule.items;
    //   console.log(
    //     "🚀 ~ file: GoogleMaps.vue ~ line 151 ~ getDatas ~ newPolygons",
    //     newPolygons
    //   );
    //   console.log("this.polygons", this.polygons);
    //   newPolygons.forEach((poly) => {
    //     console.log("poly", poly);
    //    let newPoly = new google.maps.Polygon({
    //       map: this.$refs.gmap.$mapObject,
    //       path: poly.coords,
    //       strokeColor: "#0e0f3e",
    //       strokeOpacity: 0.8,
    //       strokeWeight: 2,
    //       fillColor: "#0e0f3e",
    //       fillOpacity: 0.35,
    //       editable: false,
    //     });
    //    console.log("🚀 ~ file: GoogleMaps.vue ~ line 168 ~ newPolygons.forEach ~ newPoly", newPoly)
    //     this.$store.state.mapsModule.polygons.push(newPoly);
    //     console.log(
    //       "🚀 ~ file: GoogleMaps.vue ~ line 169 ~ newPolygons.forEach ~ this.polygons",
    //       this.polygons
    //     );
    //   });
    //   console.log("newPolygons after draw", newPolygons);
    //   // this.polygons = [...newPolygons];
    //   // console.log(
    //   //   "🚀 ~ file: GoogleMaps.vue ~ line 171 ~ getDatas ~ this.polygons",
    //   //   this.polygons
    //   // );
    //   // [this.polygons, ...newPolygons];
    //   // console.log(
    //   //   "🚀 ~ file: GoogleMaps.vue ~ line 171 ~ getDatas ~ this.polygons",
    //   //   this.polygons
    //   // );
    //   // let arr = this.polygons.concat(newPolygons);
    //   // console.log("🚀 ~ file: GoogleMaps.vue ~ line 176 ~ getDatas ~ arr", arr);
    //   // console.log(
    //   //   "🚀 ~ file: GoogleMaps.vue ~ line 170 ~ getDatas ~ this.polygons",
    //   //   this.polygons
    //   // );
    // },
    scrollToNewTask() {
      console.log(
        "$store.state.taskModule.isNewTask",
        this.$store.state.taskModule.isNewTask
      );
      this.showNewTask();
      console.log(
        "🚀 ~ file: OldTasks.vue ~ line 291 ~ scrollToNewTask ~ this.showNewTask();",
        this.showNewTask
      );
      this.$refs.newTask.scrollIntoView();

      console.log(
        "🚀 ~ file: OldTasks.vue ~ line 287 ~ scrollToNewTask ~ this.$refs.newTask",
        this.$refs.newTask
      );
    },
    checkItems() {
      this.addNewTask();
      // this.$store.state.mapsModule.items;
      console.log("🚀 ~ file: OldTasks.vue ~ line 178 ~ checkItems ~  this.$store.state.mapsModule.items",  this.$store.state.mapsModule.items)
    },
  },
};
</script>

<style>
@import "../assets/oldTask.scss";
</style>