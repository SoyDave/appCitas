import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import AppointmentList from './screens/AppointmentList';
import AppointmentCreate from './screens/AppointmentCreate';
import AppointmentDetail from './screens/AppointmentDetail';

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <Stack.Screen name="AppointmentList" component={AppointmentList} options={{ title: 'Home' }} />
      <Stack.Screen name="AppointmentCreate" component={AppointmentCreate} options={{ title: 'Create Appointment' }} />
      <Stack.Screen name="AppointmentDetail" component={AppointmentDetail} options={{ title: 'Edit Appointment' }} />
    </Stack.Navigator>
  )
};

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
};
