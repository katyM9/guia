import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, SafeAreaView, Alert, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Usamos AsyncStorage
import { useNavigation } from '@react-navigation/native'; // Hook de navegación

interface Enfermedad {
  nombre: string;
}

export default function Enfermedades(props: any) {
  const navigateToAgregarEnfermedades = () => {
    props.navigation.navigate('AgregarEnfermedad');
  };

  const [enfermedades, setEnfermedades] = useState<Enfermedad[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchUserData = async () => {
    try {
      const storedEnfermedades = await AsyncStorage.getItem('enfermedades');
      if (storedEnfermedades) {
        setEnfermedades(JSON.parse(storedEnfermedades));
      } else {
        setEnfermedades([]);
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un error al cargar los datos de enfermedades.');
      console.error('Error al recuperar las enfermedades:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteEnfermedad = async (index: number) => {
    const newEnfermedades = [...enfermedades];
    newEnfermedades.splice(index, 1); // Eliminar la enfermedad en el índice especificado

    try {
      await AsyncStorage.setItem('enfermedades', JSON.stringify(newEnfermedades));
      setEnfermedades(newEnfermedades); // Actualizar el estado
      Alert.alert('Eliminado', 'La enfermedad ha sido eliminada.');
    } catch (error) {
      Alert.alert('Error', 'Hubo un error al eliminar la enfermedad.');
      console.error('Error al eliminar la enfermedad:', error);
    }
  };

  const editEnfermedad = (index: number) => {
    const enfermedad = enfermedades[index];
    props.navigation.navigate('AgregarEnfermedad', {
      enfermedad,
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

  if (!loading && enfermedades.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.userDataContainer}>
          <Text>No se encontraron datos de enfermedades</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.addButton} onPress={navigateToAgregarEnfermedades}>
              <Text style={styles.buttonText}>Agregar Enfermedad</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userDataContainer}>
        {/* Botón de Agregar enfermedad */}
        <TouchableOpacity style={styles.addButton} onPress={navigateToAgregarEnfermedades}>
          <Text style={styles.buttonText}>Agregar Enfermedad</Text>
        </TouchableOpacity>

        <Text style={styles.text}>Lista de Enfermedades:</Text>
        <FlatList
          data={enfermedades}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.enfermedadItem}>
              <Text>Nombre: {item.nombre}</Text>

              <View style={styles.actionsContainer}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => editEnfermedad(index)}
                >
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteEnfermedad(index)}
                >
                  <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff', 
    borderRadius: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
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
    marginBottom: 20,
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
  enfermedadItem: {
    backgroundColor: '#f9f9f9', 
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
  },
  actionsContainer: {
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
});
