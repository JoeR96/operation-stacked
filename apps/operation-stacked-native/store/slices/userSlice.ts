import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';
import { apiRequest } from '../../components/apiClient';
import { fetchWeekAndDayFulfilled } from '../../screens/Dashboard';

const initialState = {
    Week: 1,
    Day: 1,
    username: '',
    WorkoutDaysInWeek: 4
};

// Use string as the payload type
const fetchUsernameFulfilled = createAction<string>('user/fetchUsernameFulfilled');

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeekAndDayFulfilled, (state, action: PayloadAction<{Week: number, Day: number}>) => {
                if (action.payload) {
                    state.Week = action.payload.Week;
                    state.Day = action.payload.Day;
                }
            })
            .addCase(fetchUsernameFulfilled, (state, action: PayloadAction<string>) => {
                state.username = action.payload;
            });
    },
});

export const fetchUsername = (userId : string) => async (dispatch: any) => {
    try {
        const response: string = await apiRequest(
            'GET',
            `/user/name?cognitoUserId=${userId}`,
            5002
        );

        dispatch(fetchUsernameFulfilled(response));
    } catch (error) {
        console.error('Error fetching username:', error);
    }
};

export const fetchWeekAndDay = (userId: string) => async (dispatch: any) => {
    try {

        const response = await apiRequest(
            'GET',
            `/user/week-and-day/${userId}`,
            5002
        );
        if (response) {
            dispatch(fetchWeekAndDayFulfilled(response));
            fetchUsername(userId);
        }
    } catch (error) {
        console.error('Error fetching week and day:', error);
    }
};

export default userSlice.reducer;
