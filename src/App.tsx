import React, { useEffect, useReducer } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './react-query/queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { getSessionStorageInfo } from 'utils/sessionStorageUtil';
import useEmployeeSessionStore from 'store/EmployeeSessionStore';

import sessionApi from 'rest-api/session';

//Pages
import ReactQueryLoading from './pages/layout/ReactQueryLoading';
import CommonSnackbar from './pages/layout/CommonSnackbar';
import Router from './routers/Router';
import HeaderBar from './pages/layout/HeaderBar';
import HorizonMenu from './pages/layout/HorizonMenu';
//style
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { colorTheme } from './components/Color';
import CommonLoading from 'pages/layout/CommonLoading';
function App() {
  const { employeeId, setEmployeeSession } = useEmployeeSessionStore();

  useEffect(() => {
    if (!employeeId) {
      (async () => {
        //cookie로 조회
        const response = await sessionApi.getEmployeeSession();
        if (response.successOrNot === 'Y' && response?.data) {
          const session = response.data;
          setEmployeeSession(session);
          console.log('auto login success');
        } else {
          console.log('auto login fail');
          //navigate('/login', { replace: true });
        }
      })();

      //        const sessionStorageInfo = getSessionStorageInfo();
      //        const { successOrNot, data } = await sessionApi.autoLogin(idToken);
      //        router.reload(window.location.pathname);
    }
  }, []);
  return (
    <>
      <ThemeProvider theme={colorTheme}>
        <QueryClientProvider client={queryClient}>
          <HeaderBar />
          <HorizonMenu />
          <ReactQueryLoading />
          <CommonLoading />
          <Router />
          <CommonSnackbar />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
