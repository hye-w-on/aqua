import React, { useReducer } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './react-query/queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

//Pages
import Loading from './pages/layout/Loading';
import CommonAlert from './pages/layout/CommonAlert';
import Router from './routers/Router';
import HeaderBar from './pages/layout/HeaderBar';
import HorizonMenu from './pages/layout/HorizonMenu';
//style
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { colorTheme } from './components/Color';

function App() {
  return (
    <>
      <ThemeProvider theme={colorTheme}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <HeaderBar />
            <HorizonMenu />
            <Loading />
            <Router />
            <CommonAlert />
            <ReactQueryDevtools />
          </BrowserRouter>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
