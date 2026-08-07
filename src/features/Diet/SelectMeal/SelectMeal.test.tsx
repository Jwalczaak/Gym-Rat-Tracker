import Modal from '@/components/shared/Modal/Modal';
import { Button } from '@/components/ui/button';
import { renderWithClient } from '@/test/test-utils';
import { screen, waitFor } from '@testing-library/react';
import userEvent, { type UserEvent } from '@testing-library/user-event';
import { toast } from 'sonner';
import SelectMeal from './SelectMeal';
import type { MealPer100g } from '@/types/meal';

vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

const toastError = vi.mocked(toast.error);

function makeMeal(overrides: Partial<MealPer100g> = {}): MealPer100g {
  return {
    name: 'Chicken Breast',
    meal_type: 'dinner',
    id: '0',
    kcal_per_100g: 350,
    fat_per_100g: 12,
    carbs_per_100g: 43,
    protein_per_100g: 41,
    ...overrides,
  };
}

type RenderOptions = {
  meal?: MealPer100g;
  initialGrams?: number;
  withOnBack?: boolean;
};

function renderSelectMeal({
  meal = makeMeal(),
  initialGrams,
  withOnBack = false,
}: RenderOptions = {}) {
  const onBack = vi.fn<() => void>();
  const onSubmit = vi
    .fn<(grams: number) => Promise<unknown>>()
    .mockResolvedValue(undefined);

  return {
    meal,
    onBack,
    onSubmit,
    ...renderWithClient(
      <Modal>
        <Modal.Open opens="select-meal">
          <Button>Open</Button>
        </Modal.Open>
        <Modal.Window name="select-meal">
          <SelectMeal
            meal={meal}
            initialGrams={initialGrams}
            onSubmit={onSubmit}
            onBack={withOnBack ? onBack : undefined}
          />
        </Modal.Window>
      </Modal>,
    ),
  };
}

async function openModal(user: UserEvent) {
  await user.click(screen.getByRole('button', { name: /open/i }));
}

function queryModalBody() {
  return screen.queryByText(/logging \d+g to this meal/i);
}

describe('SelectMeal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('is closed initially', () => {
    renderSelectMeal();
    expect(queryModalBody()).toBeNull();
  });

  it('renders the meal name and per-100g macros', async () => {
    renderSelectMeal();
    const user = userEvent.setup();
    await openModal(user);
    expect(screen.getByText('Chicken Breast')).toBeInTheDocument();
    expect(screen.getByText('350 kcal')).toBeInTheDocument();
    expect(screen.getByText('41P')).toBeInTheDocument();
    expect(screen.getByText('12F')).toBeInTheDocument();
    expect(screen.getByText('43C /')).toBeInTheDocument();
  });

  it('starts with initialGrams and recalculates macros on quick-gram click', async () => {
    renderSelectMeal({ initialGrams: 100 });
    const user = userEvent.setup();

    await openModal(user);
    const button200g = screen.getByRole('button', { name: /200g/i });
    await user.click(button200g);
    expect(screen.getByText('Logging 200g to this meal')).toBeInTheDocument();
  });

  describe('secondary action', () => {
    it('shows "Back" and calls onBack without closing the modal', async () => {
      const { onBack } = renderSelectMeal({ withOnBack: true });
      const user = userEvent.setup();
      await openModal(user);
      const buttonBack = screen.getByRole('button', { name: /back/i });
      await user.click(buttonBack);

      expect(onBack).toHaveBeenCalledTimes(1);
      expect(queryModalBody()).toBeInTheDocument();
    });

    it('shows "Close" and closes the modal when onBack is not provided', async () => {
      renderSelectMeal();

      const user = userEvent.setup();
      await openModal(user);
      const buttonCancel = screen.getByRole('button', { name: /close/i });
      await user.click(buttonCancel);

      expect(queryModalBody()).toBeNull();
    });
  });

  describe('submit', () => {
    it('submits the value typed into the input', async () => {
      const user = userEvent.setup();
      const { onSubmit } = renderSelectMeal({ initialGrams: 100 });

      await openModal(user);

      const quantityInput = screen.getByLabelText(/quantity in grams/i);
      await user.clear(quantityInput);
      await user.type(quantityInput, '175');

      await user.click(screen.getByRole('button', { name: /save/i }));

      expect(onSubmit).toHaveBeenCalledWith(175);
    });

    it('closes the modal after a successful submit', async () => {
      const user = userEvent.setup();
      renderSelectMeal({ initialGrams: 100 });

      await openModal(user);

      await user.click(screen.getByRole('button', { name: /save/i }));

      expect(queryModalBody()).toBeNull();
    });

    it('shows an error toast and keeps the modal open when onSubmit rejects', async () => {
      const user = userEvent.setup();
      const { onSubmit } = renderSelectMeal({ initialGrams: 100 });

      let rejectSubmit!: (e: Error) => void;
      onSubmit.mockReturnValue(
        new Promise<void>((_, reject) => {
          rejectSubmit = reject;
        }),
      );

      await openModal(user);
      await user.click(screen.getByRole('button', { name: /save/i }));

      expect(screen.getByRole('status')).toBeInTheDocument();
      rejectSubmit(new Error('boom'));
      await waitFor(() => expect(toastError).toHaveBeenCalled());
    });

    it('shows a spinner while onSubmit is in flight', async () => {
      const user = userEvent.setup();
      const { onSubmit } = renderSelectMeal({ initialGrams: 100 });

      let resolveSubmit!: () => void;
      onSubmit.mockReturnValue(
        new Promise<void>((resolve) => {
          resolveSubmit = resolve;
        }),
      );

      await openModal(user);
      await user.click(screen.getByRole('button', { name: /save/i }));

      expect(screen.getByRole('status')).toBeInTheDocument();

      resolveSubmit();
      await waitFor(() => {
        expect(screen.queryByRole('status')).toBeNull();
      });
    });
  });
});
