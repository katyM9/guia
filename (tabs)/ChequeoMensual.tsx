import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, SafeAreaView, Alert, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Usamos AsyncStorage en lugar de Firestore
import { useNavigation } from '@react-navigation/native'; // Hook de navegación

interface ChequeoMensual {
  nombre: string;
  valores: string;
  fecha: string;
  hora: string;
}

export default function ChequeoMensual(props: any) {
  const [chequeoMensual, setChequeoMensual] = useState<ChequeoMensual[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchUserData = async () => {
    try {
      const storedChequeos = await AsyncStorage.getItem('chequeoMensual');
      if (storedChequeos) {
        setChequeoMensual(JSON.parse(storedChequeos));
      } else {
        setChequeoMensual([]);
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un error al cargar los datos de los chequeos mensuales. Por favor, inténtalo de nuevo más tarde.');
      console.error('Error al recuperar los datos de chequeos mensuales:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchUserData();
    });

    return unsubscribe;
  }, [navigation]);

  const eliminarChequeoMensual = async (index: number) => {
    try {
      const storedChequeos = await AsyncStorage.getItem('chequeoMensual');
      if (storedChequeos) {
        let chequeosData = JSON.parse(storedChequeos);
        chequeosData = chequeosData.filter((_: any, i: number) => i !== index);
        await AsyncStorage.setItem('chequeoMensual', JSON.stringify(chequeosData));
        fetchUserData();
        Alert.alert('Éxito', 'Chequeo mensual eliminado');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un error al eliminar el chequeo mensual.');
    }
  };

  const navigateToAgregarChequeoMensual = (chequeo?: ChequeoMensual, index?: number) => {
    props.navigation.navigate('AgregarChequeoMensual', { chequeo, index });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={20} color="#0000ff" />
        <Text>Cargando datos...</Text>
      </View>
    );
  }

  if (!loading && chequeoMensual.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.userDataContainer}>
          <Text>No se encontraron datos de chequeos mensuales</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.addButton} onPress={() => navigateToAgregarChequeoMensual()}>
              <Text style={styles.buttonText}>Agregar Chequeo Mensual</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userDataContainer}>
        <TouchableOpacity style={styles.addButton} onPress={() => navigateToAgregarChequeoMensual()}>
          <Text style={styles.buttonText}>Agregar Chequeo Mensual</Text>
        </TouchableOpacity>

        <Text style={styles.text}>Lista de Chequeos Mensuales:</Text>
        <FlatList
          data={chequeoMensual}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.chequeoItem}>
              <Text>Nombre: {item.nombre}</Text>
              <Text>Valores/Niveles: {item.valores}</Text>
              <Text>Fecha: {item.fecha} | Hora: {item.hora}</Text>

              <View style={styles.actionsContainer}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => navigateToAgregarChequeoMensual(item, index)}
                >
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => eliminarChequeoMensual(index)}
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
