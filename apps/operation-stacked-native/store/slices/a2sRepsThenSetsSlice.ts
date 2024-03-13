import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type A2SRepsThenSetsState = {
  reps: number;
  setNumber: number;
  setsCompleted: number;
  repsPerSet: number[];
};

const initialState: A2SRepsThenSetsState = {
  reps: 0,
  setNumber: 1,
  setsCompleted: 0,
  repsPerSet: [],
};

const a2sRepsThenSetsSlice = createSlice({
  name: 'a2sRepsThenSets',
  initialState,
  reducers: {
    updateReps: (state, action: PayloadAction<number>) => {
      state.reps = action.payload;
    },
    updateSetNumber: (state, action: PayloadAction<number>) => {
      state.setNumber = action.payload;
    },
    updateSetsCompleted: (state, action: PayloadAction<number>) => {
      state.setsCompleted = action.payload;
    },
    updateRepsPerSet: (state, action: PayloadAction<number[]>) => {
      state.repsPerSet = action.payload;
    },
  },
});

export const {
  updateReps,
  updateSetNumber,
  updateSetsCompleted,
  updateRepsPerSet,
} = a2sRepsThenSetsSlice.actions;

export default a2sRepsThenSetsSlice.reducer;
