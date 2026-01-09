import {
  type Component,
  type InjectionKey,
  type Raw,
  type MaybeRefOrGetter,
  markRaw,
  provide,
  reactive
} from "vue";
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

export const StepGeneratorFieldsModelInjectionKey = Symbol("stepGenerator-fields-model-key") as InjectionKey<MaybeRefOrGetter<Record<string, unknown>>>;
export const ProcessKeyInjectionKey = Symbol("process-key") as InjectionKey<string>;

export const useStepGenerator = (processKey: string) => {
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

  provide(StepGeneratorFieldsModelInjectionKey, fieldsModel);
  provide(ProcessKeyInjectionKey, processKey);

  return {
    fieldsMap,
    fieldsModel
  }
}
