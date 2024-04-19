import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";

const Data = () => {
  return (
    <ImageBackground
        source={require('../../assets/images/Anshar.jpeg')} 
        style={styles.backgroundImage} 
      >
    <View style={styles.container}>
    <Text style={styles.text}>Anshar Shamash Barrón</Text>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 75,
    fontWeight: 'bold',
    color: 'orange',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // or 'contain' or any other resizeMode option
    position: 'absolute',
  },
});


export default Data;
