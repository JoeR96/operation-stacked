import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Modal, TextInput, Button, Switch } from 'react-native';
import { Card, Title } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/slices/store';
import { BaseExercise, Todo } from '../types';
import Exercise from './Exercise';
import { AppDispatch } from '../store/slices/store';
import { addTodo, fetchTodos } from '../store/slices/toDoSlice';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { completeTodo } from '../store/slices/toDoSlice';
type ToDosProps = {
    navigation: any;
};

const ToDos: React.FC<ToDosProps> = ({ navigation }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { username} = useSelector((state: RootState) => state.user);
    const theme = useSelector((state: RootState) => state.theme.theme);
    const toDos = useSelector((state : RootState) => state.toDo.todos);
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [completeModalVisible, setCompleteModalVisible] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState<any | null>(null);

    const handlePressTodo = (todo: Todo) => {
        setSelectedTodo(todo);
        setCompleteModalVisible(true);
      };
      
      // This function is called when user confirms they want to complete the todo
      const completeTodoInternal = () => {
        if (selectedTodo) {
          dispatch(completeTodo(selectedTodo.id));
          setCompleteModalVisible(false);
          setSelectedTodo(null);
        }
      };
      
      // This is the renderItem function where you handle the todo item press
      const renderItem = ({ item }: { item: Todo }) => {
        return (
          <Card style={[styles.card, { backgroundColor: theme.cardBackground }]} onPress={() => handlePressTodo(item)}>
            <Card.Content>
              <Title style={{ color: theme.text }}>{item.Title}</Title>
              <Text style={{ color: theme.text }}>{item.Description}</Text>
              <Text style={{ color: theme.text }}>{item.CompletedDate.toString()}</Text>
              <Text style={{ color: theme.text }}> {item.CreatedDate.toString()}</Text>
            </Card.Content>
          </Card>
        );
      };
    const handleCreateTodo = async () => {
        const todo: any = { Title: title, Description: description, Username: username };

        dispatch(addTodo(todo));
        setModalVisible(false);
    };
    const [showCompleted, setShowCompleted] = useState(false);

  const styles = StyleSheet.create({
    card: {
        backgroundColor: theme.cardBackground,
        borderRadius: 5,
        padding: 15,
        marginBottom: 20,
    },
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    welcomeText: {
      color: theme.text,
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    goalsContainer: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: 20,
    }, toggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginVertical: 10,
    },
    toggleText: {
        marginRight: 10,
        color: theme.text
    },
    goal: {
      backgroundColor: theme.cardBackground,
      borderRadius: 10,
      padding: 10,
      marginBottom: 10,
      width: '48%',
      alignItems: 'center',
    },
    goalText: {
      color: theme.text,
      fontSize: 18,
      fontWeight: 'bold',
    },
    button: {
        backgroundColor: theme.button,
        borderRadius: 10, // Adjust the borderRadius to match the square shape
        width: '30%', // Width percentage should be set based on the desired size and space between buttons
        height: '30%', // Height percentage should be set based on the desired size and space between buttons
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5, // Add some margin to separate the buttons
      },
      buttonText: {
        color: theme.buttonText,
        fontSize: 14, // Adjust the font size to fit the button
        textAlign: 'center', // Align the text to the center
      },
      buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        alignItems: 'center', // Align the buttons vertically
        marginBottom: 20,
      },
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
  });

  useEffect(() => {
    dispatch(fetchTodos(username));
}, []);

    // Filter the todos based on the showCompleted state
    const visibleTodos = showCompleted ? toDos : toDos.filter(todo => !todo.Completed);


    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
          <View style={styles.toggleContainer}>
                <Text style={styles.toggleText}>Show completed:</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={showCompleted ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => setShowCompleted(!showCompleted)}
                    value={showCompleted}
                />
            </View>
            <FlatList 
                data={visibleTodos} 
                renderItem={renderItem}
                keyExtractor={(item, index) => item.Id ? item.Id.toString() : index.toString()} 
            />


            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                <Text style={styles.buttonText}>Add To do</Text>
            </TouchableOpacity>
            <Modal
    animationType="slide"
    transparent={true}
    visible={completeModalVisible}
    onRequestClose={() => setCompleteModalVisible(false)}
>
    <View style={styles.centeredView}>
        <View style={styles.modalView}>
            <Text style={styles.modalText}>Complete?</Text>
            <Button
                title="Yes"
                onPress={completeTodoInternal}
            />
            <Button
                title="No"
                color="red"
                onPress={() => setCompleteModalVisible(false)}
            />
        </View>
    </View>
</Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TextInput
                            placeholder="Title"
                            value={title}
                            onChangeText={setTitle}
                            style={styles.modalText}
                        />
                        <TextInput
                            placeholder="Description"
                            value={description}
                            onChangeText={setDescription}
                            style={styles.modalText}
                        />
                        <Button
                            title="Create"
                            onPress={handleCreateTodo}
                        />
                        <Button
                            title="Cancel"
                            color="red"
                            onPress={() => setModalVisible(false)}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
   
});

export default ToDos;
