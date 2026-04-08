import { useGetNaviVehicleList } from "@/api/navi/vehicle-list.ts";
import { useQuery } from "@tanstack/vue-query";
import type { VehicleItem, VehicleListDto } from "@/entities/vehicle-list/types.ts";
import { compareKeysToValue } from "@/utils/compareKeysToValue.ts";

const prepareVehicleList = (data: VehicleListDto): VehicleItem[] => {
  const asd = compareKeysToValue(data.schema, data.targets) as VehicleItem[];
  console.log({ asd });
  return asd;
};

export const getVehicleList = () => {
  const getNaviVehicleList = useGetNaviVehicleList({});

  const { data, ...q } = useQuery({
    ...getNaviVehicleList,
    select: prepareVehicleList,
    structuralSharing: true,
  });

  return {
    data,
    ...q,
  };
};
