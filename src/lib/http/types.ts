import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";

export type RequestInterceptor = (
  config: InternalAxiosRequestConfig<unknown>
) => InternalAxiosRequestConfig<unknown>;
export type ResponseInterceptor = (response: AxiosResponse) => AxiosResponse;

export type RequestConfig<BodyType = unknown, ParamsType = unknown> = {
  body?: BodyType;
  params?: ParamsType;

  signal?: AbortSignal;
};
