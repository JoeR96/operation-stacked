import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Session, SessionApi } from '@operation-stacked/shared-services';
import useUserStore from '../../../shared-state/userState';

const SessionSelector: React.FC = () => {
  const [activeSession, setActiveSession] = useState<Session | null>(null);
  const [selectedSessionName, setSelectedSessionName] = useState('Upper'); // Default to 'Upper'
  const { userId } = useUserStore();
  const sessionApi = new SessionApi();

  useEffect(() => {
      const activeSession = async () => {
        const response = await sessionApi.apiSessionActiveSessionUserIdGet(userId);

        if(response.data.hasActiveSessio)
        {
          setActiveSession(response.data.session as Session)
        }
      }
  }, []);
  const handleCreateSession = async () => {
    try {
      const newSession = await sessionApi.createSession({
        userId : userId,
        name: selectedSessionName,
      });
      setActiveSession(newSession);
    } catch (error) {
      console.error('Error creating new session:', error);
    }
  };

  return (
    <View style={styles.container}>
      {activeSession ? (
        <View>
          <Text>You have an active session: {activeSession.SessionName}</Text>
          <Button title="Continue with Active Session" onPress={() => {}} /> {/* Implement navigation or action */}
        </View>
      ) : (
        <View>
          <Text>No active session. Select a name and create a new one:</Text>
          <Picker
            selectedValue={selectedSessionName}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedSessionName(itemValue)
            }>
            <Picker.Item label="Upper" value="Upper" />
            <Picker.Item label="Lower" value="Lower" />
          </Picker>
          <Button title="Create New Session" onPress={handleCreateSession} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  // You can add more styles here as needed
});

export default SessionSelector;
