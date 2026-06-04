import {
  FieldGroup,
  FieldSet,
  Field,
  FieldLabel,
  FieldLegend,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

const CreateMealForm = () => {
  return (
    <>
      <form>
        <FieldGroup>
          <FieldSet>
            <Field>
              <FieldLabel htmlFor="product">Product name</FieldLabel>
              <Input id="product" placeholder="e.g. Homemade granol" required />
            </Field>
            <FieldSet>
              <FieldLegend className="text-muted-foreground text-xs">
                Nutrition per 100g
              </FieldLegend>
              <div className="grid grid-cols-4 gap-4">
                <Field>
                  <FieldLabel htmlFor="kcal">Kcal</FieldLabel>
                  <Input id="kcal" type="number" required />
                </Field>
                <Field>
                  <FieldLabel htmlFor="protein" className="text-macro-protein">
                    Protein
                  </FieldLabel>
                  <Input id="protein" type="number" required />
                </Field>
                <Field>
                  <FieldLabel htmlFor="fat" className="text-macro-fat">
                    Fat
                  </FieldLabel>
                  <Input id="fat" type="number" required />
                </Field>
                <Field>
                  <FieldLabel htmlFor="carbs" className="text-macro-carbs">
                    Carbs
                  </FieldLabel>
                  <Input id="carbs" type="number" required />
                </Field>
              </div>
            </FieldSet>
            <Field>
              <FieldLabel htmlFor="logMeal">Log to this meal</FieldLabel>
              <Input id="logMeal" type="number" required />
            </Field>
          </FieldSet>
        </FieldGroup>
      </form>

      <div className="bg-muted border-input my-6 flex h-14 items-center justify-between rounded-md border px-4 py-2">
        <div className="flex gap-2">
          <span className="text-muted-foreground">Kcal</span>
          <span className="text-small font-medium">0g</span>
        </div>
        <div className="flex gap-2">
          <span className="text-macro-protein">Protein</span>
          <span className="text-small font-medium">0g</span>
        </div>
        <div className="flex gap-2">
          <span className="text-macro-fat">Fat</span>
          <span className="text-small font-medium">0g</span>
        </div>
        <div className="flex gap-2">
          <span className="text-macro-carbs">Carbs</span>
          <span className="text-small font-medium">0g</span>
        </div>
      </div>
    </>
  );
};

export default CreateMealForm;
