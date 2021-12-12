import React, {useState,useEffect} from 'react'
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, 
  KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { ThemeColours } from './ThemeColours';
import { Feedback } from './Feedback';

export function AddClient (props) {
  const [validEmail, setValidEmail ] = useState( false )
  const [validForm,setValidForm] = useState(false)

  const [email,setEmail] = useState()
  const [address,setAddress] = useState()
  const [firstName,setFirstName] = useState()
  const [lastName,setLastName] = useState()
  const [comments,setComments] = useState()

  const navigation = useNavigation()

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
    if(validEmail && firstName && address) {
      setValidForm( true )
    }
    else {
      setValidForm( false )
    }
  }, [validEmail, firstName, address])

  const submitHandler = () => {
    console.log('submitting Client')
    const data = { 
      createdAt: new Date().getTime(), 
      firstName: firstName ,
      lastName: lastName,
      email: email,
      address: address,
      comments: comments,
    }
    
      
    props.addClient('clients', data, navigation)
  }

  return (
    <View style={styles.container}>
        <ScrollView>
      {/*
      <TouchableOpacity 
          style={(Platform.OS === "ios")?styles.visible:styles.visible}
          onPress={ () => navigation.navigate("Home") }
        >
          <Text style={styles.buttonClose}>X</Text>
        </TouchableOpacity>
      */}
      
      <Text style={styles.title}>Add a new Client</Text>
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
        <View style={styles.inner}>
          <Text>First Name</Text>
          <TextInput 
            style={styles.input} 
            onChangeText={ (val) => setFirstName(val)}/>
          <Text>Last Name</Text>
          <TextInput 
            style={styles.input} 
            onChangeText={ (val) => setLastName(val)}/>
          <Text>Email</Text>
          <TextInput 
            style={styles.input} 
            onChangeText={ (val) => validateEmail(val) }/>
          <Text>Address</Text>
          <TextInput 
            style={styles.input} 
            onChangeText={ (val) => setAddress(val) }/>
          <Text>Comments</Text>
          <TextInput 
            style={styles.input} 
            onChangeText={ (val) => setComments(val) }
            
          />
          <TouchableOpacity 
            style={ (validForm) ? styles.button : styles.buttonDisabled} 
            disabled={ (validForm) ? false : true }
            onPress={ () => submitHandler() }
          >
            <Text style={styles.buttonText}>Create</Text>
          </TouchableOpacity>
          <Feedback message={props.error} error={true} />
          
          
        </View>
        </KeyboardAvoidingView>
      </ScrollView>
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
    paddingBottom:50,
    paddingTop:30,
  },
  invisible:{
    display:'none'
  },
  visible:{
    display:'flex'
  },
})