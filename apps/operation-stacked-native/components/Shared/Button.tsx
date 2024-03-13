import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/slices/store';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';

type DashboardButtonProps = {
  navigation: StackNavigationProp<RootStackParamList>;
  title: string;
  route: keyof RootStackParamList;
};

const DashboardButton: React.FC<DashboardButtonProps> = ({ navigation, title, route }) => {
  const theme = useSelector((state: RootState) => state.theme.theme);

  const styles = StyleSheet.create({
    button: {
        backgroundColor: theme.button,
        borderRadius: 10, // Adjust the borderRadius to match the square shape
        width: '30%', // Width percentage should be set based on the desired size and space between buttons
        height: '30%', // Height percentage should be set based on the desired size and space between buttons
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5, // Add some margin to separate the buttons
      },
      buttonText: {
        color: theme.buttonText,
        fontSize: 14, // Adjust the font size to fit the button
        textAlign: 'center', // Align the text to the center
      }
  });

  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(route)}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default DashboardButton;
