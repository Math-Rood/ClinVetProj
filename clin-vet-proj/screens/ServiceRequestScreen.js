// screens/ServiceRequestScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Picker, TextInput, Alert } from 'react-native';
import { isValid, format, parse } from 'date-fns';

const veterinarians = [
  { name: 'Dr. Ana', id: '1' },
  { name: 'Dr. Carlos', id: '2' },
  { name: 'Dr. Julia', id: '3' },
];

const services = [
  { name: 'Banho', price: 30 },
  { name: 'Tosa', price: 40 },
  { name: 'Banho&Tosa', price: 60 },
  { name: 'Consulta', price: 50, description: 'Diagnóstico' },
  { name: 'Medicação', price: 20, description: 'Descrição dos Remédios' },
  { name: 'Cirurgia', price: 200, description: 'Descrição do Procedimento' },
  { name: 'Internação', price: 100, description: 'Descrição do Tratamento' }
];

const availableTimes = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
];

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];
const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i);

const ServiceRequestScreen = ({ navigation }) => {
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState('');
  const [service, setService] = useState(services[0]);
  const [veterinarian, setVeterinarian] = useState(veterinarians[0].id);
  const [day, setDay] = useState(days[0]);
  const [month, setMonth] = useState(months[0]);
  const [year, setYear] = useState(years[0]);
  const [time, setTime] = useState(availableTimes[0]);
  const [description, setDescription] = useState('');

  useEffect(() => {
    // Load pets from localStorage
    const loadPets = () => {
      const savedPets = JSON.parse(localStorage.getItem('pets')) || [];
      setPets(savedPets);
      if (savedPets.length > 0) {
        setSelectedPet(savedPets[0].name);
      }
    };

    loadPets();
  }, []);

  useEffect(() => {
    // Reset description when service changes
    setDescription('');
  }, [service]);

  const handleRequestService = () => {
    if (selectedPet && service && day && month && year && time) {
      const dateString = `${year}-${months.indexOf(month) + 1}-${day}`;
      const date = parse(dateString, 'yyyy-M-d', new Date());

      if (!isValid(date)) {
        Alert.alert('Erro', 'Data inválida.');
        return;
      }

      const request = {
        petName: selectedPet,
        service: service.name,
        price: service.price,
        description,
        veterinarian,
        date: format(date, 'yyyy-MM-dd'),
        time
      };

      // Check for conflicts
      const existingRequests = JSON.parse(localStorage.getItem('serviceRequests')) || [];
      const conflict = existingRequests.some(r =>
        r.service === request.service &&
        r.date === request.date &&
        r.time === request.time &&
        (r.petName === selectedPet || r.veterinarian === veterinarian)
      );

      if (conflict) {
        Alert.alert('Erro', 'Conflito de horário ou serviço já solicitado.');
        return;
      }

      // Save new request
      existingRequests.push(request);
      localStorage.setItem('serviceRequests', JSON.stringify(existingRequests));

      Alert.alert('Sucesso', 'Serviço solicitado com sucesso!');
      navigation.goBack();
    } else {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Solicitação de Serviço</Text>
      {pets.length === 0 ? (
        <Text>Por favor, registre um pet primeiro.</Text>
      ) : (
        <>
          <Picker
            selectedValue={selectedPet}
            onValueChange={(itemValue) => setSelectedPet(itemValue)}
          >
            {pets.map((pet, index) => (
              <Picker.Item key={index} label={pet.name} value={pet.name} />
            ))}
          </Picker>
          <Picker
            selectedValue={service.name}
            onValueChange={(itemValue) => {
              const selectedService = services.find(s => s.name === itemValue);
              setService(selectedService);
            }}
          >
            {services.map((svc, index) => (
              <Picker.Item key={index} label={svc.name} value={svc.name} />
            ))}
          </Picker>
          <Text>Preço: R${service.price}</Text>
          {service.description && (
            <Text>Descrição: {service.description}</Text>
          )}
          <Picker
            selectedValue={veterinarian}
            onValueChange={(itemValue) => setVeterinarian(itemValue)}
          >
            {veterinarians.map(vet => (
              <Picker.Item key={vet.id} label={vet.name} value={vet.id} />
            ))}
          </Picker>
          <View style={styles.datePickerContainer}>
            <Picker
              selectedValue={day}
              style={styles.datePicker}
              onValueChange={(itemValue) => setDay(itemValue)}
            >
              {days.map((d, index) => (
                <Picker.Item key={index} label={String(d)} value={d} />
              ))}
            </Picker>
            <Picker
              selectedValue={month}
              style={styles.datePicker}
              onValueChange={(itemValue) => setMonth(itemValue)}
            >
              {months.map((m, index) => (
                <Picker.Item key={index} label={m} value={m} />
              ))}
            </Picker>
            <Picker
              selectedValue={year}
              style={styles.datePicker}
              onValueChange={(itemValue) => setYear(itemValue)}
            >
              {years.map((y, index) => (
                <Picker.Item key={index} label={String(y)} value={y} />
              ))}
            </Picker>
          </View>
          <Picker
            selectedValue={time}
            onValueChange={(itemValue) => setTime(itemValue)}
          >
            {availableTimes.map((t, index) => (
              <Picker.Item key={index} label={t} value={t} />
            ))}
          </Picker>
          {service.description && (
            <TextInput
              style={styles.input}
              placeholder={`Descrição: ${service.description}`}
              value={description}
              onChangeText={setDescription}
            />
          )}
          <Button
            title="Solicitar"
            onPress={handleRequestService}
            disabled={pets.length === 0}
          />
        </>
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
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  datePicker: {
    flex: 1,
    marginHorizontal: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default ServiceRequestScreen;
