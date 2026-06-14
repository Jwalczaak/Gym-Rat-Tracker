import type { AddLogMeal } from '@/types/meal';
import { supabase } from '../supabase';
import type { DietPlan } from '@/types/dietPlan';

const mealTypeOrder: Record<string, number> = {
  breakfast: 1,
  lunch: 2,
  dinner: 3,
  snack: 4,
};

export async function fetchDietPlan(selectedDay: string): Promise<DietPlan[]> {
  const { data, error } = await supabase
    .from('meal_logs')
    .select(
      `
      id,
      log_date,
      weight,
      meals:meal_id (
        id,
        meal_type,
        name,
        kcal_per_100g,
        protein_per_100g,
        carbs_per_100g,
        fat_per_100g
      )
    `,
    )
    .eq('log_date', selectedDay.split('T')[0])
    .order('log_date', { ascending: true })
    .order('meal_type', {
      ascending: true,
      foreignTable: 'meals',
      nullsFirst: false,
    });

  if (error) {
    console.error('Error fetching diet plan:', error);
    throw new Error('Diet plan could not be loaded');
  }

  const flat =
    data
      ?.map((row) => {
        const meal = row.meals;

        const weight = row.weight ?? 0;
        const factor = weight / 100;

        const kcal = (meal?.kcal_per_100g ?? 0) * factor;
        const protein = (meal?.protein_per_100g ?? 0) * factor;
        const carbs = (meal?.carbs_per_100g ?? 0) * factor;
        const fat = (meal?.fat_per_100g ?? 0) * factor;

        return {
          logId: row.id,
          product: {
            id: meal?.id ?? '',
            name: meal?.name ?? '',
            meal_type: meal?.meal_type ?? '',
            kcal_per_100g: meal?.kcal_per_100g ?? 0,
            protein_per_100g: meal?.protein_per_100g ?? 0,
            carbs_per_100g: meal?.carbs_per_100g ?? 0,
            fat_per_100g: meal?.fat_per_100g ?? 0,
          },
          log_date: row.log_date,
          meal_type: meal?.meal_type ?? '',
          name: meal?.name ?? '',
          weight,
          kcal: Number(kcal.toFixed(1)),
          protein: Number(protein.toFixed(1)),
          carbs: Number(carbs.toFixed(1)),
          fat: Number(fat.toFixed(1)),
        };
      })
      .sort((a, b) => {
        const dateCompare = a.log_date.localeCompare(b.log_date);
        if (dateCompare !== 0) return dateCompare;

        return (
          (mealTypeOrder[a.meal_type.toLowerCase()] ?? 999) -
          (mealTypeOrder[b.meal_type.toLowerCase()] ?? 999)
        );
      }) ?? [];

  return flat || [];
}

export async function addNewItemToMeal(newItem: AddLogMeal) {
  const query = supabase.from('meal_logs').insert({ ...newItem });

  const { data, error } = await query.select().single();

  if (error) {
    console.error('Meal could not be added');
    throw new Error('Meal could not be added');
  }

  return data;
}

export async function updateMealLogWeight(logId: string, weight: number) {
  const { data, error } = await supabase
    .from('meal_logs')
    .update({ weight })
    .eq('id', logId)
    .select()
    .single();

  if (error) {
    console.error('Meal could not be updated');
    throw new Error('Meal could not be updated');
  }

  return data;
}
