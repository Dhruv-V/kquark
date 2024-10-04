import type { RequestInterceptor } from "./types";

export function attachBearerToken(getToken: () => string | undefined): RequestInterceptor {
  return (request) => {
    request.headers.Authorization = `Bearer ${getToken()}`;
    return request;
  };
}
