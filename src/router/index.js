import Vue from 'vue'
import Router from 'vue-router'
import AuthorizationPage from '@pages/AuthorizationPage.vue'
import RegistrationPage from '@pages/RegistrationPage.vue'

Vue.use(Router)

export default new Router({
    routes: [
      { path: '/authorization', component: AuthorizationPage },
      { path: '/registration', component: RegistrationPage },
    ]
})