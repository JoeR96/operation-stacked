import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AmplifierItem } from '../src/api/toneTrackerApi';

type AmplifierListProps = {
  amplifiers: AmplifierItem[];
  onAmplifierClick: (amp: AmplifierItem) => void;
};

const AmplifierList: React.FC<AmplifierListProps> = ({ amplifiers, onAmplifierClick }) => {
  return (
    <View>
      {amplifiers.map((amp) => (
        <TouchableOpacity key={amp.id} onPress={() => onAmplifierClick(amp)}>
          <Text>{amp.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default AmplifierList;
