import { createRouter, createWebHistory } from "vue-router";
import { sessionExist } from "@/helper/Helper";

const routes = [
  {
    path: "/admin",
    name: "admin",
    component: () =>
      import(/* webpackChunkName: 'admin' */ "@/views/admin/Home.vue"),
    meta: {
      auth: true,
    },
  },
  {
    path: "/admin/description/:id",
    name: "Description",
    // route level code-splitting
    // this generates a separate chunk (description.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: 'admin' */ "@/views/admin/Description"),
    params: true,
    meta: {
      auth: true,
    },
  },
  {
    path: "/admin/edit/:id",
    name: "edit",
    // route level code-splitting
    // this generates a separate chunk (edit.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "admin"*/ "@/views/admin/Edit"),
    params: true,
    meta: {
      auth: true,
    },
  },
  {
    path: "/admin/settings/",
    name: "settings",
    // route level code-splitting
    // this generates a separate chunk (edit.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "admin"*/ "@/views/admin/Settings"),
    params: true,
    meta: {
      auth: true,
    },
  },

  // Public pages
  {
    path: "/",
    name: "Home",
    // route level code-splitting
    // this generates a separate chunk (description.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: 'public' */ "@/views/public/"),
  },
  {
    path: "/signup",
    name: "signup",
    // route level code-splitting
    // this generates a separate chunk (description.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: 'public' */ "@/views/public/Signup"),
  },
  {
    path: "/signin",
    name: "signin",
    // route level code-splitting
    // this generates a separate chunk (description.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: 'public' */ "@/views/public/Signin"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    // route level code-splitting
    // this generates a separate chunk (description.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: 'public' */ "@/views/NotFound"),
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

router.beforeEach((to, from, next) => {
  if (
    (to.name === "signin" && sessionExist("user-token")) ||
    (to.name === "signup" && sessionExist("user-token"))
  ) {
    next("/admin");
    return;
  }

  if (
    to.matched.some((record) => record.meta.auth) &&
    !sessionExist("user-token")
  ) {
    next("/signin");
    return;
  }

  next();
  return;
});

export default router;
