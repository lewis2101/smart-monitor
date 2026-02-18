import { useCamera } from "@/composables/native/use-camera.ts";
import { useGlobalSpinner } from "@/stores/use-global-spinner/use-global-spinner.ts";
import { useGlobalBackdropStore } from "@/stores/use-global-backdrop-store/use-global-backdrop-store.ts";

export const useCameraPick = () => {
  const { takePhoto, pickGallery } = useCamera();
  const globalSpinner = useGlobalSpinner();

  const globalBackdropStore = useGlobalBackdropStore();

  const getPhoto = async () => {
    const photoTypeSelect = (await globalBackdropStore.push("camera-pick", {
      title: "Прикрепить",
      props: {},
    })) as "camera" | "gallery";

    const photo = await globalSpinner.execute(() => (photoTypeSelect === "camera" ? takePhoto() : pickGallery()));

    if (photo) {
      return photo;
    }
  };

  return {
    getPhoto,
  };
};
