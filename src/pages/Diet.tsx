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
import React, { useState } from 'react';

import type { DateRange } from 'react-day-picker';
import { useSearchParams } from 'react-router-dom';

const Diet: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialDate: DateRange = {
    from: new Date(searchParams.get('dateFrom') ?? new Date()),
    to: new Date(searchParams.get('dateTo') ?? new Date()),
  };

  const [date, setDate] = useState<DateRange | undefined>(initialDate);

  const { dietPlan } = useDiets(initialDate.from!, initialDate.to!);

  function handleDateSelect(selected: DateRange | undefined): void {
    setDate(selected);

    if (!selected?.from || !selected?.to) return;

    setSearchParams({
      dateFrom: selected.from.toISOString(),
      dateTo: selected.to.toISOString(),
    });
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
