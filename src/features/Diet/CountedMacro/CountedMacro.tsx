import type { Macro } from '@/types/meal';

const CountedMacro = ({ macro }: { macro: Macro }) => {
  console.log(macro);
  return (
    <div className="bg-muted border-input flex h-14 w-full items-center justify-between rounded-md border px-4 py-2">
      <div className="flex gap-2">
        <span className="text-muted-foreground">Kcal</span>
        <span className="text-small font-medium">{Math.round(macro.kcal)}</span>
      </div>
      <div className="flex gap-2">
        <span className="text-macro-protein">Protein</span>
        <span className="text-small font-medium">
          {Math.round(macro.protein)}g
        </span>
      </div>
      <div className="flex gap-2">
        <span className="text-macro-fat">Fat</span>
        <span className="text-small font-medium">{Math.round(macro.fat)}g</span>
      </div>
      <div className="flex gap-2">
        <span className="text-macro-carbs">Carbs</span>
        <span className="text-small font-medium">
          {Math.round(macro.carbs)}g
        </span>
      </div>
    </div>
  );
};

export default CountedMacro;
