// AgregarAlergias.tsx
import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TextInput, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importamos AsyncStorage
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './types';
import { StackNavigationProp } from '@react-navigation/stack';

type AgregarAlergiasScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AgregarAlergias'>;
type AgregarAlergiasScreenRouteProp = RouteProp<RootStackParamList, 'AgregarAlergias'>;

interface State {
  nombre: string;
}

export default function AgregarAlergias({ route, navigation }: { route: AgregarAlergiasScreenRouteProp, navigation: AgregarAlergiasScreenNavigationProp }) {
  const initialState: State = {
    nombre: route.params?.alergia?.nombre || '', // Si hay una alergia pasada, tomar su nombre
  };

  const [state, setState] = useState<State>(initialState);

  const handleChangeText = (value: string, name: keyof State) => {
    setState({ ...state, [name]: value });
  };

  const agregarAlergias = async () => {
    if (!state.nombre) {
      Alert.alert('Error', 'Por favor ingresa el nombre de la alergia.');
      return;
    }

    try {
      const storedAlergias = await AsyncStorage.getItem('alergias');
      const alergiasData = storedAlergias ? JSON.parse(storedAlergias) : [];

      if (route.params?.alergia) {
        // Si se está editando, reemplazar la alergia
        const index = alergiasData.findIndex(
          (alergia: any) => alergia.nombre === route.params.alergia.nombre
        );
        alergiasData[index].nombre = state.nombre;
      } else {
        // Si es nueva, agregarla
        alergiasData.push({ nombre: state.nombre });
      }

      await AsyncStorage.setItem('alergias', JSON.stringify(alergiasData));

      Alert.alert('Guardado con éxito');
      navigation.navigate('Alergias'); 
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un error al guardar la alergia.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nombre de la alergia"
          onChangeText={(value) => handleChangeText(value, 'nombre')}
          value={state.nombre}
        />

        <TouchableOpacity style={styles.button} onPress={agregarAlergias}>
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
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: '#4D8BFA',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
