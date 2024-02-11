import React from 'react';
import DashboardButtonLayout from './dashboard-button-layout/DashboardButtonLayout';
import CardSplashScreen from '../card-splash-screen/CardSplashScreen';
import DashboardHeader from './dashboard-header/DashboardHeader';

const Dashboard: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh'
    }}>
      <DashboardHeader />
      <CardSplashScreen />
      <DashboardButtonLayout />
    </div>
  );
};

export default Dashboard;
