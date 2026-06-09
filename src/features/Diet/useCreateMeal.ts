import { createProduct } from '@/services/Diet/ApiMeal';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateMeal() {
  const queryClient = useQueryClient();
  const { mutate: createMeal, isPending: isCreating } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['meals'],
      });
    },
    onError: (err) => console.error(err.message),
  });
  return {
    isCreating,
    createMeal,
  };
}
