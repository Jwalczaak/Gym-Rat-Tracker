import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IoIosArrowBack } from 'react-icons/io';
import CountedMacro from '../CountedMacro/CountedMacro';
import type { AddLogMeal, Macro, MealPer100g } from '@/types/meal';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { format } from 'date-fns';
import { addNewItemToMeal } from '@/services/Diet/apiDiet';
import { useAddSelectedMeal } from '../useAddSelectedMeal';

type SelectMealProps = {
  meal: MealPer100g;
};

const QUICK_GRAMS = [50, 100, 150, 200];

const SelectMeal = ({ meal }: SelectMealProps) => {
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

  const handleSubmit = (e) => {
    const logMeal: AddLogMeal = {
      meal_id: meal.id,
      log_date: dayParam,
      eaten: false,
      weight: grams,
    };
    addSelectedMeal({ ...logMeal });
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-start justify-between gap-5">
      <Button variant="link" className="text-fg-muted">
        <IoIosArrowBack className="size-6" />
        Back to search
      </Button>

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
  );
};

export default SelectMeal;
