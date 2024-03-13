import React from 'react';
import { View, StyleSheet } from 'react-native';
import ExerciseDetails from '../components/ExerciseDetails';
import Template0Details from '../components/LinearProgression';
import { BaseExercise, Template0Exercise, Template1Exercise } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { RootState } from '../store/slices/store';

type RootStackParamList = {
    Home: undefined;
    Exercise: { exercise: BaseExercise };
};

type ExerciseScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Exercise'
>;

type ExerciseProps = {
    navigation: ExerciseScreenNavigationProp;
    route: any;
};

const Exercise: React.FC<ExerciseProps> = ({ navigation, route }) => {
    const exercise: BaseExercise = route.params?.exercise;

    const theme = useSelector((state: RootState) => state.theme.theme);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background
        },
    });

    return (
        <View style={styles.container}>
            <ExerciseDetails exercise={exercise} />
            <Template0Details exercise={exercise as Template0Exercise} navigation={navigation} />
        </View>
    );
};

export default Exercise;
