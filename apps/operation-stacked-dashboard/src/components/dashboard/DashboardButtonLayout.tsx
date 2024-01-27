import React from 'react';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Button } from '@operation-stacked/ui-components';

export const DashboardButtonLayout = () => {
  const navigate = useNavigate();

  const goToExercises = () => navigate('/exercises');
  const goToWorkouts = () => navigate('/workouts');
  const goToEquipmentStacks = () => navigate('/equipment-stacks');
  const goToHistory = () => navigate('/history');

  return (
    <Grid container spacing={20} justifyContent="center" alignItems="center">
      <Grid item>
        <Button onClick={goToExercises} isSquare>Exercises</Button>
      </Grid>
      <Grid item>
        <Button onClick={goToWorkouts} isSquare>Workouts</Button>
      </Grid>
      <Grid item>
        <Button onClick={goToEquipmentStacks} isSquare>Equipment Stacks</Button>
      </Grid>
      <Grid item>
        <Button onClick={goToHistory} isSquare>History</Button>
      </Grid>
    </Grid>
  );
};

export default DashboardButtonLayout;
