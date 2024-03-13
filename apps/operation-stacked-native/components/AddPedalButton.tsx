import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

type AddPedalButtonProps = {
  onAddPedal: () => void;
};

const AddPedalButton: React.FC<AddPedalButtonProps> = ({ onAddPedal }) => {
  return (
    <TouchableOpacity onPress={onAddPedal}>
      <Text>Add Pedal</Text>
    </TouchableOpacity>
  );
};

export default AddPedalButton;
