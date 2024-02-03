import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import ExercisePage from './ExercisePage';

const meta: Meta<typeof ExercisePage> = {
  title: 'Pages/ExercisePage',
  component: ExercisePage,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};
export default meta;

export const Default: StoryObj<typeof ExercisePage> = {
  args: {},
};
