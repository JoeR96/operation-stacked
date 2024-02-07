import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ExerciseTable, ExerciseTableProps } from './ExerciseTable';
import { mockExercises } from '../../../.storybook/mocks/mockExercises';
import { useExerciseStore } from '../../state/exerciseState';
import { ERROR, PENDING } from '../../../../../libs/api-hooks/src';

export default {
  title: 'Exercise/ExerciseTable',
  component: ExerciseTable,
  // Global decorator to clear the state before each story, if needed
  decorators: [
    (Story) => {
      // Reset state logic can be placed here if needed
      return <Story />;
    },
  ],
} as Meta;

const Template: Story<ExerciseTableProps> = (args) => <ExerciseTable {...args} />;

// Default story with exercises provided as props
export const Default = Template.bind({});
Default.args = {
  onCompleteClick: (exercise) => console.log(`Complete button clicked for exercise: ${exercise.ExerciseName}`),
};

// Story to simulate loading state
export const LoadingState = Template.bind({});
LoadingState.decorators = [
  (Story) => {
    useExerciseStore.setState({ apiStatus: PENDING });
    return <Story />;
  },
];


// Story to simulate an error state
export const ErrorState = Template.bind({});
ErrorState.decorators = [
  (Story) => {
    useExerciseStore.setState({
      apiStatus: ERROR,
      error: { message: "Failed to fetch exercises" }
    });
    return <Story />;
  },
];


// Story without exercises, using Zustand store
export const NoExercises = Template.bind({});
NoExercises.decorators = [
  (Story) => {
    useExerciseStore.setState({ exercises: [] }); // Set Zustand store to have no exercises
    return <Story />;
  },
];

// Story with exercises, using Zustand store
export const WithExercises = Template.bind({});
WithExercises.decorators = [
  (Story) => {
    useExerciseStore.setState({ exercises: mockExercises }); // Populate Zustand store with mock exercises
    return <Story />;
  },
];
WithExercises.args = {
  buttonText: 'Complete',
  onCompleteClick: (exercise) => console.log(`Complete button clicked for exercise: ${exercise.ExerciseName}`),
};
