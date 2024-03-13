import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { useSelector } from 'react-redux';
import { RootState } from '../store/slices/store';

const Timer = () => {
  const [timerDuration, setTimerDuration] = useState(0);
  const [showTimer, setShowTimer] = useState(false);
  const theme = useSelector((state: RootState) => state.theme.theme);

  const handleTimerPress = (duration: number) => {
    setTimerDuration(duration);
    setShowTimer(true);
  };

  const handleTimerComplete = () => {
    setShowTimer(false);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.background,
    },
    buttonContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-evenly',
      marginBottom: 20,
    },
    button: {
      backgroundColor: theme.button,
      borderRadius: 5,
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginBottom: 10,
    },
    buttonText: {
      color: theme.buttonText,
      fontSize: 16,
    },
    timerContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
    },
    timerContent: {
      alignItems: 'center',
    },
    countdownText: {
      fontSize: 80,
      fontWeight: 'bold',
      color: theme.text,
    },
    timerText: {
      fontSize: 24,
      marginTop: -10,
      color: theme.text,
    },
  });

  return (
    <View style={styles.container}>
      {!showTimer && (
        <View style={styles.buttonContainer}>
          {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120].map((duration) => (
            <TouchableOpacity
              key={duration}
              style={styles.button}
              onPress={() => handleTimerPress(duration)}
            >
              <Text style={styles.buttonText}>{duration} sec</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
  
      {showTimer && (
        <View style={styles.timerContainer}>
          <CountdownCircleTimer
            isPlaying
            duration={timerDuration}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2, 0]}
            onComplete={handleTimerComplete}
          >
            {({ remainingTime }) => (
              <View style={styles.timerContent}>
                <Text style={styles.countdownText}>{remainingTime}</Text>
                <Text style={styles.timerText}>sec</Text>
              </View>
            )}
          </CountdownCircleTimer>
        </View>
      )}
    </View>
  );
            }
export default Timer;
