<template>
  <div id="app" class="app-vue">
    <nav-header></nav-header>
    <side-bar></side-bar>

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
<style lang='scss'>
@import "./assets/custom.scss";
body,
html {
  font-size: 16px;
  font-family: Roboto, sans-serif;
}
.app-vue {
  background: rgb(250, 251, 252);
}
</style>

