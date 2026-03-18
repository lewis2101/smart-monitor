import { Haptics, ImpactStyle, NotificationType } from "@capacitor/haptics";

type AnyFn = (...args: any[]) => any;

const createExecutor =
  (hapticFn: () => Promise<void>) =>
  <T extends AnyFn>(callback: T) =>
  async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    await hapticFn();
    return callback(...args);
  };

export const useHaptics = () => {
  const lightHaptic = () => Haptics.impact({ style: ImpactStyle.Light });
  const mediumHaptic = () => Haptics.impact({ style: ImpactStyle.Medium });
  const heavyHaptic = () => Haptics.impact({ style: ImpactStyle.Heavy });

  const successHaptic = () => Haptics.notification({ type: NotificationType.Success });
  const warningHaptic = () => Haptics.notification({ type: NotificationType.Warning });
  const errorHaptic = () => Haptics.notification({ type: NotificationType.Error });

  const selectionChangedHaptic = () => Haptics.selectionChanged();

  const executeWithHaptic = {
    light: createExecutor(() => lightHaptic()),
    medium: createExecutor(() => mediumHaptic()),
    heavy: createExecutor(() => heavyHaptic()),
    success: createExecutor(() => successHaptic()),
    warning: createExecutor(() => warningHaptic()),
    error: createExecutor(() => errorHaptic()),
    selectionChanged: createExecutor(() => selectionChangedHaptic()),
  };

  return {
    lightHaptic,
    mediumHaptic,
    heavyHaptic,
    successHaptic,
    errorHaptic,
    selectionChangedHaptic,
    executeWithHaptic,
  };
};
