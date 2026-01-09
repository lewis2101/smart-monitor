import {useCalcRestrictionMutation} from "@/api/orders/calc-restriction.ts";
import {inject, type MaybeRefOrGetter, toValue, watch} from "vue";
import {
  ProcessKeyInjectionKey,
  StepGeneratorFieldsModelInjectionKey
} from "@/composables/order/useStepGenerator.ts";


export const useCalcRestriction = <T>(fieldKey: string, watchModel: MaybeRefOrGetter<unknown>, hooks: {
  getValueOfCalcRestriction: (data: T) => void
}) => {
  const processKey = inject(ProcessKeyInjectionKey);
  const stepGeneratorFieldsModel = inject(StepGeneratorFieldsModelInjectionKey);

  const {mutateAsync: calcRestrictionMutate} = useCalcRestrictionMutation({
    getUrl: (url) => url.replace(":processKey", processKey).replace(":field", fieldKey)
  })

  const getCalcRestriction = async (): Promise<T> => {
    const fieldModels = toValue(stepGeneratorFieldsModel);
    return calcRestrictionMutate(fieldModels);
  }

  watch(watchModel, async () => {
    const data = await getCalcRestriction();
    hooks.getValueOfCalcRestriction(data);
  })

  return {
    getCalcRestriction
  }
}
