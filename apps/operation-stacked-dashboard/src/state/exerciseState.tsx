import create from 'zustand';
import { Exercise } from '@operation-stacked/shared-services';


interface ExerciseState {
  exercises: Exercise[];
  setExercises: (exercises: Exercise[]) => void;
}

export const useExerciseStore = create<ExerciseState>((set) => ({
  exercises: [],
  setExercises: (exercises) => set({ exercises }),
}));
