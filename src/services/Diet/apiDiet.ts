import type { DateRange } from 'react-day-picker';
import { supabase } from '../supabase';

export async function fetchDietPlan(dateFrom: Date, dateTo: Date) {
  const dateInterval: DateRange = {
    from: dateFrom,
    to: dateTo,
  };

  const { data, error } = await supabase
    .from('meal_logs')
    .select(`log_date, meals:meal_id (meal_type, name)`)
    .gte('log_date', dateInterval.from!.toISOString())
    .lte('log_date', dateInterval.to!.toISOString())
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

  return data;
}
