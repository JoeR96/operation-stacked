import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import ExerciseHistoryView, { ExerciseHistoryViewProps } from './ExerciseHistoryView';
import { useUserStore } from '../../../state/userState';
import { exerciseHistoryHandler } from '../../../../.storybook/mocks/handlers';


export default {
  title: 'ExerciseHistory/ExerciseHistoryView',
  component: ExerciseHistoryView,
} as Meta<ExerciseHistoryViewProps>;

const withUserId = (userId: string) => (Story: StoryFn) => {
  useUserStore.getState().setUserId(userId);
  return <Story />;
};

export const ExercisesLoaded: StoryFn<ExerciseHistoryViewProps> = (args) => <ExerciseHistoryView {...args} />;
ExercisesLoaded.decorators = [withUserId('1')];
ExercisesLoaded.args = {
  exercise: { Id: '1234',
  ExerciseName:'Squat',
    UserId:'1234',
    Category: 5,
    EquipmentType: 1
  },
};
ExercisesLoaded.parameters = {
  msw: {
    handlers: [exerciseHistoryHandler],
  },
};