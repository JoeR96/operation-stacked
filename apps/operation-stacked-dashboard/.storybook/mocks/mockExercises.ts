import { Exercise, ExerciseHistory } from '../../../../libs/shared-services/src';
import { Category, EquipmentType } from '@operation-stacked/shared-services';
export const mockExercisesWithMultipleHistory: Exercise[] = [
  { Id: '1', ExerciseName: 'Squat', Category: Category.NUMBER_0, EquipmentType: EquipmentType.NUMBER_0, UserId: 'user123', ExerciseHistories: [
      { CompletedDate: '2024-01-01', CompletedSets: 3, CompletedReps: '8', ExerciseId: '1', WorkingWeight: 135 },
      { CompletedDate: '2024-01-03', CompletedSets: 3, CompletedReps: '8', ExerciseId: '1', WorkingWeight: 145 },
      { CompletedDate: '2024-01-05', CompletedSets: 3, CompletedReps: '8', ExerciseId: '1', WorkingWeight: 155 }
    ]},
  { Id: '2', ExerciseName: 'Leg Press', Category: Category.NUMBER_0, EquipmentType: EquipmentType.NUMBER_1, UserId: 'user123', ExerciseHistories: [
      { CompletedDate: '2024-01-02', CompletedSets: 3, CompletedReps: '10', ExerciseId: '2', WorkingWeight: 200 },
      { CompletedDate: '2024-01-04', CompletedSets: 3, CompletedReps: '10', ExerciseId: '2', WorkingWeight: 210 },
      { CompletedDate: '2024-01-06', CompletedSets: 3, CompletedReps: '10', ExerciseId: '2', WorkingWeight: 220 }
    ]}];
