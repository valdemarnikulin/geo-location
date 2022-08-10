<template>
<section class="vh-100 pt-4">
    <div class="container-fluid h-custom ">
        <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-md-9 col-lg-6 col-xl-5">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample image">
            </div>
            <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <h3>Please Login</h3>
                <form @submit.prevent="login">
                    <!-- Email input -->
                    <div class="form-outline mb-4">
                        <input v-model="username" type="text" id="form3Example3" class="form-control form-control-lg" placeholder="Enter a valid email address" />
                        <label class="form-label" for="form3Example3">Email address</label>
                    </div>

                    <!-- Password input -->
                    <div class="form-outline mb-3">
                        <input v-model="password" type="password" id="form3Example4" class="form-control form-control-lg" placeholder="Enter password" />
                        <label class="form-label" for="form3Example4">Password</label>
                    </div>

                    <div class="text-center text-lg-start mt-4 pt-2">
                        <button type="submit" class="btn btn-primary btn-lg" style="padding-left: 2.5rem; padding-right: 2.5rem;">Login</button>
                        <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <router-link to="/registration" class="link-danger">Register</router-link>
                        </p>
                    </div>

                </form>
                <button class="btn btn-primary btn-lg" @click="loginSubmit">Login with Google!</button>
            </div>
        </div>
    </div>
</section>
</template>

<script>
import firebase from 'firebase/compat/app';
export default {
    data() {
        return {
            username: "",
            password: ""
        }
    },
    methods: {
        login() {
            let email = this.email
            let password = this.password
            this.$store.dispatch('login', {
                    email,
                    password
                })
                .then(() => this.$router.push('/'))
                .catch(err => console.log(err))
        },
        loginSubmit() {
            const provider = new firebase.auth.GoogleAuthProvider()
            firebase.auth().signInWithRedirect(provider)
                .catch(console.log)
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
.divider:after,
.divider:before {
    content: "";
    flex: 1;
    height: 1px;
    background: #eee;
}

.h-custom {
    height: calc(100% - 73px);
}

@media (max-width: 450px) {
    .h-custom {
        height: 100%;
    }
}
</style>
