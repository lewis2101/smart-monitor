import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios";

type HttpClientConfig = {
  baseURL: string;
};

export type HttpClientMethod = "GET" | "POST" | "PATCH" | "DELETE";
export type HttpCallOption<D = undefined> = AxiosRequestConfig<D> & { url: string; method: HttpClientMethod };

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
    return this.axiosInstance.post(url, config.data, config);
  }

  public patch<T>(url: string, config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.patch(url, config.data, config);
  }

  public delete<T>(url: string, config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete(url, config);
  }

  public call<RawData, Payload, Response>(
    config: HttpCallOption<Payload>,
    data?: Payload,
  ): Promise<AxiosResponse<Response>> {
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
