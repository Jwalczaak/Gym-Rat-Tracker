import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="flex h-25 items-center gap-5 border-b border-gray-200 px-5">
      <span className="text-gray-500">Gym Rat Tracker</span>
      <span className="text-gray-500">Diet</span>
    </div>
  );
};

export default Header;
