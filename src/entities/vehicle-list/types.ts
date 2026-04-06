export type VehicleListDto = {
  schema: string[];
  targets: string[][];
};

export type VehicleItem = {
  id: number;
  sfId: number;
  shortName: string;
  name: string;
  regNumber: string;
  client: number;
  depId: number;
  imei: string;
  devicename: string;
  depName: string;
  mess: {
    ignition: number;
    movement: number;
    speed: number;
    timestamp?: number;
    satellites?: number;
    longitude?: number;
    latitude?: number;
    altitude?: number;
    angle?: number;
  };
};
