import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { useMeals } from '../useMeals';

const SearchMeal = () => {
  const [phrase, setPhrase] = useState<string>('');
  const meals = useMeals(phrase, 'breakfast');
  return (
    <div>
      <Input value={phrase} onChange={(e) => setPhrase(e.target.value)} />{' '}
    </div>
  );
};

export default SearchMeal;
