export type MacroChartData = {
  proteinData: MacroData[];
  fatData: MacroData[];
  carbsData: MacroData[];
};

type MacroData = {
  name: string;
  value: number;
  fill: string;
};

export const MACRO_COLORS = {
  protein: '#3b82f6',
  fat: '#f59e0b',
  carbs: '#10b981',
  rest: '#e5e7eb',
} as const;

export type DietPlanRow = {
  meal_type: string;
  mealKcal: number;
  mealProtein: number;
  mealCarbs: number;
  mealFat: number;
  meals: Meal[];
};

export type Meal = {
  name: string;
  weight: number;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
};

export type MealCount = {
  protein: number;
  fat: number;
  carbs: number;
  kcal: number;
};

export type GroupedMeals = Record<string, DietPlanRow>;
