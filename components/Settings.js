import React, {useEffect,useState} from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Signout } from './Signout';

export function Settings (props) {
    
  
  return (
    <View style={styles.screen}>
      <Text>Hi {props.user.email}</Text>
      <Image
        source={{ uri: props.user.photoURL }}
        style={styles.image}
      />
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
  signOutButton:{
    marginVertical: 15,
    backgroundColor: "#FF0000",
    padding: 10,
    borderRadius: 10,
  },
  signoutText: {
    color: "white",
  },
})