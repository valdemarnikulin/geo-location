<template>
  <div>
    <old-tasks>
      <template slot="btnAdd">
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
      </template>
    </old-tasks>
    <new-task id="newTask" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import NewTask from './NewTask.vue'
import OldTasks from './OldTasks.vue'

export default {
  components: { OldTasks,NewTask },
data(){
  return{

  }
},
methods: {
  
  ...mapMutations(['showNewTask', 'addNewStatus']),

scrollToNewTask() {
      this.showNewTask();
      this.addNewStatus('add');
    },
    
},
}
</script>

<style>

</style>