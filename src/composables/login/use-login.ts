import { toTypedSchema } from "@vee-validate/zod";
import { object, string } from "zod";
import { useForm } from "vee-validate";
import { CommonRoutes, MainTabRoutes } from "@/router/router-list.ts";
import { useAuthMutation } from "@/api/auth/login.post.ts";
import { useAuthChallengeMutation } from "@/api/auth/challenge.post.ts";
import { useIonRouter } from "@ionic/vue";
import { useGlobalSpinner } from "@/stores/use-global-spinner/use-global-spinner.ts";
import { useDevice } from "@/composables/useDevice.ts";
import { computed, watch } from "vue";
import { useAuthStorage } from "@/composables/login/use-auth-storage.ts";
import { useToast } from "primevue/usetoast";

const loginSchema = toTypedSchema(
  object({
    username: string().min(1, "Введите Логин").uppercase("Логин должен быть в верхнем регистре"),
    password: string().min(1, "Введите пароль"),
  }),
);

export const useLogin = () => {
  const { mutateAsync: mutateLogin, isPending: loginPending, error: loginError } = useAuthMutation({});
  const { mutateAsync: mutateLoginChallenge, isPending: challengePending } = useAuthChallengeMutation({});

  const router = useIonRouter();
  const globalSpinner = useGlobalSpinner();
  const { device } = useDevice();
  const toast = useToast();

  const { accessTokenStorage, refreshTokenStorage, expiresTokenStorage, setUserInfo, clearStorage } = useAuthStorage();

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

    try {
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

        setUserInfo(data.userInfo);
      }

      router.replace({ name: MainTabRoutes.home });
    } catch (e) {
      console.log(e);
    }
  };

  const logout = () => {
    clearStorage();
    location.href = CommonRoutes.login;
  };

  watch(loginError, (value) => {
    if (value) {
      toast.add({
        severity: "error",
        summary: "Ошибка",
        detail: value?.data?.extension || "Непредвиденная ошибка",
        life: 3000,
        closable: false,
      });
    }
  });

  const isPending = computed(() => loginPending.value || challengePending.value);

  return {
    auth,
    isPending,
    errors,
    logout,
  };
};
