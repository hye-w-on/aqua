import { QueryClient, useQuery } from '@tanstack/react-query';
import { getBbsPostsApi } from '../../rest-api/bbsApi';
import { queryKeys } from '../queryKeys';
import { BbsPost, BbsPostCondition } from '../../models/Bbs';
import { PaginationResponse } from '../../models/Pagination';

//Fetch
export const fetchBbsPosts = async (pageNo: number, condition: BbsPostCondition) => {
  //console.log('fetchBbsPosts:' + pageNo);

  const pageSize = condition.pageSize ? Number(condition.pageSize) : 10;
  const bbsPostCondition: BbsPostCondition = {
    ...condition,
    pageSize: String(pageSize),
    start: String(pageSize * (pageNo - 1)),
  };

  const response = await getBbsPostsApi(bbsPostCondition);
  return response.data;
};
// Fetch Hook
export const useBbsPosts = (selectedPageNo: number, condition: BbsPostCondition) => {
  return useQuery([queryKeys.posts, selectedPageNo], () => {
    //console.log('Call useBbsPosts(useQuery)');
    return fetchBbsPosts(selectedPageNo, condition);
  });
};

// Prefetch
export const usePrefetchBbsPosts = (
  queryClient: QueryClient,
  selectedPageNo: number,
  lastPageNo: number,
  condition: BbsPostCondition
) => {
  //console.log('Call usePrefetchBbsPosts:' + ' selectedPageNo:' + selectedPageNo + ' lastPageNo:' + lastPageNo);

  if (selectedPageNo < lastPageNo) {
    const nextPage = selectedPageNo + 1;
    queryClient.prefetchQuery([queryKeys.posts, nextPage], () => {
      //console.log('nextPage');
      return fetchBbsPosts(nextPage, condition);
    });
  }
  if (selectedPageNo > 1) {
    const prePage = selectedPageNo - 1;
    queryClient.prefetchQuery([queryKeys.posts, prePage], () => {
      //console.log('prePage');
      return fetchBbsPosts(prePage, condition);
    });
  }
};
