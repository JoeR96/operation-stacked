import React from 'react';
import { Story, Meta } from '@storybook/react';
import ExerciseHistoryGraph from './ExerciseHistoryGraph';
import { Exercise } from '../../../../../../libs/shared-services/src';
import { mockExercisesWithMultipleHistory } from '../../../../.storybook/mocks/mockExercises';


export default {
  title: 'Exercise/ExerciseHistoryGraph',
  component: ExerciseHistoryGraph,
} as Meta;

const Template: Story<{ exercises: Exercise[]; toggle: 'weight' | 'volume' }> = (args) => <ExerciseHistoryGraph {...args} />;

export const Weight = Template.bind({});
Weight.args = {
  exercises: mockExercisesWithMultipleHistory,
  toggle: 'weight', // or 'volume'
};
export const Volume = Template.bind({});
Volume.args = {
  exercises: mockExercisesWithMultipleHistory,
  toggle: 'volume', // or 'volume'
};
