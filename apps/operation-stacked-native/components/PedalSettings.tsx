import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { PedalItem } from '../src/api/toneTrackerApi';
import Dial from './Dial';
import Toggle from './Toggle';

type PedalSettingsProps = {
  pedal: PedalItem;
};

const PedalSettings: React.FC<PedalSettingsProps> = ({ pedal }) => {
  const [toggleStates, setToggleStates] = useState<boolean[]>(Array(pedal.toggles?.length).fill(false));

  const handleToggle = (index: number) => {
    const updatedStates = [...toggleStates];
    updatedStates[index] = !toggleStates[index];
    setToggleStates(updatedStates);
  };

  const handleDialSettingChange = (index: number, setting: number) => {
    // Handle dial setting change here
  };

  return (
    <View>
      <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
        {pedal.name}
      </Text>
      {pedal.dials?.map((dial, index) => (
        <Dial
          key={index}
          name={dial.name}
          currentSetting={0}
          onSettingChange={(setting) => handleDialSettingChange(index, setting)}
        />
      ))}
      {pedal.toggles?.map((toggle, index) => (
        <Toggle
          key={index}
          name={toggle.name}
          isOn={toggleStates[index]}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </View>
  );
};

export default PedalSettings
