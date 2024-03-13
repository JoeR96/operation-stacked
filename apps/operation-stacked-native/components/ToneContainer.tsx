import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import ToneForm from './ToneForm';

type ToneItem = {
  // Define the structure of a tone item
};

type ToneFormProps = {
  onSave: (tone: ToneItem) => void;
};

type ToneContainerProps = {
  // You can pass in initial data or callbacks as props here...
};

type ToneContainerNavigationProp = StackNavigationProp<RootStackParamList, 'ToneContainer'>;

const ToneContainer: React.FC<ToneContainerProps> = () => {
  const [tones, setTones] = useState<ToneItem[]>([]);
  const [creatingTone, setCreatingTone] = useState(false);
  const navigation = useNavigation<ToneContainerNavigationProp>();

  const handleCreateTone = () => {
    setCreatingTone(true);
  };

  const handleSaveTone = (tone: ToneItem) => {
    // Implement the logic to save the new tone
    setTones(prevTones => [...prevTones, tone]);
    setCreatingTone(false);
  };

  const handleCancelCreateTone = () => {
    setCreatingTone(false);
  };

  const handleOpenToneForm = () => {
    navigation.navigate('ToneForm');
  };

  return (
    <View>
      {/* Render the list of tones */}
      {/* Placeholder for ToneList component */}
      
      {/* Render the buttons */}
      {!creatingTone && (
        <>
          <Button title="Create Tone" onPress={handleCreateTone} />
        </>
      )}
      
      {/* Render ToneForm component if creatingTone is true */}
      {creatingTone && (
        <ToneForm  />
      )}
    </View>
  );
};

export default ToneContainer;
