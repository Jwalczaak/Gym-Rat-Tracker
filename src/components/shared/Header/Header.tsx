import React from 'react';
import Avatar from '../Avatar/Avatar';

const Header: React.FC = () => {
  return (
    <div className="border-line flex h-25 items-center justify-between border-b px-10">
      <div className="flex gap-5">
        <span className="text-fg-muted">Gym Rat Tracker</span>
        <span className="text-fg-foreground">Diet</span>
      </div>
      <Avatar />
    </div>
  );
};

export default Header;
