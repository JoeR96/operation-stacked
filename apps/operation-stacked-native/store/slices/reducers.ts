import { combineReducers } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import authReducer from './authSlice';
import exercisesReducer from './exerciseSlice';
import toDo from './toDoSlice';
import userReducer from './userSlice'
import repsPerSetState from './repsPerSetState';
import timerSlice from './timerSlice';
const rootReducer = combineReducers({
    theme: themeReducer,
    auth: authReducer,
    exercises: exercisesReducer,
    user: userReducer,
    toDo: toDo,
    repsPerSet: repsPerSetState,
    timer: timerSlice
});

export default rootReducer;
