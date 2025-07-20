// Stack 
// tab 
// drawer 



npm install @react-navigation/native


npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated


npm install @react-navigation/native-stack
npm install @react-navigation/bottom-tabs
npm install @react-navigation/drawer

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////


import { NavigationContainer } from '@react-navigation/native';

export default function App() {
    return (
        <NavigationContainer>
      {/* Navigators will go here */}
    </NavigationContainer>
  );
}

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Button, StyleSheet } from 'react-native';

// Create stack navigator
const Stack = createNativeStackNavigator();

// Home Screen Component
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>

      {/* Navigate to Details screen without params */}
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />

      {/* Navigate to Details with parameters */}
      <Button
        title="Go to Details with Params"
        onPress={() =>
          navigation.navigate('Details', { itemId: 42, itemName: 'React Native' })
        }
      />

      {/* Replace the current screen */}
      <Button
        title="Replace with Details"
        onPress={() =>
          navigation.replace('Details', { itemId: 100, itemName: 'Replaced!' })
        }
      />

      {/* Push a new instance of Details (adds to stack) */}
      <Button
        title="Push New Details Screen"
        onPress={() =>
          navigation.push('Details', { itemId: Math.floor(Math.random() * 100) })
        }
      />
    </View>
  );
}

// Details Screen Component
function DetailsScreen({ route, navigation }) {
  // Retrieve params
  const { itemId, itemName } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details Screen</Text>
      <Text>Item ID: {itemId}</Text>
      <Text>Item Name: {itemName}</Text>

      {/* Go back to previous screen */}
      <Button
        title="Go Back"
        onPress={() => navigation.goBack()}
      />

      {/* Navigate back to Home directly */}
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />

      {/* Pop to top of the stack */}
      <Button
        title="Pop to Top"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

// App Component
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  }
});


///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////



import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////



// Navigate with params
navigation.navigate('Details', { itemId: 42, name: 'React Native' });

// In Details Screen
const { itemId, name } = route.params;

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////


// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, Button, StyleSheet } from 'react-native';

// Create Drawer Navigator
const Drawer = createDrawerNavigator();

// Home Screen Component
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>

      {/* Navigate to Profile screen */}
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
      />

      {/* Open the Drawer */}
      <Button
        title="Open Drawer"
        onPress={() => navigation.openDrawer()}
      />

      {/* Toggle Drawer (open/close) */}
      <Button
        title="Toggle Drawer"
        onPress={() => navigation.toggleDrawer()}
      />
    </View>
  );
}

// Profile Screen Component
function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>

      {/* Go back to Home */}
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />

      {/* Close the Drawer */}
      <Button
        title="Close Drawer"
        onPress={() => navigation.closeDrawer()}
      />
    </View>
  );
}

// App Component with Drawer Navigation
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#e6e6e6',
            width: 240
          },
          headerStyle: {
            backgroundColor: 'blue'
          },
          headerTintColor: 'white'
        }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  }
});

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////



// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For tab icons

// Create Bottom Tab Navigator
const Tab = createBottomTabNavigator();

// Home Screen Component
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>

      {/* Navigate to Settings Tab */}
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate('Settings')}
      />
    </View>
  );
}

// Settings Screen Component
function SettingsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings Screen</Text>

      {/* Navigate back to Home Tab */}
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

// App Component with Tab Navigation
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            // Assign icon based on route name
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            // Return Ionicons component
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
          headerStyle: {
            backgroundColor: 'blue'
          },
          headerTintColor: 'white'
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  }
});




///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////