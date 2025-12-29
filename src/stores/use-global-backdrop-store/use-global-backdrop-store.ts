import { defineStore } from "pinia";
import { nextTick, reactive, watch } from "vue";
import {
  type BackdropItem,
  type BackdropKeys,
  type BackdropProps,
  backdropComponents,
} from "@/stores/use-global-backdrop-store/global-backdrop-config.ts";

export const useGlobalBackdropStore = defineStore("global-backdrop-store", () => {
  const backdrops = reactive<Array<BackdropItem<BackdropKeys> & { model: boolean }>>([]);

  // Нужно исправить типизацию промис резолва
  function push<K extends BackdropKeys>(
    key: K,
    options: {
      title: string;
      props: BackdropProps<K>;
    },
  ) {
    let promiseResolve = undefined;
    let promiseReject = undefined;

    const promise = new Promise((resolve, reject) => {
      promiseResolve = resolve;
      promiseReject = reject;
    });

    backdrops.push({
      component: backdropComponents[key],
      title: options.title,
      props: {
        ...options.props,
        onSuccess: promiseResolve,
        onFailure: promiseReject,
      },
      model: true,
    });

    return promise;
  }

  watch(backdrops, (value) => {
    setTimeout(async () => {
      await nextTick();
      const filtered = value.filter((b) => {
        if (!b.model) {
          b.props.onFailure?.(`Close backdrop: ${b.title}`);
        }
        return b.model;
      });
      backdrops.splice(0, backdrops.length, ...filtered);
    }, 150); // Дожидаемся закрытия бэкдропа и после очищаем его из списка
  });

  return {
    backdrops,
    push,
  };
});
