import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useMeals } from '../useMeals';
import { useDebounce } from '@/hooks/useDebounce';

const SearchMeal = () => {
  const [phrase, setPhrase] = useState('');
  const debouncedPhrase = useDebounce(phrase, 300);
  const { meals } = useMeals(debouncedPhrase, 'breakfast');

  return (
    <div>
      <Input value={phrase} onChange={(e) => setPhrase(e.target.value)} />{' '}
    </div>
  );
};

export default SearchMeal;
