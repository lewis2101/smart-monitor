import { defineStore } from "pinia";
import { nextTick, reactive, watch } from "vue";
import {
  type BackdropItem,
  type BackdropKeys,
  type BackdropProps,
  backdropComponents,
} from "@/stores/use-global-backdrop-store/global-backdrop-config.ts";

type BackdropSuccessPayload<K extends BackdropKeys> = BackdropProps<K>["onSuccess"] extends (
  payload: infer P,
  ...args: any[]
) => any
  ? P
  : void;

export const useGlobalBackdropStore = defineStore("global-backdrop-store", () => {
  const backdrops = reactive<Array<BackdropItem<BackdropKeys> & { model: boolean }>>([]);

  function push<K extends BackdropKeys>(
    key: K,
    options: {
      title: string;
      props: Omit<BackdropProps<K>, "onSuccess" | "onFailure">;
    },
  ) {
    return new Promise<BackdropSuccessPayload<K>>((resolve, reject) => {
      backdrops.push({
        component: backdropComponents[key],
        title: options.title,
        id: key,
        props: {
          ...options.props,
          onSuccess: ((payload: BackdropSuccessPayload<K>) => resolve(payload)) as BackdropProps<K>["onSuccess"],
          onFailure: ((reason?: unknown) => reject(reason)) as BackdropProps<K>["onFailure"],
        } as BackdropProps<K>,
        model: true,
      });
    });
  }

  watch(
    backdrops,
    async (value) => {
      await nextTick();
      const filtered = value.filter((b) => {
        if (!b.model) {
          b.props.onFailure?.(`Close backdrop: ${b.title}`);
        }
        return b.model;
      });
      if (filtered.length !== value.length) {
        backdrops.splice(0, backdrops.length, ...filtered);
      }
    },
    {
      deep: true,
      flush: "post",
    },
  );

  return {
    backdrops,
    push,
  };
});
