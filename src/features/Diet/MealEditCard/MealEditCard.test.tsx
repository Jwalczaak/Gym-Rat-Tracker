import { renderWithClient } from '@/test/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as apiDiet from '@/services/Diet/apiDiet';
import type { FullMeal, MealPer100g } from '@/types/meal';
import MealEditCard from './MealEditCard';

vi.mock('@/components/shared/ Chart/Chart', () => ({
  default: () => null,
}));

vi.mock('@/services/Diet/apiDiet', () => ({
  updateMealLogWeight: vi.fn().mockResolvedValue(undefined),
  deleteMealLog: vi.fn().mockResolvedValue(undefined),
}));

const updateMealLogWeight = vi.mocked(apiDiet.updateMealLogWeight);

const meal: FullMeal = {
  name: 'Chicken Breast',
  weight: 150,
  kcal: 248,
  protein: 46,
  carbs: 0,
  fat: 5,
};

const product: MealPer100g = {
  name: 'Chicken Breast',
  meal_type: 'breakfast',
  id: 'product-1',
  kcal_per_100g: 165,
  fat_per_100g: 3.6,
  carbs_per_100g: 0,
  protein_per_100g: 31,
};

function renderCard() {
  return renderWithClient(
    <MealEditCard
      meal={meal}
      product={product}
      logId="log-1"
      mealType="breakfast"
    />,
  );
}

describe('MealEditCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the meal summary', () => {
    renderCard();

    expect(screen.getByText('Chicken Breast')).toBeInTheDocument();
    expect(screen.getByText('150g')).toBeInTheDocument();
    expect(screen.getByText('248kcal')).toBeInTheDocument();
  });

  it('renders macro values', () => {
    renderCard();

    expect(screen.getByText('46g')).toBeInTheDocument();
    expect(screen.getByText('5g')).toBeInTheDocument();
    expect(screen.getByText('0g')).toBeInTheDocument();
  });

  it('clicking edit opens modal with edit mode', async () => {
    const user = userEvent.setup();
    renderCard();

    expect(screen.queryByText('Edit Existing Meal')).toBeNull();

    const editButton = screen.getByRole('button', { name: /edit/i });

    await user.click(editButton);

    expect(await screen.findByText('Edit Existing Meal')).toBeInTheDocument();
  });

  it('clicking delete opens modal with delete mode', async () => {
    const user = userEvent.setup();
    renderCard();

    expect(screen.queryByText('Delete this meal?')).toBeNull();

    const deleteButton = screen.getByRole('button', { name: /delete/i });

    await user.click(deleteButton);

    expect(await screen.findByText('Delete this meal?')).toBeInTheDocument();
  });
});
