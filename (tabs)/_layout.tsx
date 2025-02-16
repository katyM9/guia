import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// Importación de pantallas
import Medicamentos from './Medicamentos';
import AgregarMedicamento from './AgregarMedicamento';
import Home from './Home';
import Historial from './Historial';
import Usuario from './Usuario';
import Chequeos from './Chequeos';
import AgregarChequeoDiario from './AgregarChequeoDiario';
import Enfermedades from './Enfermedades';
import AgregarEnfermedad from './AgregarEnfermedad';
import Alergias from './Alergias';
import Medicos from './Medicos';
import Cuenta from './Cuenta';
import EditarCuenta from './EditarCuenta';
import ChequeoDiario from './ChequeoDiario';
import ChequeoSemanal from './ChequeoSemanal';
import ChequeoMensual from './ChequeoMensual';
import AgregarChequeoSemanal from './AgregarChequeoSemanal';
import AgregarChequeoMensual from './AgregarChequeoMensual';
import AgregarAlergias from './AgregarAlergias';
import AgregarMedico from './AgregarMedicos';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function TabsNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Inicio"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Medicamentos"
        component={Medicamentos}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="pill" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Chequeos"
        component={Chequeos}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="clipboard-check" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Historial"
        component={Historial}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="history" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Usuario"
        component={Usuario}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator id={undefined}>
      <Stack.Screen
        name="Tabs"
        component={TabsNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="AgregarMedicamento" component={AgregarMedicamento} />
      <Stack.Screen name="Enfermedades" component={Enfermedades} />
      <Stack.Screen name="Alergias" component={Alergias} />
      <Stack.Screen name="Medicos" component={Medicos} />
      <Stack.Screen name="EditarCuenta" component={EditarCuenta} />
      <Stack.Screen name="ChequeoDiario" component={ChequeoDiario} />
      <Stack.Screen name="ChequeoSemanal" component={ChequeoSemanal} />
      <Stack.Screen name="ChequeoMensual" component={ChequeoMensual} />
      <Stack.Screen name="AgregarChequeoDiario" component={AgregarChequeoDiario} />
      <Stack.Screen name="AgregarChequeoSemanal" component={AgregarChequeoSemanal} />
      <Stack.Screen name="AgregarChequeoMensual" component={AgregarChequeoMensual} />
      <Stack.Screen name="AgregarEnfermedad" component={AgregarEnfermedad} />
      <Stack.Screen name="AgregarAlergias" component={AgregarAlergias} />
      <Stack.Screen name="AgregarMedico" component={AgregarMedico} />
    </Stack.Navigator>
  );
}
