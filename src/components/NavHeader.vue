<template>
  <div>
    <b-navbar
      class="my-navbar pr-4"
      toggleable="lg"
      type="dark"
      variant="white"
    >
      <div class="navbar__left">
        <b-button v-b-toggle.my-sidebar class="mr-2 sidebar-toggle opacity-5"
          ><font-awesome-icon
            style="width: 20px; height: 20px"
            icon="fa-solid fa-bars"
        /></b-button>
        <div class="navbar__icon" @click="changeState">
          <div v-if="isSearch">
          <b-icon icon="search" font-scale="2"></b-icon>
          </div>
          <div v-else>
            <b-input v-model="searchText"></b-input>
          </div>
        </div>
      </div>
      <div class="navbar__right">
        <div class="wrap pr-5">
          <div class="wrap__date">
            <div><b>Date</b></div>
            <div class="opacity-7">
              2022 May 08 - 21:20:07 UTC+6
              <!-- {{currentDateTimes}} -->
              </div>
          </div>
          <div class="wrap__icons">
            <div class="wrap__usa mr-2">
              <img
                style="transform: scale(calc(0.9))"
                src="../assets/i.jpg"
                alt="usa"
              />
            </div>

            <div class="megaphone__badge">
              <b-icon
                class="wrap__mega"
                icon="megaphone"
                variant="success"
                font-scale="3"
              ></b-icon>
              <b-badge class="badge-dot" variant="success">.</b-badge>
            </div>
          </div>
        </div>
        <div class="header-btn-lg pl-4">
          <div>
            <div><b>Vladislav Nikulin</b></div>
            <span class="opacity-7">ТОО GSM Kazakhstan</span>
          </div>
          <b-avatar
            size="lg"
            src="	https://dev-cab.pingocean.com/img/avatar.c6deea65.png"
          ></b-avatar>
        </div>
      </div>
    </b-navbar>
    <message-list 
    channelId='123f'
    loadMoreBtnText='Load more'
    />
    <button @click="addNewStatus('edit')">add new status</button>
  </div>
</template>

<script>
import { BAvatar,BNavbar,BButton,BIcon,BBadge, VBToggle } from 'bootstrap-vue'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import MessageList from '@/components/MessageList.vue'
import { mapMutations } from "vuex";
export default {
  components:{ MessageList, BAvatar,BNavbar,BButton,BIcon,BBadge,FontAwesomeIcon },
  directives: {
  'b-toggle': VBToggle
},
  data(){
    return{
     msg:'new message', 
      time:'',
searchText:'',
isSearch: true,
    };
  },
  methods:{
    ...mapMutations(['addNewStatus', 'pushItems']),
   
     
      // this.$store.commit("addNewStatus", {String:"edit"})
   
 // need delete. this for test
    changeState(){
this.isSearch = !this.isSearch;

    },
    // currentDateTime() {
    //  setTimeout(() => {
    //  this.currentDateTimes
    //   }, 1000);
    // }
  },
//   computed: {
// currentDateTimes() {
//     // return  this.$DateTime.local().toLocaleString(this.$DateTime.DATETIME_FULL);
//     return  this.$DateTime.local().toLocaleString(this.$DateTime.DATETIME_FULL_WITH_SECONDS);
//     }
//   }
};
</script>

<style>
@import "../assets/navHeader.scss";
</style>