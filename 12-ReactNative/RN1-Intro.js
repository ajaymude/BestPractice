// 01 - <View></View>
// 02 - <Text></Text>
// 03 - <Image></Image>
// 04 - <TextInput></TextInput>
// 05 - <ScrollView></ScrollView>
// 06 - <FlatList></FlatList>
// 07 - <SectionList></SectionList>
// 08 - <SafeAreaView></SafeAreaView>
// 09 - <StatusBar></StatusBar>
// 10 - <ActivityIndicator></ActivityIndicator>
// 11 - <Modal></Modal>
// 12 - <Alert></Alert>
// 13 - <TouchableOpacity></TouchableOpacity>
// 14 - <TouchableHighlight></TouchableHighlight>
// 15 - <TouchableWithoutFeedback></TouchableWithoutFeedback>
// 16 - <Pressable></Pressable>
// 17 - <Button></Button>
// 18 - <Switch></Switch>
// 19 - <Picker></Picker>
// 20 - <Slider></Slider>
// 21 - <DatePicker></DatePicker>
// 22 - <TimePicker></TimePicker>
// 23 - <SegmentedControl></SegmentedControl>
// 24 - <ActivityIndicator></ActivityIndicator>
// 25 - <ProgressBar></ProgressBar>
// 26 - <ProgressView></ProgressView>
// 27 - <RefreshControl></RefreshControl>
// 28 - <VirtualizedList></VirtualizedList>
// 29 - <SectionList></SectionList>
// 30 - <VirtualizedList></VirtualizedList>
// 31 -  <PaperProvider>



// installation npx create-expo-app@latest
// npx expo start 






// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const RN1-Intro = () => {
//   return (
//     <View>
//       <Text>RN1-Intro</Text>
//     </View>
//   )
// }

// export default RN1-Intro

// const styles = StyleSheet.create({})





/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

// button in the react native 


// For Button:
// title – Text on the button
// onPress – Function to call on press
// color – Text color (Android only, background for iOS)
// disabled – Disable the button
// accessibilityLabel – Screen reader support

// For TouchableOpacity:
// onPress
// onLongPress
// activeOpacity
// Fully stylable using style

// For Pressable:
// onPress
// onLongPress
// onPressIn, onPressOut
// style can be dynamic based on press state


import React, { useState } from 'react';
import { View, Text, Button, Alert, TouchableOpacity, Pressable, StyleSheet } from 'react-native';

export default function App() {
  const [count, setCount] = useState(0);

  const handlePress = () => {
    Alert.alert('Button Pressed!');
    setCount(count + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>React Native Button Examples</Text>

      {/* 1. Basic Button */}
      <Button
        title="Basic Button"
        onPress={handlePress}
        color="#007BFF"
        accessibilityLabel="This is a basic button"
      />

      {/* 2. TouchableOpacity Button */}
      <TouchableOpacity style={styles.touchableBtn} onPress={handlePress} activeOpacity={0.7}>
        <Text style={styles.touchableText}>TouchableOpacity Button</Text>
      </TouchableOpacity>

      {/* 3. Pressable Button */}
      <Pressable
        onPress={handlePress}
        onLongPress={() => Alert.alert('Long Pressed!')}
        style={({ pressed }) => [
          styles.pressableBtn,
          { backgroundColor: pressed ? '#555' : '#28A745' },
        ]}
      >
        <Text style={styles.pressableText}>Pressable Button</Text>
      </Pressable>

      <Text style={styles.counter}>You've pressed the button {count} times.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  heading: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  touchableBtn: {
    marginTop: 20,
    backgroundColor: '#FFC107',
    padding: 12,
    borderRadius: 8,
  },
  touchableText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  pressableBtn: {
    marginTop: 20,
    padding: 12,
    borderRadius: 8,
  },
  pressableText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  counter: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 16,
  },
});










/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const RN1-Intro = () => {
  return (
    <View>
      <Text>RN1-Intro</Text>
    </View>
  )
}

export default RN1-Intro

const styles = StyleSheet.create({})


/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////


import React from 'react';
import { View, Button, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, Pressable, Text, StyleSheet, Alert } from 'react-native';
import { Provider as PaperProvider, Button as PaperButton } from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>

        {/* 1. Default Button */}
        <Button title="Default Button" onPress={() => Alert.alert('Default Button Pressed')} />

        {/* 2. TouchableOpacity */}
        <TouchableOpacity style={styles.button} onPress={() => Alert.alert('TouchableOpacity Pressed')}>
          <Text style={styles.buttonText}>TouchableOpacity</Text>
        </TouchableOpacity>

        {/* 3. Pressable */}
        <Pressable
          onPress={() => Alert.alert('Pressable Pressed')}
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: pressed ? 'lightblue' : 'blue' }
          ]}
        >
          <Text style={styles.buttonText}>Pressable</Text>
        </Pressable>

        {/* 4. TouchableHighlight */}
        <TouchableHighlight
          underlayColor="lightblue"
          onPress={() => Alert.alert('TouchableHighlight Pressed')}
          style={styles.button}
        >
          <Text style={styles.buttonText}>TouchableHighlight</Text>
        </TouchableHighlight>

        {/* 5. TouchableWithoutFeedback */}
        <TouchableWithoutFeedback onPress={() => Alert.alert('TouchableWithoutFeedback Pressed')}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>TouchableWithoutFeedback</Text>
          </View>
        </TouchableWithoutFeedback>

        {/* 6. Custom Button Component */}
        <CustomButton title="Custom Button" onPress={() => Alert.alert('Custom Button Pressed')} />

        {/* 7. React Native Paper Button */}
        <PaperButton mode="contained" onPress={() => Alert.alert('Paper Button Pressed')}>
          Paper Button
        </PaperButton>

      </View>
    </PaperProvider>
  );
}

const CustomButton = ({ title, onPress }) => (
  <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: 'green' }]}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
    width: 200
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});


/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////