import React from 'react';
import type { Meta } from '@storybook/react';
import ExerciseForm from './ExerciseForm';

export default {
  title: 'Exercise/ExerciseForm',
  component: ExerciseForm,
} as Meta;

const Template: React.FC = () => <ExerciseForm />;

export const Default = Template;
