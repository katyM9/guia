import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TextInput, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Usamos AsyncStorage en lugar de Firestore

interface State {
  nombre: string;
  valores: string;
  fecha: string;
  hora: string;
}

interface AgregarChequeoMensualProps {
  navigation: {
    navigate: (screen: string) => void;
  };
  route: {
    params: {
      chequeo?: State;
      index?: number;
    };
  };
}

const AgregarChequeoMensual: React.FC<AgregarChequeoMensualProps> = (props) => {
  const initialState: State = {
    nombre: '',
    valores: '',
    fecha: '',
    hora: ''
  };

  const [state, setState] = useState<State>(initialState);

  useEffect(() => {
    if (props.route.params?.chequeo) {
      setState(props.route.params.chequeo); // Cargar datos si se está editando
    }
  }, [props.route.params?.chequeo]);

  const handleChangeText = (value: string, name: keyof State): void => {
    setState({ ...state, [name]: value });
  };

  const addChequeoMensual = async (): Promise<void> => {
    if (!state.nombre || !state.valores || !state.fecha || !state.hora) {
      Alert.alert('Error', 'Todos los campos deben estar completos.');
      return;
    }

    try {
      const storedChequeos = await AsyncStorage.getItem('chequeoMensual');
      let chequeoMensual = storedChequeos ? JSON.parse(storedChequeos) : [];

      if (props.route.params?.index !== undefined) {
        // Si estamos editando, reemplazamos el chequeo en el índice correspondiente
        chequeoMensual[props.route.params.index] = state;
      } else {
        // Si estamos agregando, solo añadimos
        chequeoMensual.push(state);
      }

      await AsyncStorage.setItem('chequeoMensual', JSON.stringify(chequeoMensual));

      Alert.alert('Guardado con éxito');
      props.navigation.navigate('ChequeoMensual');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un error al guardar el chequeo mensual. Intenta nuevamente.');
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
          placeholder='Valores/Niveles'
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
        <TouchableOpacity style={styles.button} onPress={addChequeoMensual}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

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

export default AgregarChequeoMensual;
