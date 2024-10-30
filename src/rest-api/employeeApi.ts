import { PaginationResponse } from '../models/Pagination';
import { callRestApi, RestApiResponse, Method, Service } from '../utils/RestApiUtil';

export const getEmployeesApi = async (): Promise<RestApiResponse<PaginationResponse<any>>> => {
  return callRestApi({
    service: Service.AQUA_BE,
    method: Method.GET,
    url: `/v1/http-session/scope`,
  });
};
