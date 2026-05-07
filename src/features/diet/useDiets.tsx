import { useQuery } from '@tanstack/react-query';
import { fetchDietPlan } from '../../services/Diet/apiDiet';

export function useDiets(dateFrom: Date, dateTo: Date) {
  const {
    isLoading,
    data: dietPlan,
    error,
  } = useQuery({
    queryKey: ['dietPlan', dateFrom.toISOString(), dateTo.toISOString()],
    queryFn: () => fetchDietPlan(dateFrom, dateTo),
  });

  return {
    isLoading,
    error,
    dietPlan,
  };
}
