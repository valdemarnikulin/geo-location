<template>
    <div>
        {{msg}}
    </div>
</template>
<script>
// import {getData} from '@/api/MessageList';
export default {
    props:{
        channelId: {
        type: String,
        required: true
        },
    loadMoreBtnText: {
        type: String,
        required: false
    }
    },
    data() {
      return {
          msg:'new message',
          items: [],
      }  
    },
    mounted(){
        // this.getData();
    },

    methods: {
// async getData(){
//     try {
//         const res = await getData()      
       
// this.items = res
//     } catch (error) {
//         console.error(error)
//     }
//     }

    },
}
</script>