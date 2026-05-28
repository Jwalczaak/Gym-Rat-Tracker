import Modal from '@/components/shared/Modal/Modal';
import { Button } from '@/components/ui/button';
import { HiPlus } from 'react-icons/hi2';

const AddMeal = () => {
  return (
    <Modal>
      <Modal.Open opens="meal-form">
        <Button variant="outline" size="default">
          <HiPlus className="size-5" />
          <span>Add meal</span>
        </Button>
      </Modal.Open>
      <Modal.Window name="meal-form">dsadas</Modal.Window>
    </Modal>
  );
};

export default AddMeal;
