import React from 'react';
import { Meta, Story } from '@storybook/react';
import ExerciseForm, { ExerciseFormProps } from './ExerciseForm';

const meta: Meta = {
  title: 'Components/ExerciseForm',
  component: ExerciseForm,
};

export default meta;

const Template: Story<ExerciseFormProps> = (args) => <ExerciseForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  onRefreshExercises: () => {
    // Add your custom action for refreshing exercises here if needed
    console.log('Refreshing exercises...');
  },
};
