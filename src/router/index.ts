import { createRouter, createWebHistory } from "@ionic/vue-router";
import { CommonRoutes, MainTabRoutes, OrderRoutes } from "@/router/router-list.ts";
import MainTabs from "@/layouts/main-tabs.vue";
import Main from "@/pages/main.vue";
import Docs from "@/pages/docs.vue";
import Briefing from "@/pages/briefing.vue";
import Orders from "@/pages/orders.vue";
import Service from "@/pages/service.vue";
import NewOrder from "@/pages/new-order.vue";
import Learning from "@/pages/learning.vue";
import Login from "@/pages/login.vue";
import Registration from "@/pages/registration.vue";
import { useAuthStorage } from "@/composables/login/use-auth-storage.ts";
import Profile from "@/pages/profile.vue";
import Order from "@/pages/order.vue";
import Notifications from "@/pages/notifications.vue";
import SuccessOrder from "@/pages/success-order.vue";
import FileView from "@/pages/file-view.vue";
import Search from "@/pages/search.vue";
import Kpi from "@/pages/kpi.vue";
import Events from "@/pages/events.vue";
import MockOrder from "@/pages/mock-order.vue";
import AiChat from "@/pages/ai-chat.vue";
import Blog from "@/pages/blog.vue";
import Blogs from "@/pages/blogs.vue";
import Camera from "@/pages/camera.vue";

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
          path: "orders/:ordersType",
          name: MainTabRoutes.orders,
          component: Orders,
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
      path: "/briefing",
      name: MainTabRoutes.briefing,
      component: Briefing,
    },
    {
      path: "/new-order/:processKey",
      name: OrderRoutes.newOrder,
      component: NewOrder,
    },
    {
      path: "/view/orders/:ordersType",
      name: OrderRoutes.orders,
      component: Orders,
    },
    {
      path: "/order/:orderId",
      name: OrderRoutes.order,
      component: Order,
    },
    {
      path: "/success-order/:orderId/:status",
      name: OrderRoutes.successOrder,
      component: SuccessOrder,
    },
    {
      path: "/profile",
      name: CommonRoutes.profile,
      component: Profile,
    },
    {
      path: "/notifications",
      name: CommonRoutes.notifications,
      component: Notifications,
    },
    {
      path: "/file-view/:id",
      name: CommonRoutes.fileView,
      component: FileView,
    },
    {
      path: "/search",
      name: CommonRoutes.search,
      component: Search,
    },
    {
      path: "/kpi",
      name: CommonRoutes.kpi,
      component: Kpi,
    },
    {
      path: "/events",
      name: CommonRoutes.events,
      component: Events,
    },
    {
      path: "/mock-order/:processKey",
      name: OrderRoutes.mockOrder,
      component: MockOrder,
    },
    {
      path: "/ai-chat",
      name: CommonRoutes.aiChat,
      component: AiChat,
    },
    {
      path: "/blog/:id",
      name: CommonRoutes.blog,
      component: Blog,
    },
    {
      path: "/blogs",
      name: CommonRoutes.blogs,
      component: Blogs,
    },
    {
      path: "/camera",
      name: CommonRoutes.camera,
      component: Camera,
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
