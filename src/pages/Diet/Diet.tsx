import { DatePicker } from '@/components/shared/DatePicker/DatePicker';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { useDiets } from '@/features/Diet/useDiets';
import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { GroupedMeals, Meal } from '../../types/meal';
import { countChartMacroData } from '@/utils/helper';
import MealCard from '@/features/Diet/MealCard/MealCard';
import ToggleCard from '@/components/shared/ToggleContent/ToggleContent';
import Chart from '@/components/shared/ Chart/Chart';
import DayKcalSummary from '@/features/Diet/DayKcalSummary/DayKcalSummary';
import { format } from 'date-fns';

const ChartMemoized = React.memo(Chart);

const Diet: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const param = searchParams.get('day');
  const initialDate: string = param ?? format(new Date(), 'yyyy-MM-dd');

  const [selectedDay, setSelectedDay] = useState<string>(initialDate);

  const { dietPlan = [] } = useDiets(selectedDay);

  function handleDateSelect(day: string): void {
    console.log('Selected day:', day);
    setSelectedDay(day);

    setSearchParams({
      day,
    });
  }

  const groupedPlanByName = useMemo(() => {
    if (!selectedDay) return [];

    const groupedByName = dietPlan.reduce<GroupedMeals>((acc, item) => {
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
        acc[item.meal_type].mealKcal += item.kcal;
        acc[item.meal_type].mealProtein += item.protein;
        acc[item.meal_type].mealCarbs += item.carbs;
        acc[item.meal_type].mealFat += item.fat;
        acc[item.meal_type].meals.push(meal);
      }

      return acc;
    }, {} as GroupedMeals);

    return Object.values(groupedByName);
  }, [dietPlan, selectedDay]);

  return (
    <>
      <div className="flex flex-col gap-3 px-20">
        <h1>Diet</h1>
        <span className="text-muted-foreground text-sm">
          {format(new Date(selectedDay), 'EEEE, MMMM d, yyyy')}
        </span>
        <DatePicker
          rangeInDays={3}
          selectedDay={selectedDay}
          onSelectDay={handleDateSelect}
        />
        <DayKcalSummary />
      </div>

      <div className="grid grid-cols-2 gap-4 px-20">
        {groupedPlanByName.map((plan) => {
          const macroData = countChartMacroData({
            protein: plan.mealProtein,
            fat: plan.mealFat,
            carbs: plan.mealCarbs,
            kcal: plan.mealKcal,
          });

          return (
            <Card key={plan.meal_type}>
              <CardTitle className="flex items-center justify-center p-6">
                <span className="text-3xl font-semibold">{plan.meal_type}</span>
              </CardTitle>

              <ToggleCard>
                <CardContent className="flex w-full flex-col gap-6">
                  {plan.meals.length > 0 ? (
                    plan.meals.map((m1, index) => (
                      <MealCard
                        key={index}
                        meal={m1}
                        onEdit={(meal) => console.log('Edit:', meal)}
                        onDelete={(id) => console.log('Delete:', id)}
                      />
                    ))
                  ) : (
                    <span className="text-2xl font-medium">not selected</span>
                  )}
                </CardContent>
              </ToggleCard>

              {plan.mealProtein &&
                plan.mealFat &&
                plan.mealCarbs &&
                plan.mealKcal && (
                  <div className="flex w-full gap-12 px-6">
                    <div className="chart-container flex items-center gap-2 font-thin">
                      <ChartMemoized
                        type="donut"
                        width={20}
                        height={30}
                        data={macroData.proteinData}
                      />
                      <span className="text-sm font-normal">
                        {plan.mealProtein}g
                      </span>
                    </div>

                    <div className="chart-container flex items-center gap-2 font-thin">
                      <ChartMemoized
                        type="donut"
                        width={20}
                        height={30}
                        data={macroData.fatData}
                      />
                      <span className="text-sm font-normal">
                        {plan.mealFat}g
                      </span>
                    </div>

                    <div className="chart-container flex items-center gap-2 font-thin">
                      <ChartMemoized
                        type="donut"
                        width={20}
                        height={30}
                        data={macroData.carbsData}
                      />
                      <span className="text-sm font-normal">
                        {plan.mealCarbs}g
                      </span>
                    </div>
                  </div>
                )}
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default Diet;
