export type FieldType = {
  changable: boolean;
  disabled: boolean;
  field: string;
  filterType: "STRING" | "INTEGER" | "ARRAY";
  init: "supplierName";
  order: number;
  required: boolean;
  text: string;
  type: "STRING" | "INTEGER" | "ARRAY";
  value: string;
  visible: boolean;
  local?: {
    eng: string;
    kaz: string;
    rus: string;
  };
  isTitle?: boolean;
};
