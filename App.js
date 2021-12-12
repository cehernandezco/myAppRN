import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert } from 'react-native'
import { NavigationContainer,getFocusedRouteNameFromRoute } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native';

// components
import { Signup } from './components/Signup'
import { Signin } from './components/Signin'
import { Home } from './components/Home'
import { Signout } from './components/Signout'
import { Splash } from './components/Splash'

import { ClientDetails } from './components/ClientDetails'
import { AddClient } from './components/AddClient'
import { ClientList } from './components/ClientList'

import { JobDetails } from './components/JobDetails'
import { AddJob } from './components/AddJob'
import { JobList } from './components/JobList'

import { AddHours } from './components/AddHours'
import { HourList } from './components/HourList'

import { Advertising } from './components/Advertising'

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
  updateDoc,
  deleteDoc,
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
  const [ dataJobHours, setDataJobHours ] = useState()
  
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
  
  function getHeaderTitle(route) {
    // If the focused route is not found, we need to assume it's the initial screen
    // This can happen during if there hasn't been any navigation inside the screen
    // In our case, it's "Feed" as that's the first screen inside the navigator
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'JobList';
  
    switch (routeName) {
      case 'JobList':
        return 'Jobs';
      case 'ClientList':
        return 'Clients';
      case 'Settings':
        return 'Settings';
    }
  }
  function getHeaderRightAction(route, navigation) {
    // If the focused route is not found, we need to assume it's the initial screen
    // This can happen during if there hasn't been any navigation inside the screen
    // In our case, it's "Feed" as that's the first screen inside the navigator
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'JobList';
    console.log(route)
    console.log(routeName)
    switch (routeName) {
      case 'JobList': 
        return <TouchableOpacity onPress={ () => navigation.navigate('AddJob') }>
                <Text style={styles.buttonAdd}>Add</Text>
              </TouchableOpacity>
      case 'ClientList':
        return <TouchableOpacity onPress={ () => navigation.navigate('AddClient') }>
                  <Text style={styles.buttonAdd}>Add</Text>
                </TouchableOpacity>
      case 'AddClient':
        return <TouchableOpacity onPress={ () => navigation.navigate('AddClient') }>
                  <Text style={styles.buttonAdd}>Add</Text>
                </TouchableOpacity>
      case 'ClientDetails':
        return <TouchableOpacity onPress={ () => navigation.navigate('ClientDetails') }>
                  <Text style={styles.buttonAdd}>Edit</Text>
                </TouchableOpacity>
      case 'HoursList':
        return <TouchableOpacity onPress={ () => navigation.navigate('AddHours') }>
                  <Text style={styles.buttonAdd}>Add</Text>
                </TouchableOpacity>
                
      
    }
  }
  
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
  //#region Firebase Job functions

  //#region Firebase AddJob
  const addJobData = async ( FScollection , data, navigation ) => {
    let title = "Add Job"
    let textBody = ""
    let onActionButton = ""

    //adding data to a collection with automatic id
    //const ref = await addDoc( collection(FSdb, FScollection ), data )
    //const ref = await setDoc( doc( FSdb, `users/${user.uid}/clients/${ new Date().getTime() }`), data )    
    const ref = await setDoc( doc( collection(FSdb, `users/${user.uid}/jobs/`)), data)
    .then(function(){
      
      textBody = 'Your new job has been added'
      onActionButton = navigation.goBack
    })
    .catch((error) => {
      textBody = 'Sorry, your new job hasn\'t been added\n' + error.message
    })
    
    Alert.alert(
      //This is title
     title,
       //This is body text
       textBody,
     [
       {text: 'Done', onPress: () => onActionButton()},
       
     ],
     { cancelable: false }
     //on clicking out side, Alert will not dismiss
   )
  }
  //#endregion
  //#region Firebase getJobList
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
  //#endregion
  //#region Firebase getJobDetail
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
  //#endregion
  //#region Firebase deleteJob
  const deleteJob = async ( id, navigation ) => {
    //const docRef = doc( FSdb, `users/${user.uid}/clients`, id )
    await deleteDoc(doc( FSdb, `users/${user.uid}/jobs`, id ))
    .then(function(){
      navigation.goBack()
    })
    .catch((error) => {
      Alert.alert(
        //This is title
       'Delete job',
         //This is body text
         error.message,
       [
         {text: 'Done', onPress: () => onActionButton()},
         
       ],
       { cancelable: false }
       //on clicking out side, Alert will not dismiss
      )
    })
  }
  //#endregion
  //#region Firebase editJob
  const editJob = async ( id, data, navigation ) => {
    
    const docRef = doc( FSdb, `users/${user.uid}/jobs`, id )
    await updateDoc(docRef,data)
    .then(function(){
      navigation.goBack()
    })
    .catch((error) => {
      Alert.alert(
        //This is title
       'Edit job',
         //This is body text
         error.message,
       [
         {text: 'Done', onPress: () => onActionButton()},
         
       ],
       { cancelable: false }
       //on clicking out side, Alert will not dismiss
      )
    })
  }
  //#endregion
 
  //#endregion
  
  //#region Firebase Hours functions
  //#region Firebase getJobDetailHours
  const getJobDetailHours = async ( jobId ) => {
    console.log("getJobDetailHours:" + jobId)
    const FSquery = query( collection( FSdb, `users/${user.uid}/jobs/${jobId}/hours`) )
    const unsubscribe = onSnapshot( FSquery, ( querySnapshot ) => {
      let FSdata = []
      querySnapshot.forEach( (doc) => {
        let item = {}
        item = doc.data()
        item.id = doc.id
        FSdata.push( item )
      })
      setDataJobHours( FSdata )
    })
  }
    
  //#endregion
  //#region Firebase AddJobHours
  const addHoursData = async ( FScollection , data, jobId, navigation ) => {
    let title = "Add Job"
    let textBody = ""
    let onActionButton = ""

    //adding data to a collection with automatic id
    //const ref = await addDoc( collection(FSdb, FScollection ), data )
    //const ref = await setDoc( doc( FSdb, `users/${user.uid}/clients/${ new Date().getTime() }`), data )    
    const ref = await setDoc( doc( collection(FSdb, `users/${user.uid}/jobs/${jobId}/hours/`)), data)
    .then(function(){
      
      textBody = 'You have added extra information'
      onActionButton = navigation.goBack
    })
    .catch((error) => {
      textBody = 'Sorry, hours haven\'t been added\n' + error.message
    })
    
    Alert.alert(
      //This is title
     title,
       //This is body text
       textBody,
     [
       {text: 'Done', onPress: () => onActionButton()},
       
     ],
     { cancelable: false }
     //on clicking out side, Alert will not dismiss
   )
  }
  //#endregion
  //#endregion

  //#region Firebase Client functions

  //#region Firebase addClient
  const addClientData = async ( FScollection , data , navigation) => {
    let title = "Add Client"
    let textBody = ""
    let onActionButton = ""

    //adding data to a collection with automatic id
    //const ref = await addDoc( collection(FSdb, FScollection ), data )
    //const ref = await setDoc( doc( FSdb, `users/${user.uid}/clients/${ new Date().getTime() }`), data )    
    const ref = await setDoc( doc( collection(FSdb, `users/${user.uid}/clients/`)), data)
    .then(function(){
      
      textBody = 'Your new client has been added'
      onActionButton = navigation.goBack
    })
    .catch((error) => {
      textBody = 'Sorry, your new client hasn\'t been added\n' + error.message
    })
    
    Alert.alert(
      //This is title
     title,
       //This is body text
       textBody,
     [
       {text: 'Done', onPress: () => onActionButton()},
       
     ],
     { cancelable: false }
     //on clicking out side, Alert will not dismiss
   )
    
  }
  //#endregion
  //#region Firebase getClientList
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
  //#endregion
  //#region Firebase getClientDetail
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
  //#endregion
  //#region Firebase deleteClient
  const deleteClient = async ( id, navigation ) => {
    //const docRef = doc( FSdb, `users/${user.uid}/clients`, id )
    await deleteDoc(doc( FSdb, `users/${user.uid}/clients`, id ))
    .then(function(){
      navigation.goBack()
    })
    .catch((error) => {
      Alert.alert(
        //This is title
       'Delete client',
         //This is body text
         error.message,
       [
         {text: 'Done', onPress: () => onActionButton()},
         
       ],
       { cancelable: false }
       //on clicking out side, Alert will not dismiss
      )
    })
  }
  //#endregion
  //#region Firebase editClient
  const editClient = async ( id, data, navigation ) => {
    //const docRef = doc( FSdb, `users/${user.uid}/clients`, id )
    //console.log(data)
    const docRef = doc( FSdb, `users/${user.uid}/clients`, id )
    await updateDoc(docRef,data)
    .then(function(){
      navigation.goBack()
    })
    .catch((error) => {
      Alert.alert(
        //This is title
       'Edit client',
         //This is body text
         error.message,
       [
         {text: 'Done', onPress: () => onActionButton()},
         
       ],
       { cancelable: false }
       //on clicking out side, Alert will not dismiss
      )
    })
  }
  //#endregion
  
  //#endregion

  return (
    
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group screenOptions={{headerShown:false}}>
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
        </Stack.Group>
        <Stack.Group screenOptions={{headerShown:true}}
          >
          <Stack.Screen 
            name="Home"
            options={({ route, navigation }) => ({
              headerTitle: getHeaderTitle(route),
              
              headerRight: ({color,size}) => (
                getHeaderRightAction(route, navigation)
                /*
                <TouchableOpacity onPress={ () => onAddJob }>
                  <Text style={styles.buttonAdd}>Add</Text>
                </TouchableOpacity>*/
              ),
            })}
          >
            { (props) => <Home {...props} 
              auth={auth} 
              user = {user}
              SignoutHandler={SignoutHandler} 
              addClient={addClientData} dataClient={ dataClient } getClientDetail={getClientDetail}
              addJob={addJobData} dataJob={ dataJob }  getJobDetail={getJobDetail}
              />
            }
          </Stack.Screen>
          <Stack.Screen 
            name="AddClient"
            options={{
              title: "Add Client",
              headerTitle: "Add Client",
              
            }}
          >
            { (props) => <AddClient {...props} addClient={addClientData} /> }
          </Stack.Screen>
          <Stack.Screen 
            name="ClientDetails"
            options={{
              headerTitle: "Client detail",
              title: "Client Details",
              
            }}
          >
            { (props) => 
              <ClientDetails {...props} 
                getClientDetail={getClientDetail} 
                deleteClient={deleteClient}
                editClient={editClient} 
              /> 
            }
          </Stack.Screen>
          <Stack.Screen name="ClientList"
            options={{
              headerTitle: "Clients",
              title: "Clients"
            }}
          >
            { (props) => <ClientList {...props} dataClient={dataClient} /> }
          </Stack.Screen>
          
          <Stack.Screen 
            name="AddJob"
            options={{
              title: "Add Job",
              headerTitle: "Add Job",
              
            }}
          >
            { (props) => <AddJob {...props} addJob={addJobData} dataClient={ dataClient } /> }
          </Stack.Screen>
          <Stack.Screen 
            name="JobDetails"
            options={{
              headerTitle: "Job detail",
              title: "Job Details",
              
            }}
          >
            { (props) => 
              <JobDetails {...props} 
                getJobDetail={getJobDetail} 
                deleteJob={deleteJob}
                editJob={editJob} 
              /> 
            }
          </Stack.Screen>
          <Stack.Screen name="HourList"
            options={{
              headerTitle: "Info",
              title: "Info",            
            }}
          >
            { (props) => <HourList {...props} getJobDetailHours={getJobDetailHours} dataJobHours={ dataJobHours }/> }
          </Stack.Screen> 
          <Stack.Screen 
            name="AddHours"
            options={{
              headerTitle: "Add Hours",
              title: "Add Hours",
              
            }}
          >
            { (props) => 
              <AddHours {...props}
                addHours={addHoursData}
              /> 
            }
          </Stack.Screen>
          <Stack.Screen name="JobList"
            options={{
              headerTitle: "Jobs",
              title: "Jobs"
            }}
          >
            { (props) => <JobList {...props} dataJob={dataJob} /> }
          </Stack.Screen>

          <Stack.Screen
            name="Modal"
            component={Advertising}
            options={{ presentation: 'transparentModal' }}
          />
        </Stack.Group>
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
  buttonAdd: {
    color: "black",
    padding: 10,
  },
});
