import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useIonRouter } from "@ionic/vue";

const SEGMENT_QUERY_KEY = "segment";
const DEFAULT_SEGMENT_QUERY_KEY = "monitoring";

export const useMonitoringSegments = () => {
  const router = useIonRouter();
  const route = useRoute();

  const segmentModel = ref<string>((route.query[SEGMENT_QUERY_KEY] as string) || DEFAULT_SEGMENT_QUERY_KEY);

  watch(segmentModel, (value) => {
    router.replace({
      ...route,
      query: {
        [SEGMENT_QUERY_KEY]: value,
      },
    });
  });

  return {
    segmentModel,
  };
};
