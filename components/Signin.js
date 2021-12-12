import React, {useState,useEffect} from 'react'
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { ThemeColours } from './ThemeColours';
import { Feedback } from './Feedback';


export function Signin ( props ) {
  const navigation = useNavigation()

  const [validEmail, setValidEmail ] = useState( false )
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const checkResetPassword = () => {
    props.resetPassword(email)
  }

  const validateEmail = ( emailVal ) => {
    if( emailVal.indexOf('@') > 0 ) {
      setValidEmail( true )
    }
    else {
      setValidEmail( false )
    }
    setEmail( emailVal )
  }

  useEffect( () => {
    if( props.auth === true ) {
      navigation.reset({ index: 0, routes: [ {name: 'Home'} ] })
    }
  }, [props.auth] )

  return(
    <View style={styles.container}>
      <Text style={styles.font}>Log in</Text>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
      <View style={styles.inner}>
        <Text style={styles.font}>Email</Text>
        <TextInput 
            style={styles.input} 
            onChangeText={ (val) => validateEmail(val) } />
        <Text style={styles.font}>Password</Text>
        <TextInput style={styles.input} 
            secureTextEntry={true} 
            onChangeText={ (val) => setPassword(val) } />
        <TouchableOpacity style={styles.button} 
            onPress={ () => { props.handler(email, password) }}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
        <Feedback message={props.error} error={true} />
        
        <Button title="Reset Password" 
          onPress={checkResetPassword}
          disabled={ (validEmail) ? false : true } />
        <Text style={styles.font}>Don't have an account?</Text>
        <Button title="Sign up for an account" onPress={() => navigation.navigate("Signup")} />
        
      </View>
      </KeyboardAvoidingView>
      
    </View>
  )
}

const styles = StyleSheet.create( {
  input: {
    backgroundColor: ThemeColours.cultured,
    fontSize: 16,
    padding: 5,
    borderRadius: 4,
  },
  button: {
    marginVertical: 15,
    backgroundColor: ThemeColours.turquoise,
    padding: 10,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    backgroundColor: ThemeColours.blackcoral,
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
  font: {
    color: ThemeColours.eggshell,
  }
})