'use client';

import { addDays, format, subDays } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { type DateRange } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Field, FieldLabel } from '@/components/ui/field';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { mapIntervalToWeekDays } from '@/utils/helper';
import { useState } from 'react';

export function DatePicker({
  onSelect,
  selectedDate,
  rangeInDays = 7,
}: {
  onSelect: (selectedDate: DateRange | undefined) => void;
  selectedDate: DateRange | undefined;
  rangeInDays: number;
}) {
  const currentDate = new Date();

  const [centerInterval, setCenterInterval] = useState<Date>(currentDate);

  const startInterval = subDays(centerInterval, rangeInDays);
  const endInterval = addDays(centerInterval, rangeInDays);

  const mappedWeekDays = mapIntervalToWeekDays(
    startInterval,
    endInterval,
    currentDate,
  );

  function onPreviousClick() {
    setCenterInterval(subDays(centerInterval, rangeInDays));
  }

  function onNextClick() {
    setCenterInterval(addDays(centerInterval, rangeInDays));
  }

  console.log('mapped', mappedWeekDays);
  return (
    <Card className="flex h-40 w-full flex-row items-center px-20">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="h-full items-center">
          {mappedWeekDays.map((day, index) => (
            <CarouselItem key={index} className="basis-1/2 pl-4 lg:basis-1/7">
              <div className="flex h-full flex-col items-center justify-center">
                <span>{day.dayName}</span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious onClick={onPreviousClick} disabled={false} />
        <CarouselNext onClick={onNextClick} disabled={false} />
      </Carousel>
    </Card>
    // <Field className="mx-auto w-60">
    //   <Popover>
    //     <PopoverTrigger asChild>
    //       <Button
    //         variant="outline"
    //         id="date-picker-range"
    //         className="justify-start px-2.5 font-normal"
    //       >
    //         <CalendarIcon />
    //         {selectedDate?.from ? (
    //           selectedDate.to ? (
    //             <>
    //               {format(selectedDate.from, 'LLL dd, y')} -{' '}
    //               {format(selectedDate.to, 'LLL dd, y')}
    //             </>
    //           ) : (
    //             format(selectedDate.from, 'LLL dd, y')
    //           )
    //         ) : (
    //           <span>Pick a date</span>
    //         )}
    //       </Button>
    //     </PopoverTrigger>
    //     <PopoverContent className="w-auto p-0" align="start">
    //       <Calendar
    //         mode="range"
    //         defaultMonth={selectedDate?.from}
    //         selected={selectedDate}
    //         onSelect={onSelect}
    //         numberOfMonths={2}
    //       />
    //     </PopoverContent>
    //   </Popover>
    // </Field>
  );
}
