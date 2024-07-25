// ServiceHistoryScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native';

const ServiceHistoryScreen = () => {
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState('');
  const [serviceRequests, setServiceRequests] = useState([]);

  useEffect(() => {
    const savedPets = JSON.parse(localStorage.getItem('pets')) || [];
    setPets(savedPets);

    const savedRequests = JSON.parse(localStorage.getItem('serviceRequests')) || [];
    setServiceRequests(savedRequests);
  }, []);

  const filteredRequests = serviceRequests.filter(request => request.petName === selectedPet);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Serviços</Text>
      <Picker
        selectedValue={selectedPet}
        onValueChange={(itemValue) => setSelectedPet(itemValue)}
      >
        {pets.map((pet, index) => (
          <Picker.Item key={index} label={pet.name} value={pet.name} />
        ))}
      </Picker>
      {filteredRequests.length === 0 ? (
        <Text>Não há serviços registrados para este pet.</Text>
      ) : (
        filteredRequests.map((request, index) => (
          <View key={index} style={styles.requestContainer}>
            <Text>Serviço: {request.service}</Text>
            <Text>Preço: R${request.price}</Text>
            {request.description && (
              <Text>Descrição: {request.description}</Text>
            )}
            <Text>Veterinário: {request.veterinarian}</Text>
            <Text>Data: {request.date}</Text>
            <Text>Hora: {request.time}</Text>
          </View>
        ))
      )}
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
  requestContainer: {
    marginBottom: 20,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default ServiceHistoryScreen;
