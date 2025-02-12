import { render, screen } from '@testing-library/react';
import App from './App';

test('renders connect wallet button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/connect wallet/i);
  expect(buttonElement).toBeInTheDocument();
});
