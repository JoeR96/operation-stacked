import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, Paper, Button } from '@mui/material';
import Spinner from '../spinner/Spinner';
import { Exercise, ExerciseApi } from '@operation-stacked/shared-services';
import { useUserStore } from '../../state/userState';
import { ERROR, PENDING, useApi } from '@operation-stacked/api-hooks';
import { Category, EquipmentType } from '@operation-stacked/operation-stacked-shared-types';
import { barbell } from '@operation-stacked/shared-images';


export interface ExerciseTableProps {
  onCompleteClick: (exercise: Exercise) => void;
  refreshState: boolean;
  exercisesProp?: Exercise[]; // Making this optional since it seems like it could be
}

export const ExerciseTable: React.FC<ExerciseTableProps> = ({ onCompleteClick, refreshState, exercisesProp }) => {
  const [groupedExercises, setGroupedExercises] = useState<GroupedExercises>({});
  const { userId } = useUserStore();
  const exerciseApi = new ExerciseApi();

  const fetchExercises = async () => {
    try {
      const response = await exerciseApi.exerciseUserIdAllGet(userId as string);
      return response.data;
    } catch (error) {
      console.error("Error fetching workouts:", error);
      throw error;
    }
  };

  const {
    data: exercises,
    apiStatus,
    error,
    exec
  } = useApi(async () => await fetchExercises());

  // Execute API call if exercisesProp is not provided
  useEffect(() => {
    if (!exercisesProp) exec();
  }, [refreshState, exercisesProp]);

  // Group exercises by category when exercises data changes
  useEffect(() => {
    const dataToUse = exercisesProp || exercises;
    if (dataToUse && dataToUse.length > 0) {
      const grouped = groupExercisesByCategory(dataToUse);
      setGroupedExercises(grouped);
    } else {
      setGroupedExercises({});
    }
  }, [exercises, exercisesProp]);

  interface GroupedExercises {
    [category: string]: Exercise[];
  }

  const groupExercisesByCategory = (exercises: Exercise[]): GroupedExercises => {
    return exercises.reduce((acc: GroupedExercises, exercise) => {
      const categoryKey = Category[exercise.Category as number] || 'Others';
      if (!acc[categoryKey]) acc[categoryKey] = [];
      acc[categoryKey].push(exercise);
      return acc;
    }, {} as GroupedExercises);
  };


  const getEquipmentImage = (equipmentType : number) => barbell; // Simplified for brevity

  if (apiStatus === PENDING && !exercisesProp) return <Spinner />;
  if (apiStatus === ERROR && !exercisesProp) return <div>Error fetching exercises: {error?.message}</div>;
  if (!groupedExercises || Object.keys(groupedExercises).length === 0) return <div>No exercises found</div>;

  return (
    <Grid container spacing={2}>
      {Object.entries(groupedExercises).map(([category, exercisesInCategory], index) => (
        <Grid item xs={12} sm={4} key={index}>
          <Box margin="10px">
            <Typography variant="h5" color="white" marginBottom="10px">{category}</Typography>
            {exercisesInCategory.map((exercise) => (
              <Paper key={exercise.Id} sx={{
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
                    <Typography color="white">{EquipmentType[exercise.EquipmentType as number]}</Typography>
                  </div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onCompleteClick(exercise)}
                    sx={{ marginLeft: '10px' }}
                  >
                    Complete
                  </Button>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flex: 0.2
                }}>
                  <img
                    src={getEquipmentImage(exercise.EquipmentType as number)}
                    alt={EquipmentType[exercise.EquipmentType as number]}
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