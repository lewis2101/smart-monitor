export type PermissionMethod = "GET" | "PUT" | "POST" | "DELETE" | "VIEW";

export type Permission<Method> = {
  id: number;
  code: string;
  method: Method;
  resourceType: string;
  description: string;
  roleId: number;
  roleCode: string;
};
