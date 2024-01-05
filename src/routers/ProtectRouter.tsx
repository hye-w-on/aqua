import { Outlet, useLocation } from 'react-router-dom';
import ForbiddenPage from '../pages/common/ForbiddenPage';

function ProtectRouter() {
  const adminPath = 'admin'; //TODO : 역할로 변경
  const { pathname } = useLocation();
  const isAccess = pathname.includes(adminPath);

  if (isAccess) {
    return <Outlet />;
  } else {
    return <ForbiddenPage />;
  }
}

export default ProtectRouter;
