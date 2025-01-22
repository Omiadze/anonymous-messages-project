import { AUTH_PATHS } from '@/routes/messages/index.enum';
import React, { PropsWithChildren } from 'react';
import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';

const MainGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const user = localStorage.getItem('userSession');
  const location = useLocation();
  const { lang } = useParams();

  if (!user) {
    return (
      <Navigate
        state={{ from: location }}
        to={`/${lang}/${AUTH_PATHS.LOGIN}`}
      />
    );
  }
  return children || <Outlet />;
};

export default MainGuard;
