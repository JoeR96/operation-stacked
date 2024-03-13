import React, { useState } from 'react';
import { Button, View } from 'react-native';
import { AmplifierItem } from '../src/api/toneTrackerApi';
import PedalSettings from './PedalSettings';
import AmplifierForm from './AmplifierForm';


const AmplifierSelector: React.FC = () => {
  const [isAddingNewAmplifier, setIsAddingNewAmplifier] = useState(false);
  const [selectedAmplifier, setSelectedAmplifier] = useState<AmplifierItem | null>(null);
  const [existingAmplifiers, setExistingAmplifiers] = useState<AmplifierItem[]>([]);

  const handleNewAmplifierSubmit = (amplifier: AmplifierItem) => {
    setIsAddingNewAmplifier(false);
  };

  const handleAddExistingAmplifier = (amplifier: AmplifierItem) => {
    setSelectedAmplifier(amplifier);
  };

  const handleCancelSelection = () => {
    setSelectedAmplifier(null);
  };

  return (
    <View>
      {!selectedAmplifier && (
        <>
          {existingAmplifiers.map((amplifier, index) => (
            <Button
              key={index}
              title={amplifier.name}
              onPress={() => handleAddExistingAmplifier(amplifier)}
            />
          ))}
          <Button title="Add amplifier" onPress={() => setIsAddingNewAmplifier(true)} />
        </>
      )}

      {isAddingNewAmplifier && (
        <AmplifierForm/>
      )}

      {selectedAmplifier && (
        <View>
          <Button title="Cancel" onPress={handleCancelSelection} />
        </View>
      )}
    </View>
  );
};

export default AmplifierSelector;
