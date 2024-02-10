// ExerciseLayout.stories.jsx
import React from 'react';
import { Story, Meta } from '@storybook/react';
import ExerciseLayout from './ExerciseLayout';

export default {
  title: 'Exercise/ExerciseLayout',
  component: ExerciseLayout,
} as Meta;

const Template: Story = (args) => <ExerciseLayout {...args} />;

export const InitialState = Template.bind({});

export const WithExercises = Template.bind({});
WithExercises.parameters = {
  msw: [
    // Assuming your component makes a request to this endpoint to fetch exercises
    {
      url: 'https://app.operationstacked.com/workout/exercise/1234/all',
      method: 'GET',
    },
  ],
};

export const NoExercises = Template.bind({});
NoExercises.parameters = {
  msw: [
    {
      url: 'https://app.operationstacked.com/workout/exercise/1234/none',
      method: 'GET',
    },
  ],
};

// LoadingState simulation might require custom handling since MSW intercepts are synchronous
// Consider using component state or args to simulate loading UI
