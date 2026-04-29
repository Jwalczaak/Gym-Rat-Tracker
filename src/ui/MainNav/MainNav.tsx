import React from 'react';
import { HiOutlineHome } from 'react-icons/hi2';
import { NavLink } from 'react-router-dom';
import styles from './MainNav.module.css';

const MainNav: React.FC = () => {
  return (
    <nav>
      <ul className="flex flex-col gap-[0.8rem]">
        <li>
          <NavLink className={styles.navLink} to="/">
            <HiOutlineHome />
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink className={styles.navLink} to="/training">
            <HiOutlineHome />
            <span>Training</span>
          </NavLink>
        </li>
        <li>
          <NavLink className={styles.navLink} to="/diet">
            <HiOutlineHome />
            <span>Diet</span>
          </NavLink>
        </li>
        <li>
          <NavLink className={styles.navLink} to="/settings">
            <HiOutlineHome />
            <span>Settings</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default MainNav;
