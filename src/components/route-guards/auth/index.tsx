import { useAuthContext } from '@/context/hooks/use-auth-context';
import { MAIN_PATHS } from '@/routes/messages/index.enum';
import React, { PropsWithChildren } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AuthGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAuthContext();

  if (user) {
    return <Navigate to={MAIN_PATHS.HOME} />;
  }
  return children || <Outlet />;
};

export default AuthGuard;
