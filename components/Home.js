import React, {useEffect,useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { ThemeColours } from './ThemeColours';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

// screens to show in Home
import { Settings } from './Settings'
//ClientMain not needed anymore
//import { ClientMain } from './ClientMain';
import { JobList } from './JobList'
import { ClientList } from './ClientList';

const Tab = createBottomTabNavigator()

export function Home ( props ) {
    const navigation = useNavigation()
    const [ listDataClient, setlistDataClient ] = useState()
    const [ listDataJob, setlistDataJob ] = useState()
    const config = {
      animation: 'timing',
      config: {
        stiffness: 1000,
        damping: 500,
        mass: 3,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
      },
    }
    
    useEffect( () => {
     if(!props.auth) {
      navigation.reset({ index: 0, routes: [ {name: 'Signin'} ] })
     }
     //console.log( props.user )
    }, [props.auth])
  
    useEffect( () => {
      setlistDataClient( props.dataClient )
      
    }, [props.dataClient])

    useEffect( () => {
      setlistDataJob( props.dataJob )
    }, [props.dataJob])
    
    return(
        
        <Tab.Navigator 
          screenOptions={{
            headerShown:false
          }}>
          <Tab.Screen
            name="JobList" 
            options={{
              transitionSpec: {
                open: config,
                close: config,
              },
              title:"Jobs",
              tabBarLabel: "Jobs",
              tabBarIcon: ({color,size}) => (
                <Ionicons name="document" color={color} size={size} />
              ),
            
            }}
            children={() => 
              <JobList {...props}
                handler={props.AddJob} 
                data={listDataJob}
                getJobDetail = {props.getJobDetail}
              />
            }
          >
          
        </Tab.Screen>

        {/*main screen for Clients */}
        {/*}
        <Tab.Screen
            name="ClientMain" 
            options={{
              tabBarLabel: "Client",
              tabBarIcon: ({color,size}) => (
                <Ionicons name="body-outline" color={color} size={size} />
              )
            }}
            children={() => 
              <ClientMain {...props}
                handler={props.AddClient} 
                data={listDataClient}
                getClientDetail = {props.getClientDetail}
              />
            }
          >
          
          </Tab.Screen>
          */}
        <Tab.Screen
            name="ClientList" 
            options={{
              headerTitle: "Clients",
              tabBarLabel: "Clients",
              title: "Clients",
                            
              tabBarIcon: ({color,size}) => (
                <Ionicons name="body" color={color} size={size} />
              ),
              
            }}
            children={() => 
              <ClientList {...props}
                handler={props.AddClient} 
                data={listDataClient}
                getClientDetail = {props.getClientDetail}
              />
            }
          >
          
        </Tab.Screen>
        
        {/*Settings screen*/}
        <Tab.Screen 
          name="Settings"           
          options={{
            tabBarLabel: "Settings",
            title:"Settings",
            tabBarIcon: ({color,size}) => (
              <Ionicons name="settings" color={color} size={size} />
              
            )
          }}
          children={() => 
            <Settings {...props} 
              SignoutHandler={props.SignoutHandler}
              user = {props.user}
            />}
        >
         
        </Tab.Screen>
        
    </Tab.Navigator>
          
    )
  }
  
  const styles = StyleSheet.create({
    screen : {
        display: "flex",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        top: 40,
    },
    button: {
      backgroundColor: ThemeColours.turquoise,
      padding: 10,
    },
    item: {
      padding: 10,
      borderBottomColor: 'grey',
      borderBottomWidth: 1,
    },
    buttonAdd: {
      color: "black",
      padding: 10,
    },
  })