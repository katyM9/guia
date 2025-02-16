import 'react-native-gesture-handler';
import React, { FC, useState, useEffect } from 'react';
import { Text, StyleSheet, View, SafeAreaView, Alert, TextInput, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UsuarioProps {
  navigation: NavigationProp<any>;
}

interface UserData {
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  fechaNacimiento: string;
  peso: string;
}

const Usuario: FC<UsuarioProps> = (props) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<UserData>({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    fechaNacimiento: '',
    peso: '',
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async (): Promise<void> => {
    try {
      const data = await AsyncStorage.getItem('userData');
      if (data !== null) {
        const parsedData: UserData = JSON.parse(data);
        setUserData(parsedData);
        setFormData(parsedData);
      } else {
        console.log('No hay datos de usuario en almacenamiento local');
      }
    } catch (error) {
      console.error('Error al cargar datos del usuario:', error);
    }
  };

  const handleChange = (value: string, field: keyof UserData): void => {
    setFormData({ ...formData, [field]: value });
  };

  const saveUserData = async (): Promise<void> => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(formData));
      setUserData(formData);
      setEditing(false); // Detener edición
      Alert.alert('Éxito', 'Datos de usuario guardados correctamente');
    } catch (error) {
      console.error('Error al guardar datos del usuario:', error);
      Alert.alert('Error', 'Hubo un problema al guardar los datos.');
    }
  };

  const toggleEditing = (): void => {
    setEditing(!editing);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userDataContainer}>
        <Text style={styles.title}>Datos del Usuario</Text>

        {editing ? (
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={formData.nombre}
              onChangeText={(value) => handleChange(value, 'nombre')}
            />
            <TextInput
              style={styles.input}
              placeholder="Apellido"
              value={formData.apellido}
              onChangeText={(value) => handleChange(value, 'apellido')}
            />
            <TextInput
              style={styles.input}
              placeholder="Correo"
              value={formData.correo}
              onChangeText={(value) => handleChange(value, 'correo')}
            />
            <TextInput
              style={styles.input}
              placeholder="Teléfono"
              keyboardType="phone-pad"
              value={formData.telefono}
              onChangeText={(value) => handleChange(value, 'telefono')}
            />
            <TextInput
              style={styles.input}
              placeholder="Fecha de Nacimiento (DD/MM/YYYY)"
              value={formData.fechaNacimiento}
              onChangeText={(value) => handleChange(value, 'fechaNacimiento')}
            />
            <TextInput
              style={styles.input}
              placeholder="Peso (kg)"
              keyboardType="numeric"
              value={formData.peso}
              onChangeText={(value) => handleChange(value, 'peso')}
            />
            <TouchableOpacity style={styles.button} onPress={saveUserData}>
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.viewData}>
            <Text style={styles.userDataText}>
              <Text style={styles.bold}>Nombre:</Text> {userData?.nombre || 'N/A'}
            </Text>
            <Text style={styles.userDataText}>
              <Text style={styles.bold}>Apellido:</Text> {userData?.apellido || 'N/A'}
            </Text>
            <Text style={styles.userDataText}>
              <Text style={styles.bold}>Correo:</Text> {userData?.correo || 'N/A'}
            </Text>
            <Text style={styles.userDataText}>
              <Text style={styles.bold}>Teléfono:</Text> {userData?.telefono || 'N/A'}
            </Text>
            <Text style={styles.userDataText}>
              <Text style={styles.bold}>Fecha de Nacimiento:</Text> {userData?.fechaNacimiento || 'N/A'}
            </Text>
            <Text style={styles.userDataText}>
              <Text style={styles.bold}>Peso:</Text> {userData?.peso || 'N/A'}
            </Text>
            <TouchableOpacity style={styles.button} onPress={toggleEditing}>
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  userDataContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  form: {
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    width: '100%',
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
  button: {
    backgroundColor: '#4D8BFA',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  viewData: {
    width: '100%',
    alignItems: 'flex-start',
  },
  userDataText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Usuario;
