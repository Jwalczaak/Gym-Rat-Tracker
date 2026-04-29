import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

const container =
  'max-width:120rem;margin:0; auto,display:flex; flex-direction:column; gap:3.2rem;';

const AppLayout: React.FC = () => {
  return (
    <div className="grid grid-cols-[26rem_1fr] grid-rows-[auto_1fr] h-screen">
      <Header />
      <Sidebar />
      <main className="bg-gray-50 overflow-auto p-[4rem_4.8rem_6.4rem]">
        <div className="max-w-[120rem] mx-auto flex flex-col gap-[3.2rem]">
          app layout
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
