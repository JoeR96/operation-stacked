import React, { useState } from 'react';
import { Grid, Paper, FormControl, InputLabel, Select, MenuItem, Typography, Button } from '@mui/material';
import Spinner from '../spinner/Spinner';
import { useUserStore } from '../../state/userState';
import { theme } from '@operation-stacked/shared-styles';
import { ERROR, PENDING, useApi } from '@operation-stacked/api-hooks';
import { Category, EquipmentType } from '@operation-stacked/operation-stacked-shared-types';
import { CreateExerciseRequest, ExerciseApi } from '@operation-stacked/shared-services';
import { TextField } from '@operation-stacked/ui-components';

export interface ExerciseFormProps {
  onRefreshExercises: () => void;
}

const ExerciseForm: React.FC<ExerciseFormProps> = ({ onRefreshExercises }) => {
  const [exerciseName, setExerciseName] = useState<string>('');
  const [category, setCategory] = useState<Category | ''>('');
  const [equipmentType, setEquipmentType] = useState<EquipmentType | ''>('');
  const themeColors = theme.colors;
  const { userId } = useUserStore();

  const exerciseApi = new ExerciseApi();

  const {
    apiStatus,
    error,
    exec
  } = useApi(async (newExerciseRequest) => {
    return await exerciseApi.exerciseCreateExercisesPost(newExerciseRequest as CreateExerciseRequest[]);
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newExerciseRequest = [{
      ExerciseName: exerciseName,
      Category: category as number, // Assuming Category expects a number
      EquipmentType: equipmentType as number, // Assuming EquipmentType expects a number
      UserId: userId
    }];

    exec(newExerciseRequest).then(() => {
      setExerciseName('');
      setCategory('');
      setEquipmentType('');

    }).catch(console.error);
    onRefreshExercises();
  };

  const textFieldStyles = {
    input: { color: themeColors.text },
    notchedOutline: { borderColor: 'white' },
    label: { color: themeColors.text },
  };

  if (apiStatus === PENDING) return <Spinner />;
  if (apiStatus === ERROR) return <div>Error adding exercise: {error?.message}</div>;

  return (
    <Paper style={{ padding: 16, background: '#1d1d1d' }}>
      {apiStatus === 'success' ? (
        <Typography variant="h6" style={{ marginBottom: 16 }}>
          Exercise Created Successfully!
        </Typography>
      ) : (
        <form onSubmit={handleSubmit}>
          <Grid container alignItems="flex-start" spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Exercise Name"
                value={exerciseName}
                onChange={(e) => setExerciseName(e.target.value)}
                InputProps={{
                  style: textFieldStyles.input,
                }}
                InputLabelProps={{ style: textFieldStyles.label }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel style={textFieldStyles.label}>Category</InputLabel>
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                  label="Category"
                  style={textFieldStyles.input}
                >
                  {Object.entries(Category)
                    .filter(([key, value]) => !isNaN(Number(value))) // filter by value being a number
                    .map(([key, value]) => (
                      // Assuming you want the enum's name as the key and its numeric value as the value:
                      <MenuItem key={key} value={value as Category}>
                        {key}
                      </MenuItem>
                    ))}

                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel style={textFieldStyles.label}>Equipment Type</InputLabel>
                <Select
                  value={equipmentType}
                  onChange={(e) => setEquipmentType(e.target.value as EquipmentType)}
                  label="Equipment Type"
                  style={textFieldStyles.input}
                >
                  {Object.entries(EquipmentType)
                    .filter(([key, value]) => !isNaN(Number(value))) // filter by value being a number
                    .map(([key, value]) => (
                      // Assuming you want the enum's name as the key and its numeric value as the value:
                      <MenuItem key={key} value={value as EquipmentType}>
                        {key}
                      </MenuItem>
                    ))}

                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">
                Add Exercise
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Paper>
  );
};

export default ExerciseForm;
