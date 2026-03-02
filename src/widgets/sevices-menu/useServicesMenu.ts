import { computed } from "vue";
import { OrderRoutes } from "@/router/router-list.ts";
import { useI18n } from "vue-i18n";
import { useIonRouter } from "@ionic/vue";

/*ЭТИХ РОУТОВ НЕТ В СПИСКЕ
  ["mn_main_suppliers", "/view/MainSuppliers", mdiHammerScrewdriver],
  ["BuhTasksToClientApproval", "/view/BuhTasksToClientApproval", mdiInvoiceTextEditOutline, null, "view"],
  ["BuhTasksToInvoice", "/view/BuhTasksToInvoice", mdiInvoiceTextSendOutline, null, "view"],
  ["BuhTasksZNO", "/view/BuhTasksZNO", mdiInvoiceTextPlusOutline, null, "view"],
  ["BuhTasksPaid", "/view/BuhTasksPaid", mdiInvoiceTextCheckOutline, null, "view"],
  */

export const useServicesMenu = () => {
  const { t } = useI18n();
  const router = useIonRouter();

  const menuList = computed(() => [
    {
      icon: "stats",
      color: "green",
      title: t("mn_dashboard"),
    },
    {
      icon: "info",
      color: "green",
      title: t("mn_new_gps_connection_order"),
    },
    {
      icon: "info",
      color: "green",
      title: t("mn_gps_monitoring"),
    },
    {
      icon: "monit",
      color: "blue",
      title: t("mn_smart_navigator"),
    },
    {
      icon: "paper-dot",
      color: "green",
      title: t("mn_bucket"),
    },
    {
      icon: "paper-order",
      color: "blue",
      title: t("mn_orders"),
    },
    {
      icon: "paper-order",
      color: "red",
      title: "Все заявки (Админ)",
      action: () => {
        router.push({ name: OrderRoutes.orders, params: { ordersType: "AdminOrders" } });
      },
    },
    {
      icon: "truck",
      color: "purple",
      title: t("mn_cars"),
    },
    {
      icon: "build",
      color: "blue",
      title: t("mn_suppliers"),
    },
    {
      icon: "paper-line",
      color: "blue",
      title: t("mn_contracts"),
    },
    {
      icon: "group",
      color: "light-blue",
      title: t("mn_clients"),
    },
    {
      icon: "info",
      color: "green",
      title: t("mn_prices"),
    },
    {
      icon: "info",
      color: "green",
      title: t("mn_payment_to_suppliers"),
    },
    {
      icon: "calendar",
      color: "blue",
      title: t("mn_calendar"),
    },
    {
      icon: "camera",
      color: "green",
      title: t("mn_camera"),
    },
    {
      icon: "calendar",
      color: "red",
      title: t("mn_calendar_holiday"),
    },
    {
      icon: "paper-line",
      color: "purple",
      title: t("mn_generate_document"),
    },
    {
      icon: "info",
      color: "green",
      title: t("mn_tires"),
    },
    {
      icon: "info",
      color: "green",
      title: t("catalog_OrdersDispatcherTransport"),
    },
    {
      icon: "pin",
      color: "green",
      title: t("catalog_OrdersDispatcherWaybill"),
    },
    {
      icon: "people-fix",
      color: "yellow",
      title: t("mn_drivers"),
    },
    {
      icon: "info",
      color: "green",
      title: t("catalog_EdoAvrSupplier"),
    },
    {
      icon: "info",
      color: "green",
      title: t("mn_outgoing_payment_task"),
    },
    {
      icon: "gift",
      color: "orange",
      title: t("mn_bonus"),
    },
    {
      icon: "info",
      color: "green",
      title: t("mn_edo_unformed_documents"),
    },
  ]);

  return {
    menuList,
  };
};
