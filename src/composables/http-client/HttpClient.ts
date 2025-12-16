// import axios, { type AxiosError, type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios";

import { CapacitorHttp, type HttpOptions, type HttpParams, type HttpResponse } from "@capacitor/core";

export type HttpClientMethod = "GET" | "POST" | "PATCH" | "DELETE";
export type CapacitorHttpResponse<T> = Promise<Omit<HttpResponse, "data"> & { data: T }>;
export type CapacitorHttpOptions<D = unknown> = Omit<HttpOptions, "method" | "data"> & {
  method: HttpClientMethod;
  data?: D;
};

type HttpClientConfig = {
  baseURL: string;
};

export type InterceptorCallback = (option: HttpResponse) => Promise<{
  refetch?: boolean;
  headers?: Record<string, string>;
}>;

export class HttpClient {
  private readonly baseURL: string;
  private interceptors: InterceptorCallback[] = [];

  constructor(config: HttpClientConfig) {
    this.baseURL = config.baseURL;
  }

  private serializeParams(params: Record<string, any> | Array<any>, prefix?: string): string {
    const parts: string[] = [];

    for (const key in params) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const value = params[key];
      if (value == null) continue;

      const paramKey = prefix ? `${prefix}[${key}]` : key;

      if (typeof value === "object" || Array.isArray(value)) {
        parts.push(this.serializeParams(value, paramKey));
        continue;
      }

      parts.push(`${paramKey}=${value}`);
    }

    return parts.join("&");
  }

  public registerResponseInterceptor = (callback: InterceptorCallback) => {
    this.interceptors.push(callback);
  };

  private isValidStatus(code: number): boolean {
    return code >= 200 && code < 300;
  }

  private async executeInterceptors<Response>(
    options: CapacitorHttpOptions,
    response: HttpResponse,
  ): Promise<CapacitorHttpResponse<Response> | Promise<void>> {
    for (const interceptor of this.interceptors) {
      const data = await interceptor(response);
      if (data.refetch) {
        return this.call<Response>(options.url, {
          ...options,
          headers: {
            ...options.headers,
            ...data.headers,
          },
        });
      }
    }
  }

  public async get<Response>(url: string, option: CapacitorHttpOptions): CapacitorHttpResponse<Response> {
    const params = option.params ? `?${this.serializeParams(option.params)}` : "";

    const data = await CapacitorHttp.get({
      ...option,
      url: `${this.baseURL}${url}${params}`,
      params: undefined,
      headers: {
        ...option.headers,
        "Content-Type": "application/json; charset=utf-8",
      },
    });

    if (this.isValidStatus(data.status)) {
      return data;
    }

    const interceptorResult = await this.executeInterceptors<Response>(option, data);
    if (interceptorResult) {
      return interceptorResult;
    }
    throw data;
  }

  public async post<Response, Payload = unknown>(
    url: string,
    option: CapacitorHttpOptions<Payload>,
  ): CapacitorHttpResponse<Response> {
    const params = option.params ? `?${this.serializeParams(option.params)}` : "";

    const data = await CapacitorHttp.post({
      ...option,
      url: `${this.baseURL}${url}${params}`,
      params: undefined,
      headers: {
        ...option.headers,
        "Content-Type": "application/json; charset=utf-8",
      },
    });

    if (this.isValidStatus(data.status)) {
      return data;
    }

    const interceptorResult = await this.executeInterceptors<Response>(option, data);
    if (interceptorResult) {
      return interceptorResult;
    }
    throw data;
  }

  public patch<Response, Payload = unknown>(
    url: string,
    config: CapacitorHttpOptions<Payload>,
  ): CapacitorHttpResponse<Response> {
    const params = config.params ? `?${this.serializeParams(config.params)}` : "";

    return CapacitorHttp.patch({
      ...config,
      url: `${this.baseURL}${url}${params}`,
      params: undefined,
      headers: {
        ...config.headers,
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  }

  public delete<Response>(url: string, config: CapacitorHttpOptions): CapacitorHttpResponse<Response> {
    const params = config.params ? `?${this.serializeParams(config.params)}` : "";

    return CapacitorHttp.delete({
      ...config,
      url: `${this.baseURL}${url}${params}`,
      params: undefined,
      headers: {
        ...config.headers,
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  }

  public call<Response, Payload = unknown>(
    url: string,
    config: CapacitorHttpOptions<Payload>,
  ): CapacitorHttpResponse<Response> {
    switch (config.method) {
      case "GET":
        return this.get<Response>(url, config);
      case "POST":
        return this.post<Response, Payload>(url, config);
      case "PATCH":
        return this.patch<Response, Payload>(url, config);
      case "DELETE":
        return this.delete<Response>(url, config);
    }
  }
}
