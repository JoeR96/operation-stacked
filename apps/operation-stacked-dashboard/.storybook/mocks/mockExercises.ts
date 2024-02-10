import { Exercise } from '../../../../libs/shared-services/src';
import { Category , EquipmentType } from '@operation-stacked/shared-services';

export const mockExercises: Exercise[] = [
  { Id: '1', ExerciseName: 'Squat', Category: Category.NUMBER_0, EquipmentType: EquipmentType.NUMBER_0, UserId: 'user123', ExerciseHistories: [] },
  { Id: '2', ExerciseName: 'Leg Press', Category: Category.NUMBER_0, EquipmentType: EquipmentType.NUMBER_1, UserId: 'user123', ExerciseHistories: [] },
  { Id: '3', ExerciseName: 'Dumbbell Lunges', Category: Category.NUMBER_0, EquipmentType: EquipmentType.NUMBER_2, UserId: 'user123', ExerciseHistories: [] },
  { Id: '4', ExerciseName: 'Cable Leg Curls', Category: Category.NUMBER_0, EquipmentType: EquipmentType.NUMBER_3, UserId: 'user123', ExerciseHistories: [] },
  { Id: '5', ExerciseName: 'Smith Machine Squat', Category: Category.NUMBER_0, EquipmentType: EquipmentType.NUMBER_4, UserId: 'user123', ExerciseHistories: [] },

  // Chest
  { Id: '6', ExerciseName: 'Bench Press', Category: Category.NUMBER_1, EquipmentType: EquipmentType.NUMBER_0, UserId: 'user123', ExerciseHistories: [] },
  { Id: '7', ExerciseName: 'Chest Fly', Category: Category.NUMBER_1, EquipmentType: EquipmentType.NUMBER_1, UserId: 'user123', ExerciseHistories: [] },
  { Id: '8', ExerciseName: 'Dumbbell Bench Press', Category: Category.NUMBER_1, EquipmentType: EquipmentType.NUMBER_2, UserId: 'user123', ExerciseHistories: [] },
  { Id: '9', ExerciseName: 'Cable Crossover', Category: Category.NUMBER_1, EquipmentType: EquipmentType.NUMBER_3, UserId: 'user123', ExerciseHistories: [] },
  { Id: '10', ExerciseName: 'Smith Machine Incline Press', Category: Category.NUMBER_1, EquipmentType: EquipmentType.NUMBER_4, UserId: 'user123', ExerciseHistories: [] },

  // Back
  { Id: '11', ExerciseName: 'Deadlift', Category: Category.NUMBER_2, EquipmentType: EquipmentType.NUMBER_0, UserId: 'user123', ExerciseHistories: [] },
  { Id: '12', ExerciseName: 'Lat Pulldown', Category: Category.NUMBER_2, EquipmentType: EquipmentType.NUMBER_1, UserId: 'user123', ExerciseHistories: [] },
  { Id: '13', ExerciseName: 'Dumbbell Row', Category: Category.NUMBER_2, EquipmentType: EquipmentType.NUMBER_2, UserId: 'user123', ExerciseHistories: [] },
  { Id: '14', ExerciseName: 'Cable Row', Category: Category.NUMBER_2, EquipmentType: EquipmentType.NUMBER_3, UserId: 'user123', ExerciseHistories: [] },
  { Id: '15', ExerciseName: 'Smith Machine Row', Category: Category.NUMBER_2, EquipmentType: EquipmentType.NUMBER_4, UserId: 'user123', ExerciseHistories: [] },

  // Shoulders
  { Id: '16', ExerciseName: 'Overhead Press', Category: Category.NUMBER_3, EquipmentType: EquipmentType.NUMBER_0, UserId: 'user123', ExerciseHistories: [] },
  { Id: '17', ExerciseName: 'Shoulder Press Machine', Category: Category.NUMBER_3, EquipmentType: EquipmentType.NUMBER_1, UserId: 'user123', ExerciseHistories: [] },
  { Id: '18', ExerciseName: 'Dumbbell Lateral Raise', Category: Category.NUMBER_3, EquipmentType: EquipmentType.NUMBER_2, UserId: 'user123', ExerciseHistories: [] },
  { Id: '19', ExerciseName: 'Cable Rear Delt Fly', Category: Category.NUMBER_3, EquipmentType: EquipmentType.NUMBER_3, UserId: 'user123', ExerciseHistories: [] },
  { Id: '20', ExerciseName: 'Smith Machine Overhead Press', Category: Category.NUMBER_3, EquipmentType: EquipmentType.NUMBER_4, UserId: 'user123', ExerciseHistories: [] },

  // Biceps
  { Id: '21', ExerciseName: 'Barbell Curl', Category: Category.NUMBER_4, EquipmentType: EquipmentType.NUMBER_0, UserId: 'user123', ExerciseHistories: [] },
  { Id: '22', ExerciseName: 'Preacher Curl Machine', Category: Category.NUMBER_4, EquipmentType: EquipmentType.NUMBER_1, UserId: 'user123', ExerciseHistories: [] },
  { Id: '23', ExerciseName: 'Dumbbell Curl', Category: Category.NUMBER_4, EquipmentType: EquipmentType.NUMBER_2, UserId: 'user123', ExerciseHistories: [] },
  { Id: '24', ExerciseName: 'Cable Curl', Category: Category.NUMBER_4, EquipmentType: EquipmentType.NUMBER_3, UserId: 'user123', ExerciseHistories: [] },
  { Id: '25', ExerciseName: 'Smith Machine Curl', Category: Category.NUMBER_4, EquipmentType: EquipmentType.NUMBER_4, UserId: 'user123', ExerciseHistories: [] },

  // Triceps
  { Id: '26', ExerciseName: 'Close-Grip Bench Press', Category: Category.NUMBER_5, EquipmentType: EquipmentType.NUMBER_0, UserId: 'user123', ExerciseHistories: [] },
  { Id: '27', ExerciseName: 'Triceps Extension Machine', Category: Category.NUMBER_5, EquipmentType: EquipmentType.NUMBER_1, UserId: 'user123', ExerciseHistories: [] },
  { Id: '28', ExerciseName: 'Dumbbell Overhead Triceps Extension', Category: Category.NUMBER_5, EquipmentType: EquipmentType.NUMBER_2, UserId: 'user123', ExerciseHistories: [] },
  { Id: '29', ExerciseName: 'Cable Pushdown', Category: Category.NUMBER_5, EquipmentType: EquipmentType.NUMBER_3, UserId: 'user123', ExerciseHistories: [] },
  { Id: '30', ExerciseName: 'Smith Machine Close-Grip Bench Press', Category: Category.NUMBER_5, EquipmentType: EquipmentType.NUMBER_4, UserId: 'user123', ExerciseHistories: [] },
];
