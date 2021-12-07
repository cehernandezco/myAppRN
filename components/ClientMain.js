import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'


import { ClientList } from './ClientList';
import { AddClient } from './AddClient'
import { ClientDetails } from './ClientDetails'

const ClientStack = createNativeStackNavigator()
export function ClientMain (props) {
    
    const navigation = useNavigation()
    const [ getClientHandler, setClientHandler ] = useState()

    const AddClientHandler =  props.handler 
    const ClientData =  props.data 
    //const getClientDetail = () => { props.getClientDetail }
    useEffect( () => {
        setClientHandler( props.getClientDetail )
    })

    const onAddClient = () => {
        console.log('Navigate to addClient')
        navigation.navigate('AddClient', {
          handler: AddClientHandler})
      }

    return (
        <NavigationContainer independent={false}>
            <ClientStack.Navigator screenOptions={{ headerShown: true}}>
        
                <ClientStack.Screen 
                    name="ClientList"
                    options={{
                        title: 'Clients',
                        headerRight: (props) => (
                            <TouchableOpacity 
                                onPress={ () => 
                                    navigation.navigate('ClientMain',{
                                        screen: 'AddClient'
                                        
                                    }) 
                                }>
                                <Text style={styles.buttonAdd}>Add</Text>
                            </TouchableOpacity>
                        )
                      }}
                    
                    >
                    { (props) => <ClientList {...props} data={ClientData} /> }
                    
                </ClientStack.Screen>
                <ClientStack.Screen 
                    name="AddClient"
                    options={{
                        title: 'Add Client'
                    }}
                    children={() =>
                        <AddClient {...props}
                            handler={props.handler}  />
                    }
                >
                </ClientStack.Screen>
                
            </ClientStack.Navigator>
        </NavigationContainer>
    )
}



const styles = StyleSheet.create({
    buttonAdd: {
        color: "black",
        padding: 10,
      },
})
