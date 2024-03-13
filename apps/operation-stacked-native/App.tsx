import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginForm from './screens/LoginForm';
import Dashboard from './screens/Dashboard';
import Recipes from './screens/Recipes';
import Workouts from './screens/Workouts';
import Timer from './screens/Timer';
import store from './store/slices/store';
import Exercise from './screens/Exercise';
import ResponseExerciseDetails from './components/ResponseExerciseDetails';
import {  RootStackParamList } from './types';
import ToDos from './screens/ToDos';
import Recipe from "./screens/Recipes";
import CalendarWorkout from './screens/CalendarWorkout';
import SongContainer from './components/ToneContainer';
import ToneContainer from './components/ToneContainer';
import ToneForm from './components/ToneForm';
import ExerciseLayout from './components/exercise/ExerciseLayout';
const Stack = createStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  const themeFromRedux = useSelector((state: any) => state.theme.theme); // Access the theme state from the Redux store

  const CustomNavigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: themeFromRedux.background,
      text: themeFromRedux.text,
      card: themeFromRedux.cardBackground,
      primary: themeFromRedux.primary,
      secondary: themeFromRedux.secondary,
      border: themeFromRedux.inputBorder,
    },
  };

  return (
    <NavigationContainer theme={CustomNavigationTheme}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginForm} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Workouts" component={Workouts} />
        <Stack.Screen name="Exercise" component={Exercise} />
        <Stack.Screen name="ExerciseResponse" component={ResponseExerciseDetails} />
        <Stack.Screen name="Timer" component={Timer} />
        <Stack.Screen name="ToDos" component={ToDos} />
        <Stack.Screen name="CalendarWorkout" component={CalendarWorkout} />
        <Stack.Screen name="Complete" component={ExerciseLayout} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
};

export default App;
