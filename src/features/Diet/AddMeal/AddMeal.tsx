import Modal from '@/components/shared/Modal/Modal';
import { Button } from '@/components/ui/button';
import { HiPlus } from 'react-icons/hi2';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IoSearch } from 'react-icons/io5';
import { FiPlus } from 'react-icons/fi';
import { Badge } from '@/components/ui/badge';
import SearchMeal from '../SearchMeal/SearchMeal';
import { useState } from 'react';
import CreateMealForm from '../CreateMealForm/CreateMealForm';
import type { MealPer100g } from '@/types/meal';
import SelectMeal from '../SelectMeal/SelectMeal';

type Tab = 'search' | 'create' | 'select';

const triggerClass =
  'group cursor-pointer text-fg-muted hover:text-foreground data-active:text-brand data-active:hover:text-brand data-active:after:bg-brand';

const AddMeal = () => {
  const [activeTab, setActiveTab] = useState<Tab>('search');
  const [selectedMeal, setSelectedMeal] = useState<MealPer100g | null>(null);

  function handleSelectMeal(meal: MealPer100g) {
    setSelectedMeal(meal);
    setActiveTab('select');
  }

  const tabContent: Record<Tab, () => React.ReactNode> = {
    search: () => <SearchMeal onSelectMeal={handleSelectMeal} />,
    create: () => <CreateMealForm />,
    select: () =>
      selectedMeal && (
        <SelectMeal
          meal={selectedMeal}
          onBack={() => {
            setSelectedMeal(null);
            setActiveTab('search');
          }}
        />
      ),
  };

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
              <Tabs
                value={activeTab === 'select' ? 'search' : activeTab}
                onValueChange={(v) => setActiveTab(v as Tab)}
              >
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
        {tabContent[activeTab]()}
      </Modal.Window>
    </Modal>
  );
};

export default AddMeal;
