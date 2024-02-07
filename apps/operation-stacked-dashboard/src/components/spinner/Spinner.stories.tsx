import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Spinner from './Spinner'; // Adjust the import path according to your project structure

const meta: Meta<typeof Spinner> = {
  title: 'Component/Spinner',
  component: Spinner,
};
export default meta;

type Story = StoryObj<typeof Spinner>;

export const Primary: Story = {};

export const WithCustomSize: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: '100px', height: '100px' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithCustomColor: Story = {
  decorators: [
    (Story) => (
      <div style={{ color: 'red' }}>
        <Story />
      </div>
    ),
  ],
};
