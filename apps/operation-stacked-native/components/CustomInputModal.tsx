import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  KeyboardTypeOptions,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/slices/store';

type Props = {
    isVisible: boolean;
    onCancel: () => void;
    onConfirm: (value: number) => void;
    inputLabel: string;
    keyboardType: KeyboardTypeOptions;
    title: string; // Add this line
};


const CustomInputModal: React.FC<Props> = ({ isVisible, onCancel, onConfirm, title }) => {
  const [value, setValue] = useState('');
  const theme = useSelector((state: RootState) => state.theme.theme);

  const handleConfirm = () => {
    const parsedValue = parseInt(value, 10) || 0;
    onConfirm(parsedValue);
    setValue('');
  };

  const styles = StyleSheet.create({
    modalBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: theme.cardBackground,
      borderRadius: 5,
      padding: 20,
      minWidth: '80%',
    },
    titleText: {
      color: theme.text,
      fontSize: 24,
      fontWeight: '600',
      marginBottom: 10,
    },
    input: {
      backgroundColor: theme.inputBackground,
      borderColor: theme.inputBorder,
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    button: {
      padding: 10,
    },
    buttonText: {
      color: theme.buttonText,
      fontSize: 18,
    },
  });

  return (
    <Modal visible={isVisible} transparent>
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <Text style={styles.titleText}>{title}</Text>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={setValue}
            keyboardType="number-pad"
          />
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={onCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleConfirm}>
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomInputModal;
