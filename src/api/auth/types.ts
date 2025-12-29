import type { Lang } from "@/i18n/lang.ts";

export type UserInfo = {
  id: string;
  firstName: string;
  lastName: string;
  role: Record<Lang, string> | null;
  username: string;
};
