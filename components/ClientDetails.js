import React, {useEffect,useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import { ThemeColours } from './ThemeColours';
import { render } from 'react-dom';

export function ClientDetails ( props ) {
  const [ data, setData ] = useState()

  const route = useRoute()
  const {id} = route.params

  const navigation = useNavigation()

  useEffect( () => {
    if( !data ) {
      props.getClientDetail( id )
      .then( (document) => setData(document) )
      .catch( (error) => console.log(error) )
    }
  })

  if( !data ) {
    return <Text>Loading...</Text>
  }
  else{
      
    return(
    <View style={styles.container}>
        <TouchableOpacity 
            onPress={ () => navigation.navigate("Home") }
        >
            <Text style={styles.buttonClose}>X</Text>
        </TouchableOpacity>
        <View style={styles.inner}>
            
            <Text style={styles.title}>Client details</Text>
            <Text>Name:</Text>
            <Text style={styles.input}>{data.firstName} {data.lastName}</Text>
            <Text>Address:</Text>
            <Text style={styles.input}>{data.address}</Text>
            <Text>Email:</Text>
            <Text style={styles.input}>{data.email}</Text>
            <Text>Created At:</Text>
            <Text style={styles.input}>{data.createdAt}</Text>
        </View>
    </View>
    )   
  }

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
      padding: 20,
    },
  })

