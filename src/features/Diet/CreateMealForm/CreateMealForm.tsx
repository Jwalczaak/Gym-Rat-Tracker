import {
  FieldGroup,
  FieldSet,
  Field,
  FieldLabel,
  FieldLegend,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Modal, { useModalContext } from '@/components/shared/Modal/Modal';
import type { AddLogMeal, Macro, MealPer100g } from '@/types/meal';
import {
  useForm,
  useWatch,
  type Control,
  type FieldErrors,
} from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { format } from 'date-fns';
import { useCreateMeal } from '../useCreateMeal';
import { useAddSelectedMeal } from '../useAddSelectedMeal';
import CountedMacro from '../CountedMacro/CountedMacro';
import { Spinner } from '@/components/ui/spinner';

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
  const { isSelecting, addSelectedMeal } = useAddSelectedMeal();
  const { close } = useModalContext();

  const [searchParams] = useSearchParams();
  const dayParam = searchParams.get('day') ?? format(new Date(), 'yyyy-MM-dd');

  const onSubmit = (data: FormValues) => {
    const { grams, ...mealFields } = data;

    createMeal(
      { ...mealFields, meal_type: 'breakfast' },
      {
        onSuccess: async (createdMeal) => {
          if (!grams) {
            close();
            return;
          }

          const logMeal: AddLogMeal = {
            meal_id: createdMeal.id,
            log_date: dayParam,
            eaten: false,
            weight: grams,
          };
          try {
            await addSelectedMeal(logMeal);
            close();
          } catch (err) {
            console.error(err);
          }
        },
      },
    );
  };

  const onError = (errors: FieldErrors<FormValues>) => {
    console.log(errors);
  };

  return (
    <>
      <div className="relative p-4">
        {(isCreating || isSelecting) && (
          <div className="absolute inset-0 z-50 flex items-center justify-center">
            <Spinner className="size-12" />
          </div>
        )}
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
                    <FieldLabel
                      htmlFor="protein"
                      className="text-macro-protein"
                    >
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
      </div>
      <Modal.Footer>
        <div className="flex items-center justify-between">
          <span className="text-fg-muted">
            Saves to your database & logs the amount above to this meal
          </span>
          <div className="flex gap-2">
            <Modal.Close>
              <Button variant="ghost" type="button">
                Cancel
              </Button>
            </Modal.Close>
            <Button
              variant="brand"
              type="submit"
              form="create-meal"
              disabled={isCreating}
            >
              Save
            </Button>
          </div>
        </div>
      </Modal.Footer>
    </>
  );
};

export default CreateMealForm;
