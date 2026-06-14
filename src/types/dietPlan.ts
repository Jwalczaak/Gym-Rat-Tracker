import type { FullMeal, MealPer100g } from './meal';

export type LoggedMeal = {
  logId: string;
  product: MealPer100g;
  display: FullMeal;
};

export type DietPlanRow = {
  meal_type: string;
  mealKcal: number;
  mealProtein: number;
  mealCarbs: number;
  mealFat: number;
  meals: LoggedMeal[];
};

export type DietPlan = {
  logId: string;
  product: MealPer100g;
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
