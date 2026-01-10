export type DateCalcRestrictionResponse = {
  max: string | Date;
  min: string | Date;
  timeEnd: number;
  timeStart: number;
}

export const applyDateTimePickerRestriction = (data: DateCalcRestrictionResponse) => {
  return data;
}
