import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, SafeAreaView, Alert, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

interface Medicamento {
  id: string;
  nombre: string;
  concentracion: string;
  unidades: string;
  frecuencia: string;
}

const Medicamentos: React.FC = (props: any) => {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation();

  // Función para cargar los medicamentos desde AsyncStorage
  const fetchMedicamentos = async () => {
    try {
      const storedMedicamentos = await AsyncStorage.getItem('medicamentos');
      if (storedMedicamentos) {
        const medicamentoData: Medicamento[] = JSON.parse(storedMedicamentos);
        setMedicamentos(medicamentoData);
      } else {
        setMedicamentos([]);
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un error al cargar los datos de medicamentos. Por favor, inténtalo de nuevo más tarde.');
      console.error('Error al recuperar los medicamentos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Recargar medicamentos cada vez que la pantalla se enfoque
  useEffect(() => {
    fetchMedicamentos();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchMedicamentos();
    });
    return unsubscribe;
  }, [navigation]);

  // Función para navegar a la pantalla de agregar medicamento (para editar o agregar)
  const navigateToAgregarMedicamento = (medicamento?: Medicamento) => {
    props.navigation.navigate('AgregarMedicamento', { medicamento });
  };

  // Función para eliminar un medicamento
  const eliminarMedicamento = async (id: string) => {
    try {
      const storedMedicamentos = await AsyncStorage.getItem('medicamentos');
      let medicamentos = storedMedicamentos ? JSON.parse(storedMedicamentos) : [];

      medicamentos = medicamentos.filter((med: Medicamento) => med.id !== id);

      await AsyncStorage.setItem('medicamentos', JSON.stringify(medicamentos));

      Alert.alert('Éxito', 'Medicamento eliminado correctamente');
      fetchMedicamentos(); // Recargar los medicamentos después de eliminar
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un error al eliminar el medicamento.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={20} color="#0000ff" />
        <Text>Cargando datos...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userDataContainer}>
        {}
        <TouchableOpacity style={styles.addButton} onPress={() => navigateToAgregarMedicamento()}>
          <Text style={styles.addButtonText}>Agregar Medicamento</Text>
        </TouchableOpacity>

        <Text style={styles.text}>Lista de Medicamentos:</Text>
        <FlatList
          data={medicamentos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.medContainer}>
              <Text>Nombre: {item.nombre}</Text>
              <Text>Concentración: {item.concentracion} {item.unidades}</Text>
              <Text>Frecuencia: {item.frecuencia}</Text>
              <View style={styles.actionButtons}>
                {}
                <TouchableOpacity
                  style={[styles.button, styles.editButton]}
                  onPress={() => navigateToAgregarMedicamento(item)}
                >
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                {}
                <TouchableOpacity
                  style={[styles.button, styles.deleteButton]}
                  onPress={() => eliminarMedicamento(item.id)}
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4', 
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userDataContainer: {
    padding: 20,
    backgroundColor: '#ffffff', 
    borderRadius: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 40,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  medContainer: {
    backgroundColor: '#f9f9f9', 
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    width: '45%',
  },
  addButton: {
    backgroundColor: '#4D8BFA', 
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  editButton: {
    backgroundColor: '#FFD700', 
  },
  deleteButton: {
    backgroundColor: '#FF6347', 
  },
});

export default Medicamentos;
