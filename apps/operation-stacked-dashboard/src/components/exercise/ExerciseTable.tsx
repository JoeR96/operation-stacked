import React from 'react';
import { Grid, Box, Typography, Paper, Button } from '@mui/material';
import { useQuery } from 'react-query';
import Spinner from '../spinner/Spinner';
import { Exercise, ExerciseApi } from '@operation-stacked/shared-services';
import { useUserStore } from '../../state/userState';
import { barbell } from '@operation-stacked/shared-images';
import { EquipmentType, mapCategory, mapEquipmentType } from '@operation-stacked/operation-stacked-shared-types';

// Imported or defined mapping functions

export interface ExerciseTableProps {
  onCompleteClick: (exercise: Exercise) => void;
  buttonText: string;
}

interface GroupedExercises {
  [key: string]: Exercise[];
}

export const ExerciseTable: React.FC<ExerciseTableProps> = ({ onCompleteClick, buttonText }) => {
  const { userId } = useUserStore();
  const exerciseApi = new ExerciseApi();

  const { data: exercises, isLoading, isError, error } = useQuery<Exercise[], Error>(
    ['exercises', userId],
    () => exerciseApi.exerciseUserIdAllGet(userId as string).then(response => response.data), // Extract the data property from AxiosResponse
    {
      onError: (error) => {
        console.error("Error fetching workouts:", error);
      },
    }
  );


  const groupExercisesByCategory = (exercises: Exercise[]): GroupedExercises => {
    return exercises.reduce((acc: GroupedExercises, exercise: Exercise) => {
      // Use the mapping function to get a string representation of the category
      const categoryKey = mapCategory(exercise.Category);
      if (!acc[categoryKey]) acc[categoryKey] = [];
      acc[categoryKey].push(exercise);
      return acc;
    }, {});
  };

  const groupedExercises = exercises ? groupExercisesByCategory(exercises) : {};

  if (isLoading) return <Spinner />;

  if (isError) return <div>Error fetching exercises: {error?.message}</div>;

  if (!groupedExercises || Object.keys(groupedExercises).length === 0) return <div>No exercises found</div>;

  return (
    <Grid container spacing={2}>
      {Object.entries(groupedExercises).map(([category, exercisesInCategory], index) => (
        <Grid item xs={12} sm={4} key={index}>
          <Box margin="10px">
            <Typography variant="h5" color="white" marginBottom="10px">{category}</Typography>
            {exercisesInCategory.map((exercise, exerciseIndex) => (
              <Paper key={exercise.Id || exerciseIndex} sx={{
                padding: '10px',
                backgroundColor: "#242424",
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div>
                    <Typography color="white" fontWeight="bold">{exercise.ExerciseName}</Typography>
                    <Typography color="white">{mapEquipmentType(exercise.EquipmentType)}</Typography>
                  </div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onCompleteClick(exercise)}
                    sx={{ marginLeft: '10px' }}
                  >
                    {buttonText}
                  </Button>
                  <img
                    src={getEquipmentImage(exercise.EquipmentType)}
                    style={{ width: '30px', height: '30px' }}
                  />
                </div>
              </Paper>
            ))}
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

const getEquipmentImage = (equipmentType: EquipmentType | undefined): string => barbell; // Implement dynamic URL based on equipmentType if necessary
