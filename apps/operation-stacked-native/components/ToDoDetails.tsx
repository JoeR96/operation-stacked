    import React, { useState } from 'react';
    import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
    import { useDispatch, useSelector } from 'react-redux';
    import { AppDispatch, RootState } from '../store/slices/store';
    import { Todo } from '../types';
    import { completeTodo } from '../store/slices/toDoSlice';

    type Props = {
        todo: Todo;
    };

    const ToDoDetails: React.FC<Props> = ({ todo }) => {
        const theme = useSelector((state: RootState) => state.theme.theme);
        const [title, setTitle] = useState(todo.Title);
        const [description, setDescription] = useState(todo.Description);
        const [completed, setCompleted] = useState(todo.Completed);
        const dispatch = useDispatch<AppDispatch>();

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
            padding: 15,
            borderRadius: 5,
            marginTop: 20,
            },
            buttonText: {
            color: theme.buttonText,
            textAlign: 'center',
            },
            textInput: {
                color: theme.text,
                backgroundColor: theme.cardBackground,
                padding: 10,
                borderRadius: 5,
                marginBottom: 10,
            },
            });
            const handleCompleteTask = () => {
                setCompleted(true);
                const updatedTodo = { ...todo, Title: title, Description: description, Completed: completed };
                dispatch(completeTodo (updatedTodo.Id));
            };
                
            return (
                <View style={styles.container}>
                    <View style={styles.card}>
                        <Text style={styles.titleText}>Title</Text>
                        <TextInput
                            value={title}
                            onChangeText={setTitle}
                            style={styles.textInput}
                        />
                        <Text style={styles.text}>Description</Text>
                        <TextInput
                            value={description}
                            onChangeText={setDescription}
                            style={styles.textInput}
                        />
                        <Text style={styles.text}>Completed: {completed ? 'Yes' : 'No'}</Text>
                    </View>
                    <View style={styles.card}>
                        <TouchableOpacity style={styles.button} onPress={handleCompleteTask}>
                            <Text style={styles.buttonText}>Complete Task</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        };        
        
        export default ToDoDetails;
