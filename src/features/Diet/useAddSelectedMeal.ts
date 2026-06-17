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
    // Errors are owned by the caller (SelectMeal's submit catch), so the
    // rejection isn't handled twice. Keep this hook a pure data wrapper.
  });
  return {
    isSelecting,
    addSelectedMeal,
  };
}
