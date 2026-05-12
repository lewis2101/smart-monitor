import { NaviEndpoints } from "@/api/endpoints.ts";
import { Scopes } from "@/api/scopes.ts";
import { createVueQueryOptions } from "@/composables/http-client/creators/create-vue-query-options.ts";

type RawData = {
  sessionId: string | null;
  _ts: number | null;
  lastId: string | null;
};

type Response = {
  lastId?: string;
  messages?: {
    imei: string;
    timestamp: number;
    priority: number;
    longitude: number;
    latitude: number;
    mileage: number;
    altitude: number;
    angle: number;
    satellites: number;
    speed: number;
    ignition: boolean;
    movement: boolean;
    isBuffer: boolean;
    hdop: string;
    extVoltage: number;
    engineHour: number | null;
    battery: number;
    io: number | null;
    vehicleId: string;
    accelerometer: number | null;
    msgTypeCode: string;
  }[];
};

export const useNaviPoll = createVueQueryOptions<RawData, Response>({
  httpClientOptions: {
    url: NaviEndpoints.poll,
    method: "GET",
  },
  scope: Scopes.naviPoll,
});
