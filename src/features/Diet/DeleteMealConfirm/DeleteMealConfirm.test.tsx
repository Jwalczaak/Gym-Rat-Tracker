import { renderWithClient } from '@/test/test-utils';
import DeleteMealConfirm from './DeleteMealConfirm';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as apiDiet from '@/services/Diet/apiDiet';
import { Button } from '@/components/ui/button';
import Modal from '@/components/shared/Modal/Modal';

vi.mock('@/services/Diet/apiDiet', () => ({
  deleteMealLog: vi.fn().mockResolvedValue(undefined),
}));

const deleteMealLog = vi.mocked(apiDiet.deleteMealLog);

function renderMealConfirm() {
  const logId = 'log-1';
  const mealName = 'Chicken Breast';
  const weight = 150;
  const mealType = 'breakfast';

  return renderWithClient(
    <Modal>
      <Modal.Open opens="delete">
        <Button>Open</Button>
      </Modal.Open>
      <Modal.Window name="delete">
        <DeleteMealConfirm
          logId={logId}
          mealName={mealName}
          weight={weight}
          mealType={mealType}
        />
      </Modal.Window>
    </Modal>,
  );
}

describe('DeleteMealConfirm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('is closed initially', () => {
    renderMealConfirm();

    expect(screen.queryByText('Delete this meal?')).toBeNull();
  });

  it('opens when trigger clicked', async () => {
    const user = userEvent.setup();
    renderMealConfirm();
    await user.click(screen.getByRole('button', { name: /open/i }));
    expect(screen.getByText('Delete this meal?')).toBeInTheDocument();
  });

  it('renders the meal details', async () => {
    const user = userEvent.setup();

    renderMealConfirm();

    await user.click(screen.getByRole('button', { name: /open/i }));
    expect(screen.getByText('Chicken Breast')).toBeInTheDocument();
    expect(screen.getByText(/150g/)).toBeInTheDocument();
    expect(screen.getByText('breakfast')).toBeInTheDocument();
  });

  it('closes opened modal', async () => {
    const user = userEvent.setup();
    renderMealConfirm();

    await user.click(screen.getByRole('button', { name: /open/i }));
    await user.click(screen.getByRole('button', { name: /cancel/i }));

    expect(screen.queryByText('Delete this meal?')).toBeNull();
  });

  it('deletes the meal by logId when confirmed', async () => {
    const user = userEvent.setup();
    renderMealConfirm();

    await user.click(screen.getByRole('button', { name: /open/i }));
    await user.click(screen.getByRole('button', { name: /delete meal/i }));

    expect(deleteMealLog).toHaveBeenCalledWith('log-1');
  });

  it('closes modal after sucessful delete', async () => {
    const user = userEvent.setup();
    renderMealConfirm();

    await user.click(screen.getByRole('button', { name: /open/i }));
    await user.click(screen.getByRole('button', { name: /delete meal/i }));

    await waitFor(() => {
      expect(screen.queryByText('Delete this meal?')).toBeNull();
    });
  });
});
