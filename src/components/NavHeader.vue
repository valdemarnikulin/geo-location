<template>
<div id="my-header" class="my-navbar">
    <b-navbar class="navbar-shadow pr-4" toggleable="lg" type="dark" variant="white">
        <div class="navbar__left">
            <b-button @click="CHANGE_SHOW" class="mr-2 sidebar-toggle opacity-5">
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
            </div>
            <div class="header-btn-lg pl-4">
                <div>
                    <div id="user-name"><b>{{ userData.name || 'no name' }}</b></div>
                    <button class="nav_btn" @click="logout">log out</button>
                </div>
                <b-avatar id="avatar" size="lg" :src="userData.avatar"></b-avatar>
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
    VBToggle
} from 'bootstrap-vue'
import {
    FontAwesomeIcon
} from "@fortawesome/vue-fontawesome";
import SearchBox from '@/components/SearchBox.vue'

import {
    mapMutations, mapState
} from "vuex";
export default {
    components: {
        BAvatar,
        BNavbar,
        BButton,
        FontAwesomeIcon,
        SearchBox
    },
    directives: {
        'b-toggle': VBToggle
    },
    data() {
        return {
           
            time: '',
            searchText: '',
            isSearch: true, ///< for visible input for search
            user: {
                name: '',
                lastName: '',
                email: '',
                avatar: '',
            }
        };
    },
    mounted() {
     
        ///online time
        setInterval(() => {
            this.time = this.$DateTime.local().toFormat('yyyy LLL dd - HH:mm:ss')
        }, 1000);
    },
    methods: {
        ...mapMutations(['CHANGE_SHOW']),

        logout() {
            this.$store.dispatch('LOGOUT')
                .then(() => {
                    this.$router.push('/')
                })
        }
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
        ...mapState({
            showSideBar: state=> state.sidebar.showSideBar,
            userData: state => state.loginForm.user
        })
    }
};
</script>

<style>
@import "../assets/navHeader.scss";
</style>
