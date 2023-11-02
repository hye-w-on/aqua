import { useEffect, useState } from 'react';
import { BbsPost, BbsPostCondition } from '../models/Bbs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBbsPostApi } from '../rest-api/bbsApi';
import { useBbsPosts, usePrefetchBbsPosts } from '../react-query/hooks/bbsHook';
//style
import styled from '@emotion/styled';
import { Backdrop, CircularProgress } from '@mui/material';
import { ActionButton, ActionDeleteButton } from '../components/Button';
//icon
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

/* ReactQuery Prefetch 사용 예제 */

const BbsListPage = () => {
  const [selectedPageNo, setSelectedPageNo] = useState(1);

  const [pageSize, setPageSize] = useState<number>(10);
  const pagaNoListLength = 10;
  const [pageNoList, setPageNoList] = useState<number[]>([]);
  const [lastPageNo, setLastedageNo] = useState<number>(0);
  const [bbsPostCondition, setBbsPostCondition] = useState<BbsPostCondition>({});

  //console.log('compoenet loaded');

  const getRange = (start: number, length: number) => {
    return Array.from({ length }, (_, i) => start + i);
  };

  const {
    data: posts,
    isLoading,
    isError,
    isFetching,
    isFetched,
    isSuccess,
  } = useBbsPosts(selectedPageNo, bbsPostCondition);

  const deleteMutation = useMutation((postNo: string) => deleteBbsPostApi(postNo));

  const handlePageNoClick = (pageNo: number) => {
    setSelectedPageNo(pageNo);
  };

  useEffect(() => {
    //console.log('useEffect : set TotalCount');
    const totalCount = posts?.totalCount || 0;
    const lastPageNo = Math.ceil(totalCount / pageSize);
    setPageNoList(getRange(1, lastPageNo));
    setLastedageNo(lastPageNo);
  }, [posts?.totalCount]);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (lastPageNo > 0) {
      //console.log('useEffect prefetch');
      //최초에는 lastPageNo를 알 수 없으므로 최초 조회가 성공한 이후에 prefetch를 수행한다.
      usePrefetchBbsPosts(queryClient, selectedPageNo, lastPageNo, bbsPostCondition);
    }
  }, [selectedPageNo, lastPageNo]);

  return (
    <>
      {/* useIsFetching이 prefetchQuery와 useQuery를 구분하지 못해 spinner 공통화 불가 */}
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" /> Loading...
      </Backdrop>
      {/* 게시글 목록 */}
      {posts?.list &&
        posts.list.map((post: BbsPost) => {
          return (
            <Post key={post.postNo}>
              {post.title} <ActionDeleteButton onClick={() => deleteMutation.mutate(post.postNo)} />
            </Post>
          );
        })}
      {/* 페이지네이션 컴포넌트 */}
      <ActionButton
        id="previousPage"
        disabled={lastPageNo == 0 || selectedPageNo <= 1}
        onClick={() => {
          setSelectedPageNo((prePageNo) => prePageNo - 1);
        }}
      >
        <ArrowBackIosRoundedIcon fontSize="inherit" />
      </ActionButton>
      <PageNoList>
        {pageNoList &&
          pageNoList.map((pageNo) => (
            <span
              key={pageNo}
              className={pageNo == selectedPageNo ? 'selected' : ''}
              onClick={() => handlePageNoClick(pageNo)}
            >
              {pageNo}
            </span>
          ))}
      </PageNoList>
      <ActionButton
        id="nextPage"
        disabled={lastPageNo == 0 || selectedPageNo >= lastPageNo}
        onClick={() => {
          setSelectedPageNo((prePageNo) => prePageNo + 1);
        }}
      >
        <ArrowForwardIosRoundedIcon fontSize="inherit" />
      </ActionButton>
    </>
  );
};

export default BbsListPage;

const PageNoList = styled.div`
  display: inline-flex;
  margin: 4px;

  span {
    display: inline-flex;
    margin: 0 2px 0 2px;
    &.selected {
      font-weight: 800;
    }
  }
`;
const Post = styled.div`
  display: flex;
  align-items: center;
  //temp
  width: 200px;
  border: solid gray;
  border-width: 0px 1px 0px 0px;
`;
