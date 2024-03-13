import React, { useState } from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import PedalSelector from './PedalSelector';
import AmplifierSelector from './AmplifierSelector'; // Assuming this component exists
import { PedalItem, ToneItem } from '../src/api/toneTrackerApi';
import { useSelector } from 'react-redux';
import { RootState } from '../store/slices/store';

type ToneFormProps = {
  // You can pass in initial data or callbacks as props here...
};

type ToneFormNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ToneForm'
>;

const ToneForm: React.FC<ToneFormProps> = () => {
  const [amplifier, setAmplifier] = useState<ToneItem | null>(null);
  const [pedals, setPedals] = useState<PedalItem[]>([]);
  const [name, setName] = useState('');
  const theme = useSelector((state: RootState) => state.theme.theme);

  const navigation = useNavigation<ToneFormNavigationProp>();

  const [view, setView] = useState<'form' | 'pedal' | 'amplifier'>('form');

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
        padding: 20,
    },
    card: {
        backgroundColor: theme.cardBackground,
        borderRadius: 5,
        padding: 15,
        marginBottom: 20,
    },
    titleText: {
        color: theme.text,
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 10,
    },
    text: {
        color: theme.text,
        fontSize: 14,
        marginBottom: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      label: {
        color: theme.text,
        fontSize: 14,
        fontWeight: '600',
        marginRight: 5,
      },
      value: {
        color: theme.text,
        fontSize: 14,
      },
    button: {
        backgroundColor: theme.buttonBackground,
        padding: 40,
        borderRadius: 5,
    },
    buttonText: {
        color: theme.buttonText,
        textAlign: 'center',
    },
    input: {
        backgroundColor: theme.inputBackground,
        borderColor: theme.inputBorder,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
    timerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
      },
    icon: {
        color: theme.text,
        marginRight: 5,
    },
    timerCard: {
        flex: 1, // Add this line to make the card fill the remaining space
        backgroundColor: theme.cardBackground,
        borderRadius: 5,
        padding: 15,
    },
  });
  const handlePedalSelect = (pedal: PedalItem) => {
    setPedals([...pedals, pedal]);
    setView('form');
  };

  const handleAmplifierSelect = (amplifier: ToneItem) => {
    setAmplifier(amplifier);
    setView('form');
  };

  // Add styles here...

  const handleSaveTone = () => {
    // Implement the logic to save the new tone
    const tone: ToneItem = {
      pedals,
      name,
      userId: '',
      amplifierId: ''
    };
    console.log('Saving tone:', tone);
    navigation.navigate('ToneForm')
  };

  const handleCancelSave = () => {
    navigation.goBack();
  };

  const handleAddAmplifier = () => {
    setView('amplifier');
  };

  const handleAddPedal = () => {
    setView('pedal');
  };

  const cancel = () => {
    setView('form');
  }

  if (view === 'form') {
    return (
      <View>
        <TouchableOpacity style={styles.button} onPress={handleAddPedal}>
          <Text style={{ ...styles.titleText, textAlign: 'center' }}>Add Pedal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleAddAmplifier}>
          <Text style={{ ...styles.titleText, textAlign: 'center' }}>Add Amplifier</Text>
        </TouchableOpacity>
        <Button title="Save Tone" onPress={handleSaveTone} />
        <Button title="Cancel" onPress={handleCancelSave} />
      </View>
    );
  } else if (view === 'pedal') {  
    return (
      <PedalSelector onAddPedal={handlePedalSelect} onCancel={cancel} />
    );
  }
   else {
    return (
      <AmplifierSelector/>
    );
  }
};

export default ToneForm;
