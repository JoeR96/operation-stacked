// src/store/slices/exerciseSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from '../../components/apiClient';
import { Template0Exercise, Template1Exercise } from '../../types';
import { RootState } from './store';

type Exercise = Template0Exercise | Template1Exercise;

type ExercisesState = {
    exercises: Exercise[];
};

const initialState: ExercisesState = {
    exercises: [],
};

const exercisesSlice = createSlice({
    name: 'exercises',
    initialState,
    reducers: {
        addExercise: (state, action) => {
            state.exercises.push(action.payload);
        },
        removeExercise: (state, action) => {
            state.exercises = state.exercises.filter((exercise: Exercise) => exercise.Id !== action.payload);
        },
        updateExerciseWorkingWeight: (state, action) => {
            console.log('updating')
            console.log(action.payload)
            const { exerciseId, newWorkingWeight } = action.payload;
            const exerciseToUpdate = state.exercises.find(exercise => exercise.Id === exerciseId);
            if (exerciseToUpdate) {
                exerciseToUpdate.WorkingWeight = newWorkingWeight;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchExercises.fulfilled, (state, action) => {
            state.exercises = action.payload.Exercises;
        });
        builder.addCase(fetchExercises.rejected, (state, action) => {
            console.error("Failed to fetch exercises");
        });
    },
});

export const { addExercise, removeExercise, updateExerciseWorkingWeight } = exercisesSlice.actions;

export const fetchExercises = createAsyncThunk(
    "exercises/fetchExercises",
    async (args: { userId: string; Week: number; Day: number,Completed:boolean }, thunkAPI) => {
        const { userId, Week, Day, Completed } = args;
        try {
            const response = await apiRequest(
                "GET",
                `/workout-creation/${userId}/${Week}/${Day}/${Completed}`,
                5002
            );
            return response;
        } catch (error) {
            console.error("Error fetching exercises:", error);
        }
    }
);
export const selectWorkingWeightById = (exerciseId: string) =>
    (state: RootState): number | undefined => {
        const exercise = state.exercises.exercises.find(exercise => exercise.Id === exerciseId);
        return exercise?.WorkingWeight;
    };
export const updateWorkingWeightRequest = createAsyncThunk(
    "exercises/updateWorkingWeightRequest",
    async (args: { exerciseId: string; newWorkingWeight: number }, thunkAPI) => {
        const { exerciseId, newWorkingWeight } = args;
        try {
            const response = await apiRequest(
                "PUT",
                `/workout-creation/${exerciseId}/${newWorkingWeight}`,
                5002
            );
            return response;
        } catch (error) {
            console.error("Error updating working weight:", error);
            throw error; // Re-throw the error to be caught by the rejected case
        }
    }
);

export const selectExercises = (state: RootState): Exercise[] => state.exercises.exercises;
export const selectExerciseById = (exerciseId: string) =>
    (state: RootState): Exercise | undefined =>
        state.exercises.exercises.find(exercise => exercise.Id === exerciseId);

export default exercisesSlice.reducer;
