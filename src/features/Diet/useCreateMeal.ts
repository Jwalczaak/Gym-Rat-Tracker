import { createProduct } from '@/services/Diet/ApiMeal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useCreateMeal() {
  const queryClient = useQueryClient();
  const { mutate: createMeal, isPending: isCreating } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['meals'],
      });
      // Success toast lives at the call site (CreateMealForm): this mutation
      // is composed with addSelectedMeal, so only the caller knows whether
      // the whole create→log chain finished.
    },
    onError: (err) => {
      toast.error('Could not create the meal');
      console.error(err.message);
    },
  });
  return {
    isCreating,
    createMeal,
  };
}
