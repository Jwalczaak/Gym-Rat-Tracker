import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FaRegTrashAlt } from 'react-icons/fa';
import { CiEdit } from 'react-icons/ci';
import type { Meal } from '@/types/meal';
import React from 'react';
import Chart from '@/components/shared/ Chart/Chart';
import { countChartMacroData } from '@/utils/helper';
type MealCardProps = {
  meal: Meal;
  onEdit: (meal: Meal) => void;
  onDelete: (meal: Meal) => void;
};

const MealCard: React.FC<MealCardProps> = ({ meal, onEdit, onDelete }) => {
  const { proteinData, fatData, carbsData } = countChartMacroData(meal);

  return (
    <Card className="bg-surface-subtle h-45 w-full gap-4">
      <CardContent className="content flex h-full w-full items-center justify-between font-semibold">
        <div className="flex h-full w-full flex-col justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-2xl">{meal.name}</span>
            <span className="text-sm font-normal">{meal.weight}g</span>
          </div>

          <div className="flex w-full gap-12">
            <div className="chart-container flex items-center gap-2 font-thin">
              <Chart type="donut" width={20} height={30} data={proteinData} />
              <span className="text-sm font-normal">
                {proteinData[0].value}g
              </span>
            </div>
            <div className="chart-container flex items-center gap-2 font-thin">
              <Chart type="donut" width={20} height={30} data={fatData} />
              <span className="text-sm font-normal"> {fatData[0].value}g</span>
            </div>{' '}
            <div className="chart-container flex items-center gap-2 font-thin">
              <Chart type="donut" width={20} height={30} data={carbsData} />
              <span className="text-sm font-normal">{carbsData[0].value}g</span>
            </div>
          </div>
        </div>
        <div className="actions flex gap-x-1">
          <Button
            variant="outline"
            size="icon"
            className="cursor-pointer rounded-full"
          >
            <CiEdit className="size-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="cursor-pointer rounded-full"
          >
            <FaRegTrashAlt className="size-6" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MealCard;