export const mockExercises: Exercise[] = [
  { Id: '1', ExerciseName: 'Squat', Category: Category.NUMBER_0, EquipmentType: EquipmentType.NUMBER_0, UserId: 'user123', ExerciseHistories: [
      { CompletedDate: '2024-01-01', CompletedSets: 3, CompletedReps: '8', ExerciseId: '1', WorkingWeight: 135 },
      { CompletedDate: '2024-01-03', CompletedSets: 3, CompletedReps: '8', ExerciseId: '1', WorkingWeight: 145 },
      { CompletedDate: '2024-01-05', CompletedSets: 3, CompletedReps: '8', ExerciseId: '1', WorkingWeight: 155 }
    ]},
  { Id: '2', ExerciseName: 'Leg Press', Category: Category.NUMBER_0, EquipmentType: EquipmentType.NUMBER_1, UserId: 'user123', ExerciseHistories: [
      { CompletedDate: '2024-01-02', CompletedSets: 3, CompletedReps: '10', ExerciseId: '2', WorkingWeight: 200 },
      { CompletedDate: '2024-01-04', CompletedSets: 3, CompletedReps: '10', ExerciseId: '2', WorkingWeight: 210 },
      { CompletedDate: '2024-01-06', CompletedSets: 3, CompletedReps: '10', ExerciseId: '2', WorkingWeight: 220 }
    ]},
  { Id: '3', ExerciseName: 'Dumbbell Lunges', Category: Category.NUMBER_0, EquipmentType: EquipmentType.NUMBER_2, UserId: 'user123', ExerciseHistories: [
      { CompletedDate: '2024-01-01', CompletedSets: 4, CompletedReps: '8', ExerciseId: '3', WorkingWeight: 40 },
      { CompletedDate: '2024-01-03', CompletedSets: 4, CompletedReps: '8', ExerciseId: '3', WorkingWeight: 45 },
      { CompletedDate: '2024-01-05', CompletedSets: 4, CompletedReps: '8', ExerciseId: '3', WorkingWeight: 50 }
    ]},
  { Id: '4', ExerciseName: 'Cable Leg Curls', Category: Category.NUMBER_0, EquipmentType: EquipmentType.NUMBER_3, UserId: 'user123', ExerciseHistories: [
      { CompletedDate: '2024-01-02', CompletedSets: 3, CompletedReps: '12', ExerciseId: '4', WorkingWeight: 60 },
      { CompletedDate: '2024-01-04', CompletedSets: 3, CompletedReps: '12', ExerciseId: '4', WorkingWeight: 65 },
      { CompletedDate: '2024-01-06', CompletedSets: 3, CompletedReps: '12', ExerciseId: '4', WorkingWeight: 70 }
    ]},
  { Id: '5', ExerciseName: 'Smith Machine Squat', Category: Category.NUMBER_0, EquipmentType: EquipmentType.NUMBER_4, UserId: 'user123', ExerciseHistories: [
      { CompletedDate: '2024-01-01', CompletedSets: 3, CompletedReps: '8', ExerciseId: '5', WorkingWeight: 145 },
      { CompletedDate: '2024-01-03', CompletedSets: 3, CompletedReps: '8', ExerciseId: '5', WorkingWeight: 155 },
      { CompletedDate: '2024-01-05', CompletedSets: 3, CompletedReps: '8', ExerciseId: '5', WorkingWeight: 165 }
    ]},
  { Id: '6', ExerciseName: 'Bench Press', Category: Category.NUMBER_1, EquipmentType: EquipmentType.NUMBER_0, UserId: 'user123', ExerciseHistories: [
      { CompletedDate: '2024-01-02', CompletedSets: 3, CompletedReps: '8', ExerciseId: '6', WorkingWeight: 155 },
      { CompletedDate: '2024-01-04', CompletedSets: 3, CompletedReps: '8', ExerciseId: '6', WorkingWeight: 165 },
      { CompletedDate: '2024-01-06', CompletedSets: 3, CompletedReps: '8', ExerciseId: '6', WorkingWeight: 175 }
    ]},
  { Id: '7', ExerciseName: 'Chest Fly', Category: Category.NUMBER_1, EquipmentType: EquipmentType.NUMBER_1, UserId: 'user123', ExerciseHistories: [
      { CompletedDate: '2024-01-01', CompletedSets: 3, CompletedReps: '10', ExerciseId: '7', WorkingWeight: 30 },
      { CompletedDate: '2024-01-03', CompletedSets: 3, CompletedReps: '10', ExerciseId: '7', WorkingWeight: 35 },
      { CompletedDate: '2024-01-05', CompletedSets: 3, CompletedReps: '10', ExerciseId: '7', WorkingWeight: 40 }
    ]},
  { Id: '8', ExerciseName: 'Dumbbell Bench Press', Category: Category.NUMBER_1, EquipmentType: EquipmentType.NUMBER_2, UserId: 'user123', ExerciseHistories: [
      { CompletedDate: '2024-01-02', CompletedSets: 4, CompletedReps: '8', ExerciseId: '8', WorkingWeight: 40 },
      { CompletedDate: '2024-01-04', CompletedSets: 4, CompletedReps: '8', ExerciseId: '8', WorkingWeight: 45 },
      { CompletedDate: '2024-01-06', CompletedSets: 4, CompletedReps: '8', ExerciseId: '8', WorkingWeight: 50 }
    ]},
  { Id: '9', ExerciseName: 'Cable Crossover', Category: Category.NUMBER_1, EquipmentType: EquipmentType.NUMBER_3, UserId: 'user123', ExerciseHistories: [
      { CompletedDate: '2024-01-01', CompletedSets: 3, CompletedReps: '12', ExerciseId: '9', WorkingWeight: 20 },
      { CompletedDate: '2024-01-03', CompletedSets: 3, CompletedReps: '12', ExerciseId: '9', WorkingWeight: 25 },
      { CompletedDate: '2024-01-05', CompletedSets: 3, CompletedReps: '12', ExerciseId: '9', WorkingWeight: 30 }
    ]},
  { Id: '10', ExerciseName: 'Smith Machine Incline Press', Category: Category.NUMBER_1, EquipmentType: EquipmentType.NUMBER_4, UserId: 'user123', ExerciseHistories: [
      { CompletedDate: '2024-01-02', CompletedSets: 3, CompletedReps: '8', ExerciseId: '10', WorkingWeight: 135 },
      { CompletedDate: '2024-01-04', CompletedSets: 3, CompletedReps: '8', ExerciseId: '10', WorkingWeight: 145 },
      { CompletedDate: '2024-01-06', CompletedSets: 3, CompletedReps: '8', ExerciseId: '10', WorkingWeight: 155 }
    ]},
  { Id: '11', ExerciseName: 'Deadlift', Category: Category.NUMBER_2, EquipmentType: EquipmentType.NUMBER_0, UserId: 'user123', ExerciseHistories: [
      { CompletedDate: '2024-01-01', CompletedSets: 3, CompletedReps: '5', ExerciseId: '11', WorkingWeight: 185 },
      { CompletedDate: '2024-01-03', CompletedSets: 3, CompletedReps: '5', ExerciseId: '11', WorkingWeight: 195 },
      { CompletedDate: '2024-01-05', CompletedSets: 3, CompletedReps: '5', ExerciseId: '11', WorkingWeight: 205 }
    ]},
  { Id: '12', ExerciseName: 'Lat Pulldown', Category: Category.NUMBER_2, EquipmentType: EquipmentType.NUMBER_1, UserId: 'user123', ExerciseHistories: [
      { CompletedDate: '2024-01-02', CompletedSets: 3, CompletedReps: '8', ExerciseId: '12', WorkingWeight: 100 },
      { CompletedDate: '2024-01-04', CompletedSets: 3, CompletedReps: '8', ExerciseId: '12', WorkingWeight: 110 },
      { CompletedDate: '2024-01-06', CompletedSets: 3, CompletedReps: '8', ExerciseId: '12', WorkingWeight: 120 }
    ]},
  { Id: '13', ExerciseName: 'Dumbbell Row', Category: Category.NUMBER_2, EquipmentType: EquipmentType.NUMBER_2, UserId: 'user123', ExerciseHistories: [
      { CompletedDate: '2024-01-01', CompletedSets: 4, CompletedReps: '8', ExerciseId: '13', WorkingWeight: 40 },
      { CompletedDate: '2024-01-03', CompletedSets: 4, CompletedReps: '8', ExerciseId: '13', WorkingWeight: 45 },
      { CompletedDate: '2024-01-05', CompletedSets: 4, CompletedReps: '8', ExerciseId: '13', WorkingWeight: 50 }
    ]},
  { Id: '14', ExerciseName: 'Cable Row', Category: Category.NUMBER_2, EquipmentType: EquipmentType.NUMBER_3, UserId: 'user123', ExerciseHistories: [
      { CompletedDate: '2024-01-02', CompletedSets: 3, CompletedReps: '10', ExerciseId: '14', WorkingWeight: 80 },
      { CompletedDate: '2024-01-04', CompletedSets: 3, CompletedReps: '10', ExerciseId: '14', WorkingWeight: 85 },
      { CompletedDate: '2024-01-06', CompletedSets: 3, CompletedReps: '10', ExerciseId: '14', WorkingWeight: 90 }
    ]},
  { Id: '15', ExerciseName: 'Smith Machine Row', Category: Category.NUMBER_2, EquipmentType: EquipmentType.NUMBER_4, UserId: 'user123', ExerciseHistories: [
      { CompletedDate: '2024-01-01', CompletedSets: 3, CompletedReps: '8', ExerciseId: '15', WorkingWeight: 135 },
      { CompletedDate: '2024-01-03', CompletedSets: 3, CompletedReps: '8', ExerciseId: '15', WorkingWeight: 145 },
      { CompletedDate: '2024-01-05', CompletedSets: 3, CompletedReps: '8', ExerciseId: '15', WorkingWeight: 155 }
    ]},
  { Id: '16', ExerciseName: 'Overhead Press', Category: Category.NUMBER_3, EquipmentType: EquipmentType.NUMBER_0, UserId: 'user123', ExerciseHistories: [
      { CompletedDate: '2024-01-02', CompletedSets: 3, CompletedReps: '8', ExerciseId: '16', WorkingWeight: 75 },
      { CompletedDate: '2024-01-04', CompletedSets: 3, CompletedReps: '8', ExerciseId: '16', WorkingWeight: 80 },
      { CompletedDate: '2024-01-06', CompletedSets: 3, CompletedReps: '8', ExerciseId: '16', WorkingWeight: 85 }
    ]},
  { Id: '17', ExerciseName: 'Shoulder Press Machine', Category: Category.NUMBER_3, EquipmentType: EquipmentType.NUMBER_1, UserId: 'user123', ExerciseHistories: [
      { CompletedDate: '2024-01-01', CompletedSets: 3, CompletedReps: '10', ExerciseId: '17', WorkingWeight: 60 },
      { CompletedDate: '2024-01-03', CompletedSets: 3, CompletedReps: '10', ExerciseId: '17', WorkingWeight: 65 },
      { CompletedDate: '2024-01-05', CompletedSets: 3, CompletedReps: '10', ExerciseId: '17', WorkingWeight: 70 }
    ]},
  { Id: '18', ExerciseName: 'Dumbbell Lateral Raise', Category: Category.NUMBER_3, EquipmentType: EquipmentType.NUMBER_2, UserId: 'user123', ExerciseHistories: [
      { CompletedDate: '2024-01-02', CompletedSets: 4, CompletedReps: '12', ExerciseId: '18', WorkingWeight: 10 },
      { CompletedDate: '2024-01-04', CompletedSets: 4, CompletedReps: '12', ExerciseId: '18', WorkingWeight: 12.5 },
      { CompletedDate: '2024-01-06', CompletedSets: 4, CompletedReps: '12', ExerciseId: '18', WorkingWeight: 15 }
    ]},
  { Id: '19', ExerciseName: 'Cable Rear Delt Fly', Category: Category.NUMBER_3, EquipmentType: EquipmentType.NUMBER_3, UserId: 'user123', ExerciseHistories: [
      { CompletedDate: '2024-01-01', CompletedSets: 3, CompletedReps: '12', ExerciseId: '19', WorkingWeight: 15 },
      { CompletedDate: '2024-01-03', CompletedSets: 3, CompletedReps: '12', ExerciseId: '19', WorkingWeight: 17.5 },
      { CompletedDate: '2024-01-05', CompletedSets: 3, CompletedReps: '12', ExerciseId: '19', WorkingWeight: 20 }
    ]},
  { Id: '20', ExerciseName: 'Smith Machine Overhead Press', Category: Category.NUMBER_3, EquipmentType: EquipmentType.NUMBER_4, UserId: 'user123', ExerciseHistories: [
      { CompletedDate: '2024-01-02', CompletedSets: 3, CompletedReps: '8', ExerciseId: '20', WorkingWeight: 65 },
      { CompletedDate: '2024-01-04', CompletedSets: 3, CompletedReps: '8', ExerciseId: '20', WorkingWeight: 70 },
      { CompletedDate: '2024-01-06', CompletedSets: 3, CompletedReps: '8', ExerciseId: '20', WorkingWeight: 75 }
    ]},
  { Id: '21', ExerciseName: 'Barbell Curl', Category: Category.NUMBER_4, EquipmentType: EquipmentType.NUMBER_0, UserId: 'user123', ExerciseHistories: [
      { CompletedDate: '2024-01-01', CompletedSets: 3, CompletedReps: '8', ExerciseId: '21', WorkingWeight: 45 },
      { CompletedDate: '2024-01-03', CompletedSets: 3, CompletedReps: '8', ExerciseId: '21', WorkingWeight: 50 },
      { CompletedDate: '2024-01-05', CompletedSets: 3, CompletedReps: '8', ExerciseId: '21', WorkingWeight: 55 }
    ]},
  { Id: '22', ExerciseName: 'Preacher Curl Machine', Category: Category.NUMBER_4, EquipmentType: EquipmentType.NUMBER_1, UserId: 'user123', ExerciseHistories: [
      { CompletedDate: '2024-01-02', CompletedSets: 3, CompletedReps: '10', ExerciseId: '22', WorkingWeight: 30 },
      { CompletedDate: '2024-01-04', CompletedSets: 3, CompletedReps: '10', ExerciseId: '22', WorkingWeight: 35 },
      { CompletedDate: '2024-01-06', CompletedSets: 3, CompletedReps: '10', ExerciseId: '22', WorkingWeight: 40 }
    ]},
  { Id: '23', ExerciseName: 'Dumbbell Curl', Category: Category.NUMBER_4, EquipmentType: EquipmentType.NUMBER_2, UserId: 'user123', ExerciseHistories: [
      { CompletedDate: '2024-01-01', CompletedSets: 4, CompletedReps: '8', ExerciseId: '23', WorkingWeight: 15 },
      { CompletedDate: '2024-01-03', CompletedSets: 4, CompletedReps: '8', ExerciseId: '23', WorkingWeight: 17.5 },
      { CompletedDate: '2024-01-05', CompletedSets: 4, CompletedReps: '8', ExerciseId: '23', WorkingWeight: 20 }
    ]},
  { Id: '24', ExerciseName: 'Cable Curl', Category: Category.NUMBER_4, EquipmentType: EquipmentType.NUMBER_3, UserId: 'user123', ExerciseHistories: [
      { CompletedDate: '2024-01-02', CompletedSets: 3, CompletedReps: '12', ExerciseId: '24', WorkingWeight: 20 },
      { CompletedDate: '2024-01-04', CompletedSets: 3, CompletedReps: '12', ExerciseId: '24', WorkingWeight: 22.5 },
      { CompletedDate: '2024-01-06', CompletedSets: 3, CompletedReps: '12', ExerciseId: '24', WorkingWeight: 25 }
    ]},
  { Id: '25', ExerciseName: 'Smith Machine Curl', Category: Category.NUMBER_4, EquipmentType: EquipmentType.NUMBER_4, UserId: 'user123', ExerciseHistories: [
      { CompletedDate: '2024-01-01', CompletedSets: 3, CompletedReps: '8', ExerciseId: '25', WorkingWeight: 30 },
      { CompletedDate: '2024-01-03', CompletedSets: 3, CompletedReps: '8', ExerciseId: '25', WorkingWeight: 35 },
      { CompletedDate: '2024-01-05', CompletedSets: 3, CompletedReps: '8', ExerciseId: '25', WorkingWeight: 40 }
    ]},
  { Id: '26', ExerciseName: 'Close-Grip Bench Press', Category: Category.NUMBER_5, EquipmentType: EquipmentType.NUMBER_0, UserId: 'user123', ExerciseHistories: [
      { CompletedDate: '2024-01-02', CompletedSets: 3, CompletedReps: '8', ExerciseId: '26', WorkingWeight: 135 },
      { CompletedDate: '2024-01-04', CompletedSets: 3, CompletedReps: '8', ExerciseId: '26', WorkingWeight: 145 },
      { CompletedDate: '2024-01-06', CompletedSets: 3, CompletedReps: '8', ExerciseId: '26', WorkingWeight: 155 }
    ]},
  { Id: '27', ExerciseName: 'Triceps Extension Machine', Category: Category.NUMBER_5, EquipmentType: EquipmentType.NUMBER_1, UserId: 'user123', ExerciseHistories: [
      { CompletedDate: '2024-01-01', CompletedSets: 3, CompletedReps: '10', ExerciseId: '27', WorkingWeight: 40 },
      { CompletedDate: '2024-01-03', CompletedSets: 3, CompletedReps: '10', ExerciseId: '27', WorkingWeight: 45 },
      { CompletedDate: '2024-01-05', CompletedSets: 3, CompletedReps: '10', ExerciseId: '27', WorkingWeight: 50 }
    ]},
  { Id: '28', ExerciseName: 'Dumbbell Overhead Triceps Extension', Category: Category.NUMBER_5, EquipmentType: EquipmentType.NUMBER_2, UserId: 'user123', ExerciseHistories: [
      { CompletedDate: '2024-01-02', CompletedSets: 4, CompletedReps: '12', ExerciseId: '28', WorkingWeight: 20 },
      { CompletedDate: '2024-01-04', CompletedSets: 4, CompletedReps: '12', ExerciseId: '28', WorkingWeight: 22.5 },
      { CompletedDate: '2024-01-06', CompletedSets: 4, CompletedReps: '12', ExerciseId: '28', WorkingWeight: 25 }
    ]},
  { Id: '29', ExerciseName: 'Cable Pushdown', Category: Category.NUMBER_5, EquipmentType: EquipmentType.NUMBER_3, UserId: 'user123', ExerciseHistories: [
      { CompletedDate: '2024-01-01', CompletedSets: 3, CompletedReps: '10', ExerciseId: '29', WorkingWeight: 25 },
      { CompletedDate: '2024-01-03', CompletedSets: 3, CompletedReps: '10', ExerciseId: '29', WorkingWeight: 30 },
      { CompletedDate: '2024-01-05', CompletedSets: 3, CompletedReps: '10', ExerciseId: '29', WorkingWeight: 35 }
    ]},
  { Id: '30', ExerciseName: 'Smith Machine Close-Grip Bench Press', Category: Category.NUMBER_5, EquipmentType: EquipmentType.NUMBER_4, UserId: 'user123', ExerciseHistories: [
      { CompletedDate: '2024-01-02', CompletedSets: 3, CompletedReps: '8', ExerciseId: '30', WorkingWeight: 135 },
      { CompletedDate: '2024-01-04', CompletedSets: 3, CompletedReps: '8', ExerciseId: '30', WorkingWeight: 145 },
      { CompletedDate: '2024-01-06', CompletedSets: 3, CompletedReps: '8', ExerciseId: '30', WorkingWeight: 155 }
    ]}
];

