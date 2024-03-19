import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Session } from '@operation-stacked/shared-services';

interface SessionScreenProps {
  sessionId: string;
}

const SessionScreen: React.FC<SessionScreenProps> = ({ sessionId }) => {
  const [session, setSession] = useState<Session | null>(null);

  if (!session) {
    return <Text>Loading session...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{session.SessionName}</Text>
      <FlatList
        data={session.SessionExercises}
        keyExtractor={(item) => item.Id}
        renderItem={({ item }) => <ExerciseItem exercise={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default SessionScreen;
