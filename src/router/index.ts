import { createRouter, createWebHistory } from "vue-router";
import type {
  RouteRecordRaw,
  RouteLocationNormalized,
  NavigationGuardNext,
} from "vue-router";
import Cookies from "js-cookie";

const token = Cookies.get("token");

const routes: RouteRecordRaw[] = [
  {
    name: "index",
    path: "/",
    redirect:"/login",
    component: () => import("../views/Index.vue"),
    children: [
      {
        name: "home",
        path: "/home",
        component: () => import("../views/Home.vue"),
      },
      {
        name: "chat",
        path: "/chat",
        component: () => import("../views/Chat.vue"),
      },
      {
        name: "page2",
        path: "/page2",
        component: () => import("../views/Page2.vue"),
      },
      {
        name: "page3",
        path: "/page3",
        component: () => import("../views/Page3.vue"),
      },
    ],
  },

  {
    name: "login",
    path: "/login",
    component: () => import("../views/Login.vue"),
  },
  {
    name: "register",
    path: "/register",
    component: () => import("../views/Register.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
