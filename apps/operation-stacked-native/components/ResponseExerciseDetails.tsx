import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Modal } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store/slices/store';
import { StackNavigationProp } from '@react-navigation/stack';
import { apiRequest } from './apiClient';
import { EquipmentType, ResponseExercise, RootStackParamList } from '../types';
import { RouteProp } from '@react-navigation/native';
import { fetchWeekAndDay } from '../store/slices/userSlice';

type ResponseProps = {
    navigation: StackNavigationProp<RootStackParamList, 'ExerciseResponse'>;
    route: RouteProp<RootStackParamList, 'ExerciseResponse'>;
};

const ResponseExerciseDetails: React.FC<ResponseProps> = ({ navigation, route }) => {
    const dispatch = useDispatch<AppDispatch>();
    const responseExercise = route.params.responseExercise.exercise;
    const exercises = useSelector((state: RootState) => state.exercises.exercises);
    const theme = useSelector((state: RootState) => state.theme.theme);
    const userId = useSelector((state: RootState) => state.auth.userId);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
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
        detailsContainer: {
            marginTop: 10,
        },
        detailsText: {
            color: theme.text,
            fontSize: 16,
            marginBottom: 5,
        },
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 22,
        },
        modalView: {
            margin: 20,
            backgroundColor: theme.cardBackground,
            borderRadius: 20,
            padding: 35,
            alignItems: 'center',
            elevation: 5,
        },
        modalText: {
            marginBottom: 15,
            textAlign: 'center',
            fontSize: 16,
            color: theme.text,
        }
    });
    const handleModalClose = async () => {
        try {
          if (userId) {
            const body = { CognitoUserId: userId };
            const response = await apiRequest('POST', '/user/update',5002, body, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
            navigation.navigate('Dashboard');
            dispatch(fetchWeekAndDay(userId));

          } else {
            Alert.alert('Error', 'User ID not found in state.');
          }
        } catch (error) {
          console.error('Error updating user:', error);
        }
      
        // Close the modal
        setModalVisible(false);
      };
      
    const CustomModal: React.FC<{
        visible: boolean;
        message: string;
        onClose: () => void;
    }> = ({ visible, message, onClose }) => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={() => {
                    onClose();
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{message}</Text>
                        <TouchableOpacity
                            style={{ ...styles.button, backgroundColor: theme.buttonBackground }}
                            onPress={() => {
                                onClose();
                            }}
                        >
                            <Text style={styles.buttonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    };
    

    const handleContinue = async () => {
        if (exercises.length === 0) {
            setModalMessage('Congratulations! You have completed your workout.');
            setModalVisible(true);
        } else {
            navigation.navigate('Workouts');
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.titleText}>Next Week</Text>
                <View style={styles.detailsContainer}>
                    <Text style={styles.detailsText}>
                        Category: {responseExercise.Category}
                    </Text>
                    <Text style={styles.detailsText}>
                        Equipment Type: {EquipmentType[responseExercise.EquipmentType]}
                    </Text>
                    <Text style={styles.detailsText}>
                        Exercise Name: {responseExercise.ExerciseName}
                    </Text>
                    <Text style={styles.detailsText}>
                        Lift Day: {responseExercise.LiftDay}
                    </Text>
                    <Text style={styles.detailsText}>
                        Lift Order: {responseExercise.LiftOrder}
                    </Text>
                    <Text style={styles.detailsText}>
                        Lift Week: {responseExercise.LiftWeek}
                    </Text>
                    <Text style={styles.detailsText}>
                        Working Weight: {responseExercise.WorkingWeight}
                    </Text>
                </View>
            </View>
    
            <View style={styles.card}>
                <TouchableOpacity style={styles.button} onPress={handleContinue}>
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
            </View>
            <CustomModal
            visible={modalVisible}
            message={modalMessage}
            onClose={handleModalClose}
        />
        </View>
    );
    
};

export default ResponseExerciseDetails;

