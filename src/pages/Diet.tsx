import { DatePicker } from '@/components/shared/DatePicker/DatePicker';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import React from 'react';
import type { DateRange } from 'react-day-picker';

const Diet: React.FC = () => {
  const dateInterval: DateRange = {
    from: new Date(),
    to: new Date(),
  };

  const [date, setDate] = React.useState<DateRange | undefined>(dateInterval);

  function handleDateSelect(selectedDate: DateRange | undefined) {
    console.log(selectedDate);
    setDate(selectedDate);
  }

  return (
    <>
      <DatePicker selectedDate={date} onSelect={handleDateSelect} />
      <Carousel
        opts={{
          align: 'start',
        }}
        className="w-full max-w-[12rem] sm:max-w-xs md:max-w-sm"
      >
        <CarouselContent>
          {Array.from({ length: 7 }).map((_, index) => (
            <CarouselItem key={index} className="basis-1/2 lg:basis-1/5">
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-3xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      ;
    </>
  );
};

export default Diet;
