import { BbsPost } from '../models/Bbs';
import { MemberProfile } from '../models/Member';
import { callApi, RestApiResponse, Method, Service } from '../utils/RestApiUtil';

export const getBbsPosts = async (): Promise<RestApiResponse<BbsPost[]>> => {
  return callApi({
    service: 'https://jsonplaceholder.typicode.com',
    url: `/posts?_limit=10&_page=0`,
    method: Method.GET,
  });
};
