import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TextInput, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserState {
    nombre: string;
    fecha: string;
    genero: string;
    email: string;
    telefono: string;
    peso: string;
    altura: string;
}

export default function Cuenta() {
    const initialState: UserState = {
        nombre: '',
        fecha: '',
        genero: '',
        email: '',
        telefono: '',
        peso: '',
        altura: ''
    }

    const [state, setState] = useState<UserState>(initialState);

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        try {
            const storedData = await AsyncStorage.getItem('userData');
            if (storedData) {
                setState(JSON.parse(storedData));
            }
        } catch (error) {
            console.error('Error al cargar los datos', error);
        }
    };

    const handleChangeText = (value: string, name: keyof UserState) => {
        setState({ ...state, [name]: value });
    };

    const saveUsuario = async () => {
        try {
            await AsyncStorage.setItem('userData', JSON.stringify(state));
            Alert.alert('Guardado con éxito');
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Hubo un error al registrar. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.form}>
                {Object.keys(initialState).map((key) => (
                    <TextInput
                        key={key}
                        style={styles.input}
                        placeholder={key}
                        onChangeText={(value) => handleChangeText(value, key as keyof UserState)}
                        value={state[key as keyof UserState]}
                    />
                ))}
                <TouchableOpacity style={styles.button} onPress={saveUsuario}>
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
  },
  form: {
    width: '80%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4D8BFA',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
