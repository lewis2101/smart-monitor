import type {MaybeRefOrGetter} from "vue";
import {useCalcRestrictionMutation} from "@/api/orders/calc-restriction.ts";
import {reactive, ref, toValue} from "vue";
import type {FieldInputType} from "../../../types/FieldType.ts";
import {
  applyDateTimePickerRestriction
} from "@/composables/apply-restrictions/date-time-picker-restiction.ts";

const restrictionHandlers: Record<FieldInputType, (...args: unknown) => unknown> = {
  DATE_TIME_PICKER: applyDateTimePickerRestriction,
}

export const useCalcRestriction = (processKey: MaybeRefOrGetter<string>, fieldsModel: MaybeRefOrGetter<Record<string, unknown>>) => {
  const restrictions = reactive<Record<string, unknown>>({});
  const restrictionsLoading = reactive<Record<string, boolean>>({});

  const {mutateAsync: calcRestrictionMutate} = useCalcRestrictionMutation({})

  const executeCalcRestriction = async (fieldKey: string) => {
    restrictionsLoading[fieldKey] = true;

    try {
      const data = await calcRestrictionMutate({
        data: toValue(fieldsModel),
        urlParams: {
          field: fieldKey,
          processKey: toValue(processKey),
        }
      });
      updateFieldRestriction(fieldKey, data);
    } catch (e) {
      console.log(e)
    } finally {
      restrictionsLoading[fieldKey] = false;
    }
  }

  const updateFieldRestriction = (fieldKey: string, restrictionData: unknown) => {
    const result = restrictionHandlers[fieldKey]?.(restrictionData);

    if (result) {
      restriction[fieldKey] = result;
    }
  }

  return {
    executeCalcRestriction,
    restrictions,
    restrictionsLoading
  }
}
