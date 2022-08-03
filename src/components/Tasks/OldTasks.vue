// switch checkbox
<template>
  <div class="col my-header py-3" >
    <div class="circle-wrapper">
      <div class="circle-my">
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
<div>
<b-button
              v-scroll-to="'#newTask'"
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

<!-- <slot name="another"></slot> -->
           
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
      <b-table responsive="sm" :items="itemsOfOldTasks" :fields="fields">
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
        <template #cell(Area_from_map)="{ item }">
          <span
            class="badge badge-primary align-text-bottom"
          >
            {{ item.showMap }}
          </span>
        </template>
        <template #cell(Name)="{ item }">
          <span>{{ item.Name }}</span>
          <div class="mt-1 small">
            {{ item.date_from }} - {{ item.date_to }}
            <span class="opacity-7 ml-2"> {{ item.time_from }} - {{ item.time_to }}</span>
          </div>
        </template>
        <template #cell(Actions)="{ item }">
         <b-button
         v-scroll-to="'#newTask'" 
         class="border-none" 
         size="sm" 
         variant="outline-primary" 
         :disabled="disableBtn"
         @click="editItem(item)"
            ><font-awesome-icon icon="fa-solid fa-pen-to-square" />
            </b-button>
          
          <b-button class="border-none icon-red" size="sm" variant="danger" @click="deleteItem(item)"
            ><font-awesome-icon icon="fa-solid fa-trash-can" /></b-button
          >
        </template>
      </b-table>
    </b-card>
     <new-task v-if="this.$store.state.taskModule.isNewTask == true" id="newTask" @updateDisableBtn="updateDisableBtn" />
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import NewTask from "./NewTask.vue"
export default {
  components:{
    NewTask
  },
 
  data() {
    return {
      fields: [
        "Name",
        "Area_from_map",
        "intensity",
        "Actions",
      ],
      itemsOfOldTasks: [],
      disableBtn:false
    };
  },
 async beforeMount() {
 await this.getAllData();
    this.itemsOfOldTasks = this.returnData;
  },
  methods: {
    ...mapMutations(["showNewTask", "changeIsShowMap","editStatus", "addNewStatus"]),
    ...mapActions(["getData", "getAllData", "addNewTask","deleteTask", "getCurrentTask"]),
   async updateDisableBtn(value) {
      this.disableBtn = value;
    await  this.getAllData();
   this.itemsOfOldTasks = this.returnData;
    },
    scrollToNewTask() {
      this.showNewTask();
      this.addNewStatus('add');
    },
  async editItem(item) {  
       console.log("🚀 ~ file: OldTasks.vue ~ line 183 ~ editItem ~ item", item)
       this.disableBtn = true
        this.addNewStatus('edit');
      await this.getCurrentTask(item)
        this.showNewTask();
    },
  async  deleteItem(item) {
 await this.deleteTask(item);
 let findItem = this.itemsOfOldTasks.findIndex(el => el.id == item.id)     
       this.itemsOfOldTasks.splice(findItem,1);
    },
  },
  computed: {
returnData() {
  return this.$store.state.oldTasks.oldTasks;
}
  },
  unmounted() {
    console.log("do you really leave?")
  },
};
</script>

<style>
@import "../../assets/oldTask.scss";
</style>