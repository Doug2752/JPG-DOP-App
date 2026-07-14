import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';

test('render pipeline works', () => {
  render(<div>Hello DOP</div>);
  expect(screen.getByText('Hello DOP')).toBeInTheDocument();
});
