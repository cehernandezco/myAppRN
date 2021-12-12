import { useNavigation, useRoute } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, ScrollView, KeyboardAvoidingView, TextInput, TouchableOpacity } from "react-native";
import DatePicker from "react-native-datepicker";
import { Feedback } from "./Feedback";
import { ThemeColours } from "./ThemeColours";

export function AddHours (props) {
    const navigation = useNavigation()
    const [validForm,setValidForm] = useState(false)
  
    const [date,setDate] = useState()
    const [hours,setHours] = useState()
    const [comments,setComments] = useState()

    const route = useRoute()
    const {jobId} = route.params
    
    console.log("Params:")
    console.log(route.params)
    useEffect( () => {
      if(date && hours ) {
        setValidForm( true )
      }
      else {
        setValidForm( false )
      }
    }, [date, hours])
  
    const submitHandler = () => {
      //console.log('submitting Hours')
      const data = { 
        createdAt: new Date().getTime(), 
        date: date ,
        hours, hours,
        comments: comments,
      }
      
        
      props.addHours('hours', data, jobId, navigation)
    }
  
    return (
      <View style={styles.container}>
          <ScrollView>
                
        <Text style={styles.title}>Add Hours</Text>
          <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
          <View style={styles.inner}>
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
              onChangeText={ (val) => setHours(val)}/>
            
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
              <Text style={styles.buttonText}>Add</Text>
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
  })
