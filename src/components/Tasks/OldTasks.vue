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
<div>
<slot name="btnAdd"></slot>
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
         <b-button
         v-scroll-to="'#newTask'" 
         class="border-none" 
         size="sm" 
         variant="outline-primary" 
         @click="editItem(item.id)"
            ><font-awesome-icon icon="fa-solid fa-pen-to-square" />
            </b-button>
          
          <b-button class="border-none icon-red" size="sm" variant="danger" @click="deleteItem(item)"
            ><font-awesome-icon icon="fa-solid fa-trash-can" /></b-button
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
        <!-- <template #cell(on_off)="on_off">
          <b-form-checkbox size="lg" switch class="switch__body"
            >{{ on_off.on_off }}
            <span class="switch__label">asdasdas</span></b-form-checkbox
          >
        </template> -->
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
        // "Status",
        // "on_off",
        "Actions",
      ],
      isswitch: null,
      
    };
  },
  methods: {
    ...mapMutations(["showNewTask","addNewTask","deleteItem", "changeIsShowMap","editStatus", "addNewStatus"]),
    ...mapActions(["getData", "getAllData"]),
  async editItem(id) {  
        this.showNewTask();
      await this.getData(id)
this.changeIsShowMap();
this.addNewStatus('edit');
    },
    
    checkItems() {
      this.addNewTask();
    },
  },
};
</script>

<style>
@import "../../assets/oldTask.scss";
</style>