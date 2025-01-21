import React, { PropsWithChildren } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const MainGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const user = localStorage.getItem('userSession');
  const location = useLocation();

  if (!user) {
    return <Navigate state={{ from: location }} to={`/en/login`} />;
  }
  return children || <Outlet />;
};

export default MainGuard;
