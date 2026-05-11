import { Card, CardHeader } from '@/components/ui/card';
import type { Meal } from '@/types/meal';
import React from 'react';
import Chart from '@/components/shared/ Chart/Chart';
type MealCardProps = {
  meal: Meal;
  onEdit: (meal: Meal) => void;
  onDelete: (meal: Meal) => void;
};

type MacroData = {
  name: string;
  value: number;
  fill: string;
};

const MACRO_COLORS = {
  protein: '#3b82f6',
  fat: '#f59e0b',
  carbs: '#10b981',
  rest: '#e5e7eb',
} as const;

const MealCard: React.FC<MealCardProps> = ({ meal, onEdit, onDelete }) => {
  const summedMacros: number = meal.protein + meal.fat + meal.carbs;

  const proteinData: MacroData[] = [
    { name: 'protein', value: meal.protein, fill: MACRO_COLORS.protein },
    {
      name: 'rest',
      value: summedMacros - meal.protein,
      fill: MACRO_COLORS.rest,
    },
  ];

  const fatData: MacroData[] = [
    { name: 'fat', value: meal.fat, fill: MACRO_COLORS.fat },
    { name: 'rest', value: summedMacros - meal.fat, fill: MACRO_COLORS.rest },
  ];

  const carbsData: MacroData[] = [
    { name: 'carbs', value: meal.carbs, fill: MACRO_COLORS.carbs },
    { name: 'rest', value: summedMacros - meal.carbs, fill: MACRO_COLORS.rest },
  ];

  return (
    <Card className="h-45 bg-gray-100">
      <CardHeader className="flex h-full items-center justify-between">
        <div className="content items-between flex h-full w-full flex-col justify-between font-semibold">
          <div className="flex flex-col">
            <span className="text-2xl">{meal.name}</span>
            <span className="text-sm font-normal">{meal.weight}g</span>
          </div>

          <span>
            <div className="flex w-full items-start justify-between">
              <div className="flex gap-3">
                <div className="chart-container flex items-center gap-2 font-thin">
                  <Chart
                    type="donut"
                    width={20}
                    height={30}
                    data={proteinData}
                  />
                  <span className="text-sm font-normal">
                    {' '}
                    {proteinData[0].value}g
                  </span>
                </div>
                <div className="chart-container flex items-center gap-2 font-thin">
                  <Chart type="donut" width={20} height={30} data={fatData} />
                  <span className="text-sm font-normal">
                    {' '}
                    {fatData[0].value}g
                  </span>
                </div>{' '}
                <div className="chart-container flex items-center gap-2 font-thin">
                  <Chart type="donut" width={20} height={30} data={carbsData} />
                  <span className="text-sm font-normal">
                    {' '}
                    {carbsData[0].value}g
                  </span>
                </div>
              </div>
            </div>
          </span>
        </div>
      </CardHeader>
    </Card>
  );
};

export default MealCard;
