import type { AdditionalOrderActions, OrderActions } from "@/components/step-generator/types.ts";

export type OrderButtonConfig = {
  label: string;
  order: number;
  type: OrderActions | AdditionalOrderActions;
};

export const orderButtonsConfig: Record<OrderActions | AdditionalOrderActions, OrderButtonConfig> = {
  CONFIRM: {
    label: "Подтвердить",
    order: 5,
    type: "CONFIRM",
  },
  TO_CONFIRM: {
    label: "На согласование",
    order: 5,
    type: "TO_CONFIRM",
  },
  FINISH: {
    label: "Завершить",
    order: 1,
    type: "FINISH",
  },
  RATE_THE_TRIP: {
    label: "Оценить поездку",
    order: 5,
    type: "RATE_THE_TRIP",
  },
  REWORK: {
    label: "Вернуть",
    order: 2,
    type: "REWORK",
  },
  TO_REWORK: {
    label: "На доработку",
    order: 4,
    type: "TO_REWORK",
  },
  CANCEL: {
    label: "Отменить",
    order: 1,
    type: "CANCEL",
  },
  duplicate: {
    label: "Дублировать заявку",
    order: 4,
    type: "duplicate",
  },
  NEXT: {
    label: "Далее",
    order: 5,
    type: "NEXT",
  },
  SAVE: {
    label: "Сохранить",
    order: 5,
    type: "SAVE",
  },
  NOT_CONFIRM: {
    label: "Не подтверждено",
    order: 2,
    type: "NOT_CONFIRM",
  },
  VEHICLE_IS_CAME: {
    label: "Подтвердить",
    order: 5,
    type: "VEHICLE_IS_CAME",
  },
  VEHICLE_IS_NOT_CAME: {
    label: "Не подтверждено",
    order: 1,
    type: "VEHICLE_IS_NOT_CAME",
  },
  CONFIRM_WITH_CHANGES: {
    label: "Подтвердить",
    order: 5,
    type: "CONFIRM_WITH_CHANGES",
  },
  ACCEPT: {
    label: "Принять",
    order: 5,
    type: "ACCEPT",
  },
  HAND_OVER: {
    label: "Сдать",
    order: 1,
    type: "HAND_OVER",
  },
  ACCESS: {
    label: "Допуск",
    order: 5,
    type: "ACCESS",
  },
  NO_ACCESS: {
    label: "Не допуск",
    order: 1,
    type: "NO_ACCESS",
  },
  RESEND_FOR_PAYMENT: {
    label: "Вернуть на исправление",
    order: 2,
    type: "RESEND_FOR_PAYMENT",
  },
  TO_REGENERATE: {
    label: "Перегенерировать",
    order: 2,
    type: "TO_REGENERATE",
  },
  ASSIGN_TO_ME: {
    label: "Назначить на меня",
    order: 5,
    type: "ASSIGN_TO_ME",
  },
  SEND_FOR_PAYMENT: {
    label: "Оплатить",
    order: 5,
    type: "SEND_FOR_PAYMENT",
  },
};
