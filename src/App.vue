<template>
  <div id="app" class="app-vue">
      <nav-header></nav-header>
    <side-bar></side-bar>
    <div id="content" class="content">
       <chat-online class="chat-online"/>
      <router-view/>
    </div>
  </div>
</template>

<script>
import NavHeader from "./components/NavHeader.vue";
import SideBar from "./components/SideBar.vue";
import ChatOnline from "./components/ChatOnline.vue";

export default {
  name: "App",
  components: {
    NavHeader,
    SideBar,
    ChatOnline,
  },
   created: function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function () {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch("logout")
        }
        throw err;
      });
    });
  },
  watch: {
showSideBar(newValue, oldValue){
  oldValue
  let show = document.getElementById('content')
if(newValue == true){
    show.style.paddingLeft = '4.5rem'
} else {    
    show.style.paddingLeft = '14.5rem'
}
  },
  },
  computed:{
    showSideBar(){
      return this.$store.state.sidebar.showSideBar
    }
  }
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
.content {
  position: relative;
   padding-left: 14.5rem;
  margin-top: 5rem !important;
  transition: padding-left 1s;
}
 .chat-online{
   
 }
</style>

