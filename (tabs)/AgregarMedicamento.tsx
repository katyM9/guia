import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, SafeAreaView, Alert, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

interface Medicamento {
  id?: string;
  nombre: string;
  concentracion: string;
  unidades: string;
  frecuencia: string;
}

const AgregarMedicamento: React.FC = ({ route }: any) => {
  const initialState: Medicamento = {
    nombre: '',
    concentracion: '',
    unidades: '',
    frecuencia: '',
  };

  const [state, setState] = useState<Medicamento>(initialState);
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (route.params?.medicamento) {
      setState(route.params.medicamento);
    }
  }, [route.params?.medicamento]);

  const handleChangeText = (value: string, name: keyof Medicamento) => {
    setState({ ...state, [name]: value });
  };

  const saveMedication = async () => {
    if (!state.nombre || !state.concentracion || !state.unidades || !state.frecuencia) {
      Alert.alert('Error', 'Todos los campos deben estar completos.');
      return;
    }

    try {
      setLoading(true);
      const storedMedicamentos = await AsyncStorage.getItem('medicamentos');
      let medicamentos = storedMedicamentos ? JSON.parse(storedMedicamentos) : [];

      if (state.id) {
        medicamentos = medicamentos.map((med: Medicamento) =>
          med.id === state.id ? state : med
        );
      } else {
        const id = new Date().getTime().toString();
        medicamentos.push({ id, ...state });
      }

      await AsyncStorage.setItem('medicamentos', JSON.stringify(medicamentos));
      Alert.alert('Éxito', 'Medicamento guardado correctamente');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Hubo un error al guardar el medicamento.');
      console.error('Error al guardar medicamento:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={20} color="#0000ff" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nombre del medicamento"
          onChangeText={(value) => handleChangeText(value, 'nombre')}
          value={state.nombre}
        />
        <TextInput
          style={styles.input}
          placeholder="Concentración"
          onChangeText={(value) => handleChangeText(value, 'concentracion')}
          value={state.concentracion}
        />
        <TextInput
          style={styles.input}
          placeholder="Unidades"
          onChangeText={(value) => handleChangeText(value, 'unidades')}
          value={state.unidades}
        />
        <TextInput
          style={styles.input}
          placeholder="Frecuencia"
          onChangeText={(value) => handleChangeText(value, 'frecuencia')}
          value={state.frecuencia}
        />
        <TouchableOpacity style={styles.button} onPress={saveMedication}>
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
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: '80%',
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
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

export default AgregarMedicamento;
