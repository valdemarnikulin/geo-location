<template>
<div>
    <div @click="changeOpen" class="circle-wrapper bg-success">
        <div class="circle-my">
            <font-awesome-icon icon="fa-solid fa-comments" style="z-index: 100; color: #fff" />
        </div>
    </div>
    <section v-if="isOpen" id="chat" class="chat-window">
        <div class="container py-5">
            <div class="row d-flex justify-content-center">
                <div class="col-md-10 col-lg-8 col-xl-6">
                    <div class="card" id="chat2">
                        <div class="card-header d-flex justify-content-between align-items-center p-3">
                            <h5 class="mb-0">Online Support</h5>
                            <button @click="changeOpen" type="button" class="btn btn-primary btn-sm" data-mdb-ripple-color="dark">close</button>
                        </div>
                        <div class="card-body" data-mdb-perfect-scrollbar="true" style="position: relative; height: 300px; overflow: auto;">
                            <div class="d-flex flex-row justify-content-start">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp" alt="avatar 1" style="width: 45px; height: 100%;">
                                <div>
                                    <p class="small p-2 ms-3 mb-1 rounded-3" style="background-color: #f5f6f7;">Hi</p>
                                    <p class="small ms-3 mb-3 rounded-3 text-muted">23:58</p>
                                </div>
                            </div>
                            <div class="d-flex flex-row justify-content-end mb-4 pt-1" style="gap:5px" v-for="(msg, index) in messages" v-bind:key="'index-'+index" :class="['message', sentOrReceived(msg.userUID)]">
                                <div>
                                    <p class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">{{ msg.text }}</p>
                                    <p class="small ms-3 mb-3 rounded-3 text-muted">{{msg.createdAt}}</p>
                                </div>
                                <img class="rounded-circle" :src="msg.avatar" :alt="msg.displayName" style="width: 45px; height: 45px;">
                            </div>
                            <div ref="scrollable"></div>
                        </div>
                        <form @submit.prevent="sendMessage" class="card-footer text-muted d-flex justify-content-start align-items-center p-3">
                            <img class="rounded-circle" :src="user.avatar" :alt="user.displayName" style="width: 55px; height: 45px;">

                            <input v-model="message" type="text" class="form-control form-control-lg" id="exampleFormControlInput1" placeholder="Type message">
                            <button :disabled="!message" type="submit" class="button-send">
                                <font-awesome-icon icon="fa-solid fa-paper-plane"></font-awesome-icon>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    mounted() {
    },
    data() {
        return {
            isOpen: false, ///< show pop-up window with chat
            message: '',
            messages: [],
            db:[]
            
        }
    },
    methods: {
        //change visibility pop-up chat
        changeOpen() {
            this.isOpen = !this.isOpen
        },
        sentOrReceived(userUID) {
            return userUID === this.user.uid ? 'sent' : 'received'
        },
        async sendMessage() {
            const messageInfo = {
                // 'userUID': this.user.uid,
                'name': this.user.name,
                'avatar': this.user.avatar,
                'text': this.message,
                'createdAt': this.$DateTime.local().toFormat('HH:mm:ss')
            }

            this.message = ''
            this.$refs['scrollable'].scrollIntoView({
                behavior: 'smooth'
            })
            await this.db.collection('messages').add(messageInfo)
        }
    },
    computed:{
        ...mapState({
            user: state => state.loginForm.user
        })
    }

}
</script>

<style>
@import "../assets/chatOnline.scss";
</style>
