import { Route, Routes } from 'react-router-dom';
import Main from '../pages/Main';
import SocialRedirectHandler from '../pages/SocialRedirectHandler';
import SignUp from '../pages/signUp';
import ReservationPage from '../pages/ReservationPage';
import EmployeeLogin from '../pages/EmployeeLogin';
import SocialLogin from '../pages/SocialLogin';
import FeedPage from '../pages/FeedPage';
import MenuManagementPage from '../pages/MenuManagementPage';
import BbsListPage from '../pages/BbsListPage';
import useEmployeeSessionStore from 'store/EmployeeSessionStore';
import ProtectRouter from './ProtectRouter';

function Router() {
  const { employeeId } = useEmployeeSessionStore();
  const env = process.env.REACT_APP_NODE_ENV;
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login/social" element={<SocialLogin />} />
      <Route path="/login/employee" element={<EmployeeLogin />} />
      <Route path="/oauth/:socialPlatform" element={<SocialRedirectHandler />} />
      {/* service */}
      <Route path="/bbs" element={<BbsListPage />} />
      <Route path="/reservation" element={<ReservationPage />} />
      <Route path="/feed" element={<FeedPage />} />
      {/* admin */}
      {employeeId && (
        <>
          <Route element={<ProtectRouter />}>
            <Route path="/admin/menu-management" element={<MenuManagementPage />} />
          </Route>
        </>
      )}
      {/* test */}
      {env === 'local' || env === 'dev' ? <Route path="/test" element={<EmployeeLogin />} /> : null}
    </Routes>
  );
}

export default Router;
