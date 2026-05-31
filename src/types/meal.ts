export type MealPer100g = {
  name: string;
  meal_type: string;
  id: string;
  kcal_per_100g: number;
  fat_per_100g: number;
  carbs_per_100g: number;
  protein_per_100g: number;
};

export type FullMeal = {
  name: string;
  weight: number;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
};

export type LoggedMeal = {
  log_date: string;
  meal_type: string;
  name: string;
  weight: number;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
};

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

export type Macro = {
  protein: number;
  fat: number;
  carbs: number;
  kcal: number;
};
