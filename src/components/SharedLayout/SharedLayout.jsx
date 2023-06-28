import { Outlet } from 'react-router-dom';
import { Suspense } from "react";

import NavBar from '../NavBar';
import Nav from './SharedLayout.styled';
import Loader from 'components/Loader';

const SharedLayout = () => {
  return (
    <Nav>
      <NavBar />
      <Suspense fallback={<Loader/>}>
      <Outlet />
      </Suspense>
    </Nav>
  );
};

export default SharedLayout;
