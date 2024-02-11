import React, { useState } from 'react';
import { ExerciseTable } from '../exercise-table/ExerciseTable';
import ExerciseHistoryView from './ExerciseHistoryView';
import { Exercise } from '@operation-stacked/shared-services'; // Import the new ExerciseHistoryView component

const ExerciseHistoryContainer = () => {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const handleSetSelectedExercise = (exercise : Exercise) => {
    setSelectedExercise(exercise);
  };


  return (
    <div>
      <ExerciseHistoryView exercise={selectedExercise as Exercise} />
      <ExerciseTable onCompleteClick={handleSetSelectedExercise} buttonText="View History" />
    </div>
  );
};

export default ExerciseHistoryContainer;
