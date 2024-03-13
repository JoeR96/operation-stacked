import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import { View, StyleSheet } from 'react-native';
import DashboardButton from './Button';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/slices/store';
// ...

type DashboardProps = {
    navigation: StackNavigationProp<RootStackParamList, keyof RootStackParamList>;
    buttons: ButtonProps[];
  };
  
  
  
  type ButtonProps = {
    title: string;
    route: keyof RootStackParamList;
  };
  
  export const Dashboard: React.FC<DashboardProps> = ({ navigation, buttons }) => {
    // ...
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
          },
          buttonContainer: {
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
            alignItems: 'center', // Align the buttons vertically
            marginBottom: 20,
          }
      });
   
  // render
  return (
    // ...
    <View style={styles.buttonContainer}>
      {buttons.map((button, index) => (
        <DashboardButton key={index} navigation={navigation} title={button.title} route={button.route} />
      ))}
    </View>
    // ...
  );
};