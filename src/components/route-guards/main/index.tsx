import React, { PropsWithChildren } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const MainGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const user = localStorage.getItem('userSession');

  if (!user) {
    return <Navigate state={{ from: location }} to={`/en/login`} />;
  }
  return children || <Outlet />;
};

export default MainGuard;
