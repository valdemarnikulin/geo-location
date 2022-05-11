<template>
  <div id="app" class="app-vue">
    <side-bar></side-bar>
    <nav-header></nav-header>
    <old-tasks></old-tasks>
    <new-task></new-task>
  </div>
</template>

<script>
import NavHeader from "./components/NavHeader.vue";
import NewTask from "./components/NewTask.vue";
import OldTasks from "./components/OldTasks.vue";
import SideBar from "./components/SideBar.vue";

export default {
  name: "App",
  components: {
    NewTask,
    OldTasks,
    NavHeader,
    SideBar,
  },
};
</script>
<style>
body,
html {
  font-size: 16px;
}
.app-vue {
  background: rgb(250, 251, 252);
}
</style>

