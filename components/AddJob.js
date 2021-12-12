import React, {useState,useEffect} from 'react'
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, 
  KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { ThemeColours } from './ThemeColours';
import { Feedback } from './Feedback';

import DatePicker from 'react-native-datepicker'
//import { DropDown } from './DropDown';

export function AddJob (props) {
  const [validEmail, setValidEmail ] = useState( false )
  const [validForm,setValidForm] = useState(false)

  const [name,setName] = useState()
  const [client,setClient] = useState()
  const [rate,setRate] = useState()
  const [date,setDate] = useState()
  const [comments,setComments] = useState()

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
    if(name && client && date) {
      setValidForm( true )
    }
    else {
      setValidForm( false )
    }
  }, [name, client, date])

  const submitHandler = () => {
    //console.log('submitting Job')
    const data = { 
      createdAt: new Date().getTime(), 
      name: name ,
      rate: rate,
      date: date,
      client: client,
      comments: comments,
    }
    
      
    props.addJob('jobs', data, navigation)
  }

  return (
    <View style={styles.container}>
        <ScrollView>
      {/*
      <TouchableOpacity 
          style={(Platform.OS === "ios")?styles.visible:styles.visible}
          onPress={ () => navigation.navigate("Home") }
        >
          <Text style={styles.buttonClose}>X</Text>
        </TouchableOpacity>
      */}
      
      <Text style={styles.title}>Add a new Job</Text>
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
        <View style={styles.inner}>
          <Text>Name</Text>
          <TextInput 
            style={styles.input} 
            onChangeText={ (val) => setName(val)}/>
          <Text>Client</Text>
          {/*
          <DropDown label="Select client" data={props.dataClient} containerStyle={styles.dropDownStyle} onChangeText={setClient}/>
          */}
          <TextInput 
            style={styles.input} 
            onChangeText={ (val) => setClient(val)}/>
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
                        
          <Text>Rate (Per Hour)</Text>
          <TextInput 
            style={styles.input} 
            onChangeText={ (val) => setRate(val) }/>
          <Text>Comments</Text>
          <TextInput 
            style={styles.input} 
            onChangeText={ (val) => setComments(val) }
            
          />
          <TouchableOpacity 
            style={ (validForm) ? styles.button : styles.buttonDisabled} 
            disabled={ (validForm) ? false : true }
            onPress={ () => submitHandler() }
          >
            <Text style={styles.buttonText}>Create</Text>
          </TouchableOpacity>
          <Feedback message={props.error} error={true} />
          
          
        </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  )
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
  title: {
    color: ThemeColours.prussianblue,
    fontSize:30,
    textAlign: 'center',
    paddingBottom:50,
    paddingTop:30,
  },
  invisible:{
    display:'none'
  },
  visible:{
    display:'flex'
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
  dropDownStyle:{
    width: '100%',
  }
})