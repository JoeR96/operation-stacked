import React from 'react';
import { Box } from '@mui/material';
import CircularProgressBar from '../circular-progress-bar/CircularProgressBar';
import CardComponent from '../card/CardComponent';
import Spinner from '../spinner/Spinner';
import Username from '../username/Username';
const CardSplashScreen: React.FC = () => {
  return (
    <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" flexWrap="wrap" gap={2} p={2}>
      <CardComponent>
        <Username />
      </CardComponent>
      <CardComponent>
        <CircularProgressBar value={1} maxValue={4} title={"Workouts  "} />
      </CardComponent>
      <CardComponent>
        <Spinner />
      </CardComponent>
      <CardComponent>
        <Spinner />
      </CardComponent>
    </Box>
  );
};

export default CardSplashScreen;
