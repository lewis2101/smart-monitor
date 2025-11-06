import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteNames } from "@/router/router-list.ts";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/",
      component: () => import("@/layouts/main-tabs.vue"),
      children: [
        {
          path: "home",
          name: RouteNames.home,
          component: () => import("@/pages/main.vue"),
        },
        {
          path: "docs",
          name: RouteNames.docs,
          component: () => import("@/pages/docs.vue"),
        },
      ],
    },
    {
      path: "/order/:uuid",
      name: "order",
      component: () => import("@/pages/order.vue"),
    },
  ],
});

export default router;
