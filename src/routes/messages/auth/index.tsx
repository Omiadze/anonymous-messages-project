import Skeleton from '@/components/skeleton';
import { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';

const LazyRegister = lazy(() => import('@/pages/register'));
const LazyLogin = lazy(() => import('@/pages/login'));
export const AUTH_ROUTES = [
  <Route
    path="register"
    element={
      <Suspense fallback={<Skeleton />}>
        <LazyRegister />
      </Suspense>
    }
  />,
  <Route
    path="login"
    element={
      <Suspense fallback={<Skeleton />}>
        <LazyLogin />
      </Suspense>
    }
  />,
];
