// EditarCuenta.tsx - Modificado para usar AsyncStorage
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, SafeAreaView, Alert, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditarCuenta() {
    const [userData, setUserData] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [fieldValue, setFieldValue] = useState('');
    const [fieldToEdit, setFieldToEdit] = useState('');

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        try {
            const storedData = await AsyncStorage.getItem('userData');
            if (storedData) {
                setUserData(JSON.parse(storedData));
            }
        } catch (error) {
            Alert.alert('Error', 'Hubo un error al cargar los datos.');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (field: string) => {
        setFieldToEdit(field);
        setFieldValue(userData[field] || '');
        setModalVisible(true);
    };

    const saveField = async () => {
        try {
            const updatedData = { ...userData, [fieldToEdit]: fieldValue };
            await AsyncStorage.setItem('userData', JSON.stringify(updatedData));
            setUserData(updatedData);
            setModalVisible(false);
        } catch (error) {
            Alert.alert('Error', 'Hubo un error al actualizar los datos.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.userDataContainer}>
                {Object.keys(userData).map((key) => (
                    <View key={key} style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>{key}:</Text>
                        <Text style={styles.fieldValue}>{userData[key]}</Text>
                        <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(key)}>
                            <Text style={styles.editButtonText}>Editar</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Editar {fieldToEdit}</Text>
                        <TextInput style={styles.input} value={fieldValue} onChangeText={setFieldValue} />
                        <View style={styles.modalButtons}>
                            <Button title="Guardar" onPress={saveField} />
                            <Button title="Cancelar" onPress={() => setModalVisible(false)} />
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userDataContainer: {
        width: '80%',
    },
    fieldContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    fieldLabel: {
        fontWeight: 'bold',
    },
    fieldValue: {
        flex: 1,
    },
    editButton: {
        backgroundColor: '#4D8BFA',
        padding: 5,
        borderRadius: 5,
    },
    editButtonText: {
        color: '#FFFFFF'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});
