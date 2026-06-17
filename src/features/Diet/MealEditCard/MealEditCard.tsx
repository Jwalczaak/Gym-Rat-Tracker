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
import { useDeleteMeal } from '../useDeleteMeal';
import { CiTrash } from 'react-icons/ci';
type MealEditCardProps = {
  meal: FullMeal;
  product: MealPer100g;
  logId: string;
  mealType: string;
};

const MealEditCard: React.FC<MealEditCardProps> = ({
  meal,
  product,
  logId,
  mealType,
}) => {
  const { proteinData, fatData, carbsData } = countChartMacroData(meal);
  const { updateMeal } = useUpdateMeal();
  const { deleteMeal, isDeleting } = useDeleteMeal();

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
                    <span>Edit Existing Meal</span>
                    <span className="text-brand capitalize">{mealType}</span>
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

          <Modal>
            <Modal.Open opens="meal-delete">
              <Button
                variant="outline"
                size="icon"
                className="cursor-pointer rounded-full"
              >
                <FaRegTrashAlt className="size-6" />
              </Button>
            </Modal.Open>
            <Modal.Window name="meal-delete">
              <Modal.Header>
                <div className="flex flex-col items-center gap-2">
                  <div className="rounded-full bg-red-100 p-3">
                    <CiTrash className="size-8 text-red-600" />
                  </div>
                  <span className="text-lg font-semibold">
                    Delete this meal?
                  </span>
                </div>
              </Modal.Header>

              <div className="px-6 py-4 text-center">
                <p className="text-fg-muted">
                  <span className="text-foreground font-semibold">
                    {meal.name}
                  </span>{' '}
                  ({meal.weight}g) will be removed from{' '}
                  <span className="capitalize">{mealType}</span>. This can't be
                  undone.
                </p>
              </div>

              <Modal.Footer>
                <div className="flex justify-end gap-2">
                  <Modal.Close>
                    <Button
                      variant="ghost"
                      type="button"
                      className="cursor-pointer"
                    >
                      Cancel
                    </Button>
                  </Modal.Close>
                  <Button
                    variant="destructive"
                    type="button"
                    className="cursor-pointer"
                    onClick={() => deleteMeal(logId)}
                    disabled={isDeleting}
                  >
                    {isDeleting ? 'Deleting…' : 'Delete meal'}
                  </Button>
                </div>
              </Modal.Footer>
            </Modal.Window>
          </Modal>
        </div>
      </CardContent>
    </Card>
  );
};

export default MealEditCard;
