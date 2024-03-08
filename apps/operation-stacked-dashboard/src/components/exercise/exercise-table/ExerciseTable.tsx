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
  mapCategory
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


  // @ts-ignore
  const { data: exercises, isLoading, isError, error } = useQuery<Exercise[], Error>(
    ['exercises', userId],
    // @ts-ignore
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

  // @ts-ignore

  const groupedExercises = exercises ? groupExercisesByCategory(exercises) : {};

  if (isLoading) return <Spinner />;

  if (isError) return <div>Error fetching exercises: {error?.message}</div>;

  if (!groupedExercises || Object.keys(groupedExercises).length === 0) return <div>No exercises found</div>;

  // @ts-ignore
  return (
    <Grid container spacing={2}>
      {Object.entries(groupedExercises).map(([category, exercisesInCategory], index) => (
        <Grid item xs={2} sm={2} md={2} key={index}>
          <Box margin="10px">
            <Typography variant="h5" color="text.primary" marginBottom="10px" sx={{ textAlign: 'center' }}>
              {Category[category as keyof typeof Category]}
            </Typography>
            {exercisesInCategory.map((exercise, exerciseIndex) => (
              <Paper key={exercise.Id || exerciseIndex} sx={{
                padding: '5px',
                backgroundColor: theme.colors.cardBackground,
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between', // This will space out the child elements
              }}>
                <Typography color="text.primary" fontWeight="bold" sx={{ flexGrow: 1, textAlign: 'left', mr: 2 }}>
                  {exercise.ExerciseName}
                </Typography>
                <img
                  src={getEquipmentImage(exercise.EquipmentType)}
                  alt="Equipment"
                  style={{ width: '30px', height: '30px', margin: '0 10px' }}
                />
                <Box display="flex" alignItems="center">
                  <Button
                    onClick={() => eventHandler(exercise)}
                    // @ts-ignore
                    sx={{ marginRight: '10px' }} // Add some spacing between buttons if needed
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
                </Box>
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
