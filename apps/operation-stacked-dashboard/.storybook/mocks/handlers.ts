import { mockExercises } from './mockExercises';
import { rest } from 'msw'

export const exercisesLoadedHandler = rest.get(`https://app.operationstacked.com/workout/exercise/1/all`, (req, res, ctx) => {
  console.log('Exercises loaded');
  console.log(mockExercises)
  return res(ctx.status(200), ctx.json([...mockExercises]));
});

export const loadingStateHandler = rest.get(`https://app.operationstacked.com/workout/exercise/2/all`, (req, res, ctx) => {
  console.log('Loading state');

  return res(ctx.delay('infinite'));
});

export const noExercisesHandler = rest.get(`https://app.operationstacked.com/workout/exercise/3/all`, (req, res, ctx) => {
  console.log('No exercises');
  return res(ctx.json([]));
});

export const errorStateHandler = rest.get(`https://app.operationstacked.com/workout/exercise/4/all`, (req, res, ctx) => {
  console.log('Error state');
  return res(ctx.status(500), ctx.json({ message: 'Internal server error' }));
});

export const mockHandlers = [
  exercisesLoadedHandler,
  loadingStateHandler,
  noExercisesHandler,
  errorStateHandler,
];