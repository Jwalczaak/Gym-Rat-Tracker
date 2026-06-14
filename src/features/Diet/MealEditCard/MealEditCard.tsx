import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FaRegTrashAlt } from 'react-icons/fa';
import { CiEdit } from 'react-icons/ci';
import type { FullMeal, MealPer100g } from '@/types/meal';
import React from 'react';
import Chart from '@/components/shared/ Chart/Chart';
import { countChartMacroData } from '@/utils/helper';
import type { DietPlan } from '@/types/dietPlan';
import Modal from '@/components/shared/Modal/Modal';
import SelectMeal from '../SelectMeal/SelectMeal';
import { useUpdateMeal } from '../useUpdateMeal';
type MealEditCardProps = {
  meal: FullMeal;
  product: MealPer100g;
  logId: string;
  onEdit: (meal: DietPlan) => void;
  onDelete: (meal: DietPlan) => void;
};

const MealEditCard: React.FC<MealEditCardProps> = ({
  meal,
  product,
  logId,
  onEdit,
  onDelete,
}) => {
  const { proteinData, fatData, carbsData } = countChartMacroData(meal);
  const { updateMeal } = useUpdateMeal();

  return (
    <Card className="bg-surface-subtle h-45 w-full">
      <CardContent className="content flex h-full w-full items-center justify-between font-semibold">
        <div className="flex h-full w-full flex-col justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-base">{meal.name}</span>
            <div className="text-muted-foreground flex gap-x-4 text-sm">
              <span>{meal.weight}g</span>
              <span>{meal.kcal}kcal</span>
            </div>
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
            </div>
            <div className="chart-container flex items-center gap-2 font-thin">
              <Chart type="donut" width={20} height={30} data={carbsData} />
              <span className="text-sm font-normal">{carbsData[0].value}g</span>
            </div>
          </div>
        </div>
        <div className="actions flex gap-x-1">
          <Modal>
            <Modal.Open opens="meal-edit-form">
              <Button
                variant="outline"
                size="icon"
                className="cursor-pointer rounded-full"
              >
                <CiEdit className="size-6" />
              </Button>
            </Modal.Open>
            <Modal.Window name="meal-edit-form">
              <Modal.Header>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2 text-lg font-semibold">
                    <span>Add Meal</span>
                    <span className="text-brand">Breakfast</span>
                  </div>
                  <span className="text-fg-muted">
                    Find an existing product in your database, or create a new
                    one
                  </span>
                </div>
              </Modal.Header>
              <SelectMeal
                meal={product}
                initialGrams={meal.weight}
                onSubmit={(g) => updateMeal({ logId, weight: g })}
              />
            </Modal.Window>
          </Modal>

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

export default MealEditCard;
