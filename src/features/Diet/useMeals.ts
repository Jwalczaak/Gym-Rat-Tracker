import { fetchMeals } from '@/services/Diet/ApiMeal';
import { useQuery } from '@tanstack/react-query';

export function useMeals(searchPhrase: string, meal_type: string) {
  const {
    isLoading,
    data: meals = [],
    error,
  } = useQuery({
    queryKey: ['meals', searchPhrase, meal_type],
    queryFn: () => fetchMeals(searchPhrase, meal_type),
  });

  return {
    isLoading,
    error,
    meals,
  };
}
