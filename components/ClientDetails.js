import React, {useEffect,useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import { ThemeColours } from './ThemeColours';
import { Ionicons } from '@expo/vector-icons'

import Moment from 'moment'

export function ClientDetails ( props ) {
  const [ data, setData ] = useState()
  const [ edit, setEdit ] = useState(false)
  const [validEmail, setValidEmail ] = useState( false )
  const [validForm,setValidForm] = useState(false)

  const [email,setEmail] = useState()
  const [address,setAddress] = useState()
  const [firstName,setFirstName] = useState()
  const [lastName,setLastName] = useState()
  const [comments,setComments] = useState()

  const route = useRoute()
  const {id} = route.params

  const navigation = useNavigation()
  
  const validateEmail = ( emailVal ) => {
    if( emailVal.indexOf('@') > 0 ) {
      setValidEmail( true )
    }
    else {
      setValidEmail( false )
    }
    setEmail( emailVal )
  }

  useEffect( () => {
    if(validEmail && firstName && address) {
      setValidForm( true )
    }
    else {
      setValidForm( false )
    }
  }, [validEmail, firstName, address])

  useEffect( () => {
    if( !data ) {
      props.getClientDetail( id )
      .then( (document) => setData(document) )
      .catch( (error) => console.log(error) )
    }else{
        setFirstName(data.firstName)
        setLastName(data.lastName)
        setAddress(data.address)
        setEmail(data.email)
        setComments(data.comments)
    }
  },[data])
  
  const deleteAlertFunction = (item) => {
      
    //function to make two option alert
    Alert.alert(
       //This is title
      'Delete client',
        //This is body text
      'Are you sure you want to delete client: '+item.firstName+'?',
      [
        {text: 'Yes', onPress: () => props.deleteClient(id, navigation)},
        {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
      ],
      { cancelable: false }
      //on clicking out side, Alert will not dismiss
    )
  }

  const editAlertFunction = (item) => {
    const data = { 
        firstName: firstName ,
        lastName: lastName,
        email: email,
        address: address,
        comments: comments,
      }
    //function to make two option alert
    Alert.alert(
       //This is title
      'Edit client',
        //This is body text
      'Are you sure you want to edit client: '+item.firstName+'?',
      [
        {text: 'Yes', onPress: () => props.editClient(id, data, navigation)},
        {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
      ],
      { cancelable: false }
      //on clicking out side, Alert will not dismiss
    )
  }

  if( !data ) {
    return <Text>Loading...</Text>
  }
  else{
            
        if(edit){
            return(
                <>
                <View style={styles.container}>
                    <View style={styles.inner}>
                        <Text style={styles.title}>Client details</Text>
                        <Text>First Name</Text>
                        <TextInput 
                            style={styles.input} 
                            value={firstName}
                            onChangeText={ (val) => setFirstName(val)}/>
                        <Text>Last Name</Text>
                        <TextInput 
                            style={styles.input}
                            value={lastName}
                            onChangeText={ (val) => setLastName(val)}/>
                        <Text>Email</Text>
                        <TextInput 
                            style={styles.input} 
                            value={email}
                            onChangeText={ (val) => validateEmail(val) }/>
                        <Text>Address</Text>
                        <TextInput 
                            style={styles.input} 
                            value={address}
                            onChangeText={ (val) => setAddress(val) }/>
                        <Text>Comments</Text>
                        <TextInput 
                            style={styles.input} 
                            value={comments}
                            onChangeText={ (val) => setComments(val) }
                        
                        />
                        <Text>Created At:</Text>
                        <Text style={styles.input}>{Moment(data.createdAt).format("DD MMM YYYY, H:mma")}</Text>
                        <TouchableOpacity 
                            onPress={ () => editAlertFunction(data) }
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Save</Text>

                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={ () => deleteAlertFunction(data) }
                            style={styles.buttonDelete}
                        >
                            <Text style={styles.buttonText}>Delete</Text>

                        </TouchableOpacity>
                    </View>
                </View>
                </>
            )
        }else{
            let buttonEdit = ""
            if(Platform.OS === "ios"){
                buttonEdit = <Ionicons name="create" style={styles.icon} />
            }else{
                buttonEdit = <Text style={styles.editButtonText}>Edit</Text>
            } 
            return(
                <>
                <View style={styles.container}>
                    <View style={styles.inner}>
                        <TouchableOpacity 
                            style={Platform.OS === "ios"?styles.icon:styles.editButton}
                            onPress={ () => setEdit(true) }
                        >
                            {buttonEdit}
                            
                        </TouchableOpacity>
                        <Text style={styles.title}>Client details</Text>
                        <Text>First Name:</Text>
                        <Text style={styles.input}>{data.firstName}</Text>
                        <Text>Last Name:</Text>
                        <Text style={styles.input}>{data.lastName}</Text>
                        <Text>Email:</Text>
                        <Text style={styles.input}>{data.email}</Text>
                        <Text>Address:</Text>
                        <Text style={styles.input}>{data.address}</Text>
                        <Text>Comments:</Text>
                        <Text style={styles.input}>{data.comments}</Text>
                        
                        <Text>Created At:</Text>
                        <Text style={styles.input}>{Moment(data.createdAt).format("DD MMM YYYY, H:mma")}</Text>
                    </View>
                </View>
                </>
            )
        }
    
       
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
    buttonDelete: {
        marginVertical: 15,
        backgroundColor: ThemeColours.red,
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
    editButton: {
               
        backgroundColor: ThemeColours.prussianblue,
        padding: 10,
        borderRadius: 10,
        position:"absolute",
        bottom:-60,
        width: 300,
        color:"white",
        marginVertical: 15,
        textAlign: 'center',
      },
    editButtonText: {
        color: ThemeColours.eggshell,
        textAlign: 'center',
    },
    title: {
      color: ThemeColours.prussianblue,
      fontSize:30,
      textAlign: 'center',
      paddingBottom:50,
    },
    icon:{
      fontSize:30,
      color:ThemeColours.blackcoral,
      position: 'absolute',
      marginVertical: -50,
      right: 0,
    },
  })

