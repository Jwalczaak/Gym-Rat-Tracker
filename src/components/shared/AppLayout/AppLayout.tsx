import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { Button } from '@/components/ui/button';

const container =
  'max-width:120rem;margin:0; auto,display:flex; flex-direction:column; gap:3.2rem;';

const AppLayout: React.FC = () => {
  return (
    <div className="grid h-screen grid-cols-[26rem_1fr] grid-rows-[auto_1fr]">
      <Header />
      <Sidebar />
      <main className="overflow-auto bg-gray-50 p-[4rem_4.8rem_6.4rem]">
        <div className="mx-auto flex max-w-480 flex-col gap-[3.2rem]">
          app layout
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
