import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import ExercisePage from './ExercisePage';
import { rest } from 'msw';
import { mockExercises } from '../../../.storybook/mocks/mockExercises';

const meta: Meta<typeof ExercisePage> = {
  title: 'Pages/ExercisePage',
  component: ExercisePage,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};
export default meta;

export const Default: StoryObj<typeof ExercisePage> = {
  args: {
  },
  parameters: {
    msw: {
      handlers: [
        rest.get(`https://app.operationstacked.com/workout/exercise/1234/all`, (req, res, ctx) => {
          console.log('state 1')
          return res(ctx.json([...mockExercises]));
        }),
      ],
    },
  },};
