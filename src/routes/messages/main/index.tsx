import { lazy, Suspense } from 'react';
import { MAIN_PATHS } from '../index.enum';

import { Route } from 'react-router-dom';
import Skeleton from '@/components/skeleton';
import MainGuard from '@/components/route-guards/main';

const LazyHomePage = lazy(() => import('@/pages/home/views'));
const LazyCreateMessages = lazy(
  () => import('@/pages/create-message/views/index')
);
const LazyProfilePage = lazy(() => import('@/pages/profile/views/index'));

export const MAIN_ROUTES = [
  <Route
    index
    element={
      <Suspense fallback={<Skeleton />}>
        <LazyHomePage />
      </Suspense>
    }
  />,
  <Route
    path={MAIN_PATHS.MESSAGES_CREATE}
    element={
      <Suspense fallback={<Skeleton />}>
        <MainGuard>
          <LazyCreateMessages />
        </MainGuard>
      </Suspense>
    }
  />,
  <Route
    path={MAIN_PATHS.PROFILE}
    element={
      <Suspense fallback={<Skeleton />}>
        <MainGuard>
          <LazyProfilePage />
        </MainGuard>
      </Suspense>
    }
  />,
];
