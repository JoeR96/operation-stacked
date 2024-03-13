import React from 'react';
import { Button } from 'react-native';

type AddAmplifierButtonProps = {
  onAddAmplifier: () => void;
};

const AddAmplifierButton: React.FC<AddAmplifierButtonProps> = ({ onAddAmplifier }) => {
  return <Button title="Add Amplifier" onPress={onAddAmplifier} />;
};

export default AddAmplifierButton;
