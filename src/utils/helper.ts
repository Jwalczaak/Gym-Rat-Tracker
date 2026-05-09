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
