// ExerciseTable.stories.js
import React from 'react';
import { ExerciseTable, ExerciseTableProps } from './ExerciseTable';
import { useUserStore } from '../../state/userState';
import type { Meta, StoryFn } from '@storybook/react';
import {
  exercisesLoadedHandler,
  loadingStateHandler,
  noExercisesHandler,
  errorStateHandler,
} from '../../../.storybook/mocks/handlers';

export default {
  title: 'Exercise/ExerciseTable',
  component: ExerciseTable,
} as Meta;

const withUserId = (userId: string) => (Story: StoryFn<ExerciseTableProps>) => {
  useUserStore.getState().setUserId(userId);
  return <Story />;
};

export const ExercisesLoaded: StoryFn<ExerciseTableProps> = {
  decorators: [withUserId('1')],
  args: {
    onCompleteClick: (exercise) => console.log(`Complete button clicked for exercise: ${exercise.ExerciseName}`),
    buttonText: 'Select',
  },
  parameters: {
    msw: {
      handlers: [exercisesLoadedHandler],
    },
  },
};

export const LoadingState: StoryFn<ExerciseTableProps> = {
  decorators: [withUserId('2')],
  args: {},
  parameters: {
    msw: {
      handlers: [loadingStateHandler],
    },
  },
};

export const NoExercises: StoryFn<ExerciseTableProps> = {
  decorators: [withUserId('3')],
  args: {},
  parameters: {
    msw: {
      handlers: [noExercisesHandler],
    },
  },
};

export const ErrorState: StoryFn<ExerciseTableProps> = {
  decorators: [withUserId('4')],
  args: {},
  parameters: {
    msw: {
      handlers: [errorStateHandler],
    },
  },
};
