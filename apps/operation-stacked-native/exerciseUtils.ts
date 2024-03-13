import { apiRequest } from "./components/apiClient";
import { removeExercise } from "./store/slices/exerciseSlice";

export const completeExercise = async (
    id: string,
    reps: number[],
    sets: number,
    dispatch: (action: any) => void,
    onSuccess: () => void,
    onError: (error: Error) => void,
) => {
    const requestBody = {
        Id: id,
        Reps: reps,
        Sets: sets,
    };
    try {
        const responseData = await apiRequest('POST', '/workout-creation/complete',5002, requestBody);

        // Handle the response data as needed

        // Dispatch the removeExercise action
        dispatch(removeExercise(id));

        // Call the onSuccess callback
        onSuccess();
    } catch (error) {
        // Cast the error to an Error type
        onError(error as Error);
    }
};
