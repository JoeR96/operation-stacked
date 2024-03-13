import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import ExerciseCompletionForm from './ExerciseCompletionForm'; // Adjust import path

const ExerciseLayout = () => {
    const userId = useAuthStore(state => state.getUserId());
    const [showNewExerciseForm, setShowNewExerciseForm] = useState(false);
    const [showCompletionForm, setShowCompletionForm] = useState(false);
    const [selectedExerciseId, setSelectedExerciseId] = useState(null);
    const [refreshExercises, setRefreshExercises] = useState(false);

    const refreshExercisesList = () => {
        setRefreshExercises(prevState => !prevState);
    };

    const handleCompleteClick = (exerciseId) => {
        setSelectedExerciseId(exerciseId.Id);
        setShowCompletionForm(true);
    };

    const toggleNewExerciseForm = () => {
        setShowNewExerciseForm(!showNewExerciseForm);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={toggleNewExerciseForm}
            >
                <Text style={styles.buttonText}>
                    {showNewExerciseForm ? 'Hide Add Exercise Form' : 'Show Add Exercise Form'}
                </Text>
            </TouchableOpacity>

            {showNewExerciseForm && (
                <View style={styles.formContainer}>
                    <ExerciseForm onRefreshExercises={refreshExercisesList} />
                </View>
            )}

            {showCompletionForm ? (
                <ExerciseCompletionForm
                    exerciseId={selectedExerciseId}
                />
            ) : (
                <ExercisesTable userId={userId} onCompleteClick={handleCompleteClick} refreshState={refreshExercises} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        paddingTop: 100,
    },
    button: {
        backgroundColor: '#FFA500',
        marginBottom: 10,
        padding: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
    },
    formContainer: {
        padding: 16,
        marginBottom: 16,
        backgroundColor: '#242424',
    },
});

export default ExerciseLayout;
