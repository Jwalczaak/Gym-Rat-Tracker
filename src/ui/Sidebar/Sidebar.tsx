import React from 'react';
import Logo from '../Logo/Logo';
import MainNav from '../MainNav/MainNav';
import { Button } from '@/ui/Button/button';

const Sidebar: React.FC = () => {
  return (
    <aside className="row-span-full flex flex-col gap-[3.2rem] border-r border-(--color-grey-100) bg-(--color-grey-0) p-[3.2rem_2.4rem]">
      <div className="flex flex-wrap items-center gap-2 md:flex-row">
        <Button variant="outline">Button</Button>
      </div>
      <Logo />
      <MainNav />
    </aside>
  );
};

export default Sidebar;
