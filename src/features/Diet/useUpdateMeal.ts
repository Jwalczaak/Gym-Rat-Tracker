import { updateMealLogWeight } from '@/services/Diet/apiDiet';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateMeal() {
  const queryClient = useQueryClient();

  const { mutateAsync: updateMeal, isPending: isUpdating } = useMutation({
    mutationFn: ({ logId, weight }: { logId: string; weight: number }) =>
      updateMealLogWeight(logId, weight),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['dietPlan'],
      });
    },
    onError: (err) => console.error(err.message),
  });

  return {
    isUpdating,
    updateMeal,
  };
}
