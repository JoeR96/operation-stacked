import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BaseExercise, EquipmentType, Template0Exercise, Template1Exercise } from '../types';
import { useSelector } from 'react-redux';
import { RootState } from '../store/slices/store';

type Props = {
  exercise: BaseExercise | Template0Exercise | Template1Exercise;
};

const ExerciseDetails: React.FC<Props> = ({ exercise }) => {
  const theme = useSelector((state: RootState) => state.theme.theme);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.background,
    },
    card: {
      backgroundColor: theme.cardBackground,
      borderRadius: 5,
      padding: 15,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      color: theme.text,
    },
    text: {
      fontSize: 14,
      textAlign: 'center',
      color: theme.text,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{exercise.ExerciseName}</Text>
      </View>
    </View>
  );
};

export default ExerciseDetails;
