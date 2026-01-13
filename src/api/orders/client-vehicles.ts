import { OrdersEndpoints } from "@/api/endpoints.ts";
import { createVueQueryOptions } from "@/composables/http-client/creators/create-vue-query-options.ts";
import { OrdersScope } from "@/api/orders-scope.ts";

export type Vehicle = {
  id: string;
  registrationNumber: string;
  vinNumber: string;
  odometer: number;
  hasAirConditioning: boolean;
  motorHour: null;
  imageUrl: null;
  drivers: null;
  nameVehicleSap: null;
  inventoryNumber: null;
  faNum1: null;
  faNum2: null;
  technicalPassportNumber: string;
  cylinderDisplacement: null;
  permissibleMaximumWeight: null;
  availabilityOfGbo: boolean;
  medicineKit: boolean;
  fireExtinguisher: boolean;
  emergencySignAvailability: boolean;
  fuelConsumptionBase: string;
  hasSpecEquip: boolean;
  equipBaseFuelConsumptionRate: null;
  equipMotorHour: null;
  availableToTrailer: boolean;
  cargoCoefficient: null;
  exploitationDate: null;
  createdAt: Date | string;
  updatedAt: Date | string;
  deletedAt: null;
  makeId: number;
  bodyId: number;
  statusId: number;
  modelId: number;
  yearId: number;
  colorId: number;
  transmissionId: null;
  clientId: string;
  cityId: string;
  priceListTypeId: number;
  departmentId: string;
  gpsDepartmentId: string;
  fuelTypeId: number;
  equipFuelTypeId: null;
  usageMetricTypeId: number;
  fuelPopulationCoefficientId: number;
  fuelAltitudeCoefficientId: number;
  costCenterId: null;
  sapCatalogPlantId: null;
  body: {
    id: number;
    code: string;
    name: {
      eng: string;
      kaz: string;
      rus: string;
    };
    description: null;
    createdAt: Date | string;
    updatedAt: Date | string;
    deletedAt: null;
    typeId: null;
  };
  model: {
    id: number;
    code: string;
    name: {
      eng: string;
      kaz: string;
      rus: string;
    };
    description: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    deletedAt: null;
    makeId: number;
    bodyId: number;
    waybillTypeId: null;
    make: {
      id: number;
      code: string;
      name: {
        eng: string;
        kaz: string;
        rus: string;
      };
      description: string;
      createdAt: Date | string;
      updatedAt: Date | string;
      deletedAt: null;
      countryId: number;
    };
  };
  year: {
    id: number;
    code: string;
    name: {
      eng: string;
      kaz: string;
      rus: string;
    };
    description: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    deletedAt: null;
  };
  color: {
    id: number;
    code: string;
    name: {
      eng: string;
      kaz: string;
      rus: string;
    };
    description: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    deletedAt: null;
  };
  city: {
    id: number;
    code: string;
    name: {
      eng: string;
      kaz: string;
      rus: string;
    };
    description: string;
    regionId: number;
    territoryId: number;
  };
};

type RawData = {
  needFilter: boolean;
};

type Response = {
  content: Vehicle[];
  size: number;
};

export const useClientVehiclesQuery = createVueQueryOptions<RawData, Response>({
  httpClientOptions: {
    url: OrdersEndpoints.clientVehicles,
    method: "GET",
  },
  scope: OrdersScope.clientVehicles,
});
