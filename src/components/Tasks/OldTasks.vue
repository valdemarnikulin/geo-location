
<template>
<div class="tasks col my-header py-3">

    <div class="tasks__main-header mx-4 my-4">
        <div class="tasks__main-header-left">
        </div>
    </div>
    <b-card class="mx-3 my-4 velmld-parent shadow">
        <div class="tasks__head">
            <div 
          class="tasks__head-items"
          >
                <div class="tasks__head-left">
                    <div class="tasks__icon bg-primary">
                        <b-icon icon="check-circle" font-scale="5" class="blue-side p-3 border" variant="light"></b-icon>
                    </div>
                    <div>
                        <h4>Tasks</h4>
                    </div>
                </div>
                <div>
                    <b-button v-scroll-to="'#newTask'" id='btn-new' class="m-1 shadow tasks__btn" size="sm" variant="primary" @click="scrollToNewTask" :disabled="this.$store.state.taskModule.isNewTask">
                        <b-icon icon="plus" class="opacity-7 pr-2" scale="3" />
                        New
                    </b-button>
                </div>
            </div>
            <div class="opacity-7 pt-4 tasks__text">
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                     Error repellendus ipsa veritatis corrupti doloremque, nemo quidem qui repudiandae esse perspiciatis facilis nesciunt, 
                    ducimus porro dolores nisi officia earum laborum suscipit?
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Temporibus iure sint, aspernatur consectetur doloremque eum quas, ipsam fuga commodi cumque nostrum delectus expedita,
                     totam alias. Provident in aliquam laborum at.
                </p>
            </div>
        </div>
        <b-table responsive="sm" :items="itemsOfOldTasks" :fields="fields">
            <template #cell(Status)="{ item }">
                <span class="badge badge-primary tasks__badge align-text-bottom ml-1">
                    {{ item.new }}NEW
                </span>
            </template>
            <template #cell(Area_from_map)="{ item }">
                <span class="badge badge-primary align-text-bottom">
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
                <b-button v-scroll-to="'#newTask'" class="border-none" size="sm" variant="outline-primary" :disabled="disableBtn" @click="editItem(item)">
                    <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                </b-button>

                <b-button class="border-none tasks__icon-red" size="sm" variant="danger" @click="deleteItem(item)">
                    <font-awesome-icon icon="fa-solid fa-trash-can" />
                </b-button>
            </template>
        </b-table>
    </b-card>
    <div id="newTask">

        <new-task v-if="isNewTask == true"  @updateDisableBtn="updateDisableBtn" />
    </div>
</div>
</template>

<script>
import {
    mapMutations,
    mapActions,
    mapState
} from "vuex";
import NewTask from "./NewTask.vue";
import {
    FontAwesomeIcon
} from "@fortawesome/vue-fontawesome";
import {
  BTable,
  BButton,
  BCard,
  BIcon
} from 'bootstrap-vue';

export default {
    components: {
        NewTask,
        BCard,
        BIcon,
        BButton,
        BTable,
        FontAwesomeIcon
    },

    data() {
        return {
            fields: [///< Array from names for topic table
                "Name",
                "Area_from_map",
                "intensity",
                "Actions",
            ],
            itemsOfOldTasks: [], ///< array all tasks
            disableBtn: false 
        };
    },
  async  beforeMount() {
        //load all tasks from server, function from vuex => oldTasks
      await this.getAllData();
      /// set data in local data
        this.itemsOfOldTasks = this.returnData;
    },
    methods: {
        ...mapMutations(["SHOW_NEW_TASK", "ADD_NEW_STATUS"]),
        ...mapActions([ "getAllData", "deleteTask", "getCurrentTask"]),

 /// toggle visible or unvisible button "edit task"
 
    async updateDisableBtn(value) {
            this.disableBtn = value;
            ///refresh and rerender list of all tasks, function from vuex => oldTasks
      await this.getAllData();
            this.itemsOfOldTasks = this.returnData;
        },
        scrollToNewTask() {
            this.SHOW_NEW_TASK(); 
            this.ADD_NEW_STATUS('add');
        },
        //edit task, find on id
        async editItem(item) {
            /// disable buttons edit
            this.disableBtn = true
            this.ADD_NEW_STATUS('edit');
            await this.getCurrentTask(item)
            this.SHOW_NEW_TASK();
        },
        async deleteItem(item) {
            await this.deleteTask(item);
        },
    },
    computed: {
        ...mapState({
            returnData: state => state.oldTasks.oldTasks,
            isNewTask: state => state.taskModule.isNewTask
        })
    },
};
</script>

<style lang="scss">
@import "../../assets/oldTask.scss";
</style>
