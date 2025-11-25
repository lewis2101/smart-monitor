import { computed } from "vue";
import DeviceDetector from "device-detector-js";

export const useDevice = () => {
  const device = computed(() => {
    const deviceDetector = new DeviceDetector();
    return deviceDetector.parse(navigator.userAgent);
  });

  return {
    device,
  };
};
