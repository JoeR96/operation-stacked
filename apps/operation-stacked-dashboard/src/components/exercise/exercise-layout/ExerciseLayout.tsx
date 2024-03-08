import React, { useState } from 'react';
import { Box, Paper } from '@mui/material';
import { ExerciseTable } from '../exercise-table/ExerciseTable';
import ExerciseCompletionForm from '../exercise-completion-form/ExerciseCompletionForm';
import { useUserStore } from "../../../state/userState";
import { Exercise } from "@operation-stacked/shared-services";
import ExerciseForm from '../exercise-form/ExerciseForm';
import { Button } from '@operation-stacked/ui-components';

const ExerciseLayout = () => {
    const [showNewExerciseForm, setShowNewExerciseForm] = useState(false);
    const [showCompletionForm, setShowCompletionForm] = useState(false);
    const [selectedExerciseId, setSelectedExerciseId] = useState<string>(''); // Initialize as a string or null

    const handleCompleteClick = (exercise: Exercise) => {
        setSelectedExerciseId(exercise.Id as string);
        setShowCompletionForm(true);
    };

    const toggleNewExerciseForm = () => {
        setShowNewExerciseForm(!showNewExerciseForm);
        setShowCompletionForm(false); // Ensure completion form is hidden when toggling new exercise form
    };

    const hideCompletionForm = () => {
        setShowCompletionForm(false);
    };

    // @ts-ignore
    return (
      <Box style={{ marginBottom: '10px', padding: '100px' }}>
          <Button onClick={toggleNewExerciseForm} >
              {showNewExerciseForm ? 'Hide Add Exercise Form' : 'Show Add Exercise Form'}
          </Button>

          {showNewExerciseForm && (
            <Paper style={{ padding: 16, marginBottom: 16, backgroundColor: '#242424' }}>
                <ExerciseForm />
            </Paper>
          )}

          {showCompletionForm ? (
            <ExerciseCompletionForm
              exerciseId={selectedExerciseId}
              hideCompletionForm={hideCompletionForm}
            />
          ) : (
            <ExerciseTable eventHandler={handleCompleteClick} buttonText={'Complete'}  extraButtonText={""}/>
          )}
      </Box>
    );
};

export default ExerciseLayout;
