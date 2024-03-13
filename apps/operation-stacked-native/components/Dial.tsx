import React, { useRef, useState } from 'react';
import { PanResponder, PanResponderInstance, StyleSheet, View, Text } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';

type DialProps = {
  name: string;
  currentSetting: number;
  onSettingChange: (setting: number) => void;
};

const Dial: React.FC<DialProps> = ({ name, currentSetting, onSettingChange }) => {
  const panResponder = useRef<PanResponderInstance | null>(null);
  const [angle, setAngle] = useState(0);

  // Convert gesture into polar coordinates
  const calculateAngle = (x: number, y: number) => {
    let angle = Math.atan2(y, x) + Math.PI / 2;
    if (angle < 0) angle += 2 * Math.PI;
    return angle * (180 / Math.PI);
  };

  panResponder.current = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      let { dx, dy } = gestureState;
      let angle = calculateAngle(dx, dy);
      setAngle(angle);
      onSettingChange(angle); // call the onSettingChange function with the new angle
    },
  });

  return (
    <View style={styles.container}>
      <Svg height="150" width="150" {...panResponder.current!.panHandlers}>
        <G transform={{ translate: '75, 75' }}>
          <Circle r="70" strokeWidth="2.5" stroke="black" fill="none" />
          <Circle
            r="5"
            transform={`rotate(${angle})`}
            stroke="red"
            fill="red"
            cy="-70"
          />
        </G>
      </Svg>
      <Text style={styles.dialName}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dial: {
    width: 150,
    height: 150,
  },
  dialName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Dial;
