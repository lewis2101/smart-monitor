import type {StepField} from "@/components/step-generator/types.ts";
import type {FieldInputType} from "../../../types/FieldType.ts";
import {tryToParseNumber} from "@/utils/tryToParseNumber.ts";
import {reactive} from "vue";

type FieldValueInitFunc = (field: StepField) => unknown;

const refInit: FieldValueInitFunc = (field) => {
  if (typeof field.default === "object" && field.default.id) {
    return {
      id: tryToParseNumber(field.default.id)
    };
  }
  return null;
}

const linkGeneratorInit: FieldValueInitFunc = (field) => {
  if (field.default) {
    return field.default;
  }
  return null;
}

const dateTimePickerInit: FieldValueInitFunc = (field) => {
  if (typeof field.default === "string") {
    return new Date(field.default).toISOString();
  }
  return new Date().toISOString();
}

const addressSelectorInit: FieldValueInitFunc = (field) => {
  return [];
}

const stringInit: FieldValueInitFunc = (field) => {
  if (typeof field.default === "string") {
    return field.default;
  }
  return null;
}

const booleanInit: FieldValueInitFunc = (field) => {
  if (field.default) {
    if (typeof field.default === "string") {
      return field.default === "true";
    }
    return field.default;
  }
  return false;
}

const titleInit: FieldValueInitFunc = (field) => {
  if (field.default) {
    return field.default
  }
  return null
}

const textInit: FieldValueInitFunc = (field) => {
  if (typeof field.default === "string") {
    return field.default;
  }
  return null;
}

const ratingInit: FieldValueInitFunc = (field) => {
  if (!!field.default) {
    return field.default as unknown as number;
  }
  return null;
}

const fieldValueInits: Record<FieldInputType, ((field: StepField) => unknown) | null> = {
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
  NUMBER: null,
  TEXT: textInit,
  RATING: ratingInit
}

export const useFieldValueInit = (fields: StepField[]) => {
  const fieldsModel = reactive<Record<string, unknown>>({});

  fields.forEach((field) => {
    if (fieldValueInits[field.clientType]) {
      fieldsModel[field.value] = fieldValueInits[field.clientType](field);
    }
  })

  return {
    fieldsModel
  }
}
