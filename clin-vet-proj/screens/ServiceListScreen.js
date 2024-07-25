// screens/ServiceListScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';

const ServiceListScreen = ({ navigation }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Load service requests from localStorage
    const loadRequests = () => {
      const savedRequests = JSON.parse(localStorage.getItem('serviceRequests')) || [];
      setRequests(savedRequests);
    };

    loadRequests();
  }, []);

  const handleCancelRequest = (index) => {
    const updatedRequests = requests.filter((_, i) => i !== index);
    localStorage.setItem('serviceRequests', JSON.stringify(updatedRequests));
    setRequests(updatedRequests);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <Text style={styles.text}>{`${item.petName} - ${item.service} - ${item.date} ${item.time}`}</Text>
      <TouchableOpacity onPress={() => handleCancelRequest(index)}>
        <Text style={styles.cancel}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Solicitações</Text>
      <FlatList
        data={requests}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button
        title="Voltar"
        onPress={() => navigation.goBack()}
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
  text: {
    fontSize: 16,
  },
  cancel: {
    color: 'red',
  },
});

export default ServiceListScreen;
