import React from 'react';
import { Grid, Box, Typography, Paper } from '@mui/material';
import { useQuery } from 'react-query';
import Spinner from '../../spinner/Spinner';
import { Exercise, ExerciseApi } from '@operation-stacked/shared-services';
import { useUserStore } from '../../../state/userState';
import { barbell, cableMachine, dumbell, machine, smithMachine } from '@operation-stacked/shared-images';
import {
  Category,
  EquipmentType,
  mapCategory,
  mapEquipmentType
} from '@operation-stacked/operation-stacked-shared-types';
import { Button } from '@operation-stacked/ui-components';
import { theme } from '@operation-stacked/shared-styles';

export interface ExerciseTableProps {
  eventHandler: (exercise: Exercise) => void;
  buttonText: string;
  extraButtonText: string;
  showExtraButton?: boolean; // Optional, false by default
  optionalEventHandler?: (exercise: Exercise) => void; // Optional, no operation by default
}

interface GroupedExercises {
  [key: string]: Exercise[];
}

export const ExerciseTable: React.FC<ExerciseTableProps> = ({
                                                              eventHandler,
                                                              buttonText,
                                                              extraButtonText,
                                                              showExtraButton = false, // Default to false if not provided
                                                              optionalEventHandler = () => {} // Default to a no-op function if not provided
                                                            }) => {
  const { userId } = useUserStore();
  const exerciseApi = new ExerciseApi();

  const { data: exercises, isLoading, isError, error } = useQuery<Exercise[], Error>(
    ['exercises', userId],
    () => exerciseApi.exerciseUserIdAllGet(userId as string).then(response => response.data),
    {
      onError: (error) => {
        console.error("Error fetching workouts:", error);
      },
    }
  );

  const groupExercisesByCategory = (exercises: Exercise[]): GroupedExercises => {
    return exercises.reduce((acc: GroupedExercises, exercise: Exercise) => {
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
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Box margin="10px">
            <Typography variant="h5" color="text.primary" marginBottom="10px" sx={{ textAlign: 'center' }}>
              {Category[category as keyof typeof Category]}
            </Typography>
            {exercisesInCategory.map((exercise, exerciseIndex) => (
              <Paper key={exercise.Id || exerciseIndex} sx={{
                padding: '10px',
                backgroundColor: theme.colors.cardBackground,
                marginBottom: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Typography color="text.primary" fontWeight="bold">
                  {exercise.ExerciseName}
                </Typography>
                <img
                  src={getEquipmentImage(exercise.EquipmentType)}
                  alt="Equipment"
                  style={{ width: '30px', height: '30px', margin: '10px 0' }}
                />
                <Button
                  onClick={() => eventHandler(exercise)}
                >
                  {buttonText}
                </Button>
                {showExtraButton && (
                  <Button
                    onClick={() => optionalEventHandler(exercise)}
                  >
                    {extraButtonText}
                  </Button>
                )}
              </Paper>
            ))}
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};


const getEquipmentImage = (equipmentType: EquipmentType | undefined): string => {
  switch (equipmentType) {
    case EquipmentType.Barbell:
      return barbell;
    case EquipmentType.SmithMachine:
      return smithMachine;
    case EquipmentType.Dumbbell:
      return dumbell;
    case EquipmentType.Machine:
      return machine;
    case EquipmentType.Cable:
      return cableMachine;
    default:
      return barbell; // default image if equipmentType is undefined or not matched
  }
};
