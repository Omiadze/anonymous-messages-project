import { MAIN_PATHS } from '@/routes/messages/index.enum';
import React, { PropsWithChildren } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const AuthGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const user = localStorage.getItem('userSession');
  const location = useLocation();

  if (user) {
    return <Navigate state={{ from: location }} to={MAIN_PATHS.HOME} />;
  }
  return children || <Outlet />;
};

export default AuthGuard;
