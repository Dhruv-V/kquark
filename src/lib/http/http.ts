import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";
import type { RequestConfig, RequestInterceptor, ResponseInterceptor } from ".";

export class HTTP {
  private transport: AxiosInstance;

  constructor(baseURL: string | URL) {
    this.transport = axios.create({
      baseURL: baseURL.toString(),
      paramsSerializer: (params) => {
        return new URLSearchParams(params).toString();
      },
    });
  }

  useRequestInterceptor(handler: RequestInterceptor) {
    this.transport.interceptors.request.use(handler);
  }

  useResponseInterceptor(handler: ResponseInterceptor) {
    this.transport.interceptors.response.use(handler);
  }

  private async request<T>(
    method: string,
    endpoint: string,
    config: { body?: unknown; params?: unknown; signal?: AbortSignal }
  ) {
    const requestConfig: AxiosRequestConfig = {
      method,
      url: endpoint,
      data: config.body,
      params: config.params,
      signal: config.signal,
    };

    const response = await this.transport.request<T>(requestConfig);
    return response.data;
  }

  async get<ResponseType, ParamsType = unknown>(
    endpoint: string,
    request?: Omit<RequestConfig<never, ParamsType>, "body">
  ): Promise<ResponseType> {
    return await this.request("get", endpoint, { ...request });
  }

  async post<ResponseType, BodyType = unknown, ParamsType = unknown>(
    endpoint: string,
    request?: RequestConfig<BodyType, ParamsType>
  ): Promise<ResponseType> {
    return await this.request("post", endpoint, { ...request });
  }

  async put<ResponseType, BodyType = unknown, ParamsType = unknown>(
    endpoint: string,
    request?: RequestConfig<BodyType, ParamsType>
  ): Promise<ResponseType> {
    return await this.request("put", endpoint, { ...request });
  }

  async patch<ResponseType, BodyType = unknown, ParamsType = unknown>(
    endpoint: string,
    request?: RequestConfig<BodyType, ParamsType>
  ): Promise<ResponseType> {
    return await this.request("patch", endpoint, { ...request });
  }

  async delete<ResponseType, ParamsType = unknown>(
    endpoint: string,
    request?: Omit<RequestConfig<never, ParamsType>, "body">
  ): Promise<ResponseType> {
    return await this.request("delete", endpoint, { ...request });
  }
}
