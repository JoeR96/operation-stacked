import React from 'react';
import { Story } from '@storybook/react';
import { ExerciseTable } from './ExerciseTable';

export default {
  title: 'Components/ExerciseTable',
  component: ExerciseTable,
};

const Template: Story = (args) => <ExerciseTable {...args} />;

export const Default = Template.bind({});
Default.args = {
  onCompleteClick: (exercise) => {
    console.log(`Complete button clicked for exercise: ${exercise.ExerciseName}`);
  },
  refreshState: false,
};

export const LoadingState = Template.bind({});
LoadingState.args = {
  apiStatus: 'PENDING',
  onCompleteClick: (exercise) => {
    console.log(`Complete button clicked for exercise: ${exercise.ExerciseName}`);
  },
  refreshState: false,
};

export const ErrorState = Template.bind({});
ErrorState.args = {
  apiStatus: 'ERROR',
  error: { message: 'Error fetching exercises' },
  onCompleteClick: (exercise) => {
    console.log(`Complete button clicked for exercise: ${exercise.ExerciseName}`);
  },
  refreshState: false,
};

// Story with no exercises
export const NoExercises = Template.bind({});
NoExercises.args = {
  exercises: [],
  onCompleteClick: (exercise) => {
    console.log(`Complete button clicked for exercise: ${exercise.ExerciseName}`);
  },
  refreshState: false,
};

// Story with mocked exercises
export const WithExercises = Template.bind({});
WithExercises.args = {
  exercises: [
    {
      Id: '1',
      ExerciseName: 'Squat',
      Category: 'Legs',
      EquipmentType: 'Barbell',
      UserId: 'user123',
      ExerciseHistories: [],
    },
    {
      Id: '2',
      ExerciseName: 'Bench Press',
      Category: 'Chest',
      EquipmentType: 'Barbell',
      UserId: 'user123',
      ExerciseHistories: [],
    }
  ],
  onCompleteClick: (exercise) => {
    console.log(`Complete button clicked for exercise: ${exercise.ExerciseName}`);
  },
  refreshState: true,
};
