import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Grid, Typography, Box } from '@mui/material';
import { useQuery } from 'react-query';
import Spinner from '../../spinner/Spinner'; // Assuming you have this component for loading state
import { Exercise, ExerciseHistory, ExerciseHistoryApi } from '@operation-stacked/shared-services';
import { theme } from '@operation-stacked/shared-styles';
import { Category } from '@operation-stacked/operation-stacked-shared-types';

// Updated commonStyles with bold text
export const commonStyles = {
  button: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    fontWeight: 400,
  },
  text: {
    color: theme.colors.text,
    fontWeight: 'bold', // Make text bold
  },
};

interface ExerciseHistoryViewProps {
  exercise: Exercise; // Changed to pass exerciseId directly
}

const ExerciseHistoryView: React.FC<ExerciseHistoryViewProps> = ({ exercise }) => {
  const exerciseHistoryApi = new ExerciseHistoryApi();

  const { data: exerciseHistory, isLoading, isError, error } = useQuery<ExerciseHistory[]>(
    ['exerciseHistory', exercise],
    () => exerciseHistoryApi.exerciseHistoryExerciseIdGet(exercise.Id as string).then(response => response.data),
    {
      onError: (error) => {
        console.error("Error fetching exercise history:", error);
      },
    }
  );

  if (isLoading) return <Spinner />;
  if (isError) return <div>Error fetching exercise history: {(error as Error)?.message || 'Unknown error occurred'}</div>;

  // Assuming exerciseHistory is an array of history records
  if (!exerciseHistory || exerciseHistory.length === 0) return <div>No history found for this exercise</div>;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Exercise History for {exercise.ExerciseName + " " + Category[exercise.Category]}
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={commonStyles.text}>Date</TableCell>
                <TableCell sx={commonStyles.text}>Sets</TableCell>
                <TableCell sx={commonStyles.text}>Reps</TableCell>
                <TableCell sx={commonStyles.text}>Working Weight</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {exerciseHistory.map((history, index) => (
                <TableRow key={index}>
                  <TableCell sx={commonStyles.text}>{new Date(history.CompletedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</TableCell>
                  <TableCell sx={commonStyles.text}>{history.CompletedSets}</TableCell>
                  <TableCell sx={commonStyles.text}>{history.CompletedReps}</TableCell>
                  <TableCell sx={commonStyles.text}>{history.WorkingWeight}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExerciseHistoryView;
