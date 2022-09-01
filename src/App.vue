<template>
  <div id="app" class="app-vue">
    <component :is="layout">
    <router-view/>
    </component>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import axios from 'axios'


export default {
  name: "App",
  created () {
    axios.interceptors.response.use(undefined, (err) =>  {
      return new Promise( () => {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch("logout")
        }
        throw err;
      });
    });
  },
  mounted(){
    // this.getUser()
  },
  methods:{
      ...mapMutations(['AUTH_SUCCESS']),
// getUser(){
// let user =  JSON.parse(localStorage.getItem('user')) 
// this.AUTH_SUCCESS(user)/// set user in vuex 

// }
  },
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

