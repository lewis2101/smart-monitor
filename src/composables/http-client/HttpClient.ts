import { CapacitorHttp, type HttpHeaders, type HttpOptions, type HttpResponse } from "@capacitor/core";

export type HttpClientMethod = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
export type CapacitorHttpResponse<T> = Omit<HttpResponse, "data"> & { data: T };
export type CapacitorHttpOptions<D = unknown> = Omit<HttpOptions, "method" | "data"> & {
  method: HttpClientMethod;
  data?: D;
};

type HttpClientConfig = {
  baseURL: string;
  headers?: Record<string, string>;
};

export type InterceptorCallback = (option: HttpResponse) => Promise<{
  refetch?: boolean;
  headers?: Record<string, string>;
}>;

export class HttpClient {
  private interceptors: InterceptorCallback[] = [];
  private readonly baseConfig: () => HttpClientConfig;

  constructor(config: () => HttpClientConfig) {
    this.baseConfig = config;
  }

  private normalizeData<T>(data?: T): T | undefined {
    if (!data) return undefined;
    return JSON.parse(JSON.stringify(data));
  }

  private buildHeaders(headers?: HttpHeaders): HttpHeaders {
    const baseConfigHeaders = this.baseConfig().headers || {};

    return {
      ...baseConfigHeaders,
      ...headers,
    };
  }

  private buildParams(params: Record<string, unknown> | Array<unknown>, prefix?: string): Record<string, string> {
    let parts: Record<string, string> = {};

    for (const key in params) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const value = params[key];
      if (value == null) continue;

      const paramKey = prefix ? `${prefix}[${key}]` : key;

      if (typeof value === "object" || Array.isArray(value)) {
        parts = {
          ...parts,
          ...this.buildParams(value, paramKey),
        };
        continue;
      }

      parts[paramKey] = `${value}`;
    }

    return parts;
  }

  public registerResponseInterceptor = (callback: InterceptorCallback) => {
    this.interceptors.push(callback);
  };

  private isValidStatus(code: number): boolean {
    return code >= 200 && code < 300;
  }

  private async executeInterceptors<Response>(
    url: string,
    options: CapacitorHttpOptions,
    response: HttpResponse,
  ): Promise<CapacitorHttpResponse<Response> | Promise<void>> {
    for (const interceptor of this.interceptors) {
      const interceptorOption = {
        ...response,
        url: options.url,
      };

      const data = await interceptor(interceptorOption);
      if (data.refetch) {
        return this.request<Response>(url, {
          ...options,
          headers: {
            ...options.headers,
            ...data.headers,
          },
        });
      }
    }
  }

  public async request<Response, Payload = unknown>(
    url: string,
    options: CapacitorHttpOptions<Payload>,
  ): Promise<CapacitorHttpResponse<Response>> {
    const { method, data, headers, params, ...rest } = options;

    const response = await CapacitorHttp.request({
      ...rest,
      method,
      url: `${this.baseConfig().baseURL}${url}`,
      headers: this.buildHeaders(headers),
      params: params ? this.buildParams(params) : undefined,
      data: this.normalizeData(data),
    });

    if (this.isValidStatus(response.status)) {
      return response;
    }

    const interceptorResult = await this.executeInterceptors<Response>(url, options, response.data);
    if (interceptorResult) {
      return interceptorResult;
    }
    throw response.data;
  }
}
