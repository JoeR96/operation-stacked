// import React, { useState } from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     TouchableOpacity,
//     TextInput,
//     Alert,
//     Platform,
// } from 'react-native';
// import { removeExercise } from '../store/slices/exerciseSlice'; // Add this import
// import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
// import { Template1Exercise } from '../types';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../store/slices/store';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { apiRequest } from './apiClient';
// import { addRepsForSet } from '../store/slices/repsPerSetState';

// type Props = {
//     exercise: Template1Exercise,
//     navigation: StackNavigationProp<any, any>;
// };


// const Template1Details: React.FC<Props> = ({ exercise , navigation}) => {
//     const theme = useSelector((state: RootState) => state.theme.theme);
//     const [reps, setReps] = useState(0);
//     const [setNumber, setSetNumber] = useState(1);
//     const [setsCompleted, setSetsCompleted] = useState(0);
//     const [showTimer, setShowTimer] = useState(false);
//     const [lastSetResult, setLastSetResult] = useState('');
//     const dispatch = useDispatch()
//     const styles = StyleSheet.create({
//         container: {
//             flex: 1,
//             backgroundColor: theme.background,
//             padding: 20,
//         },
//         card: {
//             backgroundColor: theme.cardBackground,
//             borderRadius: 5,
//             padding: 15,
//             marginBottom: 20,
//         },
//         titleText: {
//             color: theme.text,
//             fontSize: 24,
//             fontWeight: '600',
//             marginBottom: 10
//         },
//         text: {
//             color: theme.text,
//             fontSize: 14,
//             marginBottom: 5,
//         },
//         row: {
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//         },
//         button: {
//             backgroundColor: theme.buttonBackground,
//             padding: 40,
//             borderRadius: 5,
//             marginTop: 40,
//         },
//         buttonText: {
//             color: theme.buttonText,
//             textAlign: 'center',
//         },
//         input: {
//             backgroundColor: theme.inputBackground,
//             borderColor: theme.inputBorder,
//             borderWidth: 1,
//             borderRadius: 5,
//             padding: 10,
//             marginBottom: 10,
//         },
//         timerContainer: {
//             alignItems: 'center',
//             marginTop: 20,
//         },
//         icon: {
//             color: theme.text,
//             marginRight: 5,
//         }
//     });
//     const showInputAlert = () => {
//         if (Platform.OS === 'ios') {
//             Alert.prompt(
//                 'Enter result of last set',
//                 '',
//                 [
//                     {
//                         text: 'Cancel',
//                         style: 'cancel',
//                     },
//                     {
//                         text: 'OK',
//                         onPress: (text) => {
//                             setLastSetResult(text ?? '');
//                             completeExerciseRequest();
//                         },
//                     },
//                 ],
//                 'plain-text',
//             );
//         } else {
//             // Android doesn't support Alert.prompt(), so you'll need to use a custom solution or a library for a similar effect
//             // The existing Android alert code was just an example and didn't include an input field
//         }
//     };


//     const handleCompleteSet = () => {
//         dispatch(addRepsForSet({exerciseId: exercise.Id, reps}));
//         setSetsCompleted(setsCompleted + 1);
//         if (repsPerSet.length < exercise.Sets) {
//             setReps(0);
//             setSetNumber(setNumber + 1);
//             setShowInputModal(true);
//         } else {
//             completeExerciseRequest();
//         }
//     };
    
    
//     const handlePressButton = () => {
//             handleCompleteSet();
//     };

//     const completeExerciseRequest = async () => {
//         // Replace these values with your actual data
//         const id = exercise.Id;
//         const reps = lastSetResult.split(',').map(Number); // assuming you enter comma-separated values for reps
//         const sets = exercise.Sets;

//         const requestBody = {
//             Id: id,
//             Reps: reps,
//             Sets: sets,
//         };
//         try {
//             const responseData = await apiRequest('POST', '/workout-creation/complete',5002, requestBody);

//             // Handle the response data as needed

//             // Dispatch the removeExercise action
//             dispatch(removeExercise(exercise.Id));

//             // Show the alert with the message and navigate back to the workout page
//             Alert.alert(
//                 'Exercise Complete',
//                 'You have successfully completed the exercise.',
//                 [
//                     {
//                         text: 'OK',
//                         onPress: () => {
//                             navigation.navigate('Workouts'); // Navigate back to the workout page
//                         },
//                     },
//                 ],
//                 { cancelable: false },
//             );
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     const handleTimerComplete = () => {
//         setShowTimer(false);
//     };
    
//     return (
//         <View style={styles.container}>
//             <Text style={styles.titleText}>Back Squat</Text>

//             <View style={styles.card}>
//                 <View style={styles.row}>
//                     <Text style={styles.text}>Training Max:</Text>
//                     <Text style={styles.text}>{exercise.TrainingMax}</Text>
//                 </View>
//                 <View style={styles.row}>
//                     <Text style={styles.text}>Primary Lift:</Text>
//                     <Text style={styles.text}>{exercise.PrimaryLift ? 'Yes' : 'No'}</Text>
//                 </View>
//                 <View style={styles.row}>
//                     <Text style={styles.text}>Block:</Text>
//                     <Text style={styles.text}>{exercise.Block}</Text>
//                 </View>
//             </View>


//             <View style={styles.card}>
//                 <Text style={styles.titleText}>Sets and Reps</Text>
//                 <View style={styles.row}>
//                     <Text style={styles.text}>Sets:</Text>
//                     <Text style={styles.text}>{exercise.Sets}</Text>
//                 </View>
//                 <View style={styles.row}>
//                     <Text style={styles.text}>Reps per Set:</Text>
//                     <Text style={styles.text}>{exercise.RepsPerSet}</Text>
//                 </View>

//                 {setsCompleted < exercise.Sets ? (
//                     <>
//                         <Text style={styles.text}>Set {setNumber}</Text>
//                         <Text style={styles.text}>Reps: {reps}</Text>
//                         {!showTimer && (
//                             <TouchableOpacity style={styles.button} onPress={handlePressButton}>
//                                 <Text style={styles.buttonText}>Complete Set</Text>
//                             </TouchableOpacity>
//                         )}
//                         <View style={styles.timerContainer}>
//                             {showTimer && (
//                                 <CountdownCircleTimer
//                                     isPlaying
//                                     duration={1}
//                                     colors={['#004777', '#F7B801', '#A30000', '#A30000']}
//                                     colorsTime={[7, 5, 2, 0]}
//                                     onComplete={handleTimerComplete}
//                                 >
//                                     {({ remainingTime }) => (
//                                         <Text style={{ fontSize: 40, color: theme.text }}>
//                                             {remainingTime}
//                                         </Text>
//                                     )}
//                                 </CountdownCircleTimer>
//                             )}
//                         </View>
//                     </>
//                 ) : (
//                     <>
//                         {!showTimer && (
//                             <TouchableOpacity style={styles.button} onPress={showInputAlert}>
//                                 <Text style={styles.buttonText}>Complete Exercise</Text>
//                             </TouchableOpacity>
//                         )}
//                     </>
//                 )}
//             </View>
//         </View>
//     );

// }
// export default Template1Details;
// function setShowInputModal(arg0: boolean) {
//     throw new Error('Function not implemented.');
// }

