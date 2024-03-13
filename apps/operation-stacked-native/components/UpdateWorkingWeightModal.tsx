import React, {useState} from "react";
import {Alert} from "react-native";
import styles from "react-native-loading-spinner-overlay/lib/style";
import { Modal } from "react-native-paper";

const UpdateWorkingWeightModal: React.FC<{
    isVisible: boolean;
    onCancel: () => void;
    onConfirm: (newWeight: number) => void;
}> = ({ isVisible, onCancel, onConfirm }) => {
    const [newWeight, setNewWeight] = useState('');

    const handleCancel = () => {
        setNewWeight('');
        onCancel();
    };

    const handleConfirm = () => {
        const weight = parseFloat(newWeight);
        if (isNaN(weight) || weight <= 0) {
            Alert.alert('Invalid input', 'Please enter a valid number.');
            return;
        }
        onConfirm(weight);
        setNewWeight('');
    };

    return (
        <Modal isVisible={isVisible} onBackdropPress={handleCancel}>
            <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Enter New Working Weight</Text>
                <TextInput
                    style={styles.modalInput}
                    placeholder="Enter new working weight"
                    keyboardType="numeric"
                    value={newWeight}
                    onChangeText={setNewWeight}
                />
                <View style={styles.modalButtonsContainer}>
                    <TouchableOpacity style={styles.modalCancelButton} onPress={handleCancel}>
                        <Text style={styles.modalCancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalConfirmButton} onPress={handleConfirm}>
                        <Text style={styles.modalConfirmButtonText}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};
