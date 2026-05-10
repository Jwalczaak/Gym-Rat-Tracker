import { DatePicker } from '@/components/shared/DatePicker/DatePicker';
import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card';
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
import type { GroupedMeals, Meal } from './diet.types';
import { mapIntervalToWeekDays } from '@/utils/helper';
import { defaultMeals } from '@/utils/constants';
import MealCard from '@/features/diet/MealCard/MealCard';

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
      const meal: Meal = {
        name: item.name,
        weight: item.weight,
        kcal: item.kcal,
        protein: item.protein,
        carbs: item.carbs,
        fat: item.fat,
      };

      if (!acc[item.meal_type]) {
        acc[item.meal_type] = {
          meal_type: item.meal_type,
          meals: [meal],
        };
      } else {
        acc[item.meal_type] = {
          ...acc[item.meal_type],
          meals: [...acc[item.meal_type].meals, meal],
        };
      }

      return acc;
    }, {});

    const meals = Object.values(groupedByName);

    return {
      date: day.date,
      weekDay: day.dayName,
      meals: meals.length > 0 ? meals : defaultMeals,
    };
  });

  return (
    <>
      <DatePicker selectedDate={date} onSelect={handleDateSelect} />
      <Carousel
        opts={{
          align: 'start',
        }}
        className="w-full"
      >
        <CarouselContent className="mx-auto flex justify-center gap-4 lg:gap-6">
          {groupedPlanByName.map((plan, index) => (
            <CarouselItem key={index} className="basis-1/2 lg:basis-1/5">
              <div className="flex flex-col gap-4 p-1 lg:gap-6">
                <Card className="h-40">
                  <CardHeader className="flex items-center justify-center p-6">
                    <div className="flex flex-col items-center text-3xl font-semibold">
                      <span>({plan.date})</span>
                      <span>{plan.weekDay}</span>
                    </div>
                  </CardHeader>
                </Card>
                {plan.meals.map((meal) => (
                  <Card key={`${meal.meal_type}`}>
                    <CardTitle className="flex items-center justify-center p-6">
                      <span className="text-3xl font-semibold">
                        {meal.meal_type}
                      </span>
                    </CardTitle>
                    <CardContent>
                      {meal.meals.length > 0 ? (
                        meal.meals.map((m1, index) => (
                          <>
                            <MealCard />
                            <span
                              key={`${m1.name}-${index}`}
                              className="text-2xl font-medium"
                            >
                              {m1.name}
                            </span>
                            <span className="text-2xl font-medium">
                              kcal: {m1.kcal}, protein: {m1.protein}, carb:{' '}
                              {m1.carbs}, fat: {m1.fat}
                            </span>
                          </>
                        ))
                      ) : (
                        <span className="text-2xl font-medium">
                          not selected
                        </span>
                      )}
                    </CardContent>
                    {/* <CardFooter>
                      <span className="text-2xl font-medium">
                        kcal: {meal.kcal}, protein: {meal.protein}, carb:{' '}
                        {meal.carbs}, fat: {meal.fat}
                      </span>
                    </CardFooter> */}
                  </Card>
                ))}
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
