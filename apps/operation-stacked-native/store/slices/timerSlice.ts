import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

type TimerState = {
    duration: number;
    initialTime: number;
    showTimer: boolean;
    isPlaying: boolean;
};

const initialState: TimerState = {
    duration: 0,
    initialTime: 0,
    showTimer: false,
    isPlaying: false,
};

const timerSlice = createSlice({
    name: 'timer',
    initialState,
    reducers: {
        setTimerDuration: (state, action: PayloadAction<number>) => {
            state.duration = action.payload;
        },
        setInitialTime: (state, action: PayloadAction<number>) => {
            state.initialTime = action.payload;
        },
        setShowTimer: (state, action: PayloadAction<boolean>) => {
            state.showTimer = action.payload;
        },
        setIsPlaying: (state, action: PayloadAction<boolean>) => {
            state.isPlaying = action.payload;
        },
    },
});

export const { setTimerDuration, setInitialTime, setShowTimer, setIsPlaying } = timerSlice.actions;

export const selectTimer = (state: RootState) => state.timer;

export default timerSlice.reducer;
