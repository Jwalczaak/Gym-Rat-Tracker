import type { FullMeal } from './meal';

export type DietPlanRow = {
  meal_type: string;
  mealKcal: number;
  mealProtein: number;
  mealCarbs: number;
  mealFat: number;
  meals: FullMeal[];
};

export type GroupedMeals = Record<string, DietPlanRow>;
