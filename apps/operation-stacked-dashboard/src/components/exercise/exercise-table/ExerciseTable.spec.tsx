// ExerciseTable.spec.tsx
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ExerciseTable } from './ExerciseTable';
import { ExerciseApi } from '@operation-stacked/shared-services'; // Adjust import paths as necessary
import '@testing-library/jest-dom';

// Mock the entire module using Vitest
vi.mock('@operation-stacked/shared-services', () => {
  return {
    ExerciseApi: vi.fn(() => ({
      exerciseUserIdAllGet: vi.fn(),
    })),
  };
});

// Helper function for rendering with providers
const renderWithProviders = (ui, { queryClient = new QueryClient(), ...options } = {}) => {
  return render(ui, {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
    ...options,
  });
};

describe('ExerciseTable', () => {
  beforeEach(() => {
    // Clear all implementations and mock return values
    vi.clearAllMocks();
  });

  it('shows loading state correctly', async () => {
    // Spy on the method and delay the response to simulate loading
    const spy = vi.spyOn(ExerciseApi.prototype, 'exerciseUserIdAllGet').mockImplementation(
      () => new Promise(() => {}) // Never resolving promise to simulate loading
    );

    renderWithProviders(<ExerciseTable eventHandler={() => {}} buttonText="Complete" />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    spy.mockRestore(); // Restore the original implementation
  });

  it('shows error message when fetching exercises fails', async () => {
    // Spy on the method and mock a rejected promise to simulate an error
    const spy = vi.spyOn(ExerciseApi.prototype, 'exerciseUserIdAllGet').mockRejectedValue(new Error('Failed to fetch'));

    renderWithProviders(<ExerciseTable eventHandler={() => {}} buttonText="Complete" />);
    await waitFor(() => expect(screen.getByText(/error fetching exercises/i)).toBeInTheDocument());

    spy.mockRestore();
  });

  it('displays "No exercises found" when there are no exercises', async () => {
    // Spy on the method and mock a resolved promise with an empty array
    const spy = vi.spyOn(ExerciseApi.prototype, 'exerciseUserIdAllGet').mockResolvedValue({ data: [] });

    renderWithProviders(<ExerciseTable eventHandler={() => {}} buttonText="Complete" />);
    await waitFor(() => expect(screen.getByText(/no exercises found/i)).toBeInTheDocument());

    spy.mockRestore();
  });

  // Add more tests as needed
});
