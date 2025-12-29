import type { FieldInputType } from "../../../types/FieldType.ts";

// TODO Сделать типизацию привязанный к clientType и отталкиваясь от него будет нужный тип у default и так же наличия table ключа так же через clientType
export type StepField = {
  value: string;
  type: FieldInputType;
  text: string;
  disabled: boolean;
  show?: boolean;
  calc: null;
  calcRestrictions: boolean;
  default: any;
  virtual: boolean;
  fontSize: string;
  fontColor: string;
  clientType: FieldInputType;
  table?: string;
  expand?: boolean;
};

export type OrderActions = "RATE_THE_TRIP" | "CONFIRM" | "CANCEL" | "TO_REWORK";
