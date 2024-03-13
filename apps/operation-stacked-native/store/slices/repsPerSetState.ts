import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from './store';

type RepsPerSetState = {
    [exerciseId: string]: number[];
};

const initialState: RepsPerSetState = {};

const repsPerSetSlice = createSlice({
    name: 'repsPerSet',
    initialState,
    reducers: {
        addRepsForSet: (state, action: PayloadAction<{exerciseId: string, reps: number}>) => {
            const { exerciseId, reps } = action.payload;
            if (!state[exerciseId]) {
                state[exerciseId] = [];
            }
            state[exerciseId].push(reps);
        },
        removeRepsForExercise: (state, action: PayloadAction<string>) => {
            delete state[action.payload];
        },
        resetRepsPerSet: () => initialState,
    },
});


export const { addRepsForSet, removeRepsForExercise, resetRepsPerSet } = repsPerSetSlice.actions;

export const selectRepsPerSet = (state: RootState) => state.repsPerSet;

export default repsPerSetSlice.reducer;
