import Modal from '@/components/shared/Modal/Modal';
import { Button } from '@/components/ui/button';
import * as apiMeal from '@/services/Diet/ApiMeal';
import { renderWithClient } from '@/test/test-utils';
import { screen, waitFor } from '@testing-library/react';
import userEvent, { type UserEvent } from '@testing-library/user-event';
import SearchMeal from './SearchMeal';
import type { MealPer100g } from '@/types/meal';

vi.mock('@/services/Diet/ApiMeal', () => ({
  fetchMeals: vi.fn(),
}));

const fetchMeals = vi.mocked(apiMeal.fetchMeals);

function makeMeal(overrides: Partial<MealPer100g> = {}): MealPer100g {
  return {
    name: 'Chicken Breast',
    meal_type: 'dinner',
    id: '0',
    kcal_per_100g: 350,
    fat_per_100g: 10,
    carbs_per_100g: 40,
    protein_per_100g: 40,
    ...overrides,
  };
}

function renderSearchMeal() {
  const onSelectMeal = vi.fn<(meal: MealPer100g) => void>();

  return {
    onSelectMeal,
    ...renderWithClient(
      <Modal>
        <Modal.Open opens="meal-add-form">
          <Button>Open</Button>
        </Modal.Open>
        <Modal.Window name="meal-add-form">
          <SearchMeal onSelectMeal={onSelectMeal} />
        </Modal.Window>
      </Modal>,
    ),
  };
}

async function openModal(user: UserEvent) {
  await user.click(screen.getByRole('button', { name: /open/i }));
}

describe('SearchMeal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    fetchMeals.mockResolvedValue([]);
  });

  it('is closed initially', () => {
    renderSearchMeal();

    expect(
      screen.queryByText('Pick a product to set grams or servings'),
    ).toBeNull();
  });

  it('opens when the trigger is clicked', async () => {
    const user = userEvent.setup();
    renderSearchMeal();
    await openModal(user);

    expect(
      screen.queryByText('Pick a product to set grams or servings'),
    ).toBeInTheDocument();
  });

  it('shows a spinner while the query is in flight', async () => {
    const user = userEvent.setup();

    let resolveFetch!: (meals: MealPer100g[]) => void;
    fetchMeals.mockReturnValue(
      new Promise((resolve) => {
        resolveFetch = resolve;
      }),
    );

    renderSearchMeal();

    await openModal(user);

    expect(screen.getByRole('status')).toBeInTheDocument();

    resolveFetch([]);
    await waitFor(() => {
      expect(screen.queryByRole('status')).toBeNull();
    });
  });

  it('renders a card per returned meal', async () => {
    const user = userEvent.setup();

    fetchMeals.mockResolvedValue([
      makeMeal({ id: '1', name: 'Oatmeal' }),
      makeMeal({ id: '2', name: 'Avocado toasts' }),
    ]);

    renderSearchMeal();

    await openModal(user);

    expect(screen.getByText('Oatmeal')).toBeInTheDocument();
    expect(screen.getByText('Avocado toasts')).toBeInTheDocument();
  });

  it('refetches with the typed phrase after the debounce', async () => {
    const user = userEvent.setup();
    renderSearchMeal();

    await openModal(user);

    expect(fetchMeals).toHaveBeenCalledWith('', 'breakfast');
    expect(fetchMeals).toHaveBeenCalledTimes(1);

    await user.type(screen.getByPlaceholderText(/search products/i), 'chick');

    expect(fetchMeals).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(fetchMeals).toHaveBeenCalledWith('chick', 'breakfast');
    });

    expect(fetchMeals).toHaveBeenCalledTimes(2);
    expect(fetchMeals).not.toHaveBeenCalledWith('c', 'breakfast');
    expect(fetchMeals).not.toHaveBeenCalledWith('chic', 'breakfast');
  });

  it('calls onSelectMeal with the clicked meal', async () => {
    const user = userEvent.setup();
    const chicken = makeMeal({ id: '1', name: 'Chicken Breast' });
    fetchMeals.mockResolvedValue([chicken]);

    const { onSelectMeal } = renderSearchMeal();

    await openModal(user);

    const name = await screen.findByText('Chicken Breast');

    await user.click(name.closest('[data-slot="card"]')!);

    expect(onSelectMeal).toHaveBeenCalledTimes(1);
    expect(onSelectMeal).toHaveBeenCalledWith(chicken);
  });

  it('closes when Cancel is clicked', async () => {
    const user = userEvent.setup();
    renderSearchMeal();
    await openModal(user);

    await user.click(screen.getByRole('button', { name: /cancel/i }));

    expect(
      screen.queryByText('Pick a product to set grams or servings'),
    ).toBeNull();
  });
});
