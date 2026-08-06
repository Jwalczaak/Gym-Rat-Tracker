import Modal from '@/components/shared/Modal/Modal';
import { Button } from '@/components/ui/button';
import { renderWithClient } from '@/test/test-utils';
import { screen } from '@testing-library/react';
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
      // TODO: withOnBack: true
      // - button ma name /back/i
      // - onBack wywołany raz
      // - queryModalBody() nadal w dokumencie (close NIE poszło)
    });

    it('shows "Close" and closes the modal when onBack is not provided', async () => {
      // TODO: withOnBack: false
      // - button ma name /close/i
      // - po kliknięciu queryModalBody() === null
      // Tu nie masz szpiega na close — zniknięcie treści JEST asercją.
    });
  });

  describe('submit', () => {
    it('calls onSubmit with the current grams', async () => {
      // TODO: otwórz, ustaw gramy (quick button lub wpisz w input
      // getByLabelText(/quantity in grams/i)), kliknij Save.
      // expect(onSubmit).toHaveBeenCalledWith(<liczba>)
    });

    it('closes the modal after a successful submit', async () => {
      // TODO: Save -> await waitFor(() => expect(queryModalBody()).toBeNull())
      // waitFor jest konieczny: close() dzieje się po awaicie, w mikrotasku.
    });

    it('shows an error toast and keeps the modal open when onSubmit rejects', async () => {
      // TODO: onSubmit.mockRejectedValue(new Error('boom')) przed openModal
      // - await waitFor(() => expect(toastError).toHaveBeenCalledWith('Can not select the meal'))
      // - queryModalBody() nadal w dokumencie
      // - komponent robi console.error(err) -> rozważ
      //   vi.spyOn(console, 'error').mockImplementation(() => {}),
      //   żeby output testów był czysty
    });

    it('shows a spinner while onSubmit is in flight', async () => {
      // TODO: ten sam trik co w SearchMeal — trzymany promise:
      //   let resolveSubmit!: () => void;
      //   onSubmit.mockReturnValue(new Promise<void>((r) => { resolveSubmit = r; }));
      // Save -> getByRole('status') istnieje -> resolveSubmit() -> znika.
    });
  });
});
