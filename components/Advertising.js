import React, {useState,useEffect} from 'react'
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, 
  KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { ThemeColours } from './ThemeColours';
import { Feedback } from './Feedback';

export function Advertising (props) {
  
  const navigation = useNavigation()


  return (
    <View style={styles.container}>
      
      <TouchableOpacity 
          onPress={ () => navigation.navigate("Home") }
        >
          <Text style={styles.buttonClose}>X</Text>
        </TouchableOpacity>
      
      <Text style={styles.title}>This is an ad</Text>
      
      
      
    </View>
  )
}

const styles = StyleSheet.create( {
  input: {
    backgroundColor: ThemeColours.cultured,
    fontSize: 16,
    padding: 5,
    marginBottom: 15,
    borderRadius: 4,
  },
  button: {
    marginVertical: 15,
    backgroundColor: ThemeColours.prussianblue,
    padding: 10,
    borderRadius: 10,
  },
  buttonDisabled: {
    marginVertical: 15,
    backgroundColor: ThemeColours.shadowblue,
    padding: 10,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: ThemeColours.cultured,
    textAlign: 'center',
  },
  inner: {
    width: 300,
    marginBottom: 90,
  },
  kb: {
    flex: 1,
  },
  buttonClose: {
    marginVertical: -50,
    right: -150,
    backgroundColor: ThemeColours.prussianblue,
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    color:"white",
    
  },
  title: {
    color: ThemeColours.prussianblue,
    fontSize:30,
    textAlign: 'center',
  },
  invisible:{
    display:'none'
  },
  visible:{
    display:'flex'
  },
})