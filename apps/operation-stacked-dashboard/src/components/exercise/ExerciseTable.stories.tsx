import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ExerciseTable, ExerciseTableProps } from './ExerciseTable';
import { mockExercises } from './mocks/mockExercises';

export default {
  title: 'Components/ExerciseTable',
  component: ExerciseTable,
} as Meta;

const Template: Story<ExerciseTableProps> = (args) => <ExerciseTable {...args} />;

export const Default = Template.bind({});
Default.args = {
  exercisesProp: mockExercises,
  onCompleteClick: (exercise) => console.log(`Complete button clicked for exercise: ${exercise.ExerciseName}`),
};

// Since the component does not have explicit props for loading or error states,
// these stories serve as visual cues in Storybook and do not affect the component directly.
export const LoadingState = Template.bind({});
LoadingState.args = {
  exercisesProp: [], // Assume no exercises to mimic loading (adjust as needed)
  onCompleteClick: (exercise) => console.log(`Complete button clicked for exercise: ${exercise.ExerciseName}`),
};

export const ErrorState = Template.bind({});
ErrorState.args = {
  exercisesProp: [], // Assume no exercises to mimic an error (adjust as needed)
  onCompleteClick: (exercise) => console.log(`Complete button clicked for exercise: ${exercise.ExerciseName}`),
};

export const NoExercises = Template.bind({});
NoExercises.args = {
  exercisesProp: [],
  onCompleteClick: (exercise) => console.log(`Complete button clicked for exercise: ${exercise.ExerciseName}`),
};

export const WithExercises = Template.bind({});
WithExercises.args = {
  exercisesProp: mockExercises,
  onCompleteClick: (exercise) => console.log(`Complete button clicked for exercise: ${exercise.ExerciseName}`),
};
