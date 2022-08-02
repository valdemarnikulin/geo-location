<template>
  <div id="app" class="app-vue">
    <nav-header></nav-header>
    <side-bar></side-bar>
    <old-tasks/>
    
  </div>
</template>

<script>
import NavHeader from "./components/NavHeader.vue";
import SideBar from "./components/SideBar.vue";
import OldTasks from "./components/Tasks/OldTasks.vue";

export default {
  name: "App",
  components: {
    NavHeader,
    SideBar,
    OldTasks,
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

