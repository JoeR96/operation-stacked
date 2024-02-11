// ExerciseTable.stories.js
import React from 'react';
import { ExerciseTable, ExerciseTableProps } from './ExerciseTable';
import { useUserStore } from '../../../state/userState';
import type { Meta, StoryFn } from '@storybook/react';
import {
  exercisesLoadedHandler,
  loadingStateHandler,
  noExercisesHandler,
  errorStateHandler,
} from '../../../../.storybook/mocks/handlers';

export default {
  title: 'Exercise/ExerciseTable',
  component: ExerciseTable,
} as Meta<ExerciseTableProps>;

const withUserId = (userId: string) => (Story: StoryFn) => {
  useUserStore.getState().setUserId(userId);
  return <Story />;
};

// ExercisesLoaded Story
export const ExercisesLoaded: StoryFn<ExerciseTableProps> = (args) => <ExerciseTable {...args} />;
ExercisesLoaded.decorators = [withUserId('1')];
ExercisesLoaded.args = {
  onCompleteClick: (exercise) => console.log(`Complete button clicked for exercise: ${exercise.ExerciseName}`), // Adjusted property name for demonstration
  buttonText: 'Select',
};
ExercisesLoaded.parameters = {
  msw: {
    handlers: [exercisesLoadedHandler],
  },
};

// LoadingState Story
export const LoadingState: StoryFn<ExerciseTableProps> = (args) => <ExerciseTable {...args} />;
LoadingState.decorators = [withUserId('2')];
LoadingState.args = {}; // Specify default props or required props if necessary
LoadingState.parameters = {
  msw: {
    handlers: [loadingStateHandler],
  },
};

// NoExercises Story
export const NoExercises: StoryFn<ExerciseTableProps> = (args) => <ExerciseTable {...args} />;
NoExercises.decorators = [withUserId('3')];
NoExercises.args = {}; // Specify default props or required props if necessary
NoExercises.parameters = {
  msw: {
    handlers: [noExercisesHandler],
  },
};

// ErrorState Story
export const ErrorState: StoryFn<ExerciseTableProps> = (args) => <ExerciseTable {...args} />;
ErrorState.decorators = [withUserId('4')];
ErrorState.args = {}; // Specify default props or required props if necessary
ErrorState.parameters = {
  msw: {
    handlers: [errorStateHandler],
  },
};
