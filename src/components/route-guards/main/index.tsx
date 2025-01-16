import { useAuthContext } from '@/context/hooks/use-auth-context';
import { AUTH_PATHS } from '@/routes/messages/index.enum';
import React, { PropsWithChildren } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const MainGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to={AUTH_PATHS.LOGIN} />;
  }
  return children || <Outlet />;
};

export default MainGuard;
