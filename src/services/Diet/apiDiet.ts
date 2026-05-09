import type { DateRange } from 'react-day-picker';
import { supabase } from '../supabase';

const mealTypeOrder: Record<string, number> = {
  breakfast: 1,
  lunch: 2,
  dinner: 3,
  snack: 4,
};

export async function fetchDietPlan(dateFrom: Date, dateTo: Date) {
  const dateInterval: DateRange = {
    from: dateFrom,
    to: dateTo,
  };
  const { data, error } = await supabase
    .from('meal_logs')
    .select(
      `
      log_date,
      weight,
      meals:meal_id (
        meal_type,
        name,
        kcal_per_100g,
        protein_per_100g,
        carbs_per_100g,
        fat_per_100g
      )
    `,
    )
    .gte('log_date', dateInterval.from!.toISOString().split('T')[0])
    .lte('log_date', dateInterval.to!.toISOString().split('T')[0])
    .order('log_date', { ascending: true })
    .order('meal_type', {
      ascending: true,
      foreignTable: 'meals',
      nullsFirst: false,
    });

  if (error) {
    console.error('Error fetching diet plan:', error);
    throw new Error('Cabins could not be loaded');
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

  console.log(flat);
  return flat || [];
}
