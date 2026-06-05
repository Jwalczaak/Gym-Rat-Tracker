import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { IoIosArrowBack } from 'react-icons/io';

const SelectMeal = () => {
  return (
    <div className="flex flex-col items-start">
      <Button variant="link" className="text-fg-muted">
        <IoIosArrowBack className="size-6" />
        Back to search
      </Button>

      <div className="bg-muted border-input my-6 flex w-full flex-col justify-between rounded-md border px-4 py-2">
        <span className="text-lg font-semibold">Rolled oats</span>
        <div className="text-fg-muted">
          <span>379 kcal</span>
          <span> 13P</span>
          <span> 7F</span>
          <span> 13C / </span>
          <span>100g</span>
        </div>
      </div>
    </div>
  );

  //    <form>
  //     <FieldGroup>
  //         <FieldSet>
  //             <Field>
  //                 <FieldLabel htmlFor="product">Product

  //                 </FieldLabel>
  //             </Field>
  //         </FieldSet>
  //     </FieldGroup>
  //   </form>;
};

export default SelectMeal;
