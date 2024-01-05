import { Menu } from 'pages/MenuManagementPage';
import { callRestApi, RestApiResponse, Method, Service } from '../utils/RestApiUtil';

export const getManagementMenusApi = async (): Promise<RestApiResponse<Menu[]>> => {
  const response = await callRestApi({
    service: Service.AQUA_BE,
    method: Method.GET,
    url: `/v1/management/menu`,
  });
  return response;
};
