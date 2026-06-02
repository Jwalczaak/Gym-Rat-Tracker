import Modal from '@/components/shared/Modal/Modal';
import { Button } from '@/components/ui/button';
import { HiPlus } from 'react-icons/hi2';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IoSearch } from 'react-icons/io5';
import { FiPlus } from 'react-icons/fi';
import { Badge } from '@/components/ui/badge';
import SearchMeal from '../SearchMeal/SearchMeal';

const triggerClass =
  'group cursor-pointer text-fg-muted hover:text-foreground data-active:text-brand data-active:hover:text-brand data-active:after:bg-brand';

const AddMeal = () => {
  return (
    <Modal>
      <Modal.Open opens="meal-form">
        <Button variant="outline" size="default" className="cursor-pointer">
          <HiPlus className="size-5" />
          <span>Add meal</span>
        </Button>
      </Modal.Open>
      <Modal.Window name="meal-form">
        <Modal.Header>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 text-lg font-semibold">
              <span>Add Meal</span>
              <span className="text-brand">Breakfast</span>
            </div>
            <span className="text-fg-muted">
              Find an existing product in your database, or create a new one
            </span>

            <div>
              <Tabs defaultValue="search">
                <TabsList variant="line">
                  <TabsTrigger value="search" className={triggerClass}>
                    <IoSearch className="size-6" />
                    <span>Search database</span>
                    <Badge
                      variant="secondary"
                      className="group-data-active:bg-brand/15 group-data-active:text-brand"
                    >
                      16
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="create" className={triggerClass}>
                    <FiPlus className="size-6" />
                    Create new product
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </Modal.Header>
        {/* <CreateMealForm /> */}
        <div>
          <SearchMeal />
        </div>
        <Modal.Footer>
          <div className="flex items-center justify-between">
            <span className="text-fg-muted">
              Find an existing product in your database, or create a new one
            </span>
            <Button variant="ghost">Cancel</Button>
          </div>
        </Modal.Footer>
      </Modal.Window>
    </Modal>
  );
};

export default AddMeal;
