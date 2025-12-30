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
  | "RATING";

export type FieldType = {
  changable: boolean;
  disabled: boolean;
  field: string;
  filterType: FieldInputType;
  init: "supplierName";
  order: number;
  required: boolean;
  text: string;
  type: FieldInputType;
  value: string;
  visible: boolean;
  local?: {
    eng: string;
    kaz: string;
    rus: string;
  };
  isTitle?: boolean;
};
