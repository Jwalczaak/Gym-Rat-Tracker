import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { Macro } from '@/types/meal';
import { format, parse } from 'date-fns';

type DayMacro = {
  name: string;
  value: number;
  textClass: string;
  indicatorClassName: string;
};

const DayKcalSummary = ({
  macroData,
  selectedDay,
}: {
  macroData: Macro;
  selectedDay: string;
}) => {
  const label = format(
    parse(selectedDay, 'yyyy-MM-dd', new Date()),
    'MMM d',
  ).toUpperCase();

  const MACRO_META = {
    protein: {
      name: 'Protein',
      textClass: 'text-blue-500',
      indicatorClassName: 'bg-blue-500',
    },
    carbs: {
      name: 'Carbs',
      textClass: 'text-green-500',
      indicatorClassName: 'bg-green-500',
    },
    fat: {
      name: 'Fats',
      textClass: 'text-yellow-500',
      indicatorClassName: 'bg-yellow-500',
    },
  } as const;

  const kcalData: DayMacro[] = (
    Object.keys(MACRO_META) as Array<keyof typeof MACRO_META>
  ).map((key) => ({
    ...MACRO_META[key],
    value: macroData[key],
  }));

  function countPercentageValue(macro: number): number {
    return (macro / macroData.kcal) * 100;
  }

  return (
    <Card className="flex flex-row px-6">
      <div className="w-30">
        <span className="text-fg-muted text-sm">{label}</span>
        <div>
          <span className="text-base font-semibold">{macroData.kcal}</span>
          <span className="text-fg-muted"> kcal</span>
        </div>
      </div>
      <div className="h-20 w-px self-stretch bg-gray-300" />

      <div className="flex w-full items-center gap-10">
        {kcalData.map((macro) => (
          <div key={macro.name} className="w-[33%]">
            <div className="flex justify-between">
              <span className={macro.textClass}>{macro.name}</span>
              <span>{macro.value}g</span>
            </div>
            <Progress
              value={countPercentageValue(macro.value)}
              indicatorClassName={macro.indicatorClassName}
            />
          </div>
        ))}
      </div>
    </Card>
  );
};

export default DayKcalSummary;
