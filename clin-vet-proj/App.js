import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import PetRegistrationScreen from './screens/PetRegistrationScreen';
import PetListScreen from './screens/PetListScreen';
import EditPetScreen from './screens/EditPetScreen';
import ServiceRequestScreen from './screens/ServiceRequestScreen';
import ServiceListScreen from './screens/ServiceListScreen';
import ServiceHistoryScreen from './screens/ServiceHistoryScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PetRegistration" component={PetRegistrationScreen} />
        <Stack.Screen name="PetList" component={PetListScreen} />
        <Stack.Screen name="EditPet" component={EditPetScreen} />
        <Stack.Screen name="ServiceRequest" component={ServiceRequestScreen} />
        <Stack.Screen name="ServiceList" component={ServiceListScreen} />
        <Stack.Screen name="ServiceHistory" component={ServiceHistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
