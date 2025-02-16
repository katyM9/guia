import 'react-native-gesture-handler';
import React, { FC, useState, useEffect } from 'react';
import { Text, StyleSheet, View, SafeAreaView, Alert, ActivityIndicator, Button } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface HistorialProps {
  navigation: NavigationProp<any>;
}

const Historial: FC<HistorialProps> = (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar los datos desde el almacenamiento local al inicio
    loadData();
  }, []);

  const loadData = async (): Promise<void> => {
    try {
      // Intentar cargar datos almacenados localmente
      const data = await AsyncStorage.getItem('historial');
      if (data !== null) {
        // Si hay datos, procesarlos
        console.log('Datos cargados:', JSON.parse(data));
      } else {
        console.log('No hay datos en almacenamiento local');
      }
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveData = async (newData: string): Promise<void> => {
    try {
      // Guardar nuevos datos en el almacenamiento local
      await AsyncStorage.setItem('historial', JSON.stringify(newData));
      Alert.alert('Éxito', 'Datos guardados correctamente');
    } catch (error) {
      console.error('Error al guardar datos:', error);
      Alert.alert('Error', 'Hubo un problema al guardar los datos.');
    }
  };

  const navigateToEnfermedadesBase = (): void => {
    props.navigation.navigate('Enfermedades');
  };

  const navigateToAlergia = (): void => {
    props.navigation.navigate('Alergias');
  };

  const navigateToMedico = (): void => {
    props.navigation.navigate('Medicos');
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando...</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.buttonContainer}>
          <Button title="Enfermedades Base" onPress={navigateToEnfermedadesBase} />
        </View>
        <Text> </Text>
        <View style={styles.buttonContainer}>
          <Button title="Alergias" onPress={navigateToAlergia} />
        </View>
        <Text> </Text>
        <View style={styles.buttonContainer}>
          <Button title="Médicos" onPress={navigateToMedico} />
        </View>
  
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    backgroundColor: '#4D8BFA',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Historial;



