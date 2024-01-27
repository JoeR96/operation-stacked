import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import CircularProgressBar from '../circular-progress-bar/CircularProgressBar';
import CardComponent from '../card/CardComponent';
import Spinner from '../spinner/Spinner';
import { useUserStore } from '../../state/userState';

const DashboardMainContent: React.FC = () => {
  const { username,userId } = useUserStore();

  useEffect(() => {
    if (userId) {
    }
  }, [userId]);

  return (
    <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" flexWrap="wrap" gap={2} p={2}>
      <CardComponent title="Welcome back" subtitle={username} />
      <CardComponent>
        <Spinner></Spinner>
      </CardComponent>
      <CardComponent>
        <Spinner></Spinner>
      </CardComponent>
      <CardComponent>
        <Spinner></Spinner>
      </CardComponent>
    </Box>
  );
};

export default DashboardMainContent;
