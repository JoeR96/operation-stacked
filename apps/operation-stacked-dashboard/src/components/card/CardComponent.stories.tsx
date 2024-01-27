import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import CardComponent from './CardComponent';

export default {
  title: 'Library/CardComponent',
  component: CardComponent,
} as Meta<typeof CardComponent>;

export const Default: StoryObj<typeof CardComponent> = {
  args: {
    title: 'Card Title',
    subtitle: 'Card Subtitle',
    children: <div>Card Content</div>,
  },
};
