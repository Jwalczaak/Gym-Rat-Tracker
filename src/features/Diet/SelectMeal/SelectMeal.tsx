import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Modal, { useModalContext } from '@/components/shared/Modal/Modal';
import CountedMacro from '../CountedMacro/CountedMacro';
import type { AddLogMeal, Macro, MealPer100g } from '@/types/meal';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { format } from 'date-fns';
import { addNewItemToMeal } from '@/services/Diet/apiDiet';
import { useAddSelectedMeal } from '../useAddSelectedMeal';
import { Spinner } from '@/components/ui/spinner';

type SelectMealProps = {
  meal: MealPer100g;
  onBack: () => void;
};

const QUICK_GRAMS = [50, 100, 150, 200];

const SelectMeal = ({ meal, onBack }: SelectMealProps) => {
  const [searchParams] = useSearchParams();
  const dayParam = searchParams.get('day') ?? format(new Date(), 'yyyy-MM-dd');

  const [grams, setGrams] = useState<number>(0);

  const mealMacro: Macro = {
    kcal: meal.kcal_per_100g * (grams / 100),
    protein: meal.protein_per_100g * (grams / 100),
    fat: meal.fat_per_100g * (grams / 100),
    carbs: meal.carbs_per_100g * (grams / 100),
  };

  const { isCreating, addSelectedMeal } = useAddSelectedMeal();
  const { close } = useModalContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const logMeal: AddLogMeal = {
      meal_id: meal.id,
      log_date: dayParam,
      eaten: false,
      weight: grams,
    };
    addSelectedMeal(logMeal, { onSuccess: close });
  };

  return (
    <div className="relative">
      {isCreating && (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <Spinner className="size-12" />
        </div>
      )}
      <div className="flex flex-col items-start justify-between gap-5 p-4">
        <div className="bg-muted border-input flex w-full flex-col justify-between rounded-md border px-4 py-2">
          <span className="text-lg font-semibold">{meal.name}</span>
          <div className="text-fg-muted">
            <span>{meal.kcal_per_100g} kcal</span>
            <span> {meal.protein_per_100g}P</span>
            <span> {meal.fat_per_100g}F</span>
            <span> {meal.carbs_per_100g}C / </span>
            <span>100g</span>
          </div>
        </div>
        <form
          className="flex w-full flex-col justify-between gap-5"
          id="select-meal"
          onSubmit={handleSubmit}
        >
          <div>
            <Input
              id="quantity"
              type="number"
              aria-label="Quantity in grams"
              value={grams}
              onChange={(e) => setGrams(Number(e.target.value))}
              required
            />
          </div>

          <div className="grid grid-cols-4 gap-4">
            {QUICK_GRAMS.map((amount) => (
              <Button
                key={amount}
                type="button"
                variant="outline"
                onClick={() => setGrams(amount)}
              >
                {amount}g
              </Button>
            ))}
          </div>
        </form>
        <CountedMacro macro={mealMacro} />
      </div>
      <Modal.Footer>
        <div className="flex items-center justify-between">
          <span className="text-fg-muted">Logging {grams}g to this meal</span>
          <div className="flex gap-2">
            <Button variant="ghost" type="button" onClick={onBack}>
              Back
            </Button>
            <Button variant="brand" type="submit" form="select-meal">
              Save
            </Button>
          </div>
        </div>
      </Modal.Footer>
    </div>
  );
};

export default SelectMeal;
