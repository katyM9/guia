import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, SafeAreaView, Alert, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Usamos AsyncStorage
import { useNavigation } from '@react-navigation/native'; // Hook de navegación

interface Medico {
  nombre: string;
  especialidad: string;
  telefono: string;
}

export default function Medicos(props: any) {
  const navigateToAgregarMedico = () => {
    props.navigation.navigate('AgregarMedico');
  };

  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchUserData = async () => {
    try {
      // Recuperamos los médicos almacenados localmente
      const storedMedicos = await AsyncStorage.getItem('medicos');
      if (storedMedicos) {
        setMedicos(JSON.parse(storedMedicos));
      } else {
        setMedicos([]);
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un error al cargar los datos de médicos.');
      console.error('Error al recuperar los médicos:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteMedico = async (index: number) => {
    const newMedicos = [...medicos];
    newMedicos.splice(index, 1); // Eliminar el médico en el índice especificado

    try {
      await AsyncStorage.setItem('medicos', JSON.stringify(newMedicos));
      setMedicos(newMedicos); // Actualizar el estado
      Alert.alert('Eliminado', 'El médico ha sido eliminado.');
    } catch (error) {
      Alert.alert('Error', 'Hubo un error al eliminar el médico.');
      console.error('Error al eliminar el médico:', error);
    }
  };

  const editMedico = (index: number) => {
    const medico = medicos[index];
    props.navigation.navigate('AgregarMedico', {
      medico,
      index,
    });
  };

  useEffect(() => {
    fetchUserData();
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={20} color="#0000ff" />
        <Text>Cargando datos...</Text>
      </View>
    );
  }

  if (!loading && medicos.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.userDataContainer}>
          <Text>No se encontraron datos de médicos</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={navigateToAgregarMedico}>
              <Text style={styles.buttonText}>Agregar Médico</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userDataContainer}>
        {/* Solo el botón "Agregar Médico" se muestra una vez arriba */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={navigateToAgregarMedico}>
            <Text style={styles.buttonText}>Agregar Médico</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.text}>Lista de Médicos:</Text>
          {medicos.map((medico, index) => (
            <View key={index} style={styles.medicoItem}>
              <Text>Nombre: {medico.nombre}</Text>
              <Text>Especialidad: {medico.especialidad}</Text>
              <Text>Teléfono: {medico.telefono}</Text>

              <View style={styles.actionsContainer}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => editMedico(index)}
                >
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteMedico(index)}
                >
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
    padding: 20,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1, 
    width: '100%',
    paddingBottom: 100,
  },
  buttonContainer: {
    marginTop: 20,
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
  text: {
    fontWeight: 'bold',
    marginVertical: 15,
  },
  medicoItem: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
});
