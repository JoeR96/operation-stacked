import React, { useState } from 'react';
import { Box, Paper, Button } from '@mui/material';
import { ExerciseTable } from './ExerciseTable';
import ExerciseCompletionForm from './ExerciseCompletionForm';
import { useUserStore } from "../../state/userState";
import { Exercise } from "@operation-stacked/shared-services";
import ExerciseForm from './ExerciseForm';

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
    };

    return (
      <Box
        style={{ marginBottom: '10px', paddingTop: '100px' }}
      >
          <Button
            variant="contained"
            style={{ backgroundColor: '#FFA500', marginBottom: '10px' }}
            onClick={toggleNewExerciseForm}
          >
              {showNewExerciseForm ? 'Hide Add Exercise Form' : 'Show Add Exercise Form'}
          </Button>

          {showNewExerciseForm && (
            <Paper style={{ padding: 16, marginBottom: 16, backgroundColor: '#242424' }}>
                <ExerciseForm  />
            </Paper>
          )}

          {showCompletionForm ? (
            <ExerciseCompletionForm
              exerciseId={selectedExerciseId}
            />
          ) : (
            <ExerciseTable onCompleteClick={handleCompleteClick} buttonText={'Complete'}/>
          )}
      </Box>
    );
};

export default ExerciseLayout;
