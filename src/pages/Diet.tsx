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
import { dayliMeals } from '@/utils/constants';

import { eachDayOfInterval, format } from 'date-fns';
import React, { useState } from 'react';

import type { DateRange } from 'react-day-picker';
import { data, useSearchParams } from 'react-router-dom';

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

  type Meal = {
    name: string;
    type: string;
  };

  type GroupedItem = {
    date: string;
    weekDay: string;
    dailyMeals: Meal[];
  };

  type GroupedPlan = Record<string, GroupedItem>;

  const groupedPlanByWeekDay = Object.values(
    dietPlan.reduce<GroupedPlan>((acc, { log_date, meal_type, name }) => {
      if (!acc[log_date]) {
        acc[log_date] = {
          date: log_date,
          weekDay: format(log_date, 'EEEE'),
          dailyMeals: [],
        };
      }
      acc[log_date].dailyMeals.push({ name: name, type: meal_type });

      return acc;
    }, {}),
  ).filter((group) => group.dailyMeals.length > 1);

  console.log(groupedPlanByWeekDay);

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
          {groupedPlanByWeekDay.map((plan, index) => (
            <CarouselItem key={index} className="basis-1/2 lg:basis-1/5">
              <div className="p-1">
                <Card>
                  <CardHeader className="flex aspect-square items-center justify-center p-6">
                    <span className="flex flex-col items-center text-3xl font-semibold">
                      <span>({plan.date})</span>
                      <span>{plan.weekDay}</span>
                    </span>
                  </CardHeader>
                  {plan.dailyMeals.map((meal) => (
                    <Card key={meal.name}>
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
