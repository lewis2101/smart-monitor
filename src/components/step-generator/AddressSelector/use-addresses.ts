import { useQuery } from "@tanstack/vue-query";
import { type RawData as RoutePointRawData, useWialonRoutePointQuery } from "@/api/map/wialon-route-point.ts";
import { useWialonRouteQuery } from "@/api/map/wialon-route.ts";
import { computed, type MaybeRefOrGetter, onMounted, reactive, type Ref, ref, toValue, watchEffect } from "vue";
import type { AddressSelectorRoute } from "@/composables/order/types.ts";
import type { AddressInfo } from "@/api/map/types.ts";
import { useToast } from "primevue/usetoast";

export type AddressData = {
  name: string;
  lat?: number;
  lng?: number;
  point?: AddressInfo;
};

const routePintColors = [
  "#FF5252",
  "#2196F3",
  "#4CAF50",
  "#FB8C00",
  "#050b1f",
  "#4B0082",
  "#800080",
  "#483D8B",
  "#8B0000",
  "#FFD700",
  "#FFFF00",
  "#191970",
  "#2F4F4F",
];

export const useAddresses = (initialData: MaybeRefOrGetter<AddressSelectorRoute[]>) => {
  const routeSessionKey = ref<string>("");
  const routePointQueryParams = ref<RoutePointRawData | null>(null);

  const addresses = reactive<AddressData[]>([]);
  const isPossibleCreateAddress = ref(false);

  const toast = useToast();

  const wialonRoutePointQuery = useWialonRoutePointQuery({
    params: routePointQueryParams as Ref<RoutePointRawData>,
  });

  const wialonRouteQuery = useWialonRouteQuery({
    params: computed(() => ({
      sessionKey: routeSessionKey.value,
    })),
  });

  const {
    data: wialonRoutePointData,
    suspense: wialonRoutePointSuspense,
    error: wialonRoutePointError,
    isPending: wialonRoutePointPending,
  } = useQuery({
    ...wialonRoutePointQuery,
    enabled: () => !!routePointQueryParams.value,
    staleTime: 0,
  });

  const {
    data: wialonRouteData,
    suspense: wialonRouteSuspense,
    error: wialonRouteError,
    isPending: wialonRoutePending,
  } = useQuery({
    ...wialonRouteQuery,
    enabled: () => !!routeSessionKey.value,
    staleTime: 0,
  });

  const init = () => {
    const model = toValue(initialData);

    model.forEach((item) => {
      const wp1 = {
        name: item.wp1,
        lat: item.lat1,
        lng: item.lon2,
        point: item.point1,
      };
      const wp2 = {
        name: item.wp2,
        lat: item.lat2,
        lng: item.lon2,
        point: item.point2,
      };
      addresses.push(wp1);
      addresses.push(wp2);
    });
  };

  const createRoutes = async () => {
    let colorIdx = 0;

    const routes: AddressSelectorRoute[] = [];
    let tempSessionKey: string | undefined;
    const points: RoutePointRawData["point"][] = [];

    for (const idx in addresses) {
      const firstPoint = addresses[+idx];
      const secondPoint = addresses[+idx + 1];

      if (!firstPoint || !secondPoint) {
        continue;
      }

      if (
        firstPoint.point &&
        firstPoint.lat &&
        firstPoint.lng &&
        secondPoint.point &&
        secondPoint.lat &&
        secondPoint.lng
      ) {
        const point = {
          lat1: firstPoint.lat,
          lon1: firstPoint.lng,
          wp1: firstPoint.name,
          point1: firstPoint.point,
          lat2: secondPoint.lat,
          lon2: secondPoint.lng,
          wp2: secondPoint.name,
          point2: secondPoint.point,
        };

        points.push(point);
        routePointQueryParams.value = {
          point,
          sessionKey: tempSessionKey,
        };

        await wialonRoutePointSuspense();
        tempSessionKey = wialonRoutePointData.value.sessionKey;
      }
    }

    if (!tempSessionKey) {
      return;
    }

    routeSessionKey.value = tempSessionKey;
    await wialonRouteSuspense();

    points.forEach((point, idx) => {
      const routesData = wialonRouteData.value[idx];

      if (routesData) {
        routes.push({
          ...point,
          ...routesData,
          color: routePintColors[colorIdx++] as string,
        });
        if (routePintColors.length === colorIdx - 1) colorIdx = 0;
      }
    });

    if (routes.length) {
      return routes;
    }
  };

  const addAddress = () => {
    addresses.push({
      name: "",
    });
  };

  onMounted(() => {
    init();
  });

  const isLoading = computed(
    () =>
      (!!routePointQueryParams.value && wialonRoutePointPending.value) ||
      (!!routeSessionKey.value && wialonRoutePending.value),
  );

  const isPossibleAddRoute = computed(() => {
    const isHasEmptyRoute = addresses.some((item) => {
      return !item.name || !item.lng || !item.lat || !item.point;
    });
    return !isHasEmptyRoute;
  });

  watchEffect(() => {
    if (wialonRouteError.value || wialonRoutePointError.value) {
      toast.add({
        severity: "error",
        summary: "Ошибка",
        detail: "Приозошла ошибка при проекладке маршрута",
        life: 3000,
      });
    }
  });

  return {
    addresses,
    createRoutes,
    addAddress,
    isPossibleCreateAddress,
    isLoading,
    isPossibleAddRoute,
  };
};
