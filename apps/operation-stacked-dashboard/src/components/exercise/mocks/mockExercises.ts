import { Category, EquipmentType } from '@operation-stacked/operation-stacked-shared-types';
import { Exercise } from '@operation-stacked/shared-services';

export const mockExercises: Exercise[] = [ // Assuming Exercise is imported or defined somewhere
  {
    Id: '1',
    ExerciseName: 'Squat',
    Category: Category.Legs, // Use enum value
    EquipmentType: EquipmentType.Barbell, // Use enum value
    UserId: 'user123',
    ExerciseHistories: [],
  },
  {
    Id: '2',
    ExerciseName: 'Bench Press',
    Category: Category.Chest, // Use enum value
    EquipmentType: EquipmentType.Barbell, // Use enum value
    UserId: 'user123',
    ExerciseHistories: [],
  },
];
