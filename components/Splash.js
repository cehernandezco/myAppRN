import React, { useEffect } from 'react'
import { Text, View, StyleSheet, Button, Image } from 'react-native'
import Constants from 'expo-constants'
import { useNavigation } from '@react-navigation/native'


export function Splash (props) {
  const navigation = useNavigation()

  useEffect( () => {
    const timer = setTimeout( () => navigation.navigate('Greetings'), 3000 )
  })

  return (
    <View style={styles.container}>
      <Image
        source={{uri: 'https://image.pngaaa.com/106/3816106-middle.png'}}
        
      />
      <Text>{ props.loadingText }</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    minHeight: 150,
  },
})