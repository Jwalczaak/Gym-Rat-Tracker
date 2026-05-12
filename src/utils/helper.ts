import {
  MACRO_COLORS,
  type MacroChartData,
  type MealCount,
} from '@/types/meal';
import { eachDayOfInterval, format } from 'date-fns';

export function mapIntervalToWeekDays(dateFrom: Date, dateTo: Date) {
  return eachDayOfInterval({
    start: new Date(dateFrom),
    end: new Date(dateTo),
  }).map((date) => ({
    date: format(date, 'yyyy-MM-dd'),
    dayName: format(date, 'EEEE'),
  }));
}

export function countChartMacroData(meal: MealCount): MacroChartData {
  const summedMacros: number = meal.protein + meal.fat + meal.carbs;

  return {
    proteinData: [
      { name: 'protein', value: meal.protein, fill: MACRO_COLORS.protein },
      {
        name: 'rest',
        value: summedMacros - meal.protein,
        fill: MACRO_COLORS.rest,
      },
    ],
    fatData: [
      { name: 'fat', value: meal.fat, fill: MACRO_COLORS.fat },
      { name: 'rest', value: summedMacros - meal.fat, fill: MACRO_COLORS.rest },
    ],
    carbsData: [
      { name: 'carbs', value: meal.carbs, fill: MACRO_COLORS.carbs },
      {
        name: 'rest',
        value: summedMacros - meal.carbs,
        fill: MACRO_COLORS.rest,
      },
    ],
  };
}
