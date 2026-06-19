import { deleteMealLog } from '@/services/Diet/apiDiet';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useDeleteMeal() {
  const queryClient = useQueryClient();

  const { mutate: deleteMeal, isPending: isDeleting } = useMutation({
    mutationFn: (logId: string) => deleteMealLog(logId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['dietPlan'],
      });
      toast.success('Meal deleted');
    },
    onError: (err) => {
      toast.error('Could not delete the meal');
      console.error(err);
    },
  });

  return {
    isDeleting,
    deleteMeal,
  };
}
