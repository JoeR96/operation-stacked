// Username.stories.tsx

import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Username from './Username';
import { rest } from 'msw';
import { useUserStore } from '../../state/userState';

export default {
  title: 'User/Username',
  component: Username,
} as Meta;

const withUserId = (userId: string) => (Story: StoryFn) => {
  useUserStore.getState().setUserId(userId);
  return <Story />;
};

// Mock handlers for storybook
const usernameLoadedHandler = rest.get('https://app.operationstacked.com/workout/user/name/:userId', (req, res, ctx) => {
  const { userId } = req.params;
  // Return different usernames based on userId for demonstration
  switch (userId) {
    case '2':
      return res(ctx.json('JohnDoe'));
    case '3':
      return res(ctx.json('JaneSmith'));
    case '4':
      return res(ctx.json('BobJohnson'));
    default:
      return res(ctx.status(404), ctx.json({ error: 'User not found' }));
  }
});

const setUsernameHandler = rest.post('https://app.operationstacked.com/workout/user/name/:userId', (req, res, ctx) => {
  const { userId } = req.params;
  return res(ctx.json({ userId, status: 'Username set successfully' }));
});

const loadingStateHandler = rest.get('https://app.operationstacked.com/workout/user/name/:userId', (req, res, ctx) => {
  return res(ctx.delay('infinite'));
});

const errorStateHandler = rest.get('https://app.operationstacked.com/workout/user/name/4', (req, res, ctx) => {
  return res(ctx.status(500));
});

// UsernameLoaded Story
export const UsernameLoaded: StoryFn = (args) => <Username {...args} />;
UsernameLoaded.decorators = [withUserId('2')];
UsernameLoaded.parameters = {
  msw: {
    handlers: [usernameLoadedHandler],
  },
};

// LoadingState Story
export const LoadingState: StoryFn = (args) => <Username {...args} />;
LoadingState.decorators = [withUserId('3')];
LoadingState.parameters = {
  msw: {
    handlers: [loadingStateHandler],
  },
};

// ErrorState Story
export const ErrorState: StoryFn = (args) => <Username {...args} />;
ErrorState.decorators = [withUserId('4')];
ErrorState.parameters = {
  msw: {
    handlers: [errorStateHandler],
  },
};

// UpdateUsername Story
export const UpdateUsername: StoryFn = (args) => <Username {...args} />;
UpdateUsername.decorators = [withUserId('5')]; // For demonstration, use a different userId
UpdateUsername.parameters = {
  msw: {
    handlers: [usernameLoadedHandler, setUsernameHandler],
  },
};
