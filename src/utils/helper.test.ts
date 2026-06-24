import { describe, it, expect } from 'vitest';
import { countChartMacroData, mapIntervalToWeekDays } from './helper';
import type { Macro } from '@/types/meal';

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

describe('countChartMacroData', () => {
  it('correctly sum macros', () => {
    const macro: Macro = {
      protein: 20,
      carbs: 50,
      fat: 30,
      kcal: 500,
    };

    const summerMacro = 100;

    const result = countChartMacroData(macro);

    expect(
      result.proteinData[0].value +
        result.fatData[0].value +
        result.carbsData[0].value,
    ).toEqual(summerMacro);
  });

  it('returns the expected shape for each macro data', () => {
    const macro: Macro = {
      protein: 20,
      carbs: 50,
      fat: 30,
      kcal: 500,
    };

    const result = countChartMacroData(macro);

    const macroEntryShape = expect.objectContaining({
      name: expect.any(String),
      value: expect.any(Number),
      fill: expect.any(String),
    });

    expect(result).toEqual({
      proteinData: expect.arrayContaining([macroEntryShape]),
      fatData: expect.arrayContaining([macroEntryShape]),
      carbsData: expect.arrayContaining([macroEntryShape]),
    });
  });
  it('each macro slice plus its rest equals the total macros', () => {
    const macro: Macro = { protein: 20, carbs: 50, fat: 30, kcal: 500 };
    const total = 100; // 20 + 50 + 30

    const result = countChartMacroData(macro);

    expect(result.proteinData[0].value + result.proteinData[1].value).toEqual(
      total,
    );
    expect(result.fatData[0].value + result.fatData[1].value).toEqual(total);
    expect(result.carbsData[0].value + result.carbsData[1].value).toEqual(
      total,
    );
    expect(result.proteinData[0].value).toEqual(macro.protein);
    expect(result.fatData[0].value).toEqual(macro.fat);
    expect(result.carbsData[0].value).toEqual(macro.carbs);
  });
});
