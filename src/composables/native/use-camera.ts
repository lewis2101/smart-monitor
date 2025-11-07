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
    takePhoto: async (getter: (photo: string | undefined) => void) => {
      const photo = await execute(CameraSource.Camera);
      getter(photo);
    },
    pickGallery: async (getter: (photo: string | undefined) => void) => {
      const photo = await execute(CameraSource.Photos);
      getter(photo);
    },
  };
};
