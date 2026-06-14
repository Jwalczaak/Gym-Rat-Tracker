import { addNewItemToMeal } from '@/services/Diet/apiDiet';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useAddSelectedMeal() {
  const queryClient = useQueryClient();

  const { mutateAsync: addSelectedMeal, isPending: isCreating } = useMutation({
    mutationFn: addNewItemToMeal,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['dietPlan'],
      });
    },
    onError: (err) => console.error(err.message),
  });
  return {
    isCreating,
    addSelectedMeal,
  };
}
