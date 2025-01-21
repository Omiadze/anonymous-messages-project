import React, { PropsWithChildren } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const MainGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const userId = localStorage.getItem('userId');

  if (!userId) {
    return <Navigate to={'/en/login'} />;
  }
  return children || <Outlet />;
};

export default MainGuard;
