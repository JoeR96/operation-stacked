import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';

const mockOnToggleForm = () => console.log('Toggle Form');

export default {
  title: 'Components/RegistrationForm',
  component: RegistrationForm,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/register']}>
        <Story />
      </MemoryRouter>
    ),
  ],
} as Meta<typeof RegistrationForm>;

type Story = StoryObj<typeof RegistrationForm>;

export const Default: Story = {
  args: {
    onToggleForm: mockOnToggleForm,
  },
};

export const WithPrefilledData: Story = {
  args: {
    onToggleForm: mockOnToggleForm,
  },
  play: async ({ canvasElement }) => {
    // Interaction scenarios for Storybook's play function
  },
};
