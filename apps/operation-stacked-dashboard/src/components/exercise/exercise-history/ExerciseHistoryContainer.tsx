import React, { useState } from 'react';
import { Grid, Box } from '@mui/material';
import { ExerciseTable } from '../exercise-table/ExerciseTable';
import ExerciseHistoryView from './ExerciseHistoryView';
import { Exercise } from '@operation-stacked/shared-services';

const ExerciseHistoryContainer = () => {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const handleSetSelectedExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ padding: '20px' }}>
      {/* Placeholder Box for Graph */}
      <Grid item xs={12} lg={6}>
        <Box marginBottom={4} paddingRight={2}>
          <Box height={600} border="1px solid #ccc" borderRadius={8} marginBottom={4} />
        </Box>
      </Grid>

      {/* Exercise History View */}
      <Grid item xs={12} lg={6}>
        <Box marginBottom={4} paddingLeft={2}>
          <ExerciseHistoryView exercise={selectedExercise as Exercise} />
        </Box>
      </Grid>

      {/* Exercise Table */}
      <Grid item xs={12} lg={12}>
        <Box marginBottom={4}>
          <ExerciseTable onCompleteClick={handleSetSelectedExercise} buttonText="View History" />
        </Box>
      </Grid>
    </Grid>
  );
};

export default ExerciseHistoryContainer;
