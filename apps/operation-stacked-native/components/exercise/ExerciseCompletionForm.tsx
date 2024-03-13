import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { WorkoutApi } from '../../services/api'; // Adjust this import path as needed

const ExerciseCompletionForm = ({ exerciseId }) => {
    const [exercises, setExercises] = useState([
        { exerciseId: '', sets: [{ reps: 0 }], workingWeight: '', dummyTime: new Date() }
    ]);
    const [isLoading, setIsLoading] = useState(false);

    const handleRepsChange = (exerciseIndex, setIndex, value) => {
        const newExercises = exercises.map((exercise, i) => {
            if (i === exerciseIndex) {
                const newSets = exercise.sets.map((set, j) => {
                    if (j === setIndex) {
                        return { ...set, reps: Number(value) };
                    }
                    return set;
                });
                return { ...exercise, sets: newSets };
            }
            return exercise;
        });
        setExercises(newExercises);
    };

    const addSet = (exerciseIndex) => {
        const newExercises = exercises.map((exercise, i) => {
            if (i === exerciseIndex) {
                return { ...exercise, sets: [...exercise.sets, { reps: 0 }] };
            }
            return exercise;
        });
        setExercises(newExercises);
    };

    const removeSet = (exerciseIndex, setIndex) => {
        const newExercises = exercises.map((exercise, i) => {
            if (i === exerciseIndex) {
                const newSets = exercise.sets.filter((_, j) => j !== setIndex);
                return { ...exercise, sets: newSets };
            }
            return exercise;
        });
        setExercises(newExercises);
    };

    const submitExerciseData = async () => {
        try {
            setIsLoading(true);
            const workoutApi = new WorkoutApi();
            const data = exercises.map(exercise => ({
                ExerciseId: exerciseId,
                Sets: exercise.sets.length,
                Reps: exercise.sets.map(set => set.reps),
                WorkingWeight: parseFloat(exercise.workingWeight),
                DummyTime: exercise.dummyTime.toISOString(),
            }));

            await workoutApi.workoutCompleteMultiplePost(data);
            setIsLoading(false);
        } catch (error) {
            console.error("API call failed:", error);
            setIsLoading(false);
        }
    };

    const handleSubmit = () => {
        submitExerciseData();
    };

    const addExercise = () => {
        setExercises([...exercises, { exerciseId: '', sets: [{ reps: 0 }], workingWeight: '', dummyTime: new Date() }]);
    };

    if (isLoading) {
        return <ActivityIndicator size="large" />;
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Complete Exercise</Text>
            {exercises.map((exercise, exerciseIndex) => (
                <View key={exerciseIndex} style={styles.exerciseContainer}>
                    {exercise.sets.map((set, setIndex) => (
                        <View style={styles.setContainer} key={setIndex}>
                            <TextInput
                                style={styles.input}
                                value={String(set.reps)}
                                onChangeText={(text) => handleRepsChange(exerciseIndex, setIndex, text)}
                                keyboardType="numeric"
                                placeholder={`Reps for Set ${setIndex + 1}`}
                            />
                            <TouchableOpacity
                                style={styles.removeSetButton}
                                onPress={() => removeSet(exerciseIndex, setIndex)}
                                disabled={exercise.sets.length === 1}
                            >
                                <Text>Remove Set</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                    <TextInput
                        style={styles.input}
                        value={exercise.workingWeight}
                        onChangeText={(text) => setExercises(exercises.map((ex, i) => i === exerciseIndex ? { ...ex, workingWeight: text } : ex))}
                        keyboardType="numeric"
                        placeholder
                        ="Working Weight"
                    />
                    <DateTimePicker
                        value={exercise.dummyTime}
                        mode="date"
                        display="default"
                        onChange={(event, date) => setExercises(exercises.map((ex, i) => i === exerciseIndex ? { ...ex, dummyTime: date } : ex))}
                        style={styles.datePicker}
                    />
                    <TouchableOpacity
                        style={styles.addSetButton}
                        onPress={() => addSet(exerciseIndex)}
                    >
                        <Text>Add Set</Text>
                    </TouchableOpacity>
                </View>
            ))}
            <TouchableOpacity
                style={styles.addExerciseButton}
                onPress={addExercise}
            >
                <Text>Add Exercise</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
            >
                <Text>Complete Exercise</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    exerciseContainer: {
        marginBottom: 20,
    },
    setContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: '#cccccc',
        padding: 10,
        flex: 1,
        marginRight: 10,
    },
    addSetButton: {
        backgroundColor: '#007bff',
        padding: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    removeSetButton: {
        backgroundColor: '#dc3545',
        padding: 10,
        alignItems: 'center',
    },
    addExerciseButton: {
        backgroundColor: '#28a745',
        padding: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    submitButton: {
        backgroundColor: '#17a2b8',
        padding: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    datePicker: {
        marginBottom: 10,
    },
    // Additional styles can be added as needed
});

export default ExerciseCompletionForm;