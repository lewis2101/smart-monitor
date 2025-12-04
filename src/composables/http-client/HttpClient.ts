import axios, { type AxiosError, type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios";

type HttpClientConfig = {
  baseURL: string;
};

export type HttpClientMethod = "GET" | "POST" | "PATCH" | "DELETE";
export type HttpCallOption<D = undefined> = AxiosRequestConfig<D> & { url: string; method: HttpClientMethod };

type ResponseInterceptorCallback = (err: AxiosError) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;

export class HttpClient {
  private interceptorsResponse: ResponseInterceptorCallback[] = [];
  private readonly axiosInstance: AxiosInstance;

  constructor(config: HttpClientConfig) {
    this.axiosInstance = axios.create({
      baseURL: config.baseURL,
      paramsSerializer: (params) => this.serializeParams(params),
    });

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (err: AxiosError) => {
        for (const callback of this.interceptorsResponse) {
          const config = await callback(err);
          if (config) {
            return this.axiosInstance(config);
          }
        }
        throw err;
      },
    );
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

  public setAuthorization(token: string) {
    this.axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + token;
  }

  public registerResponseInterceptor = (callback: ResponseInterceptorCallback) => {
    this.interceptorsResponse.push(callback);
  };

  public get<T>(url: string, config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get(url, config);
  }

  public post<T>(url: string, config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post(url, config.data, config);
  }

  public patch<T>(url: string, config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.patch(url, config.data, config);
  }

  public delete<T>(url: string, config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete(url, config);
  }

  public call<Payload, Response>(config: HttpCallOption<Payload>, data?: Payload): Promise<AxiosResponse<Response>> {
    switch (config.method) {
      case "GET":
        return this.axiosInstance.get<Response>(config.url, config);
      case "POST":
        return this.axiosInstance.post<Response>(config.url, data, config);
      case "PATCH":
        return this.axiosInstance.patch<Response>(config.url, data, config);
      case "DELETE":
        return this.axiosInstance.delete<Response>(config.url, config);
    }
  }
}
