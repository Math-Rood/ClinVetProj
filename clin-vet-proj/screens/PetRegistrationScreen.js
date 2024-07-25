// screens/PetRegistrationScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Picker, Alert } from 'react-native';

const speciesOptions = [
  'Gato', 'Cachorro', 'Ave'
];

const PetRegistrationScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState(speciesOptions[0]);
  const [age, setAge] = useState('');
  const [breed, setBreed] = useState('');

  const handleRegisterPet = () => {
    if (name && species && age && breed) {
      const newPet = { name, species, age, breed };

      // Load existing pets from localStorage
      const existingPets = JSON.parse(localStorage.getItem('pets')) || [];
      existingPets.push(newPet);

      // Save updated pets list to localStorage
      localStorage.setItem('pets', JSON.stringify(existingPets));

      Alert.alert('Sucesso', 'Pet registrado com sucesso!');
      navigation.goBack();
    } else {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Pet</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <Picker
        selectedValue={species}
        onValueChange={(itemValue) => setSpecies(itemValue)}
      >
        {speciesOptions.map((option, index) => (
          <Picker.Item key={index} label={option} value={option} />
        ))}
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Idade"
        value={age}
        onChangeText={setAge}
      />
      <TextInput
        style={styles.input}
        placeholder="Raça"
        value={breed}
        onChangeText={setBreed}
      />
      <Button
        title="Registrar"
        onPress={handleRegisterPet}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
});

export default PetRegistrationScreen;
