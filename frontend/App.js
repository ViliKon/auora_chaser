import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './tabs/Home';
import CurrentState from './tabs/CurrentState';
import Ionicons from '@expo/vector-icons/Ionicons';
import UserLocation from './tabs/UserLocation';

const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <UserLocation >
      <NavigationContainer>
        <Tab.Navigator style={styles.nav}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'Info') {
                iconName = 'information-circle-outline';
              }
              return <Ionicons name={iconName} size={size} color={'#8B008B'} />;
            },
          })}>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Info" component={CurrentState} />
        </Tab.Navigator>
      </NavigationContainer>
    </UserLocation>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nav: {
    backgroundColor: 'black'
  }
});
