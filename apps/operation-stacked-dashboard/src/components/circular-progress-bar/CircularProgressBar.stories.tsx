import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import CircularProgressBar from './CircularProgressBar';

const meta: Meta<typeof CircularProgressBar> = {
  title: 'Components/CircularProgressBar',
  component: CircularProgressBar,
};
export default meta;

export const Default: StoryObj<typeof CircularProgressBar> = {
  args: {
    value: 50,
    maxValue: 100,
    title: 'Progress',
    strokeWidth: 10,
  },
};
