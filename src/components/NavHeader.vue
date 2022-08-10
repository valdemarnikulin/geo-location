<template>
<div id="my-header" class="my-navbar">
    <b-navbar class="navbar-shadow pr-4" toggleable="lg" type="dark" variant="white">
        <div class="navbar__left">
            <b-button @click="changeShow" class="mr-2 sidebar-toggle opacity-5">
                <font-awesome-icon style="width: 20px; height: 20px" icon="fa-solid fa-bars" />
            </b-button>
            <search-box></search-box>
        </div>
        <div class="navbar__right">
            <div class="wrap pr-5">
                <div class="wrap__date">
                    <div><b>Date</b></div>
                    <div class="opacity-7">
                        {{time}}
                    </div>
                </div>
                <div class="wrap__icons">
                    <div class="wrap__usa mr-2">
                        <img style="transform: scale(calc(0.9))" src="../assets/i.jpg" alt="usa" />
                    </div>
                    <div class="megaphone__badge">
                        <b-icon class="wrap__mega" icon="megaphone" variant="success" font-scale="3"></b-icon>
                        <b-badge class="badge-dot" variant="success">.</b-badge>
                    </div>
                </div>
            </div>
            <div class="header-btn-lg pl-4">
                <div>
                    <div @click="auth"><b>{{user.name || ''}} {{user.lastName || ''}}</b></div>
                </div>
                <b-avatar size="lg" :src="user.avatar"></b-avatar>
            </div>
        </div>
    </b-navbar>
</div>
</template>

<script>
import {
    BAvatar,
    BNavbar,
    BButton,
    BIcon,
    BBadge,
    VBToggle
} from 'bootstrap-vue'
import {
    FontAwesomeIcon
} from "@fortawesome/vue-fontawesome";
import SearchBox from '@/components/SearchBox.vue'

import {
    mapMutations
} from "vuex";
import axios from 'axios';
const baseURL = "http://localhost:3000/users";
export default {
    components: {
        BAvatar,
        BNavbar,
        BButton,
        BIcon,
        BBadge,
        FontAwesomeIcon,
        SearchBox
    },
    directives: {
        'b-toggle': VBToggle
    },
    data() {
        return {
            msg: 'new message',
            time: '',
            searchText: '',
            isSearch: true,
            user: {
                name: '',
                lastName: '',
                email: '',
                avatar: '',
            }
        };
    },
    mounted() {
        this.getUser()
        //online time
        setInterval(() => {
            this.time = this.$DateTime.local().toFormat('yyyy LLL dd - HH:mm:ss')
        }, 1000);
    },
    methods: {
        ...mapMutations(['changeShow']),

        async getUser() {
            const res = await axios.get(baseURL);
            const {
                data: [user]
            } = res;
            this.user = user;
        },
        auth() {
            this.$router.push('/FormPage')
        },
    },
    watch: {
        showSideBar(newValue) {
            let show = document.getElementById('my-header')
            if (newValue == true) {
                show.style.paddingLeft = '5rem'
            } else {
                show.style.paddingLeft = '15rem'

            }
        },
    },
    computed: {
        showSideBar() {
            return this.$store.state.sidebar.showSideBar
        }
    }
};
</script>

<style>
@import "../assets/navHeader.scss";
</style>
