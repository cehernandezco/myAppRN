import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// components
import { Signup } from './components/Signup'
import { Signin } from './components/Signin'
import { Home } from './components/Home'
import { Signout } from './components/Signout'
import { Splash } from './components/Splash'

import { ClientDetails } from './components/ClientDetails'
import { AddClient } from './components/AddClient'
import { ClientList } from './components/ClientList'

import { Greetings } from './components/Greetings'

// firebase
import { firebaseConfig } from './Config'
import {initializeApp,} from 'firebase/app'
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth"
import { ThemeColours } from './components/ThemeColours'

import { 
  initializeFirestore, 
  getFirestore, 
  setDoc, 
  doc, 
  addDoc, 
  getDoc,
  collection,
  query, 
  where, 
  onSnapshot 
} from 'firebase/firestore'


const FBapp = initializeApp( firebaseConfig)
const FSdb = initializeFirestore(FBapp, {useFetchStreams: false})
const FBauth = getAuth()


const Stack = createNativeStackNavigator();

export default function App() {
  const[ auth, setAuth ] = useState(false)
  const[ user, setUser ] = useState(null)
  const[ signupError, setSignupError ] = useState()
  const [signinError, setSigninError ] = useState()
  const [ dataClient, setDataClient ] = useState()
  const [ dataJob, setDataJob ] = useState()

  

  useEffect(() => {
    onAuthStateChanged( FBauth, (user) => {
      if( user ){
        setAuth(true)
        setUser(user)
        if( !dataJob ) { getJobData() }
        if( !dataClient ) { getClientData() }
      }else{
        setAuth(false)
        setUser(null)
      }
    })
  })

  const SignupHandler = ( email, password, firstName, lastName ) => {
    setSignupError(null)
    createUserWithEmailAndPassword( FBauth, email, password )
    .then( () => { 
      setDoc(doc(FSdb, 'users', FBauth.currentUser.uid), {
        email: email,
        firstname: firstName,
        lastname: lastName,
        admin: false,
        
      }) 
      setUser(FBauth.currentUser.user)
      setAuth( true )
    } )
    .catch( (error) => { 
      setSignupError(error.code)
      setTimeout(() => {
        setSignupError('')
      }, 3000)
    })
  }

  const SigninHandler = ( email, password ) => {
    signInWithEmailAndPassword( FBauth, email, password )
    .then( (userCredential) => {
      setUser(userCredential)
      setAuth(true)
    })
    .catch( (error) => { 
      const message = (error.code.includes('/') ) ? error.code.split('/')[1].replace(/-/g, ' ') : error.code
      setSigninError(message) 
    })
  }

  const SignoutHandler = () => {
    signOut( FBauth )
    .then( () => {
      setUser(null)
      setAuth(false)
    })
    .catch( (error) => { console.log(error.code) })
  }
  const addJobData = async ( FScollection , data ) => {
    //adding data to a collection with automatic id
    //const ref = await addDoc( collection(FSdb, FScollection ), data )
    const ref = await setDoc( doc( FSdb, `users/${user.uid}/jobs/${ new Date().getTime() }`), data )
    //console.log( ref.id )
  }
  const getJobData = () => {
    // console.log('...getting data', user)
    const FSquery = query( collection( FSdb, `users/${user.uid}/jobs`) )
    const unsubscribe = onSnapshot( FSquery, ( querySnapshot ) => {
      let FSdata = []
      querySnapshot.forEach( (doc) => {
        let item = {}
        item = doc.data()
        item.id = doc.id
        FSdata.push( item )
      })
      setDataJob( FSdata )
    })
  }
  const getJobDetail = async ( id ) => {
    const docRef = doc( FSdb, `users/${user.uid}/jobs`, id )
    const docData = await getDoc( docRef )
    return new Promise( ( resolve, reject ) => {
      if( docData.exists() ) {
        let document = docData.data()
        document.id = id
        resolve( document )
      }
      else {
        reject('no such document')
      }
    })
  }
  const addClientData = async ( FScollection , data ) => {
    //adding data to a collection with automatic id
    //const ref = await addDoc( collection(FSdb, FScollection ), data )
    const ref = await setDoc( doc( FSdb, `users/${user.uid}/clients/${ new Date().getTime() }`), data )
    return new Promise( ( resolve, reject ) => {
      if( ref.exists() ) {
        resolve(ref)
      }
      else {
        reject('no such document')
      }
    })
    //console.log( ref.id )
  }
  const getClientData = () => {
    // console.log('...getting data', user)
    const FSquery = query( collection( FSdb, `users/${user.uid}/clients`) )
    const unsubscribe = onSnapshot( FSquery, ( querySnapshot ) => {
      let FSdata = []
      querySnapshot.forEach( (doc) => {
        let item = {}
        item = doc.data()
        item.id = doc.id
        FSdata.push( item )
      })
      setDataClient( FSdata )
    })
  }
  const getClientDetail = async ( id ) => {
    const docRef = doc( FSdb, `users/${user.uid}/clients`, id )
    const docData = await getDoc( docRef )
    return new Promise( ( resolve, reject ) => {
      if( docData.exists() ) {
        let document = docData.data()
        document.id = id
        resolve( document )
      }
      else {
        reject('no such document')
      }
    })
  }



  return (
    
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false}}>
        
        <Stack.Screen name="Splash" >
          { (props) => <Splash {...props} loadingText="My Tracker Hours" /> }
        </Stack.Screen>
        <Stack.Screen name="Greetings">
          { (props) => <Greetings {...props} 
            auth={auth} 
          /> }
        </Stack.Screen>
        <Stack.Screen name="Signup" 
          options={{
            title: 'Sign up',
            headerStyle: {
              backgroundColor: ThemeColours.turquoise,
            }
          }}>
          { (props) => <Signup {...props} 
            handler={SignupHandler} 
            auth={auth} 
            error={signupError} 
          /> }
        </Stack.Screen>
        <Stack.Screen 
          name="Signin"
          options={{
            title:'Log in',
            headerStyle: {
              backgroundColor: ThemeColours.blackcoral,
            },
            headerTintColor: ThemeColours.eggshell,
            
          }}
        >
        { (props) => 
          <Signin {...props} 
            auth={auth} 
            handler={SigninHandler} 
            error={signinError} />}
        </Stack.Screen>
        <Stack.Screen 
          name="Home" 
          options={{
            headerTitle: "Home",
            headerRight: (props) => <Signout 
              {...props} 
              SignoutHandler={SignoutHandler} />
          }} >
          { (props) => <Home {...props} 
            auth={auth} 
            user = {user}
            SignoutHandler={SignoutHandler} 
            addClient={addClientData} dataClient={ dataClient } getClientDetail={getClientDetail}
            addJob={addJobData} dataJob={ dataJob }  getJobDetail={getJobDetail}
             />
          }
        </Stack.Screen>
        <Stack.Screen name="AddClient"
          screenOptions={{headerShown:true}}
          options={{
            
            headerTitle: "Add Client"}}
        >
          { (props) => <AddClient {...props} addClient={addClientData} /> }
        </Stack.Screen>
        <Stack.Screen name="ClientDetails"
          options={{
            headerTitle: "Item detail"}}
        >
          { (props) => <ClientDetails {...props} getClientDetail={getClientDetail} /> }
        </Stack.Screen>
        <Stack.Screen name="ClientList"
          options={{
            headerTitle: "Clients"}}
        >
          { (props) => <ClientList {...props} dataClient={dataClient} /> }
        </Stack.Screen>
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
