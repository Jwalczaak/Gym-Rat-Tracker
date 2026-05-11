import type { DietPlanRow } from '@/types/meal';

export const defaultMeals: DietPlanRow[] = [
  {
    meal_type: 'breakfast',
    meals: [],
  },
  {
    meal_type: 'lunch',
    meals: [],
  },
  {
    meal_type: 'dinner',
    meals: [],
  },
  {
    meal_type: 'snack',
    meals: [],
  },
] as const;
