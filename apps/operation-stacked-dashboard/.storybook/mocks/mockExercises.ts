import { Category, EquipmentType } from '../../../../libs/operation-stacked-shared-types/src';
import { Exercise } from '../../../../libs/shared-services/src';

export const mockExercises: Exercise[] = [
  // Legs
  { Id: '1', ExerciseName: 'Squat', Category: Category.Legs, EquipmentType: EquipmentType.Barbell, UserId: 'user123', ExerciseHistories: [] },
  { Id: '2', ExerciseName: 'Leg Press', Category: Category.Legs, EquipmentType: EquipmentType.Machine, UserId: 'user123', ExerciseHistories: [] },
  { Id: '3', ExerciseName: 'Dumbbell Lunges', Category: Category.Legs, EquipmentType: EquipmentType.Dumbbell, UserId: 'user123', ExerciseHistories: [] },
  { Id: '4', ExerciseName: 'Cable Leg Curls', Category: Category.Legs, EquipmentType: EquipmentType.Cable, UserId: 'user123', ExerciseHistories: [] },
  { Id: '5', ExerciseName: 'Smith Machine Squat', Category: Category.Legs, EquipmentType: EquipmentType.SmithMachine, UserId: 'user123', ExerciseHistories: [] },

  // Chest
  { Id: '6', ExerciseName: 'Bench Press', Category: Category.Chest, EquipmentType: EquipmentType.Barbell, UserId: 'user123', ExerciseHistories: [] },
  { Id: '7', ExerciseName: 'Chest Fly', Category: Category.Chest, EquipmentType: EquipmentType.Machine, UserId: 'user123', ExerciseHistories: [] },
  { Id: '8', ExerciseName: 'Dumbbell Bench Press', Category: Category.Chest, EquipmentType: EquipmentType.Dumbbell, UserId: 'user123', ExerciseHistories: [] },
  { Id: '9', ExerciseName: 'Cable Crossover', Category: Category.Chest, EquipmentType: EquipmentType.Cable, UserId: 'user123', ExerciseHistories: [] },
  { Id: '10', ExerciseName: 'Smith Machine Incline Press', Category: Category.Chest, EquipmentType: EquipmentType.SmithMachine, UserId: 'user123', ExerciseHistories: [] },

  // Back
  { Id: '11', ExerciseName: 'Deadlift', Category: Category.Back, EquipmentType: EquipmentType.Barbell, UserId: 'user123', ExerciseHistories: [] },
  { Id: '12', ExerciseName: 'Lat Pulldown', Category: Category.Back, EquipmentType: EquipmentType.Machine, UserId: 'user123', ExerciseHistories: [] },
  { Id: '13', ExerciseName: 'Dumbbell Row', Category: Category.Back, EquipmentType: EquipmentType.Dumbbell, UserId: 'user123', ExerciseHistories: [] },
  { Id: '14', ExerciseName: 'Cable Row', Category: Category.Back, EquipmentType: EquipmentType.Cable, UserId: 'user123', ExerciseHistories: [] },
  { Id: '15', ExerciseName: 'Smith Machine Row', Category: Category.Back, EquipmentType: EquipmentType.SmithMachine, UserId: 'user123', ExerciseHistories: [] },

  // Shoulders
  { Id: '16', ExerciseName: 'Overhead Press', Category: Category.Shoulders, EquipmentType: EquipmentType.Barbell, UserId: 'user123', ExerciseHistories: [] },
  { Id: '17', ExerciseName: 'Shoulder Press Machine', Category: Category.Shoulders, EquipmentType: EquipmentType.Machine, UserId: 'user123', ExerciseHistories: [] },
  { Id: '18', ExerciseName: 'Dumbbell Lateral Raise', Category: Category.Shoulders, EquipmentType: EquipmentType.Dumbbell, UserId: 'user123', ExerciseHistories: [] },
  { Id: '19', ExerciseName: 'Cable Rear Delt Fly', Category: Category.Shoulders, EquipmentType: EquipmentType.Cable, UserId: 'user123', ExerciseHistories: [] },
  { Id: '20', ExerciseName: 'Smith Machine Overhead Press', Category: Category.Shoulders, EquipmentType: EquipmentType.SmithMachine, UserId: 'user123', ExerciseHistories: [] },

  // Biceps
  { Id: '21', ExerciseName: 'Barbell Curl', Category: Category.Biceps, EquipmentType: EquipmentType.Barbell, UserId: 'user123', ExerciseHistories: [] },
  { Id: '22', ExerciseName: 'Preacher Curl Machine', Category: Category.Biceps, EquipmentType: EquipmentType.Machine, UserId: 'user123', ExerciseHistories: [] },
  { Id: '23', ExerciseName: 'Dumbbell Curl', Category: Category.Biceps, EquipmentType: EquipmentType.Dumbbell, UserId: 'user123', ExerciseHistories: [] },
  { Id: '24', ExerciseName: 'Cable Curl', Category: Category.Biceps, EquipmentType: EquipmentType.Cable, UserId: 'user123', ExerciseHistories: [] },
  { Id: '25', ExerciseName: 'Smith Machine Curl', Category: Category.Biceps, EquipmentType: EquipmentType.SmithMachine, UserId: 'user123', ExerciseHistories: [] },

  // Triceps
  { Id: '26', ExerciseName: 'Close-Grip Bench Press', Category: Category.Triceps, EquipmentType: EquipmentType.Barbell, UserId: 'user123', ExerciseHistories: [] },
  { Id: '27', ExerciseName: 'Triceps Extension Machine', Category: Category.Triceps, EquipmentType: EquipmentType.Machine, UserId: 'user123', ExerciseHistories: [] },
  { Id: '28', ExerciseName: 'Dumbbell Overhead Triceps Extension', Category: Category.Triceps, EquipmentType: EquipmentType.Dumbbell, UserId: 'user123', ExerciseHistories: [] },
  { Id: '29', ExerciseName: 'Cable Pushdown', Category: Category.Triceps, EquipmentType: EquipmentType.Cable, UserId: 'user123', ExerciseHistories: [] },
  { Id: '30', ExerciseName: 'Smith Machine Close-Grip Bench Press', Category: Category.Triceps, EquipmentType: EquipmentType.SmithMachine, UserId: 'user123', ExerciseHistories: [] },
];
