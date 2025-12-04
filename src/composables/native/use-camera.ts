import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

export const useCamera = () => {
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
      return image.dataUrl;
    } catch (err) {
      console.error("Ошибка при получении фото:", err);
      throw err;
    }
  };

  return {
    takePhoto: () => execute(CameraSource.Camera),
    pickGallery: () => execute(CameraSource.Photos),
  };
};
