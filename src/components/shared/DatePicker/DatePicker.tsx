'use client';

import { format } from 'date-fns';
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

export function DatePicker({
  onSelect,
  selectedDate,
  // rangeInDays: number,
}: {
  onSelect: (selectedDate: DateRange | undefined) => void;
  selectedDate: DateRange | undefined;
}) {
  return (
    <Card className="flex h-40 w-full flex-row items-center px-20">
      <Carousel
        opts={{
          align: 'start',
        }}
        className="w-full"
      >
        <CarouselContent className="h-full items-center">
          {Array.from({ length: 7 }).map((val, index) => (
            <CarouselItem key={index} className="basis-1/2 pl-4 lg:basis-1/3">
              <div className="flex h-full flex-col items-center justify-center">
                <span>{index}</span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
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
