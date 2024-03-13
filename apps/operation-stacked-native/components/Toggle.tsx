import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type ToggleProps = {
  name: string;
  isOn: boolean;
  onToggle: () => void;
};

const Toggle: React.FC<ToggleProps> = ({ name, isOn, onToggle }) => {
  const toggleColor = isOn ? '#4CAF50' : '#9E9E9E'; // Change the color based on the toggle state

  const handleToggle = () => {
    onToggle(); // Call the onToggle function when the toggle is pressed
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handleToggle}>
      <View style={[styles.toggleContainer, { backgroundColor: toggleColor }]}>
        <View style={[styles.toggleSwitch, { transform: [{ translateX: isOn ? 40 : 0 }] }]} />
        <Text style={styles.toggleName}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: 100,
    height: 40,
    borderRadius: 20,
    padding: 5,
  },
  toggleSwitch: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
  },
  toggleName: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Toggle;
