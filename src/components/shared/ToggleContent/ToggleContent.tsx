import React from 'react';

const ToggleContent = ({
  children,
  isToggled,
}: {
  children: React.ReactNode;
  isToggled: boolean;
}) => {
  return (
    <div className="items-between flex w-full flex-row items-end gap-x-0 p-6">
      <div
        className="grid w-full transition-all duration-300 ease-in-out"
        style={{
          gridTemplateRows: isToggled ? '1fr' : '0fr',
          opacity: isToggled ? 1 : 0,
        }}
      >
        <div className="min-h-0 overflow-hidden">{children}</div>
      </div>
    </div>
  );
};

export default ToggleContent;
