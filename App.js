import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// components
import { Signup } from './components/Signup'
import { Signin } from './components/Signin'
import { Home } from './components/Home';
// firebase
import { firebaseConfig } from './Config';
import {initializeApp,} from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { ThemeColours } from './components/ThemeColours';



initializeApp( firebaseConfig)


const Stack = createNativeStackNavigator();

export default function App() {
  const[ auth, setAuth ] = useState()
  const[ user, setUser ] = useState()
  const[ signupError, setSignupError ] = useState()
  const [signinError, setSigninError ] = useState()

  const FBauth = getAuth()

  useEffect(() => {
    onAuthStateChanged( FBauth, (user) => {
      if( user ){
        setAuth(true)
        setUser(user)
      }else{
        setAuth(false)
        setUser(null)
      }
    })
  })

  const SignupHandler = ( email, password ) => {
    setSignupError("")
    const auth = getAuth()
    createUserWithEmailAndPassword( auth, email, password )
    .then( ( userCredential ) => { 
      console.log(userCredential) 
      setUser(userCredential)
      setAuth( true )
    } )
    .catch( (error) => { setSignupError(error.message) })
  }

  const SigninHandler = ( email, password ) => {
    signInWithEmailAndPassword( FBauth, email, password )
    .then( (userCredential) => {
      setUser(userCredential)
      setAuth(true)
    })
    .catch( (error) => { setSigninError(error.code) })
  }


  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen 
          name="Signup" 
          component={Signup} 
          options={{ 
            title: 'Sign up'
          }}
        /> */}
        <Stack.Screen name="Signup" 
          options={{
            title: 'Sign up',
            headerStyle: {
              backgroundColor: ThemeColours.turquoise,
            },
            
          }}>
          { (props) => <Signup {...props} handler={SignupHandler} auth={auth} error={signupError} /> }
        </Stack.Screen>
        <Stack.Screen 
          name="Signin" 
          component={Signin} 
          options={{
            title:'Log in',
            headerStyle: {
              backgroundColor: ThemeColours.blackcoral,
            },
            headerTintColor: ThemeColours.eggshell,
          }}
        />
        { (props) => <Signin {...props} auth={auth} handler={SigninHandler} error={signinError} />}
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
