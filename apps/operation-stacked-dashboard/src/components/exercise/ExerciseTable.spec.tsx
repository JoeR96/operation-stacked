import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { mockExercises } from '../../../.storybook/mocks/mockExercises';
import { useExerciseStore } from '../../state/exerciseState';
import { useUserStore } from '../../state/userState';
import React from 'react';
import { ExerciseTable } from './ExerciseTable'; // Adjust path as necessary
import '@testing-library/jest-dom'
// Mocking the Zustand stores directly with predefined states
vi.mock('../../state/exerciseState', () => ({
  useExerciseStore: vi.fn(() => ({ exercises: [] })),
}));

vi.mock('../../state/userState', () => ({
  useUserStore: vi.fn(() => ({ userId: '1234', username: 'mock-username' })),
}));

describe('ExerciseTable', () => {
  beforeEach(() => {
    // Directly setting the mock return values for each test as needed
    vi.mocked(useExerciseStore).mockReturnValue({
      exercises: [],
      // Other state properties or actions as needed
    });
    vi.mocked(useUserStore).mockReturnValue({
      userId: '1234',
      username: 'mock-username',
      // Other state properties or actions as needed
    });
  });

  it('renders without exercises and shows no exercises found message', () => {
    render(<ExerciseTable buttonText="Complete" onCompleteClick={() => {}} />);
    expect(screen.getByText('No exercises found')).toBeInTheDocument();
  });

  it('renders with exercises and groups them correctly', () => {
    vi.mocked(useExerciseStore).mockReturnValue({ exercises: mockExercises });
    render(<ExerciseTable buttonText="Complete" onCompleteClick={() => {}} />);

    for (let exercise of mockExercises) {
      expect(screen.getByText(exercise.ExerciseName as string)).toBeInTheDocument()
    }
  });

});
