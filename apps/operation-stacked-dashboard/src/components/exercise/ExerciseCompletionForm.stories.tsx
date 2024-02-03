import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import ExerciseCompletionForm, { ExerciseCompletionFormProps } from './ExerciseCompletionForm';
const meta: Meta<ExerciseCompletionFormProps> = {
    title: 'Components/ExerciseCompletionForm',
    component: ExerciseCompletionForm,
};
export default meta;

type Story = StoryObj<ExerciseCompletionFormProps>;

export const Default: Story = {
    args: {
        exerciseId: 'example-exercise-id',
    },
};

export const LoadingState: Story = {
    args: {
        exerciseId: 'example-exercise-id',
        // Simulate loading state if possible
    },
};

export const MultipleExercises: Story = {
    args: {
        exerciseId: 'example-exercise-id',
        // Initialize with multiple exercises if possible
    },
};

export const NoExercises: Story = {
    args: {
        exerciseId: 'example-exercise-id',
        // Initialize with no exercises
    },
};

export const WithRemovedSet: Story = {
    args: {
        exerciseId: 'example-exercise-id',
        // Initialize with exercises and sets
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        // Use userEvent to simulate removing a set
        await userEvent.click(canvas.getByText('Remove Set'));
        // Add assertions if necessary
    },
};
