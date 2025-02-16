import 'react-native-gesture-handler';
import React, { FC } from 'react';
import { Text, StyleSheet, View, SafeAreaView, Button } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

interface ChequeosProps {
  navigation: NavigationProp<any>;
}

const Chequeos: FC<ChequeosProps> = (props) => {
  const navigateToChequeoDiario = (): void => {
    props.navigation.navigate('ChequeoDiario');
  };

  const navigateToChequeoSemanal = (): void => {
    props.navigation.navigate('ChequeoSemanal');
  };

  const navigateToChequeoMensual = (): void => {
    props.navigation.navigate('ChequeoMensual');
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.buttonContainer}>
          <Button title="Chequeo diario" onPress={navigateToChequeoDiario} />
        </View>
        <Text> </Text>
        <View style={styles.buttonContainer}>
          <Button title="Chequeo semanal" onPress={navigateToChequeoSemanal} />
        </View>
        <Text> </Text>
        <View style={styles.buttonContainer}>
          <Button title="Chequeo mensual" onPress={navigateToChequeoMensual} />
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
});

export default Chequeos;