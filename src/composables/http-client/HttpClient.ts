import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios";

type HttpClientConfig = {
  baseURL: string;
};

export type HttpClientMethod = "GET" | "POST" | "PATCH" | "DELETE";
export type HttpClientCallOptions<RawData, Payload> = {
  params?: RawData;
  body?: Payload;
};
export type HttpCallOption = AxiosRequestConfig & { url: string; method: HttpClientMethod };

export class HttpClient {
  private axiosInstance: AxiosInstance;

  constructor(config: HttpClientConfig) {
    this.axiosInstance = axios.create({
      baseURL: config.baseURL,
    });
  }

  public get<T>(url: string, config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get(url, config);
  }

  public post<T>(url: string, config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post(url, config);
  }

  public patch<T>(url: string, config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.patch(url, config);
  }

  public delete<T>(url: string, config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete(url, config);
  }

  public call<RawData, Payload, Response>(
    config: HttpCallOption,
    executeConfig: HttpClientCallOptions<RawData, Payload>,
  ): Promise<AxiosResponse<Response>> {
    const requestConfig: AxiosRequestConfig = {
      ...config,
      params: executeConfig.params,
      data: executeConfig.body,
    };

    switch (config.method) {
      case "GET":
        return this.axiosInstance.get(config.url, requestConfig);
      case "POST":
        return this.axiosInstance.post(config.url, requestConfig);
      case "PATCH":
        return this.axiosInstance.patch(config.url, requestConfig);
      case "DELETE":
        return this.axiosInstance.delete(config.url, requestConfig);
    }
  }
}
