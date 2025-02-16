import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TextInput, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Usamos AsyncStorage

interface State {
  nombre: string;
}

export default function AgregarEnfermedad(props: { navigation: { navigate: (screen: string) => void }; route: any }) {
  const initialState: State = {
    nombre: ''
  };

  const [state, setState] = useState<State>(initialState);

  useEffect(() => {
    if (props.route.params?.enfermedad) {
      setState(props.route.params.enfermedad);
    }
  }, [props.route.params?.enfermedad]);

  const handleChangeText = (value: string, name: keyof State) => {
    setState({ ...state, [name]: value });
  };

  const agregarEnfermedad = async () => {
    try {
      const storedEnfermedades = await AsyncStorage.getItem('enfermedades');
      let enfermedades = storedEnfermedades ? JSON.parse(storedEnfermedades) : [];

      if (props.route.params?.index !== undefined) {
        enfermedades[props.route.params.index] = state; // Edita la enfermedad en la posición indicada
      } else {
        enfermedades.push(state); // Agrega una nueva enfermedad
      }

      await AsyncStorage.setItem('enfermedades', JSON.stringify(enfermedades));

      Alert.alert('Guardado con éxito');
      props.navigation.navigate('Enfermedades');
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
          placeholder="Nombre de la enfermedad"
          onChangeText={(value) => handleChangeText(value, 'nombre')}
          value={state.nombre}
        />

        <TouchableOpacity style={styles.button} onPress={agregarEnfermedad}>
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
