type MealSummary = {
  name: string;
  type: string;
};

export type GroupedMeals = Record<string, MealSummary>;
