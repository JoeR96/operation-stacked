import React from 'react';
import { Story, Meta } from '@storybook/react';
import { useUserStore } from '../../state/userState';
import ExerciseLayout from './ExerciseLayout';

export default {
  title: 'Components/ExerciseLayout',
  component: ExerciseLayout,
} as Meta;

const Template: Story = () => <ExerciseLayout />;

export const InitialState = Template.bind({});
InitialState.decorators = [
  (StoryFn) => {
    // Reset Zustand store to its initial state
    useUserStore.setState({
      userId: 'mock-user-id',
      username: 'mock-username',
      // Reset or set initial state as required
    });
    return <StoryFn />;
  },
];

export const WithExercises = Template.bind({});
WithExercises.decorators = [
  (StoryFn) => {
    useUserStore.setState({
      userId: 'mock-user-id',
      username: 'mock-username',
    });
    return <StoryFn />;
  },
];

export const NoExercises = Template.bind({});
NoExercises.decorators = [
  (StoryFn) => {
    useUserStore.setState({
      userId: 'mock-user-id',
      username: 'mock-username',
    });
    return <StoryFn />;
  },
];

export const LoadingState = Template.bind({});
LoadingState.decorators = [
  (StoryFn) => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <StoryFn />
      </div>
    );
  },
];
