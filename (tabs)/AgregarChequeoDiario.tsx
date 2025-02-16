// AgregarChequeoDiario.tsx
import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TextInput, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Usamos AsyncStorage
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './types';
import { StackNavigationProp } from '@react-navigation/stack';

type AgregarChequeoDiarioScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AgregarChequeoDiario'>;
type AgregarChequeoDiarioScreenRouteProp = RouteProp<RootStackParamList, 'AgregarChequeoDiario'>;

interface State {
  nombre: string;
  valores: string;
  fecha: string;
  hora: string;
}

export default function AgregarChequeoDiario({ route, navigation }: { route: AgregarChequeoDiarioScreenRouteProp, navigation: AgregarChequeoDiarioScreenNavigationProp }) {
  const initialState: State = {
    nombre: route.params?.chequeo?.nombre || '',
    valores: route.params?.chequeo?.valores || '',
    fecha: route.params?.chequeo?.fecha || '',
    hora: route.params?.chequeo?.hora || '',
  };

  const [state, setState] = useState<State>(initialState);

  const handleChangeText = (value: string, name: keyof State) => {
    setState({ ...state, [name]: value });
  };

  const addChequeoDiario = async () => {
    try {
      const currentUser = 'userId';  // Asumimos un ID de usuario ficticio, ya que no estamos usando Firebase

      const storedChequeos = await AsyncStorage.getItem('chequeoDiario');
      let chequeoDiario = storedChequeos ? JSON.parse(storedChequeos) : [];

      if (route.params?.chequeo) {
        // Si estamos editando, reemplazamos el chequeo antiguo
        const updatedChequeos = chequeoDiario.map((chequeo: any) =>
          chequeo.nombre === route.params?.chequeo.nombre ? { ...chequeo, ...state } : chequeo
        );
        await AsyncStorage.setItem('chequeoDiario', JSON.stringify(updatedChequeos));
        Alert.alert('Chequeo actualizado con éxito');
      } else {
        // Si es un nuevo chequeo, lo agregamos al final
        chequeoDiario.push({ userId: currentUser, ...state });
        await AsyncStorage.setItem('chequeoDiario', JSON.stringify(chequeoDiario));
        Alert.alert('Chequeo guardado con éxito');
      }

      navigation.navigate('ChequeoDiario');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un error al guardar el chequeo.');
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
        <TouchableOpacity style={styles.button} onPress={addChequeoDiario}>
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
