import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Alert,
    Platform,
} from 'react-native';
import exerciseSlice, { removeExercise } from '../store/slices/exerciseSlice';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { Template0Exercise } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/slices/store';
import { StackNavigationProp } from '@react-navigation/stack';
import { apiRequest } from './apiClient';
import CustomInputModal from './CustomInputModal';

type Props = {
    exercise: Template0Exercise;
    navigation: StackNavigationProp<any, any>;
};

const Template0Details: React.FC<Props> = ({ exercise, navigation }) => {
    const theme = useSelector((state: RootState) => state.theme.theme);
    const [reps, setReps] = useState(0);
    const [setNumber, setSetNumber] = useState(1);
    const [setsCompleted, setSetsCompleted] = useState(0);
    const [showTimer, setShowTimer] = useState(false);
    const [lastSetResult, setLastSetResult] = useState('');
    const dispatch = useDispatch();
    const [repsPerSet, setRepsPerSet] = useState<number[]>([]);
    const [showInputModal, setShowInputModal] = useState(false);
    const id = exercise.Id
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
            padding: 20,
        },
        card: {
            backgroundColor: theme.cardBackground,
            borderRadius: 5,
            padding: 15,
            marginBottom: 20,
        },
        titleText: {
            color: theme.text,
            fontSize: 24,
            fontWeight: '600',
            marginBottom: 10,
        },
        text: {
            color: theme.text,
            fontSize: 14,
            marginBottom: 5,
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10, // Increase the marginBottom to add more spacing between rows
          },
          label: {
            color: theme.text,
            fontSize: 14,
            fontWeight: '600',
            marginRight: 5, // Add marginRight to create space between label and value
          },
          value: {
            color: theme.text,
            fontSize: 14,
          },
        button: {
            backgroundColor: theme.buttonBackground,
            padding: 40,
            borderRadius: 5,
            marginTop: 40,
        },
        buttonText: {
            color: theme.buttonText,
            textAlign: 'center',
        },
        input: {
            backgroundColor: theme.inputBackground,
            borderColor: theme.inputBorder,
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
        },
        timerContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
          },
        icon: {
            color: theme.text,
            marginRight: 5,
        },
        timerCard: {
            flex: 1, // Add this line to make the card fill the remaining space
            backgroundColor: theme.cardBackground,
            borderRadius: 5,
            padding: 15,
            marginBottom: 20,
        },
    });
    const handleModalCancel = () => {
        setShowInputModal(false);
      };
    
      // Add the following function to handle the modal confirm action
      const handleModalConfirm = (newReps: number) => {
        setRepsPerSet([...repsPerSet, newReps]);
        setShowInputModal(false);
        setShowTimer(true); // Move this line from handleCompleteSet to here
    };
  
    const handleCompleteSet = () => {
        setSetsCompleted(setsCompleted + 1);
        if (repsPerSet.length < exercise.Sets) {
            setReps(0);
            setSetNumber(setNumber + 1);
            setShowInputModal(true); // Remove setShowTimer(true) from here
        } else {
            // Call API endpoint and remove exercise from state
            completeExerciseRequest();
        }
    };
      
    const userId = useSelector((state: RootState) => state.auth.userId);
    const exercises = useSelector((state: RootState) => state.exercises.exercises);
    // const handleContinue = async () => {
    //     if (exercises.length === 0) {
    //         if (userId) {
    //             try {
    //                 const response = await apiRequest('POST', ':5002/user/update', { userId });
    //                 // Navigate to the ResponseExerciseDetails component

    //                 completeExerciseRequest()
    //                             } catch (error) {
    //                 console.error('Error updating user:', error);
    //             }
    //         } else {
    //             Alert.alert('Error', 'User ID not found in state.');
    //         }
    //     } else {
    //         completeExerciseRequest()
    //     }
    //     dispatch(removeExercise(exercise.Id));

    // };

    const handlePressButton = () => {
        // handleContinue();
    };

    const completeExerciseRequest = async () => {
        // Replace these values with your actual data
        const id = exercise.Id;
        const reps = lastSetResult.split(',').map(Number); // assuming you enter comma-separated values for reps
        const sets = repsPerSet;
    
        const requestBody = {
            Id: id,
            Reps: sets,
            Sets: sets.length,
        };
        try {

            const responseData = await apiRequest('POST', '/workout-creation/complete',5002, requestBody);
            // Handle the response data as needed

            // Dispatch the removeExercise action
            dispatch(removeExercise(exercise.Id));
            
            // Navigate to the ExerciseResponse screen without showing an alert
            navigation.navigate('ExerciseResponse', { responseExercise: responseData });
        } catch (error) {
            console.error('Error:', error);
        }
    };
    

    const handleTimerComplete = () => {
        setShowTimer(false);
    };

    return (
        
        <View style={styles.container}>
                    {setsCompleted < exercise.Sets && (

            <View style={styles.card}>
                <Text style={styles.titleText}>Exercise Details</Text>
                <View style={styles.row}>
                    <Text style={styles.label}>Minimum Reps: {exercise.MinimumReps}</Text>
                    <Text style={styles.label}>Maximum Reps: {exercise.MaximumReps}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Target Sets: {exercise.Sets}</Text>
                    <Text style={styles.label}>Starting Sets: {exercise.StartingSets}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Current Sets: {exercise.CurrentSets}</Text>
                    <Text style={styles.label}>Weight Index: {exercise.WeightIndex}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Primary Exercise: {exercise.PrimaryExercise ? 'Yes' : 'No'}</Text>
                    <Text style={styles.label}>Starting Weight: {exercise.StartingWeight}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Weight Progression: {exercise.WeightProgression}</Text>
                    <Text style={styles.label}>Attempts Before Deload: {exercise.AttemptsBeforeDeload}</Text>
                </View>
            </View>
       )}
            {!showTimer && (
                <View style={styles.card}>
                    <Text style={styles.titleText}>Sets and Reps</Text>
                    {Array.from({ length: exercise.Sets }, (_, index) => (
                        <Text key={index} style={styles.text}>
                            Set {index + 1}: {repsPerSet[index] ?? 0} reps
                        </Text>
                    ))}
                </View>
            )}
    
            {setsCompleted < exercise.Sets ? (
                <>
                    {!showTimer && (
                        <View style={styles.card}>
                            <TouchableOpacity style={styles.button} onPress={handleCompleteSet}>
                                <Text style={styles.buttonText}>Complete Set</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    {showTimer && (
                        <View style={styles.timerCard}>
                            <View style={styles.timerContainer}>
                                <CountdownCircleTimer
                                    isPlaying
                                    duration={1}
                                    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                                    colorsTime={[7, 5, 2, 0]}
                                    onComplete={handleTimerComplete}
                                >
                                    {({ remainingTime }) => (
                                        <Text style={{ fontSize: 40, color: theme.text }}>{remainingTime}</Text>
                                    )}
                                </CountdownCircleTimer>
                            </View>
                        </View>
                    )}
                </>
            ) : (
                <>
                    <View style={styles.card}>
                    <Text style={styles.titleText}>Sets and Reps</Text>
                    {Array.from({ length: exercise.Sets }, (_, index) => (
                        <Text key={index} style={styles.text}>
                            Set {index + 1}: {repsPerSet[index] ?? 0} reps
                        </Text>
                    ))}
                </View>
                    <View style={styles.card}>
                        <TouchableOpacity style={styles.button} onPress={handlePressButton}>
                            <Text style={styles.buttonText}>Complete Exercise</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
      <CustomInputModal
            isVisible={showInputModal}
            onCancel={handleModalCancel}
            onConfirm={handleModalConfirm}
            title="Enter Reps for the Set"
            inputLabel="Reps:"
            keyboardType="number-pad"
        />
    </View>
);
}

export default Template0Details;