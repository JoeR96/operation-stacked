import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/slices/store';
import { StackNavigationProp } from '@react-navigation/stack';
import { fetchUsername, fetchWeekAndDay } from '../store/slices/userSlice';
import { createAction } from '@reduxjs/toolkit';
import { RootStackParamList } from '../types';
import { toggleTheme } from '../store/slices/themeSlice';
import { Card } from 'react-native-paper';
import beans from '../assets/beans.png';

type DashboardProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Dashboard'>;
};
export const fetchWeekAndDayFulfilled = createAction<{
  Week: number;
  Day: number;
  WorkoutDaysInWeek: number;
  username: string;
}>('user/fetchWeekAndDay/fulfilled');

const Dashboard: React.FC<DashboardProps> = ({ navigation }) => {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const { Week, Day, username, WorkoutDaysInWeek } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchWeekAndDay(userId));
    dispatch(fetchUsername(userId))
  }, []);
  useEffect(() => {
  }, [Week, Day, username]);

  const theme = useSelector((state: RootState) => state.theme.theme);

  const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: theme.background,
        marginBottom: 10,
        borderRadius: 10,  // this will round the corners
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',  // this will put a gap between all grid items
        borderRadius: 10,  // this will round the corners

    },
    gridItem: {
        backgroundColor: theme.cardBackground,
        width: '48%',  // reduced width to 48% to account for the spacing
        padding: 10,
        marginBottom: 10,  // this will put a vertical gap between grid items
        borderRadius: 10,
        height:42  // this will round the corners of each grid item
    },
    container: {
        flex: 1,
        backgroundColor: theme.background,
        paddingHorizontal: 20,
        paddingTop: 20,
        justifyContent: 'space-between',
    },
    welcomeText: {
        color: theme.text,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    progressContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    progressHeader: {
        color: theme.text,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    progress: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: theme.button,
        borderRadius: 15,
        width: '100%',
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
    buttonText: {
        color: theme.buttonText,
        fontSize: 14,
    },
    footer: {
        // ... footer styles ...
    },
    goalText: {
        color: theme.text,
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '600'
    },
  });

  const handleTimerPress = () => {
    navigation.navigate('Timer');
  };

  return (
    <View style={styles.container}>
        <View style={styles.progressContainer}>
        <Text style={styles.welcomeText}>Welcome, {username}!</Text>
      
            <Text style={styles.progressHeader}>Progress</Text>
            <Image
                     style={{ width: 250, height: 150,paddingBottom:200 }}
                    source={beans} 
                />
            <View style={styles.progressContainer}>
                <Card style={styles.cardContainer}>
                    <Card.Content style={styles.grid}>
                        <View style={styles.gridItem}>
                            <Text style={styles.goalText}>Week {Week}</Text>
                        </View>
                        <View style={styles.gridItem}>
                            <Text style={styles.goalText}>Day {Day}</Text>
                        </View>
                        <View style={styles.gridItem}>
                            <Text style={styles.goalText}>3 {Week}</Text>
                        </View>
                        <View style={styles.gridItem}>
                            <Text style={styles.goalText}>4 {Day}</Text>
                        </View>
                    </Card.Content>
                </Card>
            </View>
           
        </View>
        
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleTimerPress}>
                <Text style={styles.buttonText}>Start Timer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Recipes')}>
                <Text style={styles.buttonText}>Recipes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Workouts')}>
                <Text style={styles.buttonText}>Workouts</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ToDos')}>
                <Text style={styles.buttonText}>ToDos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CalendarWorkout')}>
                <Text style={styles.buttonText}>Calendar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Guitar')}>
                <Text style={styles.buttonText}>Guitar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Complete')}>
                  <Text style={styles.buttonText}>Complete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => dispatch(toggleTheme())}
            >
                <Text style={styles.buttonText}>Toggle Theme</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}

export default Dashboard;
