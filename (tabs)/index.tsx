import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Menu from "./_layout";

import Cuenta from "./Cuenta";
import AgregarEnfermedad from "./AgregarEnfermedad";
import AgregarAlergias from "./AgregarAlergias";
import AgregarMedicos from "./AgregarMedicos";
import AgregarMedicamento from "./AgregarMedicamento";
import Enfermedades from "./Enfermedades";
import Alergias from "./Alergias";
import Medicos from "./Medicos";
import ChequeoDiario from './ChequeoDiario';
import ChequeoSemanal from './ChequeoSemanal';
import ChequeoMensual from './ChequeoMensual';
import EditarCuenta from "./EditarCuenta";
import AgregarChequeoDiario from './AgregarChequeoDiario';
import AgregarChequeoSemanal from './AgregarChequeoSemanal';
import AgregarChequeoMensual from './AgregarChequeoMensual';
import Chequeos from './Chequeos';
import Historial from './Historial';
import Home from './Home';
import Medicamentos from './Medicamentos';
import Usuario from './Usuario';

const Stack = createNativeStackNavigator();

export default function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        id={undefined}
        screenOptions={{
          headerBackVisible: false,
          headerTitleAlign: 'center', // Centra los títulos
        }}
      >
       
        
        <Stack.Screen name="Cuenta" component={Cuenta} />
        <Stack.Screen name="AgregarEnfermedad" component={AgregarEnfermedad} />
        <Stack.Screen name="AgregarAlergias" component={AgregarAlergias} />
        <Stack.Screen name="AgregarMedicos" component={AgregarMedicos} />
        <Stack.Screen name="AgregarMedicamento" component={AgregarMedicamento} />
        <Stack.Screen name="Enfermedades" component={Enfermedades} />
        <Stack.Screen name="Alergias" component={Alergias} />
        <Stack.Screen name="Medicos" component={Medicos} />
        <Stack.Screen name="ChequeoDiario" component={ChequeoDiario} />
        <Stack.Screen name="AgregarChequeoDiario" component={AgregarChequeoDiario} />
        <Stack.Screen name="ChequeoSemanal" component={ChequeoSemanal} />
        <Stack.Screen name="AgregarChequeoSemanal" component={AgregarChequeoSemanal} />
        <Stack.Screen name="ChequeoMensual" component={ChequeoMensual} />
        <Stack.Screen name="AgregarChequeoMensual" component={AgregarChequeoMensual} />
        <Stack.Screen name="EditarCuenta" component={EditarCuenta} />
        <Stack.Screen name="Chequeos" component={Chequeos} />
        <Stack.Screen name="Historial" component={Historial} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Medicamentos" component={Medicamentos} />
        <Stack.Screen name="Usuario" component={Usuario} />
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{
            title: "MediPro",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#fff",
            },
            headerTintColor: "#000",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}