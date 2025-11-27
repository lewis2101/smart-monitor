import type { RefresherCustomEvent } from "@ionic/vue";

export const mockRefresh = (event: RefresherCustomEvent) => {
  setTimeout(async () => {
    await event.target.complete();
  }, 1500);
};
