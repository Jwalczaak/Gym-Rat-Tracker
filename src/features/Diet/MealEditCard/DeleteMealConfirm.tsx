import { Button } from '@/components/ui/button';
import Modal, { useModalContext } from '@/components/shared/Modal/Modal';
import { CiTrash } from 'react-icons/ci';
import { useDeleteMeal } from '../useDeleteMeal';

type DeleteMealConfirmProps = {
  logId: string;
  mealName: string;
  weight: number;
  mealType: string;
};

const DeleteMealConfirm = ({
  logId,
  mealName,
  weight,
  mealType,
}: DeleteMealConfirmProps) => {
  const { deleteMeal, isDeleting } = useDeleteMeal();
  const { close } = useModalContext();

  const handleDelete = () => {
    deleteMeal(logId, { onSuccess: close });
  };

  return (
    <>
      <Modal.Header>
        <div className="flex flex-col items-center gap-2">
          <div className="rounded-full bg-red-100 p-3">
            <CiTrash className="size-8 text-red-600" />
          </div>
          <span className="text-lg font-semibold">Delete this meal?</span>
        </div>
      </Modal.Header>

      <div className="px-6 py-4 text-center">
        <p className="text-fg-muted">
          <span className="text-foreground font-semibold">{mealName}</span> (
          {weight}g) will be removed from{' '}
          <span className="capitalize">{mealType}</span>. This can't be undone.
        </p>
      </div>

      <Modal.Footer>
        <div className="flex justify-end gap-2">
          <Modal.Close>
            <Button variant="ghost" type="button" className="cursor-pointer">
              Cancel
            </Button>
          </Modal.Close>
          <Button
            variant="destructive"
            type="button"
            className="cursor-pointer"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting…' : 'Delete meal'}
          </Button>
        </div>
      </Modal.Footer>
    </>
  );
};

export default DeleteMealConfirm;
