// screens/HomeScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo à Clínica Veterinária</Text>
      <Button
        title="Cadastrar Pet"
        onPress={() => navigation.navigate('PetRegistration')}
      />
      <Button
        title="Lista de Pets"
        onPress={() => navigation.navigate('PetList')}
      />
      <Button
        title="Solicitar Serviço"
        onPress={() => navigation.navigate('ServiceRequest')}
      />
      <Button
        title="Lista de Solicitações"
        onPress={() => navigation.navigate('ServiceList')}
      />
            <Button
        title="Histórico"
        onPress={() => navigation.navigate('ServiceHistory')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default HomeScreen;
