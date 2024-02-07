import { Meta, StoryObj } from '@storybook/react';
import LoginPage from './LoginPage';
import { within } from '@storybook/testing-library';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

const meta: Meta<typeof LoginPage> = {
  title: 'Pages/LoginPage',
  component: LoginPage,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof LoginPage>;

export const Login: Story = {
  args: {},
  // If you need to simulate interactions or changes, use the 'play' function
};

export const Register: Story = {
  args: {},
  // Simulate clicking the toggle to show the registration form
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText(/register/i));
  },
};
