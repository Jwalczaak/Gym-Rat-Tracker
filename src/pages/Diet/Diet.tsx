import { DatePicker } from '@/components/shared/DatePicker/DatePicker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDiets } from '@/features/Diet/useDiets';
import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { GroupedMeals, Meal } from '../../types/meal';
import { countChartMacroData } from '@/utils/helper';
import MealCard from '@/features/Diet/MealCard/MealCard';
import ToggleCard from '@/components/shared/ToggleContent/ToggleContent';
import Chart from '@/components/shared/ Chart/Chart';
import DayKcalSummary from '@/features/Diet/DayKcalSummary/DayKcalSummary';
import { format, parse } from 'date-fns';
import { Button } from '@/components/ui/button';
import { IoIosArrowDown } from 'react-icons/io';
import AddMeal from '@/features/Diet/AddMeal/AddMeal';

const ChartMemoized = React.memo(Chart);

const Diet: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const param = searchParams.get('day');
  const initialDate: string = param ?? format(new Date(), 'yyyy-MM-dd');

  const [selectedDay, setSelectedDay] = useState<string>(initialDate);
  // to do fix toogle - currently all meals are toggled together, need to toggle each meal separately
  const [openMeals, setOpenMeals] = React.useState<Set<string>>(new Set());

  const toggle = (mealType: string) => {
    setOpenMeals((prev) => {
      const next = new Set(prev);
      if (next.has(mealType)) {
        next.delete(mealType);
      } else {
        next.add(mealType);
      }
      return next;
    });
  };

  const { dietPlan = [] } = useDiets(selectedDay);

  function handleDateSelect(day: string): void {
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

  console.log(groupedPlanByName.map((p) => JSON.stringify(p.meal_type)));
  return (
    <>
      <div className="flex flex-col gap-10 px-20">
        <div className="flex flex-col gap-10">
          <div>
            <h1>Diet</h1>
            <span className="text-muted-foreground text-sm">
              {format(
                parse(selectedDay, 'yyyy-MM-dd', new Date()),
                'EEEE, MMMM d, yyyy',
              )}
            </span>
          </div>
          <DatePicker
            rangeInDays={3}
            selectedDay={selectedDay}
            onSelectDay={handleDateSelect}
          />
          <div>
            <DayKcalSummary />
          </div>
        </div>

        <div className="grid grid-cols-2 items-start gap-4">
          {groupedPlanByName.map((plan) => {
            const macroData = countChartMacroData({
              protein: plan.mealProtein,
              fat: plan.mealFat,
              carbs: plan.mealCarbs,
              kcal: plan.mealKcal,
            });

            return (
              <Card key={plan.meal_type}>
                <CardHeader className="flex justify-between">
                  <CardTitle>
                    <div className="flex items-center gap-3">
                      <span className="text-base">{plan.meal_type}</span>
                      <span className="text-muted-foreground text-sm">
                        {plan.mealKcal} kcal
                      </span>
                    </div>
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    {/* <Button variant="outline" size="default">
                      <HiPlus className="size-5" />
                      <span>Add meal</span>
                    </Button> */}
                    <AddMeal />
                    <Button
                      variant="outline"
                      size="icon-lg"
                      className="cursor-pointer rounded-full"
                      onClick={() => toggle(plan.meal_type)}
                    >
                      <IoIosArrowDown
                        className={`size-6 transition-transform duration-300 ${
                          openMeals.has(plan.meal_type)
                            ? 'rotate-180'
                            : 'rotate-0'
                        }`}
                      />
                    </Button>
                  </div>
                </CardHeader>

                {plan.mealProtein &&
                  plan.mealFat &&
                  plan.mealCarbs &&
                  plan.mealKcal && (
                    <CardContent>
                      <div className="bg-surface-subtle flex w-full gap-12">
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
                    </CardContent>
                  )}

                <ToggleCard isToggled={openMeals.has(plan.meal_type)}>
                  <CardContent className="flex w-full flex-col gap-6 px-0">
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
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Diet;
