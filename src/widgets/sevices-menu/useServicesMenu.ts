import { computed, type ComputedRef } from "vue";
import { CommonRoutes, OrderRoutes } from "@/router/router-list.ts";
import { useI18n } from "vue-i18n";
import { useIonRouter } from "@ionic/vue";
import { usePermissions } from "@/composables/login/usePermissions.ts";
import { useGlobalBackdropStore } from "@/stores/use-global-backdrop-store/use-global-backdrop-store.ts";

type MenuList = {
  icon: string;
  color: string;
  title: string;
  permissionKey: string;
  permissionMethod?: string;
  action?: () => void;
};

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
  const { checkPermission } = usePermissions();
  const globalBackdropStore = useGlobalBackdropStore();

  const docsList = [
    {
      label: "Дефектовочный акты",
      value: "DEFECT_ACT_FILES",
    },
    {
      label: "Заказ-наряд",
      value: "ORDER_FORM_ACT_FILES",
    },
    {
      label: "Акт выполненных работ",
      value: "COMPLETED_WORK_FILES",
    },
  ];

  const menuList: ComputedRef<MenuList[]> = computed(() => [
    {
      icon: "stats",
      color: "green",
      title: t("mn_dashboard"),
      permissionKey: "mn_dashboard",
    },
    {
      icon: "nav",
      color: "purple",
      title: t("mn_new_gps_connection_order"),
      permissionKey: "mn_new_gps_connection_order",
    },
    {
      icon: "pin",
      color: "red",
      title: t("mn_gps_monitoring"),
      permissionKey: "mn_gps_monitoring",
    },
    {
      icon: "monit",
      color: "blue",
      title: t("mn_smart_navigator"),
      permissionKey: "mn_smart_navigator",
    },
    {
      icon: "paper-dot",
      color: "green",
      title: t("mn_bucket"),
      permissionKey: "mn_bucket",
    },
    {
      icon: "paper-order",
      color: "light-blue",
      title: t("mn_mine"),
      permissionKey: "mn_mine",
      action: () => {
        router.push({ name: OrderRoutes.orders, params: { ordersType: "!OrdersMine" } });
      },
    },
    {
      icon: "paper-order",
      color: "blue",
      title: t("mn_orders"),
      permissionKey: "mn_orders",
      action: () => {
        router.push({ name: OrderRoutes.orders, params: { ordersType: "!Orders" } });
      },
    },
    {
      icon: "paper-order",
      color: "red",
      title: t("mn_admin_orders"),
      permissionKey: "mn_admin_orders",
      action: () => {
        router.push({ name: OrderRoutes.orders, params: { ordersType: "AdminOrders" } });
      },
    },
    {
      icon: "truck",
      color: "purple",
      title: t("mn_cars"),
      permissionKey: "mn_cars",
    },
    {
      icon: "build",
      color: "light-blue",
      title: t("mn_suppliers"),
      permissionKey: "mn_suppliers",
    },
    {
      icon: "paper-line",
      color: "blue",
      title: t("mn_contracts"),
      permissionKey: "mn_contracts",
    },
    {
      icon: "group",
      color: "light-blue",
      title: t("mn_clients"),
      permissionKey: "mn_clients",
    },
    {
      icon: "dollar",
      color: "green",
      title: t("mn_prices"),
      permissionKey: "mn_prices",
    },
    {
      icon: "table",
      color: "light-blue",
      title: t("mn_payment_to_suppliers"),
      permissionKey: "mn_payment_to_suppliers",
    },
    {
      icon: "calendar",
      color: "blue",
      title: t("mn_calendar"),
      permissionKey: "mn_calendar",
    },
    {
      icon: "camera",
      color: "green",
      title: t("mn_camera"),
      permissionKey: "mn_camera",
      action: () => {
        router.push({
          name: CommonRoutes.camera,
        });
      },
    },
    {
      icon: "calendar",
      color: "red",
      title: t("mn_calendar_holiday"),
      permissionKey: "mn_calendar_holiday",
    },
    {
      icon: "paper-line",
      color: "purple",
      title: t("mn_generate_document"),
      permissionKey: "mn_generate_document",
    },
    {
      icon: "circle",
      color: "blue",
      title: t("mn_tires"),
      permissionKey: "mn_tires",
    },
    // {
    //   icon: "info",
    //   color: "green",
    //   title: t("catalog_OrdersDispatcherTransport"),
    // },
    // {
    //   icon: "pin",
    //   color: "green",
    //   title: t("catalog_OrdersDispatcherWaybill"),
    // },
    {
      icon: "people-fix",
      color: "yellow",
      title: t("mn_drivers"),
      permissionKey: "mn_drivers",
    },
    {
      icon: "paper-check",
      color: "light-blue",
      title: t("catalog_EdoAvrSupplier"),
      permissionKey: "EdoAvrSupplier",
    },
    {
      icon: "paper-dollar",
      color: "red",
      title: t("mn_outgoing_payment_task"),
      permissionKey: "mn_outgoing_payment_task",
    },
    {
      icon: "gift",
      color: "orange",
      title: t("mn_bonus"),
      permissionKey: "mn_bonus",
    },
    {
      icon: "paper-pen",
      color: "purple",
      title: t("mn_edo_unformed_documents"),
      permissionKey: "mn_edo_unformed_documents",
    },
    {
      icon: "book",
      color: "green",
      title: "Документы",
      permissionKey: "mn_docs_list",
      action: async () => {
        try {
          await globalBackdropStore.push("pick", {
            title: "Документы",
            props: {
              list: docsList,
            },
          });

          await globalBackdropStore.push("develop", {
            title: "Этап не доступен",
            props: {},
          });
        } catch (e) {
          console.log(e);
        }
      },
    },
  ]);

  const permittedMenuList = computed(() =>
    menuList.value.filter((item) => {
      return checkPermission({
        key: item.permissionKey,
        method: item.permissionMethod || "gui",
      });
    }),
  );

  return {
    menuList,
    permittedMenuList,
  };
};
