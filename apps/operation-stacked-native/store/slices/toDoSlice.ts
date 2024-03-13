import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';
import { apiRequest } from '../../components/apiClient';

interface ToDoSlice {
    Id: number;
    Title: string;
    Category: string;
    Description: string;
    Username: string;
    Completed: boolean;
    CreatedDate: Date;
    CompletedDate: Date;
}

interface TodoState {
    todos: ToDoSlice[];
}

const initialState: TodoState = {
    todos: [],
};

const fetchTodosFulfilled = createAction<ToDoSlice[]>('todo/fetchTodosFulfilled');
const addTodoFulfilled = createAction<ToDoSlice>('todo/addTodoFulfilled');
const updateTodoFulfilled = createAction<ToDoSlice>('todo/updateTodoFulfilled');

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodosFulfilled, (state, action: PayloadAction<ToDoSlice[]>) => {
                state.todos = action.payload;
            })
            .addCase(addTodoFulfilled, (state, action: PayloadAction<ToDoSlice>) => {
                state.todos.push(action.payload);
            })
            .addCase(updateTodoFulfilled, (state, action: PayloadAction<ToDoSlice>) => {
                const index = state.todos.findIndex(todo => todo.Id === action.payload.Id);
                if (index >= 0) {
                state.todos[index] = action.payload;
                }
                });
                },
                });
                
                export const fetchTodos = (username: string) => async (dispatch: any) => {
                    try {
                        const response: ToDoSlice[] = await apiRequest(
                            'POST',
                            `/user/get-to-do-list?username=${username}`,
                            5002
                        );
                        dispatch(fetchTodosFulfilled(response));
                    } catch (error) {
                        console.error('Error fetching todos:', error);
                    }
                };
                
                export const addTodo = (todo: ToDoSlice) => async (dispatch: any) => {
                    try {
                        const response: ToDoSlice = await apiRequest(
                            'POST',
                            `/user/create-to-do`,
                            5002,
                            JSON.stringify({ Description: todo.Description, Title: todo.Title, Username: todo.Username }),
                            {
                                'Content-Type': 'application/json',
                              }
                        );
                        dispatch(addTodoFulfilled(response));
                    } catch (error) {
                        console.error('Error adding todo:', error);
                    }
                };
                
                export const completeTodo = (id: number) => async (dispatch: any) => {
                    try {
                        const response: ToDoSlice = await apiRequest(
                            'POST',
                            `/user/complete-to-do?id=${id}`,
                            5002
                        );
                        // Assuming the server returns the updated ToDoSlice item
                        dispatch(updateTodoFulfilled(response));
                    } catch (error) {
                        console.error('Error completing todo:', error);
                    }
                };
                                
                export default todoSlice.reducer;
