import { render, screen } from '@testing-library/react';
import Protected from './Protected';

test('renders Protected', () => {
  render(<Protected />);
  const text = screen.getByText(/Protected/i);
  expect(text).toBeInTheDocument();
});
