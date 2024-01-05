import { Backdrop, Box, CircularProgress } from '@mui/material';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import useIsLoadingStore from 'store/LoadingStore';

export const CommonLoading = () => {
  const { isLoading } = useIsLoadingStore();
  return (
    <>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
        Loading...
      </Backdrop>
    </>
  );
};
export default CommonLoading;
