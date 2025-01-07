import MainSection from '@/main-section';
import Header from './header';

import { Outlet } from 'react-router-dom';
import Footer from './footer';

const Layout = () => {
  return (
    <>
      <Header />
      <MainSection>
        <Outlet />
      </MainSection>
      <Footer />
    </>
  );
};

export default Layout;
