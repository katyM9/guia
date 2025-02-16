import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, SafeAreaView, ActivityIndicator, TouchableOpacity, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Usamos AsyncStorage
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './types';  // Asegúrate de importar el tipo de la navegación
import { StackNavigationProp } from '@react-navigation/stack';

type AlergiasScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Alergias'>;

export default function Alergias() {
  const [alergias, setAlergias] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<AlergiasScreenNavigationProp>();

  // Función para cargar alergias desde AsyncStorage
  const loadAlergias = async () => {
    try {
      const storedAlergias = await AsyncStorage.getItem('alergias');
      if (storedAlergias) {
        setAlergias(JSON.parse(storedAlergias));
      } else {
        setAlergias([]);
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un error al cargar las alergias. Por favor, inténtalo de nuevo.');
      console.error('Error al cargar alergias:', error);
    } finally {
      setLoading(false);
    }
  };

  // Función para eliminar una alergia
  const eliminarAlergia = async (index: number) => {
    try {
      const storedAlergias = await AsyncStorage.getItem('alergias');
      if (storedAlergias) {
        let alergiasData = JSON.parse(storedAlergias);
        // Eliminar la alergia seleccionada
        alergiasData = alergiasData.filter((_, i) => i !== index);
        // Guardar el nuevo arreglo de alergias en AsyncStorage
        await AsyncStorage.setItem('alergias', JSON.stringify(alergiasData));
        loadAlergias(); // Recargar la lista de alergias
        Alert.alert('Éxito', 'Alergia eliminada');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un error al eliminar la alergia.');
    }
  };

  
  const editarAlergia = (alergia: any) => {
    navigation.navigate('AgregarAlergias', { alergia });
  };

  // Cargar alergias cada vez que la pantalla se enfoque
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadAlergias();
    });
    return unsubscribe;
  }, [navigation]);

  // Mostrar indicador de carga
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={20} color="#0000ff" />
        <Text>Cargando datos...</Text>
      </View>
    );
  }

  // Si no hay alergias guardadas, mostrar mensaje y botón para agregar alergias
  if (alergias.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.userDataContainer}>
          <Text>No se encontraron datos de alergias</Text>
          <TouchableOpacity onPress={() => navigation.navigate('AgregarAlergias')} style={styles.addButton}>
            <Text style={styles.buttonText}>Agregar Alergia</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Mostrar la lista de alergias
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userDataContainer}>
        {}
        <View style={styles.addButtonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('AgregarAlergias')} style={styles.addButton}>
            <Text style={styles.buttonText}>Agregar Alergia</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.text}>Lista de Alergias:</Text>
          {alergias.map((alergia, index) => (
            <View key={index} style={styles.alergiaItem}>
              <Text>Nombre: {alergia.nombre}</Text>
              <View style={styles.actionButtons}>
                <TouchableOpacity onPress={() => editarAlergia(alergia)} style={styles.editButton}>
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => eliminarAlergia(index)} style={styles.deleteButton}>
                  <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
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
    backgroundColor: '#f4f4f4',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userDataContainer: {
    flex: 1,
    justifyContent: 'space-between', 
    alignItems: 'center',
    padding: 20,
    width: '100%',
    backgroundColor: '#ffffff', 
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  scrollContent: {
    flexGrow: 1, 
    width: '100%',
    paddingBottom: 100,
  },
  buttonContainer: {
    marginTop: 20,
  },
  addButton: {
    backgroundColor: '#4D8BFA',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  text: {
    fontWeight: 'bold',
    marginVertical: 15,
    fontSize: 18,
    color: '#333',
  },
  alergiaItem: {
    backgroundColor: '#f9f9f9', 
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  editButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    width: '45%',
  },
  deleteButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    width: '45%',
  },
  addButtonContainer: {
    width: '100%', 
    marginBottom: 20, 
  }
});
