<template>
<div class="index-form vh-100">
    <div id="nav">
        <ul class="d-flex justify-content-center mx-auto nav nav-pills nav-justified" id="ex1" role="tablist">
            <li class="nav-item" role="presentation">
                <router-link to="/login" class="nav-link active" id="tab-login" data-mdb-toggle="pill" role="tab" aria-controls="pills-login" aria-selected="true">Login</router-link>
            </li>
            <li class="nav-item" role="presentation">
                <router-link to="/registration" class="nav-link" id="tab-register" data-mdb-toggle="pill" role="tab" aria-controls="pills-register" aria-selected="false">Register</router-link>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    created: function () {
        this.axios.interceptors.response.use(undefined, function (err) {
            return new Promise(function () {
                if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
                    this.$store.dispatch("logout")
                }
                throw err;
            });
        });
    },
    data() {
        return {
            file: '',
        }
    },
    computed: {
        ...mapGetters({
            isLoggedIn: getters => getters.isLoggedIn
        })
        // isLoggedIn() {
        //     return this.$store.getters.isLoggedIn
        // }
    },
    methods: {
        
    },
}
</script>
<style>
.index-form{
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
