import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

const AppLayout: React.FC = () => {
  return (
    <div className="grid h-screen grid-cols-[26rem_1fr] grid-rows-[auto_1fr]">
      <Header />
      <Sidebar />
      <main className="overflow-auto bg-surface-subtle p-[4rem_4.8rem_6.4rem]">
        <div className="mx-auto flex flex-col gap-[3.2rem]">
          app layout
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
