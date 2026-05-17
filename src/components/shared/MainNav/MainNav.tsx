import React from 'react';
import { HiOutlineHome } from 'react-icons/hi2';
import { MdOutlineFoodBank } from 'react-icons/md';
import { MdOutlineSportsBasketball } from 'react-icons/md';
import { IoSettingsOutline } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';

const navLinkClass =
  'flex items-center gap-[1.2rem] rounded-sm px-[2.4rem] py-[1.2rem] text-[1.6rem] font-medium transition-all duration-300 ' +
  'bg-surface-subtle text-fg-muted hover:bg-surface hover:text-fg ' +
  '[&>svg]:text-fg-subtle hover:[&>svg]:text-brand ' +
  'aria-[current=page]:text-fg aria-[current=page]:[&>svg]:text-brand';

const MainNav: React.FC = () => {
  return (
    <nav>
      <ul className="flex flex-col gap-[0.8rem]">
        <li>
          <NavLink className={navLinkClass} to="/">
            <HiOutlineHome className="h-8 w-8" />
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink className={navLinkClass} to="/training">
            <MdOutlineSportsBasketball className="h-8 w-8" />
            <span>Training</span>
          </NavLink>
        </li>
        <li>
          <NavLink className={navLinkClass} to="/diet">
            <MdOutlineFoodBank className="h-8 w-8" />
            <span>Diet</span>
          </NavLink>
        </li>
        <li>
          <NavLink className={navLinkClass} to="/settings">
            <IoSettingsOutline className="h-8 w-8" />
            <span>Settings</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default MainNav;
