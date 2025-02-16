import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Usamos AsyncStorage

interface State {
    nombre: string;
    valores: string;
    fecha: string;
    hora: string;
}

export default function AgregarChequeoSemanal(props: { navigation: { navigate: (screen: string) => void } }) {
    const initialState: State = {
        nombre: '',
        valores: '',
        fecha: '',
        hora: ''
    };
    const [state, setState] = useState<State>(initialState);

    const handleChangeText = (value: string, name: keyof State) => {
        setState({ ...state, [name]: value });
    };

    const addChequeoSemanal = async () => {
        try {
            // Recuperamos los chequeos semanales previamente almacenados
            const storedChequeos = await AsyncStorage.getItem('chequeoSemanal');
            let chequeoSemanal = storedChequeos ? JSON.parse(storedChequeos) : [];

            // Agregamos el nuevo chequeo semanal
            chequeoSemanal.push(state);

            // Guardamos los chequeos semanales actualizados
            await AsyncStorage.setItem('chequeoSemanal', JSON.stringify(chequeoSemanal));

            Alert.alert('Guardado con éxito');
            props.navigation.navigate('ChequeoSemanal');
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Hubo un error al guardar.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder='Nombre'
                    onChangeText={(value) => handleChangeText(value, 'nombre')}
                    value={state.nombre}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Valores'
                    onChangeText={(value) => handleChangeText(value, 'valores')}
                    value={state.valores}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Fecha'
                    onChangeText={(value) => handleChangeText(value, 'fecha')}
                    value={state.fecha}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Hora'
                    onChangeText={(value) => handleChangeText(value, 'hora')}
                    value={state.hora}
                />
                <TouchableOpacity style={styles.button} onPress={addChequeoSemanal}>
                    <Text style={styles.buttonText}>Guardar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    form: {
        width: '80%',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#4D8BFA',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
