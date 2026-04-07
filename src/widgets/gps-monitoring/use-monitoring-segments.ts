import { ref } from "vue";

const DEFAULT_SEGMENT_QUERY_KEY = "monitoring";

export const useMonitoringSegments = () => {
  const segmentModel = ref<string>(DEFAULT_SEGMENT_QUERY_KEY);

  const handleOpenMap = () => {
    segmentModel.value = "map";
  };

  return {
    segmentModel,
    handleOpenMap,
  };
};
