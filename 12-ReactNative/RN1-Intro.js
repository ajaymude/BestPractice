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

import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { Provider as PaperProvider, TextInput as PaperInput } from 'react-native-paper';

export default function App() {
  const [text, setText] = useState('');
  const [password, setPassword] = useState('');
  const [multilineText, setMultilineText] = useState('');

  return (
    <PaperProvider>
      <View style={styles.container}>

        {/* 1. Basic Uncontrolled TextInput */}
        <Text>Basic Uncontrolled TextInput:</Text>
        <TextInput
          placeholder="Type here"
          style={styles.input}
        />

        {/* 2. Controlled TextInput */}
        <Text>Controlled TextInput:</Text>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Controlled input"
          style={styles.input}
        />
        <Text>Typed: {text}</Text>

        {/* 3. Secure Text Entry (Password Input) */}
        <Text>Password Input:</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Enter password"
          secureTextEntry
          style={styles.input}
        />

        {/* 4. Multiline TextInput */}
        <Text>Multiline Input:</Text>
        <TextInput
          value={multilineText}
          onChangeText={setMultilineText}
          placeholder="Multiline input"
          multiline
          numberOfLines={4}
          style={[styles.input, { height: 100 }]}
        />

        {/* 5. React Native Paper TextInput */}
        <Text>Paper UI TextInput:</Text>
        <PaperInput
          label="Paper Input"
          value={text}
          onChangeText={setText}
          mode="outlined"
          style={styles.input}
        />

      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5
  }
});



/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////


import React, { useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';

export default function App() {
  const [data, setData] = useState([
    { id: '1', name: 'Apple' },
    { id: '2', name: 'Banana' },
    { id: '3', name: 'Cherry' },
    { id: '4', name: 'Date' },
    { id: '5', name: 'Elderberry' },
  ]);

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate fetching new data
    setTimeout(() => {
      setData([...data, { id: (data.length + 1).toString(), name: 'New Fruit' }]);
      setRefreshing(false);
    }, 2000);
  };

  const handleItemPress = (item) => {
    alert(`You pressed ${item.name}`);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => handleItemPress(item)}>
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fruit List</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={() => <Text style={styles.header}>Available Fruits:</Text>}
        ListFooterComponent={() => <Text style={styles.footer}>End of List</Text>}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  header: {
    fontSize: 18,
    marginBottom: 10
  },
  footer: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10
  },
  item: {
    backgroundColor: 'lightblue',
    padding: 15,
    borderRadius: 5
  },
  itemText: {
    fontSize: 16
  },
  separator: {
    height: 10
  }
});

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////


import React from 'react';
import { View, SectionList, Text, StyleSheet, Alert } from 'react-native';

