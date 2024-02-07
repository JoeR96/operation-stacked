import React from 'react';
import { Story, Meta } from '@storybook/react';
import ExerciseLayout from './ExerciseLayout';
import { useExerciseStore } from '../../state/exerciseState';
import { useUserStore } from '../../state/userState';
import { mockExercises } from '../../../.storybook/mocks/mockExercises'; // Ensure this path is correct

export default {
  title: 'Exercise/ExerciseLayout',
  component: ExerciseLayout,
} as Meta;

const Template: Story = () => <ExerciseLayout />;

export const InitialState = Template.bind({});
InitialState.decorators = [
  (StoryFn) => {
    // Reset Zustand store to its initial state
    useUserStore.setState({
      userId: '1234',
      username: 'mock-username',
    });
    useExerciseStore.setState({ exercises: [] });
    return <StoryFn />;
  },
];

export const WithExercises = Template.bind({});
WithExercises.decorators = [
  (StoryFn) => {
    // Set Zustand store for exercises and user
    useUserStore.setState({
      userId: '1234', // Updated to match the userId you wanted
      username: 'mock-username',
    });
    useExerciseStore.setState({ exercises: mockExercises });
    return <StoryFn />;
  },
];

export const NoExercises = Template.bind({});
NoExercises.decorators = [
  (StoryFn) => {
    useUserStore.setState({
      userId: '1234', // Ensure consistency in userId across stories
      username: 'mock-username',
    });
    useExerciseStore.setState({ exercises: [] });
    return <StoryFn />;
  },
];

export const LoadingState = Template.bind({});
LoadingState.decorators = [
  (StoryFn) => {
    // Optionally, simulate loading by setting Zustand store or use args/props
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <StoryFn />
      </div>
    );
  },
];
