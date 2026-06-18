import { addNewItemToMeal } from '@/services/Diet/apiDiet';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useAddSelectedMeal() {
  const queryClient = useQueryClient();

  const { mutateAsync: addSelectedMeal, isPending: isSelecting } = useMutation({
    mutationFn: addNewItemToMeal,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['dietPlan'],
      });
    },
  });
  return {
    isSelecting,
    addSelectedMeal,
  };
}
