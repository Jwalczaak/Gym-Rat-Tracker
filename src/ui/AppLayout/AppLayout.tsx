import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

const AppLayout: React.FC = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <main>
        <div>
          app layout
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
