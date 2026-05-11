import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { IoIosArrowDropdown } from 'react-icons/io';

const ToggleCard = ({ children }: { children: React.ReactNode }) => {
  const [isToggled, setIsToggled] = React.useState(false);

  const toggle = () => setIsToggled((prev) => !prev);

  return (
    <Card className="p-4">
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${isToggled ? 'mb-3 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'} `}
      >
        <div className="min-h-0">{children}</div>
      </div>

      <div className="flex justify-start">
        <Button
          variant="outline"
          size="icon"
          className="cursor-pointer rounded-full"
          onClick={toggle}
        >
          <IoIosArrowDropdown
            className={`size-6 transition-transform duration-300 ${isToggled ? 'rotate-180' : 'rotate-0'} `}
          />
        </Button>
      </div>
    </Card>
  );
};

export default ToggleCard;
