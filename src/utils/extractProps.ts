export type ExtractProps<T> = T extends new (...args: any) => any
  ? Omit<InstanceType<T>["$props"], "class" | "style">
  : never;
