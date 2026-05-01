import React from 'react';
import { HiOutlineHome } from 'react-icons/hi2';
import { MdOutlineFoodBank } from 'react-icons/md';
import { MdOutlineSportsBasketball } from 'react-icons/md';
import { IoSettingsOutline } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';

const navLinkClass =
  'flex items-center gap-[1.2rem] rounded-sm px-[2.4rem] py-[1.2rem] text-[1.6rem] font-medium transition-all duration-300 ' +
  'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-800 ' +
  'dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white ' +
  '[&>svg]:text-gray-400 hover:[&>svg]:text-violet-600 ' +
  'dark:[&>svg]:text-gray-500 dark:hover:[&>svg]:text-violet-400 ' +
  'aria-[current=page]:text-gray-800 aria-[current=page]:[&>svg]:text-violet-600 ' +
  'dark:aria-[current=page]:text-white dark:aria-[current=page]:[&>svg]:text-violet-400';

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