export default function App() {
  const DATA = [
    {
      title: 'Fruits',
      data: ['Apple', 'Banana', 'Cherry']
    },
    {
      title: 'Vegetables',
      data: ['Carrot', 'Broccoli', 'Spinach']
    },
    {
      title: 'Grains',
      data: ['Rice', 'Wheat', 'Barley']
    }
  ];

  const handleItemPress = (item) => {
    Alert.alert(`You selected: ${item}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SectionList Example</Text>

      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <Text style={styles.item} onPress={() => handleItemPress(item)}>
            {item}
          </Text>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={() => <Text style={styles.listHeader}>Available Items:</Text>}
        ListFooterComponent={() => <Text style={styles.listFooter}>End of List</Text>}
        stickySectionHeadersEnabled
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  listHeader: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center'
  },
  listFooter: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center'
  },
  header: {
    fontSize: 20,
    backgroundColor: '#f4f4f4',
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontWeight: 'bold'
  },
  item: {
    backgroundColor: 'lightgreen',
    padding: 15,
    fontSize: 16
  },
  separator: {
    height: 5
  }
});



/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

// learn the Textinput , keybordType , secureTextEntry, multiline, numberOfLines, onChangeText, 
// 



import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, RefreshControl, Image } from 'react-native';

export default function App() {
  const [refreshing, setRefreshing] = useState(false); // State to control pull-to-refresh

  // Function to handle refresh action
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000); // Simulating network request
  };

  return (
    // Main Vertical ScrollView
    <ScrollView
      style={styles.container}
      refreshControl={
        // Pull to refresh feature
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <Text style={styles.title}>Vertical ScrollView</Text>

      {/* Example of vertical scrolling content */}
      {Array.from({ length: 10 }).map((_, index) => (
        <View key={index} style={styles.box}>
          <Text>Item {index + 1}</Text>
        </View>
      ))}

      <Text style={styles.title}>Horizontal ScrollView</Text>

      {/* Horizontal ScrollView */}
      <ScrollView horizontal style={styles.horizontalScroll}>
        {Array.from({ length: 5 }).map((_, index) => (
          <View key={index} style={[styles.box, styles.horizontalBox]}>
            <Text>H-Item {index + 1}</Text>
          </View>
        ))}
      </ScrollView>

      <Text style={styles.title}>Images with Scroll</Text>

      {/* Horizontal ScrollView with images */}
      <ScrollView horizontal>
        {['https://via.placeholder.com/100', 'https://via.placeholder.com/120', 'https://via.placeholder.com/140'].map((uri, index) => (
          <Image
            key={index}
            source={{ uri }} // Load image from URL
            style={styles.image}
          />
        ))}
      </ScrollView>

    </ScrollView>
  );
}

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10
  },
  box: {
    height: 80,
    backgroundColor: 'lightblue',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  horizontalScroll: {
    marginBottom: 20
  },
  horizontalBox: {
    width: 100,    // Width for horizontal item
    marginRight: 10
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 5
  }
});




/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////



import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';

export default function App() {
  const [loading, setLoading] = useState(false); // State to control loading indicator

  // Function to simulate loading action
  const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false); // Stop loading after 3 seconds
    }, 3000);
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>ActivityIndicator Example</Text>

      {/* Button to start loading */}
      <Button title="Start Loading" onPress={startLoading} />

      {/* Conditionally render ActivityIndicator */}
      {loading ? (
        <View style={styles.loaderContainer}>
          {/* ActivityIndicator - spinner loader */}
          <ActivityIndicator size="large" color="blue" />
          <Text>Loading, please wait...</Text>
        </View>
      ) : (
        <Text style={styles.text}>Press the button to load</Text>
      )}

      {/* Static ActivityIndicator (always visible) */}
      <Text style={styles.subtitle}>Static Indicator Example:</Text>
      <ActivityIndicator size="small" color="green" />

    </View>
  );
}

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold'
  },
  loaderContainer: {
    marginVertical: 20,
    alignItems: 'center'
  },
  text: {
    marginVertical: 20,
    fontSize: 16
  },
  subtitle: {
    marginTop: 30,
    fontSize: 18
  }
});

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////




import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';

export default function App() {
  const [pressCount, setPressCount] = useState(0); // State to track number of presses

  // Function called when button is pressed
  const handlePress = () => {
    setPressCount(prev => prev + 1);
    Alert.alert('Button Pressed!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pressable Example</Text>

      {/* Basic Pressable with dynamic styling on press */}
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? 'lightblue' : 'blue' } // Change color when pressed
        ]}
      >
        <Text style={styles.buttonText}>Press Me</Text>
      </Pressable>

      <Text>Pressed: {pressCount} times</Text>

      {/* Pressable with onLongPress */}
      <Pressable
        onLongPress={() => Alert.alert('Long Press detected!')}
        style={styles.longPressButton}
      >
        <Text style={styles.buttonText}>Long Press Me</Text>
      </Pressable>

      {/* Pressable with hitSlop to increase touch area */}
      <Pressable
        onPress={() => Alert.alert('Pressed with larger touch area!')}
        hitSlop={20} // Expands the touch area by 20px around the button
        style={styles.hitSlopButton}
      >
        <Text style={styles.buttonText}>Press with hitSlop</Text>
      </Pressable>
    </View>
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
    marginBottom: 20,
    fontWeight: 'bold'
  },
  button: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: 'blue',
    marginBottom: 10
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  longPressButton: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: 'green',
    marginVertical: 10
  },
  hitSlopButton: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: 'purple',
    marginVertical: 10
  }
});

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////



import React, { useState } from 'react';
import { View, Text, Button, StatusBar, StyleSheet } from 'react-native';

export default function App() {
  const [barStyle, setBarStyle] = useState('dark-content'); // Initial status bar style
  const [hidden, setHidden] = useState(false); // Control visibility of StatusBar

  // Toggle between light and dark status bar content
  const toggleBarStyle = () => {
    setBarStyle(prev => (prev === 'dark-content' ? 'light-content' : 'dark-content'));
  };

  // Toggle status bar visibility
  const toggleHidden = () => {
    setHidden(prev => !prev);
  };

  return (
    <View style={styles.container}>

      {/* StatusBar component */}
      <StatusBar
        barStyle={barStyle} // Controls text/icon color: 'light-content' or 'dark-content'
        backgroundColor="blue" // For Android: background color of status bar
        hidden={hidden} // Show or hide the status bar
        translucent={false} // If true, content renders under status bar
      />

      <Text style={styles.title}>StatusBar Example</Text>

      <Button title="Toggle Bar Style (Light/Dark)" onPress={toggleBarStyle} />

      <View style={styles.spacing} />

      <Button title="Toggle StatusBar Visibility" onPress={toggleHidden} />

    </View>
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
  },
  spacing: {
    marginVertical: 10
  }
});

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////


import React, { useState } from 'react';
import { View, Text, Modal, Button, StyleSheet, TouchableOpacity } from 'react-native';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false); // Control modal visibility

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modal Example</Text>

      {/* Button to open the modal */}
      <Button title="Show Modal" onPress={() => setModalVisible(true)} />

      {/* Modal Component */}
      <Modal
        visible={modalVisible} // Show or hide modal
        animationType="slide"  // 'none', 'slide', or 'fade'
        transparent={true}     // Make the modal background transparent
        onRequestClose={() => setModalVisible(false)} // Handle back button on Android
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>This is a Modal!</Text>

            {/* Close Modal Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
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
    marginBottom: 20,
    fontWeight: 'bold'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5 // Adds shadow on Android
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20
  },
  closeButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////



import React from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';

export default function App() {
  
  // Simple Alert with only message and OK button
  const showSimpleAlert = () => {
    Alert.alert('Simple Alert', 'This is a simple alert message.');
  };

  // Alert with multiple options (OK, Cancel)
  const showConfirmationAlert = () => {
    Alert.alert(
      'Confirmation', // Title
      'Are you sure you want to proceed?', // Message
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed')
        }
      ],
      { cancelable: true } // Dismiss by tapping outside on Android
    );
  };

  // Alert with 3 buttons
  const showThreeButtonAlert = () => {
    Alert.alert(
      'Three Option Alert',
      'Choose an option:',
      [
        {
          text: 'Option 1',
          onPress: () => console.log('Option 1 Pressed')
        },
        {
          text: 'Option 2',
          onPress: () => console.log('Option 2 Pressed')
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alert Examples</Text>

      <Button title="Simple Alert" onPress={showSimpleAlert} />

      <View style={styles.spacing} />

      <Button title="Confirmation Alert" onPress={showConfirmationAlert} />

      <View style={styles.spacing} />

      <Button title="Three Button Alert" onPress={showThreeButtonAlert} />
    </View>
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
    marginBottom: 20,
    fontWeight: 'bold'
  },
  spacing: {
    marginVertical: 10
  }
});

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////



// plat form component

import React from 'react';
import { View, Text, Platform, StyleSheet, Button, Alert } from 'react-native';

export default function App() {
  
  // Function to show platform-specific alert
  const handlePlatformAlert = () => {
    if (Platform.OS === 'ios') {
      Alert.alert('Platform', 'You are using iOS!');
    } else if (Platform.OS === 'android') {
      Alert.alert('Platform', 'You are using Android!');
    } else {
      Alert.alert('Platform', 'You are using an unknown platform!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Platform API Example</Text>

      {/* Display platform-specific text */}
      <Text style={styles.text}>
        {Platform.OS === 'ios' ? 'Running on iOS' : 'Running on Android'}
      </Text>

      {/* Platform-specific styling */}
      <View style={Platform.OS === 'ios' ? styles.iosBox : styles.androidBox}>
        <Text>Platform Specific Styling Box</Text>
      </View>

      <Button title="Check Platform" onPress={handlePlatformAlert} />

      {/* Show Platform version */}
      <Text style={styles.text}>Platform Version: {Platform.Version}</Text>
    </View>
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
    marginBottom: 20,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 16,
    marginVertical: 10
  },
  iosBox: {
    backgroundColor: 'lightblue',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10
  },
  androidBox: {
    backgroundColor: 'lightgreen',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10
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