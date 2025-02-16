import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TextInput, Alert, TouchableOpacity, SafeAreaView, Modal, ActivityIndicator, Dimensions, Image } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth: number = Dimensions.get('window').width;

interface Recordatorio {
    id: string;
    nota: string;
    fechaCreacion: Date;
}

export default function Home(props: any): JSX.Element {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [noteText, setNoteText] = useState<string>('');
    const [recordatorios, setRecordatorios] = useState<Recordatorio[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Cargar recordatorios desde AsyncStorage
    const cargarRecordatorios = async (): Promise<void> => {
        try {
            const recordatoriosGuardados = await AsyncStorage.getItem('recordatorios');
            const recordatoriosArray = recordatoriosGuardados ? JSON.parse(recordatoriosGuardados) : [];
            setRecordatorios(recordatoriosArray);
        } catch (error) {
            console.error('Error al cargar los recordatorios:', error);
            Alert.alert('Error', 'Hubo un error al cargar los recordatorios.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarRecordatorios();
    }, []);

    // Guardar recordatorio en AsyncStorage
    const guardarRecordatorio = async (): Promise<void> => {
        if (!noteText.trim()) {
            Alert.alert('Error', 'No puedes agregar un recordatorio vacío.');
            return;
        }

        const nuevoRecordatorio: Recordatorio = {
            id: `${Date.now()}`,
            nota: noteText,
            fechaCreacion: new Date(),
        };

        try {
            const recordatoriosGuardados = await AsyncStorage.getItem('recordatorios');
            const recordatoriosArray = recordatoriosGuardados ? JSON.parse(recordatoriosGuardados) : [];
            recordatoriosArray.push(nuevoRecordatorio);

            await AsyncStorage.setItem('recordatorios', JSON.stringify(recordatoriosArray));
            setNoteText('');
            setModalVisible(false);
            cargarRecordatorios(); // Recargar los recordatorios
            Alert.alert('Éxito', 'Recordatorio guardado');
        } catch (error) {
            console.error('Error al guardar el recordatorio:', error);
            Alert.alert('Error', 'Hubo un error al guardar el recordatorio.');
        }
    };

    // Eliminar recordatorio desde AsyncStorage
    const eliminarRecordatorio = async (id: string): Promise<void> => {
        try {
            const recordatoriosGuardados = await AsyncStorage.getItem('recordatorios');
            const recordatoriosArray = recordatoriosGuardados ? JSON.parse(recordatoriosGuardados) : [];
            const recordatoriosFiltrados = recordatoriosArray.filter((recordatorio: Recordatorio) => recordatorio.id !== id);

            await AsyncStorage.setItem('recordatorios', JSON.stringify(recordatoriosFiltrados));
            cargarRecordatorios(); // Recargar los recordatorios después de eliminar
            Alert.alert('Éxito', 'Recordatorio eliminado');
        } catch (error) {
            console.error('Error al eliminar el recordatorio:', error);
            Alert.alert('Error', 'Hubo un error al eliminar el recordatorio.');
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size={30} color="#4D8BFA" />
                <Text style={styles.loadingText}>Cargando datos...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>MediPro</Text>
            <Image source={require('../../imagen/MediPro.png')} style={styles.logo} />

            <View style={styles.recordatorioContainer}>
                {recordatorios.length === 0 ? (
                    <Text style={styles.emptyText}>Sin recordatorios</Text>
                ) : (
                    recordatorios.map((recordatorio: Recordatorio) => (
                        <View key={recordatorio.id} style={styles.noteContainer}>
                            <MaterialCommunityIcons name="bell" size={30} color="#4D8BFA" />
                            <Text style={styles.noteText}>{recordatorio.nota}</Text>
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => eliminarRecordatorio(recordatorio.id)}>
                                <MaterialCommunityIcons name="delete" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    ))
                )}
            </View>

            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.addButtonText}>Agregar Recordatorio</Text>
            </TouchableOpacity>

            {/* Modal para agregar recordatorio */}
            <Modal
                animationType="slide"
                transparent
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TextInput
                            style={styles.input}
                            placeholder="Escribe tu recordatorio aquí"
                            value={noteText}
                            onChangeText={setNoteText}
                            multiline
                        />
                        <TouchableOpacity style={styles.button} onPress={guardarRecordatorio}>
                            <Text style={styles.buttonText}>Guardar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F6FC',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 16,
        marginTop: 10,
        color: '#4D8BFA',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    recordatorioContainer: {
        width: '100%',
        marginTop: 20,
    },
    noteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 4,
        position: 'relative',
    },
    noteText: {
        fontSize: 16,
        color: '#333',
        marginLeft: 15,
        flex: 1,
    },
    deleteButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#E57373',
        borderRadius: 25,
        padding: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        padding: 25,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    input: {
        height: 100,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingTop: 10,
        textAlignVertical: 'top',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#4D8BFA',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    addButton: {
        backgroundColor: '#4D8BFA',
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 30,
        alignItems: 'center',
        width: '80%',
    },
    addButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    emptyText: {
        fontSize: 18,
        color: '#888',
        textAlign: 'center',
        marginTop: 20,
    },
    logo: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
        marginBottom: 20,
    },
});
