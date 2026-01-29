import type { LangObject } from "@/api/types.ts";

export type FieldInputClientType =
  | "STRING"
  | "INTEGER"
  | "ARRAY"
  | "LOCAL"
  | "DATE_TIME"
  | "DATE"
  | "NUMBER"
  | "REF"
  | "LINK_GENERATOR"
  | "AddressSelector"
  | "TEXT"
  | "BOOLEAN"
  | "TITLE"
  | "DATE_TIME_PICKER"
  | "VehicleSelector"
  | "WorksList"
  | "SupplierSelector"
  | "FILE"
  | "DOCUMENT"
  | "RATING";

export type FieldInputType =
  | "STRING"
  | "INTEGER"
  | "ARRAY"
  | "LOCAL"
  | "DATE_TIME"
  | "DATE"
  | "NUMBER"
  | "REF"
  | "LINK_GENERATOR"
  | "AddressSelector"
  | "TEXT"
  | "BOOLEAN"
  | "TITLE"
  | "DATE_TIME_PICKER"
  | "RATING"
  | "FILE"
  | "DOCUMENT"
  | "CUSTOM";

export type FieldType = {
  changable: boolean;
  disabled: boolean;
  field: string;
  filterType: FieldInputClientType;
  init: "supplierName";
  order: number;
  required: boolean;
  text: string;
  type: FieldInputType;
  value: string;
  visible: boolean;
  local?: LangObject;
  isTitle?: boolean;
};