export const exerciseHistories : ExerciseHistory[] = [
  { CompletedDate: '2024-01-01', CompletedSets: 3, CompletedReps: '8', ExerciseId: '1', WorkingWeight: 135 },
  { CompletedDate: '2024-01-03', CompletedSets: 3, CompletedReps: '8', ExerciseId: '1', WorkingWeight: 145 },
  { CompletedDate: '2024-01-05', CompletedSets: 3, CompletedReps: '8', ExerciseId: '1', WorkingWeight: 155 }
]

export const multipleExerciseHistories : ExerciseHistory[][] = [[
  { CompletedDate: '2024-01-01', CompletedSets: 3, CompletedReps: '8', ExerciseId: '1', WorkingWeight: 135 },
  { CompletedDate: '2024-01-03', CompletedSets: 3, CompletedReps: '8', ExerciseId: '1', WorkingWeight: 145 },
  { CompletedDate: '2024-01-05', CompletedSets: 3, CompletedReps: '8', ExerciseId: '1', WorkingWeight: 155 }
],
  [
    { CompletedDate: '2024-01-01', CompletedSets: 3, CompletedReps: '8', ExerciseId: '1', WorkingWeight: 135 },
    { CompletedDate: '2024-01-03', CompletedSets: 3, CompletedReps: '8', ExerciseId: '1', WorkingWeight: 145 },
    { CompletedDate: '2024-01-05', CompletedSets: 3, CompletedReps: '8', ExerciseId: '1', WorkingWeight: 155 }
  ]

]