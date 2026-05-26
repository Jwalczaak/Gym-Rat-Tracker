import { useQuery } from '@tanstack/react-query';
import { fetchDietPlan } from '../../services/Diet/apiDiet';

export function useDiets(selectedDay: string) {
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
