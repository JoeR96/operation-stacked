import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import DashboardButtonLayout from './DashboardButtonLayout';
import { MemoryRouter } from 'react-router-dom';

export default {
  title: 'Components/DashboardButtonLayout',
  component: DashboardButtonLayout,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as Meta<typeof DashboardButtonLayout>;

export const Default: StoryObj<typeof DashboardButtonLayout> = {
};
