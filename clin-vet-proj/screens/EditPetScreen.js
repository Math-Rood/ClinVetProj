// screens/EditPetScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const EditPetScreen = ({ route, navigation }) => {
  const { pet } = route.params;
  const [petName, setPetName] = useState(pet.name);
  const [petAge, setPetAge] = useState(pet.age);
  const [petSpecies, setPetSpecies] = useState(pet.species);

  const handleSaveChanges = () => {
    if (petName && petAge && petSpecies) {
      const updatedPet = { name: petName, age: petAge, species: petSpecies };

      const pets = JSON.parse(localStorage.getItem('pets')) || [];
      const updatedPets = pets.map(pet => pet.name === updatedPet.name ? updatedPet : pet);
      localStorage.setItem('pets', JSON.stringify(updatedPets));

      alert('Pet atualizado com sucesso!');
      navigation.goBack();
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Pet</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Pet"
        value={petName}
        onChangeText={setPetName}
      />
      <TextInput
        style={styles.input}
        placeholder="Idade do Pet"
        value={petAge}
        onChangeText={setPetAge}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Espécie do Pet"
        value={petSpecies}
        onChangeText={setPetSpecies}
      />
      <Button
        title="Salvar Alterações"
        onPress={handleSaveChanges}
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

export default EditPetScreen;
