import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Card, Title } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExercises, selectExercises } from '../store/slices/exerciseSlice';
import { RootState } from '../store/slices/store';
import { BaseExercise, EquipmentType } from '../types';
import Exercise from './Exercise';
import { AppDispatch } from '../store/slices/store';

type WorkoutsProps = {
    navigation: any;
};

const Workouts: React.FC<WorkoutsProps> = ({ navigation }) => {
    const dispatch = useDispatch<AppDispatch>();
    const theme = useSelector((state: RootState) => state.theme.theme);

    const { Week, Day, username } = useSelector((state: RootState) => state.user);
    const { userId } = useSelector((state: RootState) => state.auth);
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
            paddingHorizontal: 20,
            paddingTop: 20,
            justifyContent: 'space-between',
        },
        card: {
            backgroundColor: theme.cardBackground,
            borderRadius: 5,
            padding: 15,
            marginBottom: 20,
        },
        welcomeText: {
            color: theme.text,
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 20,
        },
        progressContainer: {
            marginBottom: 20,
        },
        progressHeader: {
            color: theme.text,
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 10,
        },
        progress: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        buttonContainer: {
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
        button: {
            backgroundColor: theme.button,
            borderRadius: 10,
            width: '100%',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 5,
        },
        buttonText: {
            color: theme.buttonText,
            fontSize: 14,
        },
        footer: {
            // ... footer styles ...
        },
        goalText: {
            color: theme.text,
            fontSize: 18,
        },
      });
    const exercises = useSelector(selectExercises);
    useEffect(() => {
        const fetchData = async () => {
            dispatch(fetchExercises({
                userId, Week, Day,
                Completed: false
            }));
        };
        fetchData();
    }, []);

    const renderItem = ({ item }: { item: BaseExercise }) => {
        return (
            <Card style={[styles.card, { backgroundColor: theme.cardBackground }]} onPress={() => navigation.navigate('Exercise', { exercise: item })}>
                <Card.Content>
                    <Title style={{ color: theme.text }}>{item.ExerciseName}</Title>
                    <Text style={{ color: theme.text }}>Working Weight: {item.WorkingWeight} KG</Text>
                    <Text style={{ color: theme.text }}>{EquipmentType[item.EquipmentType]}</Text>
                </Card.Content>
            </Card>
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>


<View style={{...styles.goalText, flexDirection: 'row', justifyContent: 'space-between'}}>
  <Text style={{...styles.goalText, marginRight: 10}}>Week {Week}</Text>
  <Text style={styles.goalText}>Day {Day}</Text>
</View>
            <FlatList data={exercises} renderItem={renderItem} keyExtractor={(item) => item.Id.toString()} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 8
    },
    card: {
        marginVertical: 8,
        borderRadius: 8,
        elevation: 2,
    }
});

export default Workouts;
