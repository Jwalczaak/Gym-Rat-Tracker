import { render, screen } from '@testing-library/react';
import DayKcalSummary from './DayKcalSummary';

const kcalMacro = {
  protein: 15,
  fat: 8,
  carbs: 24,
  kcal: 250,
} as const;

const selectedDay = '2026-06-07';

describe('DayKcalSummary', () => {
  it('renders date and macro data', () => {
    render(<DayKcalSummary macroData={kcalMacro} selectedDay={selectedDay} />);

    expect(screen.getByText('Protein')).toBeInTheDocument();
    expect(screen.getByText('15g')).toBeInTheDocument();
    expect(screen.getByText('Carbs')).toBeInTheDocument();
    expect(screen.getByText('24g')).toBeInTheDocument();
    expect(screen.getByText('Fats')).toBeInTheDocument();
    expect(screen.getByText('8g')).toBeInTheDocument();
  });
});
