import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import { FaRegTrashAlt } from 'react-icons/fa';
import { CiEdit } from 'react-icons/ci';
import type { Meal } from '@/types/meal';
import React from 'react';

type MealCardProps = {
  meal: Meal;
  onEdit: (meal: Meal) => void;
  onDelete: (meal: Meal) => void;
};

const MealCard: React.FC<MealCardProps> = ({ meal, onEdit, onDelete }) => {
  return (
    <Card className="h-35 bg-gray-100">
      <CardHeader className="items-between flex h-full items-center justify-between">
        <div className="content items-betweenn flex h-full flex-col justify-between font-semibold">
          <div className="flex flex-col">
            <span className="text-2xl">{meal.name}</span>
            <span className="text-sm font-normal">{meal.weight}g</span>
          </div>
          <span>
            {`p:${meal.protein} f: ${meal.fat} c: ${meal.carbs} kcal: ${meal.kcal}
            `}
          </span>
        </div>
        <div className="actions flex gap-x-1">
          <Button variant="outline" size="icon" className="rounded-full">
            <CiEdit className="size-7" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <FaRegTrashAlt className="size-5" />
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
};

export default MealCard;
