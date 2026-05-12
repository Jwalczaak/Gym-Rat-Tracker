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
import type { GroupedMeals, Meal } from '../../types/meal';
import { countChartMacroData, mapIntervalToWeekDays } from '@/utils/helper';
import { defaultMeals } from '@/utils/constants';
import MealCard from '@/features/diet/MealCard/MealCard';
import ToggleCard from '@/components/shared/ToggleContent/ToggleContent';
import Chart from '@/components/shared/ Chart/Chart';

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
          mealKcal: item.kcal,
          mealProtein: item.protein,
          mealCarbs: item.carbs,
          mealFat: item.fat,
          meals: [meal],
        };
      } else {
        acc[item.meal_type] = {
          ...acc[item.meal_type],
          mealKcal: acc[item.meal_type].mealKcal + item.kcal,
          mealProtein: acc[item.meal_type].mealProtein + item.protein,
          mealCarbs: acc[item.meal_type].mealCarbs + item.carbs,
          mealFat: acc[item.meal_type].mealFat + item.fat,
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
                  <>
                    <Card>
                      <CardTitle className="flex items-center justify-center p-6">
                        <span className="text-3xl font-semibold">
                          {meal.meal_type}
                        </span>
                      </CardTitle>
                      {/* To do check if meal.meals is empty and show not
                      selected, otherwise show meals with toggle */}
                      <ToggleCard key={`${meal.meal_type}`}>
                        <CardContent className="flex w-full flex-col gap-6">
                          {meal.meals.length > 0 ? (
                            meal.meals.map((m1, index) => (
                              <>
                                <MealCard
                                  key={index}
                                  meal={m1}
                                  onEdit={(meal) => console.log('Edit:', meal)}
                                  onDelete={(id) => console.log('Delete:', id)}
                                />
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
                      </ToggleCard>

                      <div className="flex w-full gap-12 px-6">
                        <div className="chart-container flex items-center gap-2 font-thin">
                          <Chart
                            type="donut"
                            width={20}
                            height={30}
                            data={
                              countChartMacroData({
                                protein: meal.mealProtein,
                                fat: meal.mealFat,
                                carbs: meal.mealCarbs,
                                kcal: meal.mealKcal,
                              }).proteinData
                            }
                          />
                          <span className="text-sm font-normal">
                            {meal.mealProtein}g
                          </span>
                        </div>
                        <div className="chart-container flex items-center gap-2 font-thin">
                          <Chart
                            type="donut"
                            width={20}
                            height={30}
                            data={
                              countChartMacroData({
                                protein: meal.mealProtein,
                                fat: meal.mealFat,
                                carbs: meal.mealCarbs,
                                kcal: meal.mealKcal,
                              }).fatData
                            }
                          />
                          <span className="text-sm font-normal">
                            {' '}
                            {meal.mealFat}g
                          </span>
                        </div>{' '}
                        <div className="chart-container flex items-center gap-2 font-thin">
                          <Chart
                            type="donut"
                            width={20}
                            height={30}
                            data={
                              countChartMacroData({
                                protein: meal.mealProtein,
                                fat: meal.mealFat,
                                carbs: meal.mealCarbs,
                                kcal: meal.mealKcal,
                              }).carbsData
                            }
                          />
                          <span className="text-sm font-normal">
                            {meal.mealCarbs}g
                          </span>
                        </div>
                      </div>
                    </Card>
                  </>
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
