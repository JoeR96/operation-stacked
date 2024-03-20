import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { Session, SessionApi } from '@operation-stacked/shared-services';
import { useSessionStore } from '../sessionStore';
import useUserStore from '../../shared-state/userState';

const SessionSelector: React.FC = () => {
  const [selectedSessionName, setSelectedSessionName] = useState('Upper'); // Default to 'Upper'
  const [modalVisible, setModalVisible] = useState(false);
  const activeSession = useSessionStore(state => state.activeSession);
  const setActiveSession = useSessionStore(state => state.setActiveSession);
  const sessionApi = new SessionApi();
  const { userId } = useUserStore();

  useEffect(() => {
    const fetchActiveSession = async () => {
      const response = await sessionApi.apiSessionActiveSessionUserIdGet(userId as string);
      if (response.data.hasActiveSession) {
        setActiveSession(response.data.session as Session);
      }
    };

    fetchActiveSession();
  }, [userId, setActiveSession]);

  const handleCreateSession = async () => {
    try {
      const newSession = await sessionApi.apiSessionPost({
        UserId: userId,
        SessionName: selectedSessionName,
      });
      setActiveSession(newSession.data.session as Session);
    } catch (error) {
      console.error('Error creating new session:', error);
    }
  };

  return (
    <View style={styles.container}>
      {activeSession ? (
        <View>
          <Text>You have an active session: {activeSession.SessionName}</Text>
          <Button title="Continue with Active Session" onPress={() => {}} />
        </View>
      ) : (
        <View>
          <Text>No active session. Select a name and create a new one:</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
            <Text>{selectedSessionName}</Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.modalView}>
              <ScrollView>
                {['Upper', 'Lower'].map((sessionName, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.modalItem}
                    onPress={() => {
                      setSelectedSessionName(sessionName);
                      setModalVisible(!modalVisible);
                    }}>
                    <Text>{sessionName}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </Modal>
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
  button: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#eeeeee",
  },
  // Additional styles as needed
});

export default SessionSelector;
