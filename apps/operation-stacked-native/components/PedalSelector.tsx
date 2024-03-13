import React, { useState } from 'react';
import { Button, View } from 'react-native';
import NewPedalForm from './NewPedalForm';
import { PedalItem } from '../src/api/toneTrackerApi';
import PedalSettings from './PedalSettings';
import { useNavigation } from '@react-navigation/native';

type PedalSelectorProps = {
  onAddPedal: (pedal: PedalItem) => void;
  onCancel: () => void; // Add this line
};

const PedalSelector: React.FC<PedalSelectorProps> = ({ onAddPedal, onCancel }) => { // Update this line
  const existingPedalsDummy: PedalItem[] = [
    {
      name: 'Overdrive',
      userId: '1234',
      dials: [
        {
          name: 'Gain',
          settings: [
            {
              settingName: 'Low',
            },
            {
              settingName: 'Medium',
            },
            {
              settingName: 'High',
            },
          ],
        },
        {
          name: 'Tone',
          settings: [
            {
              settingName: 'Bright',
            },
            {
              settingName: 'Warm',
            },
          ],
        },
      ],
      toggles: null,
      id: 'overdrive-pedal',
    },
    {
      name: 'Delay',
      userId: '1234',
      dials: [
        {
          name: 'Time',
          settings: [
            {
              settingName: 'Short',
            },
            {
              settingName: 'Medium',
            },
            {
              settingName: 'Long',
            },
          ],
        },
        {
          name: 'Feedback',
          settings: [
            {
              settingName: 'Low',
            },
            {
              settingName: 'Medium',
            },
            {
              settingName: 'High',
            },
          ],
        },
      ],
      toggles: null,
      id: 'delay-pedal',
    },
    {
      name: 'Reverb',
      userId: '1234',
      dials: [
        {
          name: 'Level',
          settings: [
            {
              settingName: 'Low',
            },
            {
              settingName: 'Medium',
            },
            {
              settingName: 'High',
            },
          ],
        },
        {
          name: 'Tone',
          settings: [
            {
              settingName: 'Bright',
            },
            {
              settingName: 'Warm',
            },
          ],
        },
      ],
      toggles: null,
      id: 'reverb-pedal',
    },
  ];
  
  const [isAddingNewPedal, setIsAddingNewPedal] = useState(false);
  const [selectedPedal, setSelectedPedal] = useState<PedalItem | null>(null);
  const [existingPedals, setExistingPedals] = useState<PedalItem[]>(existingPedalsDummy);

  const handleNewPedalSubmit = (pedal: PedalItem) => {
    onAddPedal(pedal);
    setIsAddingNewPedal(false);
  };

  const handleAddExistingPedal = (pedal: PedalItem) => {
    setSelectedPedal(pedal);
  };

  const handleCancelSelection = () => {
    setSelectedPedal(null);
  };
  
  return (
    <View>
      {!selectedPedal && !isAddingNewPedal && existingPedals.length > 0 && existingPedals.map((pedal, index) => (
        <Button
          key={index}
          title={pedal.name}
          onPress={() => handleAddExistingPedal(pedal)}
        />
      ))}
      
      {!selectedPedal && !isAddingNewPedal && <Button title="Create pedal" onPress={() => setIsAddingNewPedal(true)} />}
      {!selectedPedal && !isAddingNewPedal && <Button title="Cancel" onPress={onCancel} />} 
      {isAddingNewPedal && (
        <NewPedalForm onSave={handleNewPedalSubmit} onCancel={() => setIsAddingNewPedal(false)} />
      )}
  
      {selectedPedal && !isAddingNewPedal && (
        <View>
          <PedalSettings pedal={selectedPedal} />
          <Button title="Cancel" onPress={handleCancelSelection} />
        </View>
      )}
    </View>
  );
  
  
};

export default PedalSelector;
