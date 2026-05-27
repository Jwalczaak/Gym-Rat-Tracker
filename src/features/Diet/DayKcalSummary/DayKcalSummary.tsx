import Chart from '@/components/shared/ Chart/Chart';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const DayKcalSummary = () => {
  const mockedKCalDate = [
    {
      name: 'Protein',
      value: 12,
      textClass: 'text-blue-500',
      indicatorClassName: 'bg-blue-500',
    },
    {
      name: 'Carbs',
      value: 24,
      textClass: 'text-green-500',
      indicatorClassName: 'bg-green-500',
    },
    {
      name: 'Fats',
      value: 8,
      textClass: 'text-yellow-500',
      indicatorClassName: 'bg-yellow-500',
    },
  ];

  const totalKcal = mockedKCalDate.reduce((acc, item) => acc + item.value, 0);

  function countPercentageValue(macroData: number): number {
    return (macroData / totalKcal) * 100;
  }

  return (
    <Card className="flex flex-row px-6">
      <div className="w-30">
        <span className="text-fg-muted text-sm">MAR 12</span>
        <div>
          <span className="text-base font-semibold">1230</span>
          <span className="text-fg-muted"> kcal</span>
        </div>
      </div>
      <div className="h-20 w-px self-stretch bg-gray-300" />

      <div className="flex w-full items-center gap-10">
        {mockedKCalDate.map((macro) => (
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
