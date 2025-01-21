import { useAuthContext } from '@/context/hooks/use-auth-context';
import React, { PropsWithChildren } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const MainGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate state={{ from: location }} to={`/en/login`} />;
  }
  return children || <Outlet />;
};

export default MainGuard;
