import { useQuery } from '@tanstack/react-query';
import { fetchDietPlan } from '../../services/Diet/apiDiet';

export function useDiets() {
  const {
    isLoading,
    data: dietPlan,
    error,
  } = useQuery({
    queryKey: ['dietPlan'],
    queryFn: fetchDietPlan,
  });
  return {
    isLoading,
    error,
    dietPlan,
  };
}
