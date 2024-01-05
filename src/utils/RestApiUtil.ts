import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import useIsLoadingStore from 'store/LoadingStore';

axios.defaults.withCredentials = true; //Cookies 전달을 위해 설정
export interface RestApiRequest {
  url: string;
  method: Method;
  service: string; //Service;
  queryParams?: URLSearchParams;
  headers?: object;
  body?: object;
  responsType?: XMLHttpRequestResponseType;
}

export interface RestApiResponse<T = any> {
  successOrNot: string;
  statusCode: string;
  data?: T;
}
export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}
export enum Service {
  AQUA_BE = 'aqua-be',
  AQUA_ADMIN_BE = 'aqua-admin-be',
}
export enum ServicePort {
  AQUA_BE = 8080,
  AQUA_ADMIN_BE = 7071,
}

const getInstance = (request: RestApiRequest): AxiosInstance => {
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  useIsLoadingStore.getState().setIsLoading(true); //js이기 때문에 setIsLoading로 바로 사용불가

  let baseURL = '';
  switch (request.service) {
    case Service.AQUA_BE:
      if (process.env.REACT_APP_NODE_ENV === 'local') {
        baseURL = `${process.env.REACT_APP_API_BASE_URL}:${ServicePort.AQUA_BE}`;
      }
      break;
    case Service.AQUA_ADMIN_BE:
      baseURL = `${process.env.REACT_APP_API_BASE_URL}:${ServicePort.AQUA_ADMIN_BE}`;
      break;
    default:
      baseURL = `${request.service}${request.url}`;
      break;
  }

  // axios 인스턴스 생성
  // 메소드별 인스턴스 설정, request 설정이 없으면 default 값
  let config = {};
  switch (request.method) {
    case Method.GET:
    case Method.DELETE:
      config = {
        baseURL: baseURL,
        timeout: 3000,
        headers: request?.headers || {
          Accept: 'application/json',
        },
        params: request?.queryParams || {},
        responseType: request?.responsType || 'json',
      };
      break;
    case Method.POST:
    case Method.PATCH:
    case Method.PUT:
      config = {
        baseURL: baseURL,
        timeout: 3000,
        headers: request?.headers || {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        responseType: request?.responsType || 'json',
      };
      break;
  }
  const instance = axios.create(config);

  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (config?.headers) {
        //config.headers["x-api-key"] = process.env.REACT_APP_API_KEY || "";
        //config.headers["x-correlation-id"] = "";
        config.headers['x-redis-session-id'] = sessionStorage.getItem('x-redis-session-id');
        config.headers['x-language-code'] = sessionStorage.getItem('languageCode');
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
      useIsLoadingStore.getState().setIsLoading(false);
      //응답값이 file이라면, 나중에 util 분리
      if (response.data instanceof Blob) {
        const CommonBlobResponse: RestApiResponse<Blob> = {
          successOrNot: 'Y',
          statusCode: 'Success',
          data: new Blob([response?.data]),
        };

        return CommonBlobResponse;
      }

      const commonResponse: RestApiResponse = response.data as RestApiResponse;

      if (commonResponse.statusCode && commonResponse.statusCode === 'SESSION_EXPIRE') {
        sessionStorage.clear();
        // console.log('SESSION_EXPIRE');
        // window.location.assign('/login'); //컴포넌트가 아니면 router 라이브러리 사용이 불가하기 때문
      }
      return commonResponse;
    },

    async (error: any): Promise<any> => {
      useIsLoadingStore.getState().setIsLoading(false);
      if (error.response && error.response.status.toString() === '401') {
        // window.location.assign('/login');
        console.log('401 UNAUTHORIZED');
      }

      return Promise.reject(error); //이렇게 넘겨야 react query에서 에러를 잡을 수 있음
    }
  );

  return instance;
};

export interface QueryParams {
  [key: string]: string | number | boolean;
}

//미사용
const getQueryStringFormat = (queryParams?: QueryParams): string => {
  if (!queryParams) return '';
  const keys = Object.keys(queryParams);
  const queryString = keys
    .filter((key) => queryParams[key] !== null && queryParams[key] !== undefined)
    .map((key) => `${key}=${encodeURIComponent(queryParams[key] as string)}`) // eslint-disable-line
    .join('&');
  return queryString ? `?${queryString}` : '';
};

export const callRestApi = async (apiRequest: RestApiRequest): Promise<RestApiResponse> => {
  //const url: string = apiRequest.url + getQueryStringFormat(apiRequest?.queryParams);

  let response: RestApiResponse = {
    successOrNot: 'N',
    statusCode: 'UNKNOWN_ERROR',
    data: {},
  };

  switch (apiRequest.method) {
    case Method.GET:
      response = await getInstance(apiRequest).get(apiRequest.url);
      break;
    case Method.POST:
      response = await getInstance(apiRequest).post(apiRequest.url, apiRequest?.body || {});
      break;
    case Method.PUT:
      response = await getInstance(apiRequest).put(apiRequest.url, apiRequest?.body || {});
      break;
    case Method.DELETE:
      response = await getInstance(apiRequest).delete(apiRequest.url);
      break;
    case Method.PATCH:
      response = await getInstance(apiRequest).patch(apiRequest.url, apiRequest?.body || {});
      break;
    default:
      break;
  }
  return response;
};
