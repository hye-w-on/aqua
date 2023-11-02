import { Route, Routes } from 'react-router-dom';
import Main from '../pages/Main';
import SocialRedirectHandler from '../pages/social';
import SignUp from '../pages/signUp';
import ReservationPage from '../pages/ReservationPage';
import EmployeeLogin from '../pages/EmployeeLogin';
import SocialLogin from '../pages/SocialLogin';
import FeedPage from '../pages/FeedPage';
import MenuManagementPage from '../pages/MenuManagementPage';
import BbsListPage from '../pages/BbsListPage';

function Router() {
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
      <Route path="/menu-management" element={<MenuManagementPage />} />
    </Routes>
  );
}

export default Router;
