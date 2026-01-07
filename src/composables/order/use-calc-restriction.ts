import type {StepField} from "@/components/step-generator/types.ts";
import {useCalcRestrictionMutation} from "@/api/orders/calc-restriction.ts";

export const useCalcRestriction = (processKey: string) => {
  const {mutateAsync: calcRestrictionMutate} = useCalcRestrictionMutation({
    getUrl: (url) => url.replace(":processKey", processKey)
  })

  const executeCalcRestriction = async (fields: StepField[], models: Record<string, unknown>) => {
    // TODO EXECUTE ALL RESTRIONS FIELD
  }

  return {
    executeCalcRestriction
  }
}
