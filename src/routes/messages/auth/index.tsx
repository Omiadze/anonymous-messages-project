import AuthGuard from '@/components/route-guards/auth';
import Skeleton from '@/components/skeleton';
import { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { AUTH_PATHS } from '../index.enum';

const LazyRegister = lazy(() => import('@/pages/register/views/index'));
const LazyLogin = lazy(() => import('@/pages/login/views/index'));

export const AUTH_ROUTES = [
  <Route
    path={AUTH_PATHS.REGISTER}
    element={
      <Suspense fallback={<Skeleton />}>
        <AuthGuard>
          <LazyRegister />
        </AuthGuard>
      </Suspense>
    }
  />,
  <Route
    path={AUTH_PATHS.LOGIN}
    element={
      <Suspense fallback={<Skeleton />}>
        <AuthGuard>
          <LazyLogin />
        </AuthGuard>
      </Suspense>
    }
  />,
];
