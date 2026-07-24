import { renderWithClient } from '@/test/test-utils';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import * as ApiMeal from '@/services/Diet/ApiMeal';
import * as apiDiet from '@/services/Diet/apiDiet';
import Modal from '@/components/shared/Modal/Modal';
import { Button } from '@/components/ui/button';
import CreateMealForm from './CreateMealForm';

vi.mock('@/services/Diet/ApiMeal', () => ({
  createProduct: vi.fn().mockResolvedValue({ id: 'meal-1' }),
}));

vi.mock('@/services/Diet/apiDiet', () => ({
  addNewItemToMeal: vi.fn().mockResolvedValue(undefined),
}));

const createProduct = vi.mocked(ApiMeal.createProduct);
const addNewItemToMeal = vi.mocked(apiDiet.addNewItemToMeal);

function renderForm() {
  return renderWithClient(
    <MemoryRouter initialEntries={['/diet?day=2026-07-24']}>
      <Modal>
        <Modal.Open opens="create">
          <Button>Open</Button>
        </Modal.Open>
        <Modal.Window name="create">
          <CreateMealForm />
        </Modal.Window>
      </Modal>
    </MemoryRouter>,
  );
}

async function openForm(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('button', { name: /open/i }));
}

describe('CreateMealForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with correct data', async () => {
    const user = userEvent.setup();
    renderForm();
    await openForm(user);

    expect(screen.getByLabelText('Product name')).toBeInTheDocument();
    expect(screen.getByLabelText('Kcal')).toBeInTheDocument();
    expect(screen.getByLabelText('Protein')).toBeInTheDocument();
    expect(screen.getByLabelText('Fat')).toBeInTheDocument();
    expect(screen.getByLabelText('Carbs')).toBeInTheDocument();
    expect(screen.getByLabelText('Log to this meal')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
  });

  it('disables Save until every required field is filled', async () => {
    const user = userEvent.setup();
    renderForm();
    await openForm(user);

    const saveButton = screen.getByRole('button', { name: /save/i });
    expect(saveButton).toBeDisabled();

    await user.type(screen.getByLabelText('Product name'), 'Oatmeal');
    await user.type(screen.getByLabelText('Kcal'), '380');
    await user.type(screen.getByLabelText('Protein'), '13');
    await user.type(screen.getByLabelText('Fat'), '7');
    // still missing Carbs
    expect(saveButton).toBeDisabled();

    await user.type(screen.getByLabelText('Carbs'), '67');
    expect(saveButton).toBeEnabled();
  });

  it('treats a macro of 0 as a set value (Save stays enabled)', async () => {
    const user = userEvent.setup();
    renderForm();
    await openForm(user);

    await user.type(screen.getByLabelText('Product name'), 'Oatmeal');
    await user.type(screen.getByLabelText('Kcal'), '380');
    await user.type(screen.getByLabelText('Protein'), '13');
    await user.type(screen.getByLabelText('Fat'), '0');
    await user.type(screen.getByLabelText('Carbs'), '67');

    expect(screen.getByRole('button', { name: /save/i })).toBeEnabled();
  });

  it('saves the meal and logs the eaten amount', async () => {
    const user = userEvent.setup();
    renderForm();
    await openForm(user);

    await user.type(screen.getByLabelText('Product name'), 'Oatmeal');
    await user.type(screen.getByLabelText('Kcal'), '380');
    await user.type(screen.getByLabelText('Protein'), '13');
    await user.type(screen.getByLabelText('Fat'), '7');
    await user.type(screen.getByLabelText('Carbs'), '67');
    await user.type(screen.getByLabelText('Log to this meal'), '50');

    await user.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(createProduct).toHaveBeenCalledWith(
        {
          name: 'Oatmeal',
          kcal_per_100g: 380,
          protein_per_100g: 13,
          fat_per_100g: 7,
          carbs_per_100g: 67,
          meal_type: 'breakfast',
        },
        expect.anything(),
      );
    });

    await waitFor(() => {
      expect(addNewItemToMeal).toHaveBeenCalledWith(
        {
          meal_id: 'meal-1',
          log_date: '2026-07-24',
          eaten: false,
          weight: 50,
        },
        expect.anything(),
      );
    });
  });

  it('creates the meal but does not log it when grams is 0', async () => {
    const user = userEvent.setup();
    renderForm();
    await openForm(user);

    await user.type(screen.getByLabelText('Product name'), 'Oatmeal');
    await user.type(screen.getByLabelText('Kcal'), '380');
    await user.type(screen.getByLabelText('Protein'), '13');
    await user.type(screen.getByLabelText('Fat'), '7');
    await user.type(screen.getByLabelText('Carbs'), '67');

    await user.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(createProduct).toHaveBeenCalledTimes(1);
    });
    expect(addNewItemToMeal).not.toHaveBeenCalled();
  });
});
