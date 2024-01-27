import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import DashboardHeader from './DashboardHeader';

const meta: Meta<typeof DashboardHeader> = {
  title: 'Components/DashboardHeader',
  component: DashboardHeader,
};
export default meta;

export const Default: StoryObj<typeof DashboardHeader> = {
  args: {},
};
