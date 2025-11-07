// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export type ExtractEmit<T> = InstanceType<T>["$emit"] extends infer E
  ? E extends (...args: any) => any
    ? {
      [K in Parameters<E>[0]]?: (...args: any[]) => void;
    }
    : never
  : never;
