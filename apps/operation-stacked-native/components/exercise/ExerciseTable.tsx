import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { useApi } from '../../api/constants/hooks/useApi';
import { ExerciseApi } from '../../services/api';
import { useAuthStore } from '../../state/auth/authStore';
import { selectUserId } from '../../store/slices/authSlice';
import { Category, EquipmentType } from '../../types/types';

const barbellImage = require('./barbell.png'); // Adjust these imports for React Native
const smithMachineImage = require('./smithMachine.png');
const dumbbellImage = require('./dumbell.png');
const machineImage = require('./machine.png');
const cableMachineImage = require('./cableMachine.png');

export const ExercisesTable = ({ onCompleteClick, refreshState }) => {
    const exerciseApi = new ExerciseApi();
    const userId = useSelector(selectUserId);

    const fetchExercises = async () => {
        try {
            const response = await exerciseApi.exerciseUserIdAllGet(userId);
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

    useEffect(() => {
        exec();
    }, [refreshState]);

    const [groupedExercises, setGroupedExercises] = useState({});

    useEffect(() => {
        console.log(exercises)
        if (exercises && exercises.length > 0) {
            const grouped = groupExercisesByCategory(exercises);
            setGroupedExercises(grouped);
        } else {
            setGroupedExercises({});
        }
    }, [exercises]);

    const groupExercisesByCategory = (exercises) => {
        return exercises.reduce((acc, exercise) => {
            const category = Category[exercise.Category] || 'Others';
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(exercise);
            return acc;
        }, {});
    };

    const getEquipmentImage = (equipmentType) => {
        switch (equipmentType) {
            case EquipmentType.Barbell:
                return barbellImage;
            case EquipmentType.SmithMachine:
                return smithMachineImage;
            case EquipmentType.Dumbbell:
                return dumbbellImage;
            case EquipmentType.Machine:
                return machineImage;
            case EquipmentType.Cable:
                return cableMachineImage;
            default:
                return barbellImage;
        }
    };

    if (apiStatus === 'PENDING') return <ActivityIndicator size="large" />;
    if (apiStatus === 'ERROR') return <Text>Error fetching exercises: {error?.message}</Text>;
    if (!exercises || exercises.length === 0) return <Text>No exercises found</Text>;

    return (
        <FlatList
            data={Object.entries(groupedExercises)}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => {
                const [category, exercisesInCategory] = item;
                return (
                    <View style={styles.categoryContainer}>
                        <Text style={styles.categoryTitle}>{category}</Text>
                        {exercisesInCategory.map((exercise) => (
                            <View key={exercise.Id} style={styles.exerciseContainer}>
                                <View style={styles.exerciseInfo}>
                                    <Text style={styles.exerciseName}>{exercise.ExerciseName}</Text>
                                    <Text style={styles.equipmentType}>{EquipmentType[exercise.EquipmentType]}</Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.completeButton}
                                    onPress={() => onCompleteClick(exercise)}>
                                    <Text style={styles.completeButtonText}>Complete</Text>
                                </TouchableOpacity>
                                <Image
                                    source={getEquipmentImage(exercise.EquipmentType)}
                                    style={styles.equipmentImage}
                                />
                            </View>
                        ))}
                    </View>
                );
            }}
        />
    );
};

const styles = StyleSheet.create({
    categoryContainer: {
        margin: 10,
    },
    categoryTitle: {
        color: 'white',
        fontSize: 18,
        marginBottom: 10,
    },
    exerciseContainer: {
        padding: 10,
        backgroundColor: '#242424',
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    exerciseInfo: {
        flexDirection: 'column',
    },
    exerciseName: {
        color: 'white',
        fontWeight: 'bold',
    },
    equipmentType: {
        color: 'white',
    },
    completeButton: {
        backgroundColor: 'blue',
        padding: 10,
        marginLeft: 10,
    },
    completeButtonText: {
        color: 'white',
    },
    equipmentImage: {
        width: 30,
        height: 30,
    },
});

export default ExercisesTable;
