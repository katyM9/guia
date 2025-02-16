import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, SafeAreaView, Alert, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Usamos AsyncStorage
import { useNavigation } from '@react-navigation/native'; // Hook de navegación

interface ChequeoSemanal {
  nombre: string;
  valores: string;
  fecha: string;
  hora: string;
}

export default function ChequeoSemanal(props: any) {
  const navigateToAgregarChequeoSemanal = () => {
    props.navigation.navigate('AgregarChequeoSemanal');
  };

  const [chequeoSemanal, setChequeoSemanal] = useState<ChequeoSemanal[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchUserData = async () => {
    try {
      const storedChequeos = await AsyncStorage.getItem('chequeoSemanal');
      if (storedChequeos) {
        setChequeoSemanal(JSON.parse(storedChequeos));
      } else {
        setChequeoSemanal([]);
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un error al cargar los datos de los chequeos semanales. Por favor, inténtalo de nuevo más tarde.');
      console.error('Error al recuperar los datos de chequeos semanales:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteChequeo = async (index: number) => {
    const newChequeos = [...chequeoSemanal];
    newChequeos.splice(index, 1); // Elimina el chequeo en el índice especificado

    try {
      await AsyncStorage.setItem('chequeoSemanal', JSON.stringify(newChequeos));
      setChequeoSemanal(newChequeos); // Actualizamos el estado
      Alert.alert('Eliminado', 'El chequeo semanal ha sido eliminado.');
    } catch (error) {
      Alert.alert('Error', 'Hubo un error al eliminar el chequeo semanal.');
      console.error('Error al eliminar el chequeo semanal:', error);
    }
  };

  const editChequeo = (index: number) => {
    const chequeo = chequeoSemanal[index];
    props.navigation.navigate('AgregarChequeoSemanal', {
      chequeo,
      index,
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchUserData();
    });

    return unsubscribe;
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={20} color="#0000ff" />
        <Text>Cargando datos...</Text>
      </View>
    );
  }

  if (!loading && chequeoSemanal.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.userDataContainer}>
          <Text>No se encontraron datos de chequeos semanales</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.addButton} onPress={navigateToAgregarChequeoSemanal}>
              <Text style={styles.buttonText}>Agregar Chequeo Semanal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userDataContainer}>
        {/* Botón de Agregar chequeo semanal en la parte superior */}
        <TouchableOpacity style={styles.addButton} onPress={navigateToAgregarChequeoSemanal}>
          <Text style={styles.buttonText}>Agregar Chequeo Semanal</Text>
        </TouchableOpacity>

        <Text style={styles.text}>Lista de Chequeos Semanales:</Text>
        <FlatList
          data={chequeoSemanal}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.chequeoItem}>
              <Text>Nombre: {item.nombre}</Text>
              <Text>Valores/Niveles: {item.valores}</Text>
              <Text>Fecha: {item.fecha} | Hora: {item.hora}</Text>

              <View style={styles.actionsContainer}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => editChequeo(index)}
                >
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteChequeo(index)}
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
  chequeoItem: {
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
