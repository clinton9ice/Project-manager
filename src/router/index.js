import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/description/:id",
    name: "Description",
    // route level code-splitting
    // this generates a separate chunk (description.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: 'user' */"@/views/Description"),
    params: true,
  },
  {
    path: "/edit/:id",
    name: "edit",
    // route level code-splitting
    // this generates a separate chunk (edit.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "user"*/"@/views/Edit"),
    params: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
