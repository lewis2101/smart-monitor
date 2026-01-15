import { computed, type MaybeRefOrGetter, toValue } from "vue";

type Role = "ADMIN" | "CLIENT" | "SUPPLIER";

export const roleMap: Record<Role, number | null> = {
  ADMIN: null,
  CLIENT: 1,
  SUPPLIER: 2,
};

export const useRole = (clientType: MaybeRefOrGetter<number | null>) => {
  const checkRole = (role: Role, type: number | null) => {
    return roleMap[role] === type;
  };

  const isAdmin = computed(() => {
    const type = toValue(clientType);
    return !checkRole("CLIENT", type) || checkRole("SUPPLIER", type);
  });

  const isClient = computed(() => {
    const type = toValue(clientType);
    return checkRole("CLIENT", type);
  });

  const isSupplier = computed(() => {
    const type = toValue(clientType);
    return checkRole("SUPPLIER", type);
  });

  return {
    isAdmin,
    isClient,
    isSupplier,
  };
};
