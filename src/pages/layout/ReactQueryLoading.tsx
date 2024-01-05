import { Backdrop, Box, CircularProgress } from '@mui/material';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';

const ReactQueryLoading = () => {
  const useIsLoading = () =>
    //useIsFetching이 prefetchQuery와 useQuery를 구분하지 못해 prefetch를 사용하는 쿼리는 공통화 불가
    useIsFetching(['x'], {
      predicate: (query) => query.state.status === 'loading', //fetching이 아닌 loading 상태만
    });
  const isLoading = useIsLoading();

  const isMutating = useIsMutating();
  return (
    <>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading > 0}>
        <CircularProgress color="inherit" /> X Loading...
      </Backdrop>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isMutating > 0}>
        <CircularProgress color="inherit" /> Mutating...
      </Backdrop>
    </>
  );
};
export default ReactQueryLoading;
