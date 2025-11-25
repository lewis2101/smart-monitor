import { toTypedSchema } from "@vee-validate/zod";
import { object, string } from "zod";
import { useForm } from "vee-validate";
import { MainTabRoutes } from "@/router/router-list.ts";
import { useAuthMutation } from "@/api/auth/login.post.ts";
import { useAuthChallengeMutation } from "@/api/auth/challenge.post.ts";
import { useIonRouter } from "@ionic/vue";
import { useGlobalSpinner } from "@/stores/use-global-spinner/use-global-spinner.ts";
import { useDevice } from "@/composables/useDevice.ts";
import { useLocalStorage } from "@vueuse/core";
import { useRefreshTokenMutation } from "@/api/auth/refresh-token.post.ts";
import { computed } from "vue";

const accessTokenKey = "accessToken";
const refreshTokenKey = "refreshToken";
const tokenExpires = "tokenExpires";

const loginSchema = toTypedSchema(
  object({
    username: string().min(1, "Введите Логин").uppercase("Логин должен быть в верхнем регистре"),
    password: string().min(1, "Введите пароль"),
  }),
);

export const useLogin = () => {
  const { mutateAsync: mutateLogin, isPending: loginPending } = useAuthMutation();
  const { mutateAsync: mutateLoginChallenge, isPending: challengePending } = useAuthChallengeMutation();
  const { mutateAsync: mutateRefreshToken } = useRefreshTokenMutation();

  const router = useIonRouter();
  const globalSpinner = useGlobalSpinner();
  const { device } = useDevice();

  const accessTokenStorage = useLocalStorage(accessTokenKey, "");
  const refreshTokenStorage = useLocalStorage(refreshTokenKey, "");
  const expiresTokenStorage = useLocalStorage(tokenExpires, "");

  const checkIsExpiredToken = () => {
    if (!accessTokenStorage.value) {
      return true;
    }

    const expired = Number(expiresTokenStorage.value || 0);

    if (Number.isNaN(expired)) {
      return true;
    }
    return Date.now() >= expired;
  };

  const { values, validate, errors } = useForm<{
    username: string;
    password: string;
  }>({
    validationSchema: loginSchema,
    initialValues: {
      username: "",
      password: "",
    },
  });

  const auth = async () => {
    const { valid } = await validate();
    if (!valid && isPending.value) return;

    const data = await globalSpinner.execute(async () => {
      await mutateLoginChallenge({
        userName: values.username,
        device: device.value,
      });
      return mutateLogin({
        ...values,
        device: device.value,
      });
    });

    if (data) {
      accessTokenStorage.value = data.accessToken;
      refreshTokenStorage.value = data.refreshToken;
      expiresTokenStorage.value = String(data.expiry);
    }

    router.replace({ name: MainTabRoutes.home });
  };

  const isPending = computed(() => loginPending.value || challengePending.value);

  return {
    auth,
    isPending,
    errors,
    checkIsExpiredToken,
  };
};
