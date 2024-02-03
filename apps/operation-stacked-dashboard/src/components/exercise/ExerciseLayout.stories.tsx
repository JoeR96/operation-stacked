// Import necessary dependencies and the ExerciseLayout component
import React from 'react';
import { Story } from '@storybook/react';
import ExerciseLayout from './ExerciseLayout';

// Create a meta object to define the story title and component
export default {
  title: 'Components/ExerciseLayout',
  component: ExerciseLayout,
};

// Create a Template for the story
const Template: Story = (args) => <ExerciseLayout {...args} />;

// Define the Default story
export const Default = Template.bind({});
Default.args = {};

// You can add more stories with different props or states as needed
// For example, you can create a story with the new exercise form shown:
export const WithNewExerciseForm = Template.bind({});
WithNewExerciseForm.args = {
  showNewExerciseForm: true,
};

// Or a story with the completion form shown:
export const WithCompletionForm = Template.bind({});
WithCompletionForm.args = {
  showCompletionForm: true,
};
