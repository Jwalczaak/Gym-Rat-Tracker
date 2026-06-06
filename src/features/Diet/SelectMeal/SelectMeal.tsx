import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IoIosArrowBack } from 'react-icons/io';
import CountedMacro from '../CountedMacro/CountedMacro';

const SelectMeal = () => {
  return (
    <div className="flex flex-col items-start justify-between gap-5">
      <Button variant="link" className="text-fg-muted">
        <IoIosArrowBack className="size-6" />
        Back to search
      </Button>

      <div className="bg-muted border-input flex w-full flex-col justify-between rounded-md border px-4 py-2">
        <span className="text-lg font-semibold">Rolled oats</span>
        <div className="text-fg-muted">
          <span>379 kcal</span>
          <span> 13P</span>
          <span> 7F</span>
          <span> 13C / </span>
          <span>100g</span>
        </div>
      </div>
      <form className="flex w-full flex-col justify-between gap-5">
        <div>
          <Input
            id="quantity"
            type="number"
            aria-label="Quantity in grams"
            required
          />
        </div>

        <div className="grid grid-cols-4 gap-4">
          <Button type="button" variant="outline">
            50g
          </Button>
          <Button type="button" variant="outline">
            {' '}
            100g{' '}
          </Button>
          <Button type="button" variant="outline">
            {' '}
            150g{' '}
          </Button>
          <Button type="button" variant="outline">
            {' '}
            200g{' '}
          </Button>
        </div>
      </form>
      <CountedMacro />
    </div>
  );
};

export default SelectMeal;
