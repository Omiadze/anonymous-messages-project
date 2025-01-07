import { Navigate, Route, Routes } from 'react-router-dom';
import { MESSAGES_ROUTES } from './messages';
import NotFoundPage from '@/pages/404';
import { Suspense } from 'react';
import Skeleton from '@/components/skeleton';
import Layout from '@/layout';

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/en" />} />
        <Route
          path=":lang"
          element={
            <Suspense fallback={<Skeleton />}>
              <Layout />
            </Suspense>
          }
        >
          {...MESSAGES_ROUTES}
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
