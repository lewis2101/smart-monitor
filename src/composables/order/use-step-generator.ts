import {type Component, markRaw, type Raw, reactive, ref} from "vue";
import type {StepField} from "@/components/step-generator/types.ts";
import {type FieldInputType} from "../../../types/FieldType.ts";
import FieldRef from "@/components/step-generator/FieldRef/FieldRef.vue";
import LinkGenerator from "@/components/step-generator/LinkGenerator/LinkGenerator.vue";
import DateTimeField from "@/components/step-generator/DateTimeField/DateTimeField.vue";
import AddressSelector from "@/components/step-generator/AddressSelector/AddressSelector.vue";
import FieldInput from "@/components/step-generator/FieldInput/FieldInput.vue";
import FieldBoolean from "@/components/step-generator/FieldInput/FieldBoolean.vue";
import FieldTitle from "@/components/step-generator/FieldTitle/FieldTitle.vue";
import FieldText from "@/components/step-generator/FieldText/FieldText.vue";
import RatingField from "@/components/step-generator/RatingField/RatingField.vue";
import {useCalcRestriction} from "@/composables/order/use-calc-restriction.ts";

export const useStepGenerator = (processKey: string, fields: StepField[]) => {
  const fieldsModel = reactive<Record<string, unknown>>({});
  const fieldsMap: Record<FieldInputType, Raw<Component> | null> = {
    REF: markRaw(FieldRef),
    LINK_GENERATOR: markRaw(LinkGenerator),
    DATE_TIME_PICKER: markRaw(DateTimeField),
    DATE_TIME: markRaw(DateTimeField),
    DATE: markRaw(DateTimeField),
    AddressSelector: markRaw(AddressSelector),
    STRING: markRaw(FieldInput),
    BOOLEAN: markRaw(FieldBoolean),
    TITLE: markRaw(FieldTitle),
    INTEGER: null,
    ARRAY: null,
    LOCAL: null,
    NUMBER: null,
    TEXT: markRaw(FieldText),
    RATING: markRaw(RatingField),
  };

  const {
    executeCalcRestriction,
    restrictions,
    restrictionsLoading
  } = useCalcRestriction(processKey, fieldsModel);

  const calcAffectedFieldsRestriction = async (fieldKey: string) => {
    const affectedFields = fields.filter((field) => (field.calcRestrictions && field.limitation?.includes(fieldKey)));
    console.log({affectedFields})

    await Promise.all(affectedFields.map((field) => executeCalcRestriction(field.value, field.clientType)));
  }

  const initStepGenerator = async () => {
    const hasRestrictionFields = fields.filter((field) => field.calcRestrictions);

    await Promise.all(hasRestrictionFields.map((field) => executeCalcRestriction(field.value, field.clientType)));
    await Promise.all(hasRestrictionFields.map((field) => calcAffectedFieldsRestriction(field.value)));
  }

  initStepGenerator();

  return {
    fieldsModel,
    fieldsMap,
    restrictions,
    executeCalcRestriction,
    calcAffectedFieldsRestriction,
    restrictionsLoading,
  }
}
