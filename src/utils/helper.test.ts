import { describe, it, expect } from 'vitest';
import { mapIntervalToWeekDays } from './helper';

describe('mapIntervalToWeekDays', () => {
  it('returns one entry per day in the interval', () => {
    const from = new Date('2026-06-14');
    const to = new Date('2026-06-20');

    const result = mapIntervalToWeekDays(from, to);

    expect(result).toHaveLength(7);
  });

  it('returns a single entry when from and to are the same day', () => {
    const from = new Date('2026-06-14');
    const to = new Date('2026-06-14');

    const result = mapIntervalToWeekDays(from, to);

    expect(result).toHaveLength(1);
  });

  it('marks only the matching day as today', () => {
    const from = new Date('2026-06-14');
    const to = new Date('2026-06-20');
    const today = new Date('2026-06-20');

    const result = mapIntervalToWeekDays(from, to, today);

    expect(result.filter((day) => day.isToday)).toHaveLength(1);
    expect(result[6].isToday).toBe(true);
  });

  it('returns the expected shape for each day', () => {
    const result = mapIntervalToWeekDays(
      new Date('2026-06-14'),
      new Date('2026-06-14'),
    );
    expect(result[0]).toEqual({
      date: expect.any(String),
      dayName: expect.any(String),
      dayNumber: expect.any(String),
      monthName: expect.any(String),
      isToday: expect.any(Boolean),
      isWeekend: expect.any(Boolean),
    });
  });
});
