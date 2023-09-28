import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

export interface CommonResponse<T = any> {
  successOrNot: string;
  statusCode: string;
  data?: T;
}
export enum Service {
  AQUA_BE = 'aqua-be',
  AQUA_ADMIN_BE = 'aqua-admin-be',
}
export enum ServicePort {
  AQUA_BE = 8080,
  AQUA_ADMIN_BE = 7071,
}

const getInstance = (serviceName: string, params?: any): AxiosInstance => {
  axios.defaults.headers.post['Content-Type'] = 'application/json';

  let baseURL = '';
  switch (serviceName) {
    case Service.AQUA_BE:
      if (process.env.REACT_APP_NODE_ENV === 'local') {
        baseURL = `${process.env.REACT_APP_API_BASE_URL}:${ServicePort.AQUA_BE}`;
      }
      break;
    case Service.AQUA_ADMIN_BE:
      baseURL = `${process.env.REACT_APP_API_BASE_URL}:${ServicePort.AQUA_ADMIN_BE}`;
      break;
    default:
      break;
  }

  // axios 인스턴스 생성
  const instance = axios.create({
    baseURL: baseURL,
    timeout: 1000,
  });

  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (config?.headers) {
        //config.headers["x-api-key"] = process.env.REACT_APP_API_KEY || "";
        //config.headers["x-correlation-id"] = "";
        //config.headers["x-session-id"] = "sessionId";
        config.headers.Authorization = localStorage.getItem('idToken');
      }
      return config;
    },
    (error: any) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    async (response: any): Promise<any> => {
      const commonResponse: CommonResponse = response.data as CommonResponse;

      if (commonResponse.statusCode && commonResponse.statusCode === 'SESSION_EXPIRE') {
        sessionStorage.clear();
        window.location.assign('/login');
      }
      return commonResponse;
    },

    async (error: any): Promise<any> => {
      const unknownError: CommonResponse = {
        successOrNot: 'N',
        statusCode: 'UNKNOWN_ERROR',
        data: {},
      };

      if (error.response && error.response.status.toString() === '401') {
        window.location.assign('/login');
      }

      return unknownError;
    }
  );
  return instance;
};

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export interface QueryParams {
  [key: string]: string | number | boolean;
}

export interface ApiRequest {
  service: string;
  url: string;
  method: Method;
  queryParams?: QueryParams;
  bodyParams?: object;
}

const getQueryStringFormat = (queryParams?: QueryParams): string => {
  if (!queryParams) return '';
  const keys = Object.keys(queryParams);
  const queryString = keys
    .filter((key) => queryParams[key] !== null && queryParams[key] !== undefined)
    .map((key) => `${key}=${encodeURIComponent(queryParams[key] as string)}`) // eslint-disable-line
    .join('&');
  return queryString ? `?${queryString}` : '';
};

export const callApi = async (apiRequest: ApiRequest): Promise<CommonResponse> => {
  const url: string = apiRequest.url + getQueryStringFormat(apiRequest?.queryParams);

  let response: CommonResponse = {
    successOrNot: 'N',
    statusCode: 'UNKNOWN_ERROR',
    data: {},
  };

  switch (apiRequest.method) {
    case Method.GET:
      response = await getInstance(apiRequest.service).get(url);
      break;
    case Method.POST:
      response = await getInstance(apiRequest.service).post(url, apiRequest?.bodyParams);
      break;
    case Method.PUT:
      response = await getInstance(apiRequest.service).put(url, apiRequest?.bodyParams);
      break;
    case Method.DELETE:
      response = await getInstance(apiRequest.service).delete(url);
      break;
    case Method.PATCH:
      response = await getInstance(apiRequest.service).patch(url, apiRequest?.bodyParams);
      break;
    default:
      break;
  }
  return response;
};
