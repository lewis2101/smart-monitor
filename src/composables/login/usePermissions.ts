import { useAuthStorage } from "@/composables/login/use-auth-storage.ts";

type PermissionObject = {
  key: string;
  method: string;
};

const FOR_ALL = "forAll";

export const usePermissions = () => {
  const { permissionsStorage, accessTokenStorage } = useAuthStorage();

  const checkPermission = (checkData: PermissionObject) => {
    if (checkData.key === FOR_ALL) {
      return !!accessTokenStorage.value;
    }

    const permission = permissionsStorage.value.find((item) => item.code.toLowerCase() === checkData.key.toLowerCase());

    if (!permission) {
      return false;
    }

    return permission.method.toLowerCase() === checkData.method.toLowerCase() && !!accessTokenStorage.value;
  };

  return {
    checkPermission,
  };
};
