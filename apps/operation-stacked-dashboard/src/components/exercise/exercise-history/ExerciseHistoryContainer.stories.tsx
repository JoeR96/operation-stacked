import React from 'react';
import { Meta, Story } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useUserStore } from '../../../state/userState'; // Adjust the import path as necessary
import ExerciseHistoryContainer from './ExerciseHistoryContainer';
import {
  exerciseHistoriesHandler,
  exercisesLoadedHandler, exerciseWithHistoriesHandler,
  loadingStateHandler
} from '../../../../.storybook/mocks/handlers'; // Adjust the import paths as necessary

const queryClient = new QueryClient();

export default {
  title: 'ExerciseHistory/ExerciseHistoryContainer',
  component: ExerciseHistoryContainer,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
} as Meta;

const withUserId = (userId: string) => (Story: Story) => {
  useUserStore.getState().setUserId(userId);
  return <Story />;
};

// Default Story
export const Default: Story = () => <ExerciseHistoryContainer />;
Default.decorators = [withUserId('1')]; // Assuming your component needs a user context
Default.parameters = {
  msw: {
    // Here, you should include any MSW handlers that mock the API calls made by your component
    handlers: [exerciseHistoriesHandler, exerciseWithHistoriesHandler, exercisesLoadedHandler, loadingStateHandler],
  },
};
