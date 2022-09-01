import Vue from "vue";
import Router from "vue-router";
import store from "@/store/index.js";

Vue.use(Router);

let router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "indexForm",
      meta: {
        searchable: true,
        // name: "Enter",
        layout: "indexForm",
      },
      component: () => import("@/pages/IndexForm.vue"),
    },
    {
      path: "/login",
      meta: {
        searchable: true,
        name: "Login",
        layout: "main",
      },
      component: () => import("@/pages/AuthorizationPage.vue"),
      name: "login",
    },
    {
      path: "/registration",
      meta: {
        searchable: true,
        name: "Registration",
        layout: "RegistrationPage",
      },
      component: () => import("@/pages/RegistrationPage.vue"),
      name: "registration",
    },
    {
      path: "/OldTasks",
      name: "OldTasks",
      meta: {
        requiresAuth: true,
        searchable: true,
        name: "Old Tasks",
        layout: "OldTasks",
      },
      component: () => import("@/components/Tasks/OldTasks.vue"),
    },
    {
      path: "*",
      name: "Not Found",
      meta: {
        searchable: false,
        layout: "NotFound",
      },
      component: () => import("@/pages/NotFound.vue"),
    },
    {
      path: "/MainPage",
      name: "Main page",
      meta: {
        searchable: true,
        layout: "MainPage",
        requiresAuth: true,
      },
      component: () => import("@/pages/MainPage.vue"),
    },
  ],
});
// router.beforeEach((to, from, next) => {
//   const user = localStorage.getItem("user");
//   if (
//     to.matched.some((record) => {
//       record.meta.requiresAuth;
//     })
//   ) {
//     if (store.state.loginForm.status == "success") {
//       console.log("success no redirection");
//       next();
//       return;
//     }
//     if (!user) {
//       console.log("!user");

//       next("/login");
//     }
//   } else {
//     next();
//   }
// });
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});
export default router;
