import { lazy, Suspense } from 'react';
import { MAIN_PATHS } from '../index.enum';

import { Route } from 'react-router-dom';
import Skeleton from '@/components/skeleton';

const LazyHomePage = lazy(() => import('@/pages/home/views'));
const LazyCreateMessages = lazy(() => import('@/pages/create-message/views'));

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
        <LazyCreateMessages />
      </Suspense>
    }
  />,
];
