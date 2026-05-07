import { DatePicker } from '@/components/shared/DatePicker/DatePicker';
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardFooter,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useDiets } from '@/features/diet/useDiets';
import React from 'react';

import type { DateRange } from 'react-day-picker';

const Diet: React.FC = () => {
  const dateInterval: DateRange = {
    from: new Date('2026-05-03'),
    to: new Date(),
  };

  const { isLoading, dietPlan } = useDiets();

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
        className="w-full"
      >
        <CarouselContent>
          {Array.from([
            'Poniedziałek',
            'Wtorek',
            'Środa',
            'Czwartek',
            'Piątek',
            'Sobota',
            'Niedziela',
          ]).map((day, index) => (
            <CarouselItem key={index} className="basis-1/2 lg:basis-1/5">
              <div className="p-1">
                <Card>
                  <CardHeader className="flex aspect-square items-center justify-center p-6">
                    <span className="text-3xl font-semibold">{day}</span>
                  </CardHeader>
                  <Card>
                    <CardTitle className="flex aspect-square items-center justify-center p-6">
                      <span className="text-3xl font-semibold">Breakfast</span>
                    </CardTitle>
                    <CardContent>
                      <span className="text-2xl font-medium">Spaghetti</span>
                    </CardContent>
                    <CardFooter>
                      <span className="text-2xl font-medium">
                        kcal: 850, protein:46, carb:103, fat:28
                      </span>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardTitle className="flex aspect-square items-center justify-center p-6">
                      <span className="text-3xl font-semibold">Lunch</span>
                    </CardTitle>
                  </Card>
                  <Card>
                    <CardTitle className="flex aspect-square items-center justify-center p-6">
                      <span className="text-3xl font-semibold">Dinner</span>
                    </CardTitle>
                  </Card>
                  <Card>
                    <CardTitle className="flex aspect-square items-center justify-center p-6">
                      <span className="text-3xl font-semibold">Snack</span>
                    </CardTitle>
                  </Card>
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
