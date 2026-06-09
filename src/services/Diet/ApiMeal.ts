import type { MealPer100g } from '@/types/meal';
import { supabase } from '../supabase';

export async function fetchMeals(searchPhrase: string, meal_type: string) {
  const { data, error } = await supabase
    .from('meals')
    .select(
      `
      id,
      name,
      meal_type,
      kcal_per_100g,
      protein_per_100g,
      carbs_per_100g,
      fat_per_100g
    `,
    )
    .eq('meal_type', meal_type)
    .ilike('name', `%${searchPhrase}%`)
    .limit(20);
  if (error) {
    console.error('Error fetching meals', error);
    throw new Error(`Meals can't be loaded`);
  }

  return data;
}

export async function createProduct(product: Omit<MealPer100g, 'id'>) {
  const query = supabase.from('meals').insert({ ...product });

  const { data, error } = await query.select().single();

  if (error) {
    console.error('Meal could not be created');
    throw new Error('Meal could not be created');
  }

  return data;
}
