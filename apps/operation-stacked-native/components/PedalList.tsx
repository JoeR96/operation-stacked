import React from 'react';
import { Text, View } from 'react-native';
import { PedalItem } from '../src/api/toneTrackerApi';

type PedalListProps = {
  pedals: PedalItem[];
  onPedalClick: (pedal: PedalItem) => void;
};

const PedalList: React.FC<PedalListProps> = ({ pedals, onPedalClick }) => {
  return (
    <View>
      {pedals.map((pedal, index) => (
        <Text key={index} onPress={() => onPedalClick(pedal)}>
          {pedal.name}
        </Text>
      ))}
    </View>
  );
};

export default PedalList;
