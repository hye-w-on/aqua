import { BbsPost, BbsPostCondition } from '../models/Bbs';
import { PaginationResponse } from '../models/Pagination';
import { callRestApi, RestApiResponse, Method, Service } from '../utils/RestApiUtil';

export const getBbsPostsApi = async (
  bbsPostCondition?: BbsPostCondition
): Promise<RestApiResponse<PaginationResponse<BbsPost[]>>> => {
  return callRestApi({
    service: Service.AQUA_BE,
    method: Method.GET,
    url: `/v1/bbs/posts`,
    queryParams: new URLSearchParams({ ...bbsPostCondition }),
  });
};

export const deleteBbsPostApi = async (postNo: string): Promise<RestApiResponse<number>> => {
  return callRestApi({
    service: Service.AQUA_BE,
    method: Method.PATCH,
    url: `/v1/bbs/post/${postNo}`,
  });
};
