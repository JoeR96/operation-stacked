import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Alert,
    Platform,
} from 'react-native';
import { removeExercise, selectExerciseById, selectWorkingWeightById, updateExerciseWorkingWeight } from '../store/slices/exerciseSlice';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { EquipmentType, Template0Exercise, Template1Exercise } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/slices/store';
import { StackNavigationProp } from '@react-navigation/stack';
import { apiRequest } from './apiClient';
import CustomInputModal from './CustomInputModal';
import { addRepsForSet, selectRepsPerSet } from '../store/slices/repsPerSetState';
import { selectTimer, setIsPlaying, setShowTimer } from '../store/slices/timerSlice';

type Props = {
    exercise: Template0Exercise;
    navigation: StackNavigationProp<any, any>;
};

const Template0Details: React.FC<Props> = ({ exercise, navigation }) => {
const { duration, initialTime, showTimer, isPlaying } = useSelector(selectTimer);
const localExercise = useSelector(selectExerciseById(exercise.Id));
const theme = useSelector((state: RootState) => state.theme.theme);
    const [reps, setReps] = useState(0);
    const [setNumber, setSetNumber] = useState(1);
    const [setsCompleted, setSetsCompleted] = useState(0);
    const repsPerSet: number[] = useSelector((state: RootState) => selectRepsPerSet(state)[exercise.Id] ?? []);
    const dispatch = useDispatch();
    const [showInputModal, setShowInputModal] = useState(false);
    const [showCompleteModal, setShowCompleteModal] = useState(false);
    const [showCompletionModal, setShowCompletionModal] = useState(false);
    const id = exercise.Id
    const [showWorkingWeightModal, setShowWorkingWeightModal] = useState(false);
    const workingWeight = useSelector((state: RootState) =>
    selectWorkingWeightById(exercise.Id)(state)
);

useEffect(() => {
    // This code will run whenever the workingWeight value changes
    console.log("Working Weight updated:", workingWeight);
    
    // Perform any other actions you want based on the updated workingWeight
    
}, [workingWeight]);


    useEffect(() => {
    }, [exercise]);
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
          },
          label: {
            color: theme.text,
            fontSize: 14,
            fontWeight: '600',
            marginRight: 5,
          },
          value: {
            color: theme.text,
            fontSize: 14,
          },
        button: {
            backgroundColor: theme.buttonBackground,
            padding: 40,
            borderRadius: 5,
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
        },
        timerContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1, // Add this line to center the timer vertically in the card
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
        },
    });
    const handleModalCancel = () => {
        setShowInputModal(false);
      };
    
      const handleModalConfirm = (newReps: number) => {
        dispatch(addRepsForSet({ exerciseId: exercise.Id, reps: newReps }));
        setShowInputModal(false);
        dispatch(setShowTimer(true));
        dispatch(setIsPlaying(true));

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
    const handleContinue = async () => {
        if (exercises.length === 0) {
            if (userId) {
                try {
                    await apiRequest('POST', '/user/update',5002, { userId });
                                } catch (error) {
                    console.error('Error updating user:', error);
                }
            } else {
                Alert.alert('Error', 'User ID not found in state.');
            }
        }

        await completeExerciseRequest()

        dispatch(removeExercise(exercise.Id));

    };

    const handlePressButton = () => {
        handleContinue();
    };
    const handleUpdateWorkingWeight = () => {
        setShowWorkingWeightModal(true);
    };
    const handleWorkingWeightModalCancel = () => {
        setShowWorkingWeightModal(false);
    };

    const handleWorkingWeightModalConfirm = async (newWorkingWeight: number) => {
        setShowWorkingWeightModal(false);
        await updateWorkingWeightRequest(newWorkingWeight);
    };
    
    const updateWorkingWeightRequest = async (newWorkingWeight: number) => {
        const response = await apiRequest('PUT', `/workout-creation/${exercise.Id}/${newWorkingWeight}`, 5002);
        
        console.log(exercise.Id, response )
        dispatch(updateExerciseWorkingWeight({ exerciseId: exercise.Id, newWorkingWeight: response }));
        console.log(workingWeight)
    };

    const completeExerciseRequest = async () => {
        // Replace these values with your actual data
        const id = exercise.Id;
        const sets = repsPerSet;
    
        const requestBody = {
            Id: id,
            Reps: sets,
            Sets: sets.length,
        };
        try {

            const responseData = await apiRequest('POST', '/workout-creation/complete',5002, requestBody);

            dispatch(removeExercise(exercise.Id));
            
            navigation.navigate('ExerciseResponse', { responseExercise: responseData });
        } catch (error) {
            console.error('Error:', error);
        }
    };
    

    const handleTimerComplete = () => {
        dispatch(setShowTimer(false));
        dispatch(setIsPlaying(false));
        setShowTimer(false)
    };

    return (
        
        <View style={styles.container}>
                    {setsCompleted < exercise.Sets && (

            <View style={{...styles.card}} >
                <Text style={styles.titleText}>Exercise Details</Text>
                <View style={styles.row}>
                    <Text style={styles.label}>Category: {exercise.Category}</Text>
                    <Text style={styles.label}>Equipment: {EquipmentType[exercise.EquipmentType]}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Target Sets: {exercise.Sets}</Text>
                    <Text style={styles.label}>Working Weight: {workingWeight} KG</Text>
                 </View>    
                <View style={styles.row}>
                    <Text style={styles.label}>Minimum Reps: {exercise.MinimumReps}</Text>
                    <Text style={styles.label}>Maximum Reps: {exercise.MaximumReps}</Text>
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
                        <View key={index} style={styles.row}>
                            <Text style={styles.label}>
                                Set {index + 1}: {repsPerSet[index] ?? 0} reps
                            </Text>
                        </View>
                    ))}
                </View>
            )}

            {setsCompleted < exercise.Sets ? (
                <>
                    {!showTimer && (
                        <View>


                        <View style={styles.card}>
                            <TouchableOpacity style={styles.button} onPress={handleCompleteSet}>
                                <Text style={{...styles.titleText,textAlign:'center'}}>Complete Set</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.card}>
                        <TouchableOpacity style={styles.button} onPress={handleUpdateWorkingWeight}>
                        <Text style={{...styles.titleText,textAlign:'center'}}>Update Working Weight</Text>
                        </TouchableOpacity>
                        </View>
                        </View>
                        )}
                    {showTimer && (
                        <View style={styles.timerCard}>
                            <View style={styles.timerContainer}>
                                <CountdownCircleTimer
                                    isPlaying={isPlaying}
                                    duration={exercise.RestTimer}
                                    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                                    colorsTime={[7, 5, 2, 0]}
                                    onComplete={handleTimerComplete}
                                    size={240}
                                    strokeWidth={36}
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

            <CustomInputModal
                isVisible={showWorkingWeightModal}
                onCancel={handleWorkingWeightModalCancel}
                onConfirm={handleWorkingWeightModalConfirm}
                title="Enter New Working Weight"
                inputLabel="Working Weight (KG):"
                keyboardType="numeric"
            />

        </View>
);
}

export default Template0Details;