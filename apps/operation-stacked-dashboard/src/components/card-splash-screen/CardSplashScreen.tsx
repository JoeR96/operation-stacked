import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import CircularProgressBar from '../circular-progress-bar/CircularProgressBar';
import { useUserStore } from '../../state/userState';
import CardComponent from '../card/CardComponent';

const CardSplashScreen: React.FC = () => {
  const {  username, userId } = useUserStore();

  useEffect(() => {
    if (userId) {
      //fetchWeekAndDay(userId);
    }
  //}, [userId, fetchWeekAndDay]);
  }, [userId]);

  return (
    <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" gap={10} padding={"50px"}>
      <CardComponent title="Welcome back" subtitle={username} />
      <CardComponent>
        <CircularProgressBar value={1} maxValue={4} title={`Workouts`} />
      </CardComponent>
      <CardComponent>
        <CircularProgressBar value={1} maxValue={4} title={`Workouts`} />
      </CardComponent>
      <CardComponent>
        <CircularProgressBar value={1} maxValue={4} title={`Workouts`} />
      </CardComponent>
    </Box>
  );
};

export default CardSplashScreen;
