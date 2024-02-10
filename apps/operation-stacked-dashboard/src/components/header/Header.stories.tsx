// Header.stories.tsx
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

export default {
  title: 'Components/Header',
  component: Header,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as Meta<typeof Header>;

const LoggedInState: StoryObj<typeof Header> = {
  name: 'Logged In',
  parameters: {
    userState: {
      username: 'JohnDoe'
    }
  }
};

const LoggedOutState: StoryObj<typeof Header> = {
  name: 'Logged Out',
  parameters: {
    userState: {
      userId: undefined,
      username: undefined
    }
  }
};

export const LoggedIn = LoggedInState;
export const LoggedOut = LoggedOutState;
