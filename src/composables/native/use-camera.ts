import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { ref } from "vue";

export const useCamera = () => {
  const currentPhoto = ref();

  const execute = async (source: CameraSource) => {
    // const perm = await Camera.requestPermissions();
    // if (perm.camera !== "granted") {
    //   return;
    // }

    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        saveToGallery: false,
        source,
      });
      currentPhoto.value = image.dataUrl;
    } catch (err) {
      console.error("Ошибка при получении фото:", err);
      throw err;
    }
  };

  return {
    currentPhoto,
    takePhoto: () => execute(CameraSource.Camera),
    pickGallery: () => execute(CameraSource.Photos),
  };
};
