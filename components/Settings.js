import React, {useEffect,useState} from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Signout } from './Signout';
import { ThemeColours } from './ThemeColours';

export function Settings (props) {
  console.log(props.user)  
  let verifiedEmail
  if(props.user.emailVerified){
    verifiedEmail = <View><Text>Congrats! You have Verified your email</Text></View>
  }else{
    verifiedEmail = <View>
        <Text>You haven't verified your email</Text>
        <TouchableOpacity style={styles.button} onPress={() => {props.emailVerificationHandler()}}>
          <Text style={styles.buttonText}>Verify email</Text>
        </TouchableOpacity></View>
  }
  

  return (
    
    <View style={styles.screen}>
      <Text style={styles.hiUser}>Hi {props.user.email}</Text>
      <Image
        source={{ uri: props.user.photoURL }}
        style={styles.image}
      />
      <Text>{verifiedEmail}</Text>
      <TouchableOpacity
        style={styles.signOutButton}
        onPress={ () => props.SignoutHandler() }>
      <Text style={styles.signoutText}>Sign out</Text>
    </TouchableOpacity>
      
    </View>
  )
}

const styles = StyleSheet.create({
  screen : {
    display: "flex",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hiUser: {
    color: ThemeColours.prussianblue,
    fontSize:20,
    textAlign: 'center',
    paddingBottom:50,
    paddingTop:30,
  },
  signOutButton:{
    marginVertical: 15,
    backgroundColor: "#FF0000",
    padding: 10,
    borderRadius: 10,
  },
  signoutText: {
    color: "white",
  },
  button: {
    marginVertical: 15,
    backgroundColor: ThemeColours.prussianblue,
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: ThemeColours.cultured,
    textAlign: 'center',
  },
})