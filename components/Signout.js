import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from "react-native";
export function Signout( props ) {
  return(
    <TouchableOpacity
      style={styles.signOutButton}
      onPress={ () => props.SignoutHandler() }>
      <Text style={styles.signoutText}>{props.SignoutHandler}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
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