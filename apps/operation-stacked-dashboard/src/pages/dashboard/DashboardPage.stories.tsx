import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import DashboardPage from './DashboardPage';
import { MemoryRouter } from 'react-router-dom';

const meta: Meta<typeof DashboardPage> = {
  title: 'Pages/DashboardPage',
  component: DashboardPage,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};
export default meta;

export const Default: StoryObj<typeof DashboardPage> = {
  args: {},
};
