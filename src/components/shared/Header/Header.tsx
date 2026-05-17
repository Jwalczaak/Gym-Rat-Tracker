import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="border-line flex h-25 items-center gap-5 border-b px-5">
      <span className="text-fg-muted">Gym Rat Tracker</span>
      <span className="text-fg-foreground">Diet</span>
    </div>
  );
};

export default Header;
