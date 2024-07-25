// screens/PetListScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const PetListScreen = ({ navigation }) => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    // Carregar pets do localStorage
    const loadPets = () => {
      const savedPets = JSON.parse(localStorage.getItem('pets')) || [];
      setPets(savedPets);
    };
    
    loadPets();
  }, []);

  const handleEditPet = (pet) => {
    navigation.navigate('EditPet', { pet });
  };

  const handleDeletePet = (petName) => {
    const updatedPets = pets.filter(pet => pet.name !== petName);
    localStorage.setItem('pets', JSON.stringify(updatedPets));
    setPets(updatedPets);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.petName}>{item.name}</Text>
      <Button
        title="Editar"
        onPress={() => handleEditPet(item)}
      />
      <Button
        title="Excluir"
        onPress={() => handleDeletePet(item.name)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Pets</Text>
      <FlatList
        data={pets}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
      <Button
        title="Adicionar Novo Pet"
        onPress={() => navigation.navigate('PetRegistration')}
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
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  petName: {
    fontSize: 18,
  },
});

export default PetListScreen;
