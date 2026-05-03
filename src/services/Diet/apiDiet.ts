import { supabase } from '../supabase';

export async function fetchDietPlan(dateFrom: Date, dateTo: Date) {
  const { data, error } = await supabase
    .from('meal_logs')
    .select(`log_date, meals:meal_id (meal_type, name)`)
    .gte('log_date', dateFrom.toISOString())
    .lte('log_date', dateTo.toISOString())
    .order('log_date', { ascending: true })
    .order('meal_type', {
      ascending: true,
      foreignTable: 'meals',
      nullsFirst: false,
    });

  if (error) {
    console.error('Error fetching diet plan:', error);
    throw error;
  }

  return data;
}
