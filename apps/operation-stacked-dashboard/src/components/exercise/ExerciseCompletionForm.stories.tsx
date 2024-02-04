// In ExerciseCompletionForm.stories.tsx
import React from 'react';
import ExerciseCompletionForm, { ExerciseCompletionFormProps } from './ExerciseCompletionForm';
import { Meta, Story } from '@storybook/react';

export default {
    title: 'Components/ExerciseCompletionForm',
    component: ExerciseCompletionForm,
} as Meta;

const Template: Story<ExerciseCompletionFormProps> = (args) => <ExerciseCompletionForm {...args} />;

export const DefaultForm = Template.bind({});
DefaultForm.args = {
    exerciseId: '1',
};
