<template>
  <div>
         <nav-header></nav-header>
    <side-bar></side-bar>
    <div id="content" class="content">
       <chat-online/>
       <old-tasks/>
    </div>
  </div>
</template>

<script>
import NavHeader from "@/components/NavHeader.vue";
import SideBar from "@/components/SideBar.vue";
import ChatOnline from "@/components/ChatOnline.vue";
import { mapState } from "vuex";
import OldTasks from '@/components/Tasks/OldTasks.vue';
export default {
components:{
    NavHeader,
    SideBar,
    ChatOnline,
OldTasks
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
        ...mapState({
            showSideBar: state => state.sidebar.showSideBar
        })
    
  }
}
</script>

<style>
.content {
  position: relative;
   padding-left: 14.5rem;
  margin-top: 5rem !important;
  transition: padding-left 1s;
}
</style>