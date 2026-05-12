import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { IoIosArrowDropdown } from 'react-icons/io';

const ToggleCard = ({ children }: { children: React.ReactNode }) => {
  const [isToggled, setIsToggled] = React.useState(false);

  const toggle = () => setIsToggled((prev) => !prev);

  return (
    <Card className="items-between flex w-full flex-row items-end gap-x-0 p-6">
      {/* Toggle button */}
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="icon"
          className="cursor-pointer rounded-full"
          onClick={toggle}
        >
          <IoIosArrowDropdown
            className={`size-6 transition-transform duration-300 ${
              isToggled ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </Button>
      </div>

      {/* Animated content */}
      <div
        className="grid w-full transition-all duration-300 ease-in-out"
        style={{
          gridTemplateRows: isToggled ? '1fr' : '0fr',
          opacity: isToggled ? 1 : 0,
        }}
      >
        <div className="min-h-0 overflow-hidden">{children}</div>
      </div>
    </Card>
  );
};

export default ToggleCard;
