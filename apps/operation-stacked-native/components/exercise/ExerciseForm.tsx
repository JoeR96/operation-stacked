import React, { useState } from 'react';
import { View, TextInput, Text, Button, Picker, StyleSheet, ActivityIndicator } from 'react-native';
import { useAuthStore } from "../../state/auth/authStore"; // Adjust import path
import { ExerciseApi } from "../../services/api"; // Adjust import path
import { useApi } from '../../api/constants/hooks/useApi'; // Adjust import path
import { Category, EquipmentType } from "../../types/types"; // Adjust import path

const ExerciseForm = ({ onRefreshExercises }) => {
    const [exerciseName, setExerciseName] = useState('');
    const [category, setCategory] = useState('');
    const [equipmentType, setEquipmentType] = useState('');
    const userId = useAuthStore(state => state.getUserId());

    // Instantiate ExerciseApi
    const exerciseApi = new ExerciseApi();

    const {
        data: exerciseData,
        apiStatus,
        error,
        exec
    } = useApi(async (newExerciseRequest) => {
        return await exerciseApi.exerciseCreateExercisesPost(newExerciseRequest);
    });

    const handleSubmit = async () => {
        const newExerciseRequest = [{
            ExerciseName: exerciseName,
            Category: Number(category),
            EquipmentType: Number(equipmentType),
            UserId: userId
        }];

        try {
            await exec(newExerciseRequest);
            setExerciseName('');
            setCategory('');
            setEquipmentType('');
            onRefreshExercises();
        } catch (error) {
            console.error(error);
        }
    };

    if (apiStatus === 'PENDING') return <ActivityIndicator size="large" />;
    if (apiStatus === 'ERROR') return <Text>Error adding exercise: {error?.message}</Text>;

    return (
        <View style={styles.container}>
            {apiStatus === 'success' && (
                <Text style={styles.successMessage}>
                    Exercise Created Successfully!
                </Text>
            )}
            <TextInput
                style={styles.input}
                placeholder="Exercise Name"
                value={exerciseName}
                onChangeText={setExerciseName}
            />
            <Picker
                selectedValue={category}
                onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
                style={styles.picker}
            >
                {Object.keys(Category).filter(key => !isNaN(Number(Category[key]))).map(key => (
                    <Picker.Item key={key} label={key} value={Category[key]} />
                ))}
            </Picker>
            <Picker
                selectedValue={equipmentType}
                onValueChange={(itemValue, itemIndex) => setEquipmentType(itemValue)}
                style={styles.picker}
            >
                {Object.keys(EquipmentType).filter(key => !isNaN(Number(EquipmentType[key]))).map(key => (
                    <Picker.Item key={key} label={key} value={EquipmentType[key]} />
                ))}
            </Picker>
            <Button
                title="Add Exercise"
                onPress={handleSubmit}
                color="blue"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#1d1d1d',
    },
    input: {
        borderWidth: 1,
        borderColor: 'white',
        padding: 10,
        marginBottom: 10,
        color: 'white',
    },
    picker: {
        color: 'white',
        marginBottom: 10,
    },
    successMessage: {
        color: 'green',
        marginBottom: 16,
    },
});
