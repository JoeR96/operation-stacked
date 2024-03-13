import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { AmplifierItem } from '../src/api/toneTrackerApi';

const AmplifierForm: React.FC = () => {
  const [newAmp, setNewAmp] = useState<AmplifierItem>();

  const handleSubmit = () => {
  };

  return (
    <View>
    </View>
  );
};

export default AmplifierForm;
