import { exerciseHistories, mockExercises, mockExercisesWithMultipleHistory } from './mockExercises';
import { rest } from 'msw'

export const exercisesLoadedHandler = rest.get(`https://app.operationstacked.com/workout/exercise/1/all`, (req, res, ctx) => {
  console.log('Exercises loaded');
  console.log(mockExercises)
  return res(ctx.status(200), ctx.json([...mockExercises]));
});

export const exercisesExtraButtonLoadedHandler = rest.get(`https://app.operationstacked.com/workout/exercise/5/all`, (req, res, ctx) => {
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

export const exerciseHistoryHandler = rest.get(`https://app.operationstacked.com/workout/exercise-history/1234`,
  (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(exerciseHistories));
  },
);
export const exerciseWithHistoriesHandler = rest.get(`https://app.operationstacked.com/workout/exercise/with-histories/:id`, (req, res, ctx) => {
  const { id } = req.params;
  console.log(id)

  // Find the exercise by the provided ID
  const exercise = mockExercises.find((ex) => ex.Id.toString() === id);
  if (exercise) {
    // Assuming each exercise in mockExercises directly contains its histories or has an id to find them
    const histories = exerciseHistories.filter((history) => history.ExerciseId.toString() === id);
    return res(ctx.status(200), ctx.json({ ...exercise, histories }));
  } else {
    return res(ctx.status(404), ctx.json({ message: 'Exercise not found' }));
  }
});

export const exerciseHistoriesHandler = rest.get(`https://app.operationstacked.com/workout/exercise-history/:id`, (req, res, ctx) => {
  const { id } = req.params;
console.log(id)
  const history = mockExercises[+id].ExerciseHistories;
  if (history) {
    return res(ctx.status(200), ctx.json(history));
  } else {
    return res(ctx.status(404), ctx.json({ message: 'History not found' }));
  }
});


export const mockHandlers = [
  exerciseHistoryHandler,
  exercisesLoadedHandler,
  loadingStateHandler,
  noExercisesHandler,
  errorStateHandler,
  exercisesExtraButtonLoadedHandler,
  exerciseHistoriesHandler,
  exerciseWithHistoriesHandler
];







