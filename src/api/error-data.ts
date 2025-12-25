export type HttpRequestError = {
  attr: string;
  extension: string;
  fullMessage: string;
  message: string;
  status: number;
  type: string;
};

export type CapacitorHttpError<T> = {
  data: T;
  headers: Record<string, string>;
  status: number;
  url: string;
};
