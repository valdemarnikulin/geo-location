import Vue from 'vue'
import Router from 'vue-router'
// import AuthorizationPage from '@/pages/AuthorizationPage.vue'
// import RegistrationPage from '@/pages/RegistrationPage.vue'

import store from '@/store/index.js'
// import IndexForm from '@/pages/IndexForm.vue'
// import CheckSecure from '@/components/CheckSecure.vue'
// import OldTasks from '@/components/Tasks/OldTasks.vue'

Vue.use(Router)

let router = new Router({
    mode: 'history',
    routes: [
      {
           path: '/login', 
           meta:{
               searchable: true,
               name:'Login'
           },
      component: ()=> import('@/pages/AuthorizationPage.vue'),
    name:'login' 
},
      { 
          path: '/registration', 
          meta:{
            searchable: true,
            name:'Registration'
        },
        component: ()=> import('@/pages/RegistrationPage.vue'),
    name:'registration'
    },
      {
        path: '/secure',
        name: 'CheckSecure',
        meta: { 
          requiresAuth: true
        },
        component: ()=> import('@/components/CheckSecure.vue')

      },
      {
        path: '/FormPage',
        name: 'IndexForm',
        meta:{
            searchable: true,
            name:'Enter'
        },
        component: ()=> import('@/pages/IndexForm.vue')
      },
      {
        path: '/OldTasks',
        name: 'OldTasks',
        meta:{
            searchable: true,
            name:'Old Tasks'
        },
        component: ()=> import('@/components/Tasks/OldTasks.vue')
      },
      {
        path: '/NotFound',
        name: 'Not Found',
        meta:{
            searchable: false,
        },
        component: ()=> import('@/pages/NotFound.vue')
      }
    ]
})
router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
      if (store.getters.isLoggedIn) {
        next()
        return
      }
      next('/login') 
    } else {
      next() 
    }
  })
export default router



