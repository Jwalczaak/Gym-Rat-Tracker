import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Modal from '@/components/shared/Modal/Modal';
import { useState } from 'react';
import { useMeals } from '../useMeals';
import { useDebounce } from '@/hooks/useDebounce';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GrFormNext } from 'react-icons/gr';
import { IoSearch } from 'react-icons/io5';
import type { MealPer100g } from '@/types/meal';

type SearchMealProps = {
  onSelectMeal: (meal: MealPer100g) => void;
};

const SearchMeal: React.FC<SearchMealProps> = ({ onSelectMeal }) => {
  const [phrase, setPhrase] = useState('');
  const debouncedPhrase = useDebounce(phrase, 300);
  const { meals } = useMeals(debouncedPhrase, 'breakfast');

  return (
    <>
      <div className="flex flex-col p-4">
        <div className="relative my-3">
          <IoSearch className="text-fg-muted absolute top-1/2 left-3 size-5 -translate-y-1/2" />
          <Input
            className="pl-10"
            value={phrase}
            placeholder="Search products (e.g chicken,oats,banana)"
            onChange={(e) => setPhrase(e.target.value)}
          />
        </div>
        {meals.map((meal) => (
          <Card
            onClick={() => onSelectMeal(meal)}
            key={meal.id}
            className="hover:bg-muted cursor-pointer ring-0 transition-colors hover:ring-1"
          >
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-base font-semibold">{meal.name}</span>
                  <span className="text-fg-muted text-xs">
                    {meal.kcal_per_100g} / 100g
                  </span>
                </div>
                <div className="flex gap-2">
                  <Badge variant="blue">{meal.protein_per_100g}P</Badge>
                  <Badge variant="yellow">{meal.fat_per_100g}F</Badge>
                  <Badge variant="green">{meal.carbs_per_100g}C</Badge>
                  <GrFormNext className="size-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Modal.Footer>
        <div className="flex items-center justify-between">
          <span className="text-fg-muted">
            Pick a product to set grams or servings
          </span>
          <Modal.Close>
            <Button variant="ghost" type="button">
              Cancel
            </Button>
          </Modal.Close>
        </div>
      </Modal.Footer>
    </>
  );
};

export default SearchMeal;
