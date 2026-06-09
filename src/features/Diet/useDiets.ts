import { useQuery } from '@tanstack/react-query';
import { fetchDietPlan } from '../../services/Diet/apiDiet';
import type { DietPlan } from '@/types/dietPlan';

type UseMealsResult = {
  isLoading: boolean;
  error: Error | null;
  dietPlan: DietPlan[];
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
