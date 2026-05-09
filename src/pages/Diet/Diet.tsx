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
import type { GroupedMeals } from './diet.types';
import { mapIntervalToWeekDays } from '@/utils/helper';

const Diet: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialDate: DateRange = {
    from: new Date(searchParams.get('dateFrom') ?? new Date()),
    to: new Date(searchParams.get('dateTo') ?? new Date()),
  };

  const [date, setDate] = useState<DateRange | undefined>(initialDate);

  const { dietPlan = [] } = useDiets(initialDate.from!, initialDate.to!) || [];

  function handleDateSelect(selected: DateRange | undefined): void {
    setDate(selected);

    if (!selected?.from || !selected?.to) return;

    setSearchParams({
      dateFrom: selected.from.toISOString(),
      dateTo: selected.to.toISOString(),
    });
  }

  const days =
    date && date.from && date.to
      ? mapIntervalToWeekDays(date!.from!, date!.to!)
      : [];

  const groupedPlanByName = days.map((day) => {
    const dayMeals = dietPlan.filter((item) => item.log_date === day.date);

    const groupedByName = dayMeals.reduce<GroupedMeals>((acc, item) => {
      if (!acc[item.name]) {
        acc[item.name] = {
          name: item.name,
          type: item.meal_type,
        };
      }

      return acc;
    }, {});

    const meals = Object.values(groupedByName);

    const defaultMeals = [
      { name: 'not selected', type: 'breakfast' },
      { name: 'not selected', type: 'lunch' },
      { name: 'not selected', type: 'dinner' },
      { name: 'not selected', type: 'snack' },
    ];

    return {
      date: day.date,
      weekDay: day.dayName,
      meals: meals.length > 0 ? meals : defaultMeals,
    };
  });

  console.log(groupedPlanByName);

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
          {groupedPlanByName.map((plan, index) => (
            <CarouselItem key={index} className="basis-1/2 lg:basis-1/5">
              <div className="p-1">
                <Card>
                  <CardHeader className="flex aspect-square items-center justify-center p-6">
                    <span className="flex flex-col items-center text-3xl font-semibold">
                      <span>({plan.date})</span>
                      <span>{plan.weekDay}</span>
                    </span>
                  </CardHeader>
                  {plan.meals.map((meal) => (
                    <Card key={`${meal.name}-${meal.type}-${index}`}>
                      <CardTitle className="flex aspect-square items-center justify-center p-6">
                        <span className="text-3xl font-semibold">
                          {meal.type}
                        </span>
                      </CardTitle>
                      <CardContent>
                        <span className="text-2xl font-medium">
                          {meal.name}
                        </span>
                      </CardContent>
                      <CardFooter>
                        <span className="text-2xl font-medium">
                          kcal: 850, protein:46, carb:103, fat:28
                        </span>
                      </CardFooter>
                    </Card>
                  ))}
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
