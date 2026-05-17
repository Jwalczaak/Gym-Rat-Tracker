import React from 'react';
import Logo from '../Logo/Logo';
import MainNav from '../MainNav/MainNav';

const Sidebar: React.FC = () => {
  return (
    <aside className="row-span-full flex flex-col gap-[2.2rem] border-r border-line bg-surface p-[3.2rem_2.4rem]">
      <Logo />
      <MainNav />
    </aside>
  );
};

export default Sidebar;
