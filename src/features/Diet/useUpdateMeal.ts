import { updateMealLogWeight } from '@/services/Diet/apiDiet';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateMeal() {
  const queryClient = useQueryClient();

  const { mutateAsync: updateMeal } = useMutation({
    mutationFn: ({ logId, weight }: { logId: string; weight: number }) =>
      updateMealLogWeight(logId, weight),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['dietPlan'],
      });
    },
    // Errors are owned by the caller (SelectMeal's submit catch), so the
    // rejection isn't handled twice. Keep this hook a pure data wrapper.
  });

  return {
    updateMeal,
  };
}
