import { render, screen } from '@testing-library/react';
import type { Macro } from '@/types/meal';
import CountedMacro from './CountedMacro';

const macro: Macro = {
  protein: 40.7,
  fat: 30.2,
  carbs: 80.9,
  kcal: 690.1223,
};

describe('countedMacro', () => {
  it('renders rounded macro values', () => {
    render(<CountedMacro macro={macro} />);

    expect(screen.getByText('690')).toBeInTheDocument();
    expect(screen.getByText('41g')).toBeInTheDocument();
    expect(screen.getByText('30g')).toBeInTheDocument();
    expect(screen.getByText('81g')).toBeInTheDocument();
  });

  it('renders macro labels', () => {
    render(<CountedMacro macro={macro} />);

    expect(screen.getByText('Kcal')).toBeInTheDocument();
    expect(screen.getByText('Protein')).toBeInTheDocument();
    expect(screen.getByText('Fat')).toBeInTheDocument();
    expect(screen.getByText('Carbs')).toBeInTheDocument();
  });
});
