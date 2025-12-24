import type { FieldInputType } from "../../../types/FieldType.ts";

export type StepField = {
  value: string;
  type: FieldInputType;
  text: string;
  disabled: boolean;
  show?: boolean;
  calc: null;
  calcRestrictions: boolean;
  default:
    | string
    | {
        id: number;
      };
  virtual: boolean;
  fontSize: string;
  fontColor: string;
  clientType: FieldInputType;
  table?: string;
  expand?: boolean;
};

export type OrderActions = "RATE_THE_TRIP" | "CONFIRM" | "CANCEL" | "TO_REWORK";
