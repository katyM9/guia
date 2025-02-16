import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TextInput, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Usamos AsyncStorage

interface MedicoState {
  nombre: string;
  especialidad: string;
  telefono: string;
}

export default function AgregarMedico(props: { navigation: { navigate: (screen: string) => void }; route: any }) {
  const initialState: MedicoState = {
    nombre: '',
    especialidad: '',
    telefono: '',
  };

  const [state, setState] = useState<MedicoState>(initialState);

  useEffect(() => {
    if (props.route.params?.medico) {
      setState(props.route.params.medico);
    }
  }, [props.route.params?.medico]);

  const handleChangeText = (value: string, name: keyof MedicoState) => {
    setState({ ...state, [name]: value });
  };

  const addMedico = async () => {
    try {
      const storedMedicos = await AsyncStorage.getItem('medicos');
      let medicos = storedMedicos ? JSON.parse(storedMedicos) : [];

      if (props.route.params?.index !== undefined) {
        medicos[props.route.params.index] = state; // Editar el médico en el índice dado
      } else {
        medicos.push(state); // Agregar un nuevo médico
      }

      await AsyncStorage.setItem('medicos', JSON.stringify(medicos));
      Alert.alert('Guardado con éxito');
      props.navigation.navigate('Medicos');
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
          placeholder="Nombre"
          onChangeText={(value) => handleChangeText(value, 'nombre')}
          value={state.nombre}
        />
        <TextInput
          style={styles.input}
          placeholder="Especialidad"
          onChangeText={(value) => handleChangeText(value, 'especialidad')}
          value={state.especialidad}
        />
        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          onChangeText={(value) => handleChangeText(value, 'telefono')}
          value={state.telefono}
        />
        <TouchableOpacity style={styles.button} onPress={addMedico}>
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
