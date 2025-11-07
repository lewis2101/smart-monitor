import { createRouter, createWebHistory } from "@ionic/vue-router";
import { MainTabRoutes, OrderRoutes } from "@/router/router-list.ts";

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
          name: MainTabRoutes.home,
          component: () => import("@/pages/main.vue"),
        },
        {
          path: "docs",
          name: MainTabRoutes.docs,
          component: () => import("@/pages/docs.vue"),
        },
        {
          path: "application",
          name: MainTabRoutes.application,
          component: () => import("@/pages/application.vue"),
        },
        {
          path: "service",
          name: MainTabRoutes.service,
          component: () => import("@/pages/service.vue"),
        },
      ],
    },
    {
      path: "/new-order/:uuid",
      name: OrderRoutes.newOrder,
      component: () => import("@/pages/new-order.vue"),
    },
  ],
});

export default router;
