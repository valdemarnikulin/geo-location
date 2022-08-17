<template>
  <div id="app" class="app-vue">
    <component :is="layout">
    <router-view/>
    </component>
  </div>
</template>

<script>


export default {
  name: "App",
  computed:{
        layout(){
            return (this.$route.meta.layout)
        }
  }
};
</script>
<style lang='scss'>
body,
html {
  font-size: 16px;
  font-family: Roboto, sans-serif;
}
.app-vue {
  background: rgb(250, 251, 252);
}

// .content {
//   position: relative;
//    padding-left: 14.5rem;
//   margin-top: 5rem !important;
//   transition: padding-left 1s;
// }
</style>

