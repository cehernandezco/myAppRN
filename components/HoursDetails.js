import React, {useEffect,useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import { ThemeColours } from './ThemeColours'
import { Ionicons } from '@expo/vector-icons'

import DatePicker from 'react-native-datepicker'

import Moment from 'moment'
import { WINDOW_WIDTH } from './JobList';

export function JobDetails ( props ) {
  const [ data, setData ] = useState()
  const [ edit, setEdit ] = useState(false)
  
  
  const [hours,setHours] = useState()
  const [date,setDate] = useState()
  const [comments,setComments] = useState()

  const route = useRoute()
  const {id} = route.params

  const navigation = useNavigation()

  useEffect( () => {
    if( !data ) {
      props.getJobHoursDetail( id )
      .then( (document) => setData(document) )
      .catch( (error) => console.log(error) )
    }else{
      setDate(data.date)
      setHours(data.hours)
      setComments(data.comments)
    }
  },[data])
  
  const deleteAlertFunction = (item) => {
      
    //function to make two option alert
    Alert.alert(
       //This is title
      'Delete job',
        //This is body text
      'Are you sure you want to delete this job\'s info: '+item.date+'?',
      [
        {text: 'Yes', onPress: () => props.deleteJobHours(id, navigation)},
        {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
      ],
      { cancelable: false }
      //on clicking out side, Alert will not dismiss
    )
  }
  const editAlertFunction = (item) => {
    const data = { 
        hours: rate,
        date: date,
        comments: comments,
      }
    //function to make two option alert
    Alert.alert(
       //This is title
      'Edit job Hours',
        //This is body text
      'Are you sure you want to edit job\'s hours: '+item.date+'?',
      [
        {text: 'Yes', onPress: () => props.editJobHours(id, data, navigation)},
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
                        <Text style={styles.title}>Job hours</Text>
                        
                        <Text>Date</Text>
                        <DatePicker
                          style={styles.datePickerStyle}
                          date={date} // Initial date from state
                          mode="date" // The enum of date, datetime and time
                          placeholder="select date"
                          format="DD-MM-YYYY"
                          minDate="01-01-2016"
                          maxDate={new Date()}
                          confirmBtnText="Confirm"
                          cancelBtnText="Cancel"
                          customStyles={{
                            dateIcon: {
                              //display: 'none',
                              position: 'absolute',
                              right: 0,
                              top: 4,
                              marginLeft: 0,
                              
                            },
                            dateInput: {                           
                              textAlign: 'left',
                              borderWidth: 0,
                              height: 20,
                              fontSize: 16,
                              alignItems: 'baseline',
                            },
                          }}
                          onDateChange={(date) => {
                            setDate(date);
                          }}
                        />
                        
                        <Text>Hours</Text>
                        <TextInput 
                            style={styles.input} 
                            value={rate}
                            onChangeText={ (val) => setHours(val) }/>
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
                        <Text style={styles.title}>Info details</Text>
                        
                        <Text>Date:</Text>
                        <Text style={styles.input}>{data.date}</Text>
                        <Text>Hours:</Text>
                        <Text style={styles.input}>{data.hours}</Text>
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
    datePickerStyle: {
      backgroundColor: ThemeColours.cultured,
      fontSize: 16,
      padding: 5,
      marginBottom: 15,
      borderRadius: 4,
      borderWidth:0,
      textAlign: 'left',
      width: '100%',
    },
  })