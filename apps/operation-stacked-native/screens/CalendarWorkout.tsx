import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Title } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExercises, selectExercises } from '../store/slices/exerciseSlice';
import { RootState } from '../store/slices/store';
import { BaseExercise, EquipmentType } from '../types';
import Exercise from './Exercise';
import { AppDispatch } from '../store/slices/store';

type CalendarWorkoutsProps = {
    navigation: any;
};

const CalendarWorkouts: React.FC<CalendarWorkoutsProps> = ({ navigation }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [Week, setWeek] = useState(1);
    const [Day, setDay] = useState(1);
    const { userId } = useSelector((state: RootState) => state.auth);
    const theme = useSelector((state: RootState) => state.theme.theme);
    const WorkoutDaysInWeek = useSelector((state: RootState) => state.user.WorkoutDaysInWeek);
    const exercises = useSelector(selectExercises);

    useEffect(() => {
        const fetchData = async () => {
            dispatch(fetchExercises({
                userId, Week, Day,
                Completed: true
            }));
        };
        fetchData();
    }, [Week, Day]);

    const renderItem = ({ item }: { item: BaseExercise }) => {
        return (
            <Card style={[styles.card, { backgroundColor: theme.cardBackground }]} onPress={() => navigation.navigate('Exercise', { exercise: item })}>
                <Card.Content>
                    <Title style={{ color: theme.text }}>{item.ExerciseName}</Title>
                    <Text style={{ color: theme.text }}>Working Weight: {item.WorkingWeight} KG</Text>
                    <Text style={{ color: theme.text }}>{EquipmentType[item.EquipmentType]}</Text>
                </Card.Content>
            </Card>
        );
    };

    const increaseWeek = () => setWeek((prev) => prev + 1);
    const decreaseWeek = () => setWeek((prev) => (prev > 1 ? prev - 1 : prev));
    const increaseDay = () => {
        setDay((prev) => (prev < WorkoutDaysInWeek ? prev + 1 : 1));
        if(Day === WorkoutDaysInWeek)
        {
            increaseWeek();
        }
    }
    const decreaseDay = () => 
    {
        setDay((prev) => (prev > 1 ? prev - 1 : prev));
        if(Day === 1)
        {
            decreaseWeek();
        }
    }
    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={styles.dateContainer}>
                <Text style={{ color: theme.text }}>Week: {Week}</Text>
                <Text style={{ color: theme.text }}>Day: {Day}</Text>
            </View>
            <FlatList style={styles.list} data={exercises} renderItem={renderItem} keyExtractor={(item) => item.Id.toString()} />
            <View style={styles.buttonContainer}>
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={[styles.button, { backgroundColor: theme.button }]} onPress={decreaseDay}>
                        <Text style={{ color: theme.buttonText }}>Decrease Day</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { backgroundColor: theme.button }]} onPress={increaseDay}>
                        <Text style={{ color: theme.buttonText }}>Increase Day</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={[styles.button, { backgroundColor: theme.button }]} onPress={decreaseWeek}>
                        <Text style={{ color: theme.buttonText }}>Decrease Week</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { backgroundColor: theme.button }]} onPress={increaseWeek}>
                        <Text style={{ color: theme.buttonText }}>Increase Week</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    list: {
        flex: 1,
    },
    card: {
        marginVertical: 8,
        borderRadius: 8,
        elevation: 2,
    },
    buttonContainer: {
        paddingBottom: 10,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    button: {
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 5,
    }
});

export default CalendarWorkouts;
