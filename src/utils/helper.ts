import {
  MACRO_COLORS,
  type MacroChartData,
  type MealCount,
} from '@/types/meal';
import { eachDayOfInterval, format, isWeekend } from 'date-fns';

export function mapIntervalToWeekDays(
  dateFrom: Date,
  dateTo: Date,
  currentDate: Date = new Date(),
): {
  date: string;
  dayName: string;
  dayNumber: string;
  monthName: string;
  isToday: boolean;
  isWeekend: boolean;
}[] {
  return eachDayOfInterval({
    start: new Date(dateFrom),
    end: new Date(dateTo),
  }).map((date) => ({
    date: format(date, 'yyyy-MM-dd'),
    dayName: format(date, 'EEEE'),
    dayNumber: format(date, 'd'),
    monthName: format(date, 'MMMM'),
    isToday: date.toDateString() === currentDate.toDateString(),
    isWeekend: isWeekend(date),
  }));
}

export function countChartMacroData(meal: MealCount): MacroChartData {
  const summedMacros: number = meal.protein + meal.fat + meal.carbs;

  console.log('summed', summedMacros);

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
