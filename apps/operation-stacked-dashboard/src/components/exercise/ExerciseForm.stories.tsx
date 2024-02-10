// ExerciseForm.stories.tsx
import React from 'react';
import ExerciseForm from './ExerciseForm';
import { useUserStore } from '../../state/userState';
import { Meta, Story } from '@storybook/react';

export default {
  title: 'Exercise/ExerciseForm',
  component: ExerciseForm,
} as Meta;

const Template: Story<ExerciseForm> = () => {
  // Set initial Zustand state for the story

  return <ExerciseForm onRefreshExercises={() => {}} />;
};

export const Default = Template.bind({});
