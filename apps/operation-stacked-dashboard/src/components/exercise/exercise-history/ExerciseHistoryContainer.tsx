import React, { useState, useEffect } from 'react';
import { Grid, Box, Button } from '@mui/material';
import ExerciseHistoryGraph from '../exercise-history-graph/ExerciseHistoryGraph';
import Spinner from '../../spinner/Spinner';
import { Exercise, ExerciseApi } from '@operation-stacked/shared-services';
import { useQuery, useQueryClient } from 'react-query';
import { ExerciseTable } from '../exercise-table/ExerciseTable';
import ExerciseHistoryView from './ExerciseHistoryView';

const ExerciseHistoryContainer = () => {
  const [selectedExerciseForHistoryView, setSelectedExerciseForHistoryView] = useState<Exercise | null>(null);
  const [exercisesForGraph, setExercisesForGraph] = useState<Exercise[]>([]);
  const queryClient = useQueryClient();

  const fetchExerciseHistory = async (exerciseId: string) => {
    const exerciseApi = new ExerciseApi();
    return await exerciseApi.exerciseWithHistoriesExerciseIdGet(exerciseId);
  };

  // Fetch histories for all selected exercises
  const { isLoading, isError, error } = useQuery(
    ['exerciseHistories', exercisesForGraph.map(ex => ex.Id)],
    () => Promise.all(exercisesForGraph.map(ex => fetchExerciseHistory(ex.Id as string))),
    {
      enabled: exercisesForGraph.length > 0,
      onSuccess: data => {
        // This could be a place to update state if necessary, but for now, we're just fetching and caching
      }
    }
  );

  const isExerciseInGraph = (exerciseId: string) => {
    return !!exercisesForGraph.find(ex => ex.Id === exerciseId);
  };

  const toggleGraphExercise = (exercise: Exercise) => {
    if (isExerciseInGraph(exercise.Id)) {
      // Remove exercise from graph
      setExercisesForGraph(prev => prev.filter(ex => ex.Id !== exercise.Id));
    } else {
      // Add exercise to graph
      fetchExerciseHistory(exercise.Id as string).then(() => {
        setExercisesForGraph(prev => [...prev, exercise]);
      });
    }
  };


  if (isLoading) return <Spinner />;
  if (isError) return <div>Error fetching exercise history: {error?.message}</div>;

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="flex-start" style={{ padding: '20px' }}>

      <Grid item xs={12} lg={6}>
        <Box height={600} border="1px solid #ccc" borderRadius={8} marginBottom={4}>
          <ExerciseHistoryGraph exercises={exercisesForGraph} toggle="weight" />
        </Box>
      </Grid>

      <Grid item xs={12} lg={6}>
        {selectedExerciseForHistoryView && (
          <Box height={600} marginBottom={4} border="1px solid #ccc" borderRadius={8} padding={2}>
            <ExerciseHistoryView exercise={selectedExerciseForHistoryView as Exercise} />
          </Box>
        )}
      </Grid>

      {/* This Grid item spans the entire width to make the table take up the bottom row */}
      <Grid item xs={12}>
        <Box border="1px solid #ccc" borderRadius={8} padding={2}>
          <ExerciseTable eventHandler={setSelectedExerciseForHistoryView} buttonText={'View History'} showExtraButton={true} optionalEventHandler={toggleGraphExercise}  extraButtonText={'Add To Graph'}
          />
        </Box>
      </Grid>

    </Grid>
  );
};

export default ExerciseHistoryContainer;
