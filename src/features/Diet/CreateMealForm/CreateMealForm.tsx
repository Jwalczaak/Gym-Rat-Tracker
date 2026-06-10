import {
  FieldGroup,
  FieldSet,
  Field,
  FieldLabel,
  FieldLegend,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import type { Macro, MealPer100g } from '@/types/meal';
import {
  useForm,
  useWatch,
  type Control,
  type FieldErrors,
} from 'react-hook-form';
import { useCreateMeal } from '../useCreateMeal';
import CountedMacro from '../CountedMacro/CountedMacro';

type FormValues = Omit<MealPer100g, 'id' | 'meal_type'> & { grams: number };

function LiveMacro({ control }: { control: Control<FormValues> }) {
  const [kcal, protein, fat, carbs, grams] = useWatch({
    control,
    name: [
      'kcal_per_100g',
      'protein_per_100g',
      'fat_per_100g',
      'carbs_per_100g',
      'grams',
    ],
  });

  const g = (grams || 0) / 100;
  const countedMacro: Macro = {
    kcal: (kcal || 0) * g,
    protein: (protein || 0) * g,
    fat: (fat || 0) * g,
    carbs: (carbs || 0) * g,
  };

  return <CountedMacro macro={countedMacro} />;
}

const CreateMealForm = () => {
  const { register, handleSubmit, control, formState } = useForm<FormValues>({
    defaultValues: { grams: 0 },
  });

  const { isCreating, createMeal } = useCreateMeal();

  const onSubmit = (data: FormValues) => {
    createMeal({ ...data, meal_type: 'breakfast' });
  };

  const onError = (errors: FieldErrors<FormValues>) => {
    console.log(errors);
  };

  return (
    <>
      <form id="create-meal" onSubmit={handleSubmit(onSubmit, onError)}>
        <FieldGroup>
          <FieldSet className="flex flex-col gap-5">
            <Field>
              <FieldLabel htmlFor="product">Product name</FieldLabel>
              <Input
                id="name"
                placeholder="e.g. Homemade granol"
                {...register('name', { required: 'This field is required' })}
              />
            </Field>
            <FieldSet>
              <FieldLegend className="text-muted-foreground text-xs">
                Nutrition per 100g
              </FieldLegend>
              <div className="grid grid-cols-4 gap-4">
                <Field>
                  <FieldLabel htmlFor="kcal">Kcal</FieldLabel>
                  <Input
                    id="kcal_per_100g"
                    type="number"
                    {...register('kcal_per_100g', {
                      valueAsNumber: true,
                      required: 'This field is required',
                    })}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="protein" className="text-macro-protein">
                    Protein
                  </FieldLabel>
                  <Input
                    id="protein_per_100g"
                    type="number"
                    {...register('protein_per_100g', {
                      valueAsNumber: true,
                      required: 'This field is required',
                    })}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="fat" className="text-macro-fat">
                    Fat
                  </FieldLabel>
                  <Input
                    id="fat_per_100g"
                    type="number"
                    {...register('fat_per_100g', {
                      valueAsNumber: true,
                      required: 'This field is required',
                    })}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="carbs" className="text-macro-carbs">
                    Carbs
                  </FieldLabel>
                  <Input
                    id="carbs_per_100g"
                    type="number"
                    {...register('carbs_per_100g', {
                      valueAsNumber: true,
                      required: 'This field is required',
                    })}
                  />
                </Field>
              </div>
            </FieldSet>
            <Field>
              <FieldLabel htmlFor="logMeal">Log to this meal</FieldLabel>
              <Input
                id="logMeal"
                type="number"
                {...register('grams', {
                  valueAsNumber: true,
                })}
              />
            </Field>
          </FieldSet>
        </FieldGroup>
      </form>
      <div className="mt-5">
        <LiveMacro control={control} />
      </div>
    </>
  );
};

export default CreateMealForm;
