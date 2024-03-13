import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { PedalItem, DialItem } from '../src/api/toneTrackerApi';
import DialForm from './DialForm';

type NewPedalFormProps = {
  onSave: (newPedal: PedalItem) => void;
  onCancel: () => void;
};

const NewPedalForm: React.FC<NewPedalFormProps> = ({ onSave, onCancel }) => {
  const [pedalName, setPedalName] = useState('');
  const [dials, setDials] = useState<DialItem[]>([]);
  const [isCreatingDial, setIsCreatingDial] = useState(false);

  const handleCreateDial = (dial: DialItem) => {
    setDials([...dials, dial]);
    setIsCreatingDial(false);
  };

  const handleCreatePedal = () => {
    const newPedal: PedalItem = {
      name: pedalName,
      userId: '12345',
      dials,
      toggles: [],
    };
  
    onSave(newPedal);
  };
  

  return (
    <View>
      <TextInput value={pedalName} onChangeText={setPedalName} />
      <Button title="Create Dial" onPress={() => setIsCreatingDial(true)} />
      {isCreatingDial && (
        <DialForm onSave={handleCreateDial} onCancel={() => setIsCreatingDial(false)} />
      )}
      <Button title="Create Pedal (New pedal form)" onPress={handleCreatePedal} />
      <Button title="Cancel" onPress={onCancel} />
    </View>
  );
};

export default NewPedalForm;
