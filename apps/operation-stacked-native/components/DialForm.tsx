import React, { useState } from 'react';
import { View, TextInput, Button, Text, FlatList } from 'react-native';
import { DialItem, Setting } from '../src/api/toneTrackerApi';

type DialFormProps = {
  onSave: (newDial: DialItem) => void;
  onCancel: () => void;
};

const DialForm: React.FC<DialFormProps> = ({ onSave, onCancel }) => {
  const [dialName, setDialName] = useState('');
  const [settings, setSettings] = useState<Setting[]>([]);

  const handleAddSetting = () => {
    const newSetting: Setting = {
      settingName: `Setting ${settings.length + 1}`,
    };
  
    setSettings([...settings, newSetting]);
  };

  const handleCreateDial = () => {
    const newDial: DialItem = {
      name: dialName,
      settings: settings,
    };
  
    onSave(newDial);
  };
  
  const renderSetting = ({ item }: { item: Setting }) => (
    <Text>{item.settingName}</Text>
  );
  
  return (
    <View>
      <TextInput 
        value={dialName} 
        onChangeText={setDialName} 
        placeholder="Dial Name"
      />
      <Button title="Add Setting" onPress={handleAddSetting} />
      <FlatList 
        data={settings} 
        renderItem={renderSetting} 
        keyExtractor={(_, index) => index.toString()} 
      />
      <Button title="Create Dial" onPress={handleCreateDial} />
      <Button title="Cancel" onPress={onCancel} />
    </View>
  );
};

export default DialForm;
