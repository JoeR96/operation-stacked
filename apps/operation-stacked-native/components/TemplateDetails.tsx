import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/slices/store';
import { BaseExercise, Template0Exercise, Template1Exercise } from '../types';

type Props = {
    exercise: BaseExercise;
};

const TemplateDetails: React.FC<Props> = ({ exercise }) => {
    const theme = useSelector((state: RootState) => state.theme.theme);

    const styles = {
        container: {
            backgroundColor: theme.background,
            padding: 16,
            borderRadius: 8,
            marginBottom: 16,
        },
        text: {
            color: theme.text,
            fontSize: 16,
            marginBottom: 8,
        },
    };

    return (
        <View style={styles.container}>
            {exercise.Template === 0 ? (
                <>
                    <Text style={styles.text}>Minimum Reps: {(exercise as Template0Exercise).MinimumReps}</Text>
                    <Text style={styles.text}>Maximum Reps: {(exercise as Template0Exercise).MaximumReps}</Text>
                    <Text style={styles.text}>Target Sets: {(exercise as Template0Exercise).Sets}</Text>
                    <Text style={styles.text}>Weight: {(exercise as Template0Exercise).Sets}</Text>
                    <Text style={styles.text}>Current Sets: {(exercise as Template0Exercise).CurrentSets}</Text>
                    <Text style={styles.text}>Weight Index: {(exercise as Template0Exercise).WeightIndex}</Text>
                    <Text style={styles.text}>Weight Progression: {(exercise as Template0Exercise).WeightProgression}</Text>
                    <Text style={styles.text}>
                        Attempts Before Deload: {(exercise as Template0Exercise).AttemptsBeforeDeload}
                    </Text>
                </>
            ) : (
                <>
                    <Text style={styles.text}>Training Max: {(exercise as Template1Exercise).TrainingMax}</Text>
                    <Text style={styles.text}>
                        Primary Lift: {(exercise as Template1Exercise).PrimaryLift ? 'Yes' : 'No'}
                    </Text>
                    <Text style={styles.text}>Block: {(exercise as Template1Exercise).Block}</Text>
                    <Text style={styles.text}>AMRAP Rep Target: {(exercise as Template1Exercise).AmrapRepTarget}</Text>
                    <Text style={styles.text}>AMRAP Rep Result: {(exercise as Template1Exercise).AmrapRepResult}</Text>
                    <Text style={styles.text}>Week: {(exercise as Template1Exercise).Week}</Text>
                    <Text style={styles.text}>Intensity: {(exercise as Template1Exercise).Intensity}</Text>
                    <Text style={styles.text}>Sets: {(exercise as Template1Exercise).Sets}</Text>
                    <Text style={styles.text}>Reps per Set: {(exercise as Template1Exercise).RepsPerSet}</Text>
                    <Text style={styles.text}>Rounding Value: {(exercise as Template1Exercise).RoundingValue}</Text>
                </>
            )}
        </View>
    );
};

export default TemplateDetails;
