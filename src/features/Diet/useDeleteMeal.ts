import { deleteMealLog } from '@/services/Diet/apiDiet';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteMeal() {
  const queryClient = useQueryClient();

  const { mutate: deleteMeal, isPending: isDeleting } = useMutation({
    mutationFn: (logId: string) => deleteMealLog(logId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['dietPlan'],
      });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return {
    isDeleting,
    deleteMeal,
  };
}
