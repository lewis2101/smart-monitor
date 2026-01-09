import type {StepField} from "@/components/step-generator/types.ts";
import {useCalcRestrictionMutation} from "@/api/orders/calc-restriction.ts";

export const useCalcRestriction = (processKey: string, fieldKey: string) => {
  // const fieldModels = inject(fieldModelsProvideKey)

  const {mutateAsync: calcRestrictionMutate} = useCalcRestrictionMutation({
    getUrl: (url) => url.replace(":processKey", processKey).replace(":field", fieldKey)
  })

  const executeCalcRestriction = async (fields: StepField) => {
    if (field.calcRestrictions) {
      console.log("FIELD MODELS: ", fieldModels)
      // await calcRestrictionMutate(fieldModels);
    }
    // TODO EXECUTE ALL RESTRIONS FIELD
  }

  return {
    executeCalcRestriction
  }
}
