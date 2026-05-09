type DietPlanRow = {
  meal_type: string;
  name: string;
  weight: number;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
};

export type GroupedMeals = Record<string, DietPlanRow>;
