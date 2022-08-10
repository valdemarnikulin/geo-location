<template>
<div>
    <div id="nav">
        <ul class=" col-md-6 d-flex justify-content-center mx-auto nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
            <li class="nav-item" role="presentation">
                <router-link to="/login" class="nav-link active" id="tab-login" data-mdb-toggle="pill" role="tab" aria-controls="pills-login" aria-selected="true">Login</router-link>
            </li>
            <li class="nav-item" role="presentation">
                <router-link to="/registration" class="nav-link" id="tab-register" data-mdb-toggle="pill" role="tab" aria-controls="pills-register" aria-selected="false">Register</router-link>
            </li>
        </ul>
        <span v-if="isLoggedIn"> | <a @click="logout">Logout</a></span>
    </div>
</div>
</template>

<script>
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
    computed: {
        isLoggedIn() {
            return this.$store.getters.isLoggedIn
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('logout')
                .then(() => {
                    this.$router.push('/login')
                })
        }
    },
}
</script>
