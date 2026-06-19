import { addNewItemToMeal } from '@/services/Diet/apiDiet';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useAddSelectedMeal() {
  const queryClient = useQueryClient();

  const { mutateAsync: addSelectedMeal, isPending: isSelecting } = useMutation({
    mutationFn: addNewItemToMeal,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['dietPlan'],
      });
      toast.success('Meal added');
    },
    // No onError: callers (SelectMeal / CreateMealForm) own the error toast.
  });
  return {
    isSelecting,
    addSelectedMeal,
  };
}
