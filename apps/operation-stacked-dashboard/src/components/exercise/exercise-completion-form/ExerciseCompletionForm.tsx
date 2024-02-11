import React, { useState } from 'react';
import { Typography, Box, Grid, CircularProgress, Paper } from '@mui/material';
import 'react-datepicker/dist/react-datepicker.css';
import {Button, TextField} from '@operation-stacked/ui-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Exercise, WorkoutApi } from '@operation-stacked/shared-services';
import { theme } from '@operation-stacked/shared-styles';

export interface ExerciseCompletionFormProps {
    exerciseId: string;
    hideCompletionForm: () => void;


}
const ExerciseCompletionForm = ({ exerciseId, hideCompletionForm }: ExerciseCompletionFormProps) => {
    interface ExerciseState {
        exerciseId: string;
        sets: { reps: number }[];
        workingWeight: string;
        dummyTime: Date;
    }

    const [exercises, setExercises] = useState<ExerciseState[]>([
        { exerciseId: '', sets: [{ reps: 0 }], workingWeight: '', dummyTime: new Date() }
    ]);
    const [isLoading, setIsLoading] = useState(false);

    const handleRepsChange = (exerciseIndex: number, setIndex: number, value: string) => {
        const newExercises = exercises.map((exercise, i) => {
            if (i === exerciseIndex) {
                const newSets = exercise.sets.map((set, j) => {
                    if (j === setIndex) {
                        return { ...set, reps: Number(value) };
                    }
                    return set;
                });
                return { ...exercise, sets: newSets };
            }
            return exercise;
        });
        setExercises(newExercises);
    };

    const addSet = (exerciseIndex: number) => {
        const newExercises = exercises.map((exercise, i) => {
            if (i === exerciseIndex) {
                return { ...exercise, sets: [...exercise.sets, { reps: 0 }] };
            }
            return exercise;
        });
        setExercises(newExercises);
    };

    const removeSet = (exerciseIndex: number, setIndex: number) => {
        const newExercises = exercises.map((exercise, i) => {
            if (i === exerciseIndex) {
                const newSets = exercise.sets.filter((_, j) => j !== setIndex);
                // If there are no sets left, return null to filter this exercise out
                if (newSets.length === 0) return null;
                return { ...exercise, sets: newSets };
            }
            return exercise;
        }).filter(exercise => exercise !== null) as ExerciseState[]; // Cast to ExerciseState[] to satisfy TypeScript
        setExercises(newExercises);
    };


    const submitExerciseData = async () => {
        try {
            setIsLoading(true);
            const workoutApi = new WorkoutApi();
            const data = exercises.map(exercise => ({
                ExerciseId: exerciseId,
                Sets: exercise.sets.length,
                Reps: exercise.sets.map(set => set.reps),
                WorkingWeight: parseFloat(exercise.workingWeight),
                DummyTime: exercise.dummyTime.toISOString(),
                // Other fields can be left undefined as they are optional
            }));

            console.log('sending', data);
            await workoutApi.workoutCompleteMultiplePost(data);

            setIsLoading(false);
            console.log("tits")
            hideCompletionForm()
        } catch (error) {
            console.error("API call failed:", error);
            setIsLoading(false);
        }
    };


    const handleSubmit = () => {
        submitExerciseData();
    };

    const addExercise = () => {
        setExercises([...exercises, { exerciseId: '', sets: [{ reps: 0 }], workingWeight: '', dummyTime: new Date() }]);
    };

    const handleDateChange = (exerciseIndex: number, date: Date | null) => {
        const updatedExercises = exercises.map((exercise, i) => {
            if (i === exerciseIndex) {
                // If date is null, use the current date as a fallback
                return { ...exercise, dummyTime: date || new Date() };
            }
            return exercise;
        });
        setExercises(updatedExercises);
    };


    if (isLoading) {
        return <CircularProgress />;
    }


    return (
      <Grid container justifyContent="center" alignItems="center" style={{ height: '100%' }}>
          <Paper elevation={3} style={{ padding: '2rem', backgroundColor: theme.colors.background, maxWidth: '500px', margin: 'auto' }}>
              <Typography variant="h5" gutterBottom style={{ color: 'white', textAlign: 'center' }}>
                  Complete Exercise
              </Typography>
              <Grid component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                  {exercises.map((exercise, exerciseIndex) => (
                    <Box key={exerciseIndex} sx={{ marginBottom: 2 }}>
                        {exercise.sets.map((set, setIndex) => (
                          <Grid container spacing={4} key={setIndex} sx={{padding:4}}>
                              <Grid item xs={8}>
                                  <TextField
                                    required
                                    fullWidth
                                    label={`Reps for Set ${setIndex + 1}`}
                                    variant="outlined"
                                    value={set.reps}
                                    onChange={(e) => handleRepsChange(exerciseIndex, setIndex, e.target.value)}
                                    type="number"
                                    borderColor={theme.colors.primary}
                                  />
                              </Grid>
                              <Grid item xs={4}>
                                  <Button onClick={() => removeSet(exerciseIndex, setIndex)} >
                                      Remove Set
                                  </Button>
                              </Grid>
                          </Grid>
                        ))}
                            <Grid container justifyContent="center" alignItems="center">
                                <DatePicker
                                  selected={exercise.dummyTime}
                                  onChange={(date: Date | null) => handleDateChange(exerciseIndex, date)}
                                  dateFormat="yyyy-MM-dd"
                                />
                                <Button onClick={() => addSet(exerciseIndex)} >
                                    Add Set
                                </Button>
                            </Grid>
                    </Box>
                  ))}
                  <Grid container justifyContent="center" alignItems="center">
                      <Button onClick={addExercise}>
                          Add Exercise
                      </Button>
                      <Button type="submit">
                          Complete Exercise
                      </Button>
                  </Grid>
              </Grid>
          </Paper>
      </Grid>
    );
};

export default ExerciseCompletionForm
