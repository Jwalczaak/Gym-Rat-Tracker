import type { FullMeal } from './meal';

export type DietPlanRow = {
  meal_type: string;
  mealKcal: number;
  mealProtein: number;
  mealCarbs: number;
  mealFat: number;
  meals: FullMeal[];
};

export type DietPlan = {
  log_date: string;
  meal_type: string;
  name: string;
  weight: number;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
};

export type GroupedMeals = Record<string, DietPlanRow>;
