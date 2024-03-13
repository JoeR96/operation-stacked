    import { ParamListBase, RouteProp } from '@react-navigation/native';
import { Component } from 'react';
    import { ViewStyle } from 'react-native';

    export interface SpinnerProps {
        visible: boolean;
        textContent?: string;
        textStyle?: ViewStyle;
        overlayColor?: string;
        color?: string;
        size?: 'small' | 'large' | 'none';
        animation?: string;
        customIndicator?: JSX.Element;
        children?: JSX.Element | JSX.Element[];
    }
  
    export interface LoginResponse {
        idToken: string;
        accessToken: string;
        refreshToken: string;
        tokenType: string;
        expiresIn: number;
        userId: string;
    }


export interface Auth {
    idToken: string;
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
    userId: string;
    success: boolean;
}

    export default class Spinner extends Component<SpinnerProps> { }

export type BaseExercise = {
    Id: string;
    ExerciseName: string;
    Username: string;
    Category: string;
    EquipmentType: number;
    Template: number;
    LiftDay: number;
    LiftOrder: number;
    LiftWeek: number;
    UserId: string;
    WorkingWeight: number;
    ParentId: string;
    Completed: boolean;
    RestTimer: number;
};
export function isTemplate0Exercise(exercise: BaseExercise): exercise is Template0Exercise {
    return exercise.Template === 0;
}

export type Template0Exercise = BaseExercise & {
    MinimumReps: number;
    MaximumReps: number;
    Sets: number;
    StartingSets: number;
    CurrentSets: number;
    WeightIndex: number;
    PrimaryExercise: boolean;
    StartingWeight: number;
    WeightProgression: number;
    AttemptsBeforeDeload: number;
    CurrentAttempt: number;
};
export type ResponseExercise = {
    Data: {
        exercise: {
            Category: string;
            Completed: boolean;
            EquipmentType: number;
            ExerciseName: string;
            Id: string;
            LiftDay: number;
            LiftOrder: number;
            LiftWeek: number;
            ParentId: string;
            Template: number;
            UserId: string;
            Username: string;
            WorkingWeight: number;
        }
    }
};

export type RootStackParamList = ParamListBase & {
    Exercise: {
        ExerciseId: number;
    };
    ExerciseResponse: {
        responseExercise: ResponseExercise;
    };
};
export type Template1Exercise = BaseExercise & {
    TrainingMax: number;
    PrimaryLift: boolean;
    Block: number;
    AmrapRepTarget: number;
    AmrapRepResult: number;
    Week: number;
    Intensity: number;
    Sets: number;
    RepsPerSet: number;
    RoundingValue: number;
};


type ExerciseParams = {
    Exercise: {
        exercise: BaseExercise;
    };
};

type ExerciseRouteProp = RouteProp<ExerciseParams, 'Exercise'>;

export type ExerciseProps = {
    route: ExerciseRouteProp;
};

export interface Todo {
    Id: number;
    Title: string;
    Category: string;
    Description: string;
    Username: string;
    Completed: boolean;
    CompletedDate: Date;
    CreatedDate: Date;
}


export enum EquipmentType{
    Barbell,
    SmithMachine,
    Dumbbell,
    Machine,
    Cable,
}