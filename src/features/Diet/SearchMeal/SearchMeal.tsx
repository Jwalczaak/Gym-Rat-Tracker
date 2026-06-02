import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useMeals } from '../useMeals';
import { useDebounce } from '@/hooks/useDebounce';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GrFormNext } from 'react-icons/gr';

const SearchMeal = () => {
  const [phrase, setPhrase] = useState('');
  const debouncedPhrase = useDebounce(phrase, 300);
  const { meals } = useMeals(debouncedPhrase, 'breakfast');

  return (
    <div>
      <Input value={phrase} onChange={(e) => setPhrase(e.target.value)} />{' '}
      {meals.map((meal) => (
        <Card
          key={meal.id}
          className="hover:ring-border hover:bg-muted cursor-pointer ring-0 transition-colors hover:ring-1"
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
  );
};

export default SearchMeal;
