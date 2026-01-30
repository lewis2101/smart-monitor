import type { StepField } from "@/components/step-generator/types.ts";
import type { FieldInputClientType } from "../../../types/FieldType.ts";
import { tryToParseNumber } from "@/utils/tryToParseNumber.ts";
import { reactive } from "vue";
import type { AddressSelectorRoute } from "@/composables/order/types.ts";

type FieldValueInitFunc = (field: StepField) => unknown;

const refInit: FieldValueInitFunc = (field) => {
  if (!field.default) return null;

  if (typeof field.default === "object" && field.default.id) {
    return {
      id: tryToParseNumber(field.default.id),
    };
  }
  return null;
};

const linkGeneratorInit: FieldValueInitFunc = (field) => {
  if (field.default) {
    return field.default;
  }
  return null;
};

const dateTimePickerInit: FieldValueInitFunc = (field) => {
  if (typeof field.default === "string") {
    return new Date(field.default).toISOString();
  }
  // return null;
  const newDate = new Date();
  newDate.setMinutes(0);
  return newDate;
};

const addressSelectorInit: FieldValueInitFunc = (field) => {
  return field.default as AddressSelectorRoute;
};

const stringInit: FieldValueInitFunc = (field) => {
  if (typeof field.default === "string") {
    return field.default;
  }
  return null;
};

const booleanInit: FieldValueInitFunc = (field) => {
  if (field.default) {
    if (typeof field.default === "string") {
      return field.default === "true";
    }
    return field.default;
  }
  return false;
};

const titleInit: FieldValueInitFunc = (field) => {
  if (field.default) {
    return field.default;
  }
  return null;
};

const textInit: FieldValueInitFunc = (field) => {
  if (typeof field.default === "string") {
    return field.default;
  }
  return null;
};

const ratingInit: FieldValueInitFunc = (field) => {
  if (!!field.default) {
    return field.default as unknown as number;
  }
  return null;
};

const vehicleSelectorInit: FieldValueInitFunc = (field) => {
  if (!field.default) return null;

  if (typeof field.default === "object" && field.default.id) {
    return {
      id: tryToParseNumber(field.default.id),
    };
  }
  return null;
};

const worksListInit: FieldValueInitFunc = (field) => {
  if (field.default) {
    return field.default;
  }
  return [];
};

const numberInit: FieldValueInitFunc = (field) => {
  if (field.default) {
    return String(field.default);
  }
  return String(0);
};

const supplierSelectorInit: FieldValueInitFunc = (field) => {
  if (!field.default) return null;

  if (typeof field.default === "object" && field.default.id) {
    return {
      id: tryToParseNumber(field.default.id),
    };
  }
  return null;
};

const fieldValueInits: Record<FieldInputClientType, ((field: StepField) => unknown) | null> = {
  REF: refInit,
  LINK_GENERATOR: linkGeneratorInit,
  DATE_TIME_PICKER: dateTimePickerInit,
  DATE_TIME: dateTimePickerInit,
  DATE: dateTimePickerInit,
  AddressSelector: addressSelectorInit,
  STRING: stringInit,
  BOOLEAN: booleanInit,
  TITLE: titleInit,
  INTEGER: null,
  ARRAY: null,
  LOCAL: null,
  NUMBER: numberInit,
  TEXT: textInit,
  RATING: ratingInit,
  VehicleSelector: vehicleSelectorInit,
  WorksList: worksListInit,
  SupplierSelector: supplierSelectorInit,
  DOCUMENT: null,
  FILE: null,
};

export const useFieldValueInit = (fields: StepField[]) => {
  const fieldsModel = reactive<Record<string, any>>({});

  fields.forEach((field) => {
    if (fieldValueInits[field.clientType]) {
      fieldsModel[field.value] = fieldValueInits[field.clientType]?.(field);
    }
  });

  return {
    fieldsModel,
  };
};
