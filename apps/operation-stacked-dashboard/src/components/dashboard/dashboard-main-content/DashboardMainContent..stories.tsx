import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import DashboardMainContent from './DashboardMainContent';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../../state/userState', () => ({
  useUserStore: () => ({
    username: 'John Doe',
    userId: 'user123',
  }),
}));

const meta: Meta<typeof DashboardMainContent> = {
  title: 'Components/DashboardMainContent',
  component: DashboardMainContent,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};
export default meta;

export const Default: StoryObj<typeof DashboardMainContent> = {
  args: {},
};
