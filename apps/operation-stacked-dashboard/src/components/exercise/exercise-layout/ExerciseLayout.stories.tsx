import React from 'react';
import { useUserStore } from '../../../state/userState';
import type { Meta, StoryFn } from '@storybook/react';
import {
  exercisesLoadedHandler,
  loadingStateHandler,
  noExercisesHandler,
  errorStateHandler,
} from '../../../../.storybook/mocks/handlers';
import ExerciseLayout from './ExerciseLayout';

export default {
  title: 'Exercise/ExerciseLayout',
  component: ExerciseLayout,
} as Meta;

const withUserId = (userId: string) => (Story: StoryFn) => {
  useUserStore.getState().setUserId(userId);
  return <Story />;
};

const Template: StoryFn<React.ReactNode> = (args) => <ExerciseLayout />;

export const ExercisesLoaded = Template.bind({});
ExercisesLoaded.decorators = [withUserId('1')];
ExercisesLoaded.args = {};
ExercisesLoaded.parameters = {
  msw: {
    handlers: [exercisesLoadedHandler],
  },
};

export const LoadingState = Template.bind({});
LoadingState.decorators = [withUserId('2')];
LoadingState.args = {};
LoadingState.parameters = {
  msw: {
    handlers: [loadingStateHandler],
  },
};

export const NoExercises = Template.bind({});
NoExercises.decorators = [withUserId('3')];
NoExercises.args = {};
NoExercises.parameters = {
  msw: {
    handlers: [noExercisesHandler],
  },
};

export const ErrorState = Template.bind({});
ErrorState.decorators = [withUserId('4')];
ErrorState.args = {};
ErrorState.parameters = {
  msw: {
    handlers: [errorStateHandler],
  },
};
