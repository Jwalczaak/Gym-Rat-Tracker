import { useQuery } from '@tanstack/react-query';
import { fetchDietPlan } from '../../services/Diet/apiDiet';
import type { LoggedMeal } from '@/types/meal';

type UseMealsResult = {
  isLoading: boolean;
  error: Error | null;
  dietPlan: LoggedMeal[];
};

export function useDiets(selectedDay: string): UseMealsResult {
  const {
    isLoading,
    data: dietPlan = [],
    error,
  } = useQuery({
    queryKey: ['dietPlan', selectedDay],
    queryFn: () => fetchDietPlan(selectedDay),
  });

  return {
    isLoading,
    error,
    dietPlan,
  };
}
