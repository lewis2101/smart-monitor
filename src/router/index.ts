import { createRouter, createWebHistory } from "@ionic/vue-router";
import { CommonRoutes, MainTabRoutes, OrderRoutes } from "@/router/router-list.ts";
import MainTabs from "@/layouts/main-tabs.vue";
import Main from "@/pages/main.vue";
import Docs from "@/pages/docs.vue";
import Briefing from "@/pages/briefing.vue";
import Application from "@/pages/application.vue";
import Service from "@/pages/service.vue";
import NewOrder from "@/pages/new-order.vue";
import Learning from "@/pages/learning.vue";
import Login from "@/pages/login.vue";
import Registration from "@/pages/registration.vue";
import { useAuthStorage } from "@/composables/login/use-auth-storage.ts";
import Profile from "@/pages/profile.vue";
import Order from "@/pages/order.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/",
      component: MainTabs,
      children: [
        {
          path: "home",
          name: MainTabRoutes.home,
          component: Main,
        },
        {
          path: "docs",
          name: MainTabRoutes.docs,
          component: Docs,
        },
        {
          path: "docs/briefing",
          name: MainTabRoutes.briefing,
          component: Briefing,
        },
        {
          path: "application",
          name: MainTabRoutes.application,
          component: Application,
        },
        {
          path: "service",
          name: MainTabRoutes.service,
          component: Service,
        },
      ],
    },
    {
      path: "/login",
      name: CommonRoutes.login,
      component: Login,
    },
    {
      path: "/registration",
      name: CommonRoutes.registration,
      component: Registration,
    },
    {
      path: "/learning",
      name: CommonRoutes.learning,
      component: Learning,
    },
    {
      path: "/new-order/:orderId",
      name: OrderRoutes.newOrder,
      component: NewOrder,
    },
    {
      path: "/order/:orderId",
      name: OrderRoutes.order,
      component: Order,
    },
    {
      path: "/profile",
      name: CommonRoutes.profile,
      component: Profile,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const { checkIsExpiredToken, checkHasTokens } = useAuthStorage();
  const isExpired = checkIsExpiredToken();

  if (to.name !== CommonRoutes.login && !checkHasTokens()) {
    next({
      name: CommonRoutes.login,
    });
  }

  if (to.name === CommonRoutes.login && !isExpired) {
    next({
      name: MainTabRoutes.home,
    });
  }

  next();
});

export default router;
