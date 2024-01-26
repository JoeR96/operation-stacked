import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import LoginForm from './LoginForm';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof LoginForm> = {
  title: 'Components/LoginForm',
  component: LoginForm,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof LoginForm>;

export const Primary: Story = {
  args: {
    onToggleForm: () => console.log('Toggle Form'),
  },
};


export const WithFilledFields: Story = {
  args: {
    onToggleForm: () => console.log('Toggle Form'),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Simulate user interactions and assertions here
    await userEvent.type(canvas.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(canvas.getByLabelText(/password/i), 'password');
    // Add any assertions you need, like checking if the button is enabled
    expect(canvas.getByRole('button', { name: /submit/i })).not.toBeDisabled();
  },
};
