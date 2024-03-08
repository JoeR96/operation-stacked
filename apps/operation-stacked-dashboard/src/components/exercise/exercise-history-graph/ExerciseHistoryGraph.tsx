import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { Exercise } from '@operation-stacked/shared-services';
import { Box } from '@mui/material';

interface GraphData {
  date: string;
  [key: string]: any; // To dynamically handle multiple exercise names and their metrics
}

interface ExerciseHistoryGraphProps {
  exercises: Exercise[];
  toggle: 'weight' | 'volume';
}

const ExerciseHistoryGraph: React.FC<ExerciseHistoryGraphProps> = ({ exercises, toggle }) => {
  const [data, setData] = useState<GraphData[]>([]);

  useEffect(() => {
    const processedData: { [date: string]: GraphData } = {};

    // Initialize data structure with all possible dates
    exercises.forEach((exercise) => {
      exercise.ExerciseHistories?.forEach((history) => {
        if (!processedData[history.CompletedDate]) {
          processedData[history.CompletedDate] = { date: history.CompletedDate };
          // Initialize all exercises with null for this date
          exercises.forEach((ex) => {
            processedData[history.CompletedDate][ex.ExerciseName] = null;
          });
        }
      });
      console.log(exercises)
    });

    // Fill data
    exercises.forEach((exercise) => {
      exercise.ExerciseHistories?.forEach((history) => {
        const { CompletedDate, WorkingWeight, CompletedSets } = history;
        const reps = parseInt(history.CompletedReps, 10);
        // @ts-ignore
        const volume = WorkingWeight * reps * CompletedSets;
        const metric = toggle === 'weight' ? WorkingWeight : volume;

        processedData[CompletedDate][exercise.ExerciseName] = metric;
      });
    });

    setData(Object.values(processedData).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
  }, [exercises, toggle]);


  return (
    <Box sx={{paddingTop:3.5}}>
      <LineChart width={950} height={550} data={data} >
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <CartesianGrid stroke="#f5f5f5" />
    {exercises.map((exercise) => (
      <Line
      key={exercise.ExerciseName}
         type="monotone"
         dataKey={exercise.ExerciseName}
         stroke="#ff7300"
      // Add more customization here if needed
    />
  ))}
  <Legend />
</LineChart>
    </Box>

  );
};

export default ExerciseHistoryGraph;
