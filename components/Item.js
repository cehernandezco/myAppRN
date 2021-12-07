import React from 'react';
import {Alert, View, Text, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import Moment from 'moment';
export function Item(props) {
    /*
    const simpleAlertFunction = item => () => {
        //function to make simple alert
        let completedText = item.status?'\nCompleted at: '+Moment(new Date(item.completedAt)).format() :''

        Alert.alert('Task: '+ item.name+
        '\nCreated at: '+ Moment(new Date(item.createdAt)).format('DD MMM YYYY') +
        completedText +
        '\nNote: to delete swipe right'
        );
      }
    */
    return(
      <View style={styles.container}>
        <Text style={styles.text}
            onPress={ () => props.clickHandler(props.item)} 
        >
            {props.text}</Text>
        <Ionicons name="information-circle" 
            color={color} size={size} 
            onPress={simpleAlertFunction(props.item)}/>
        
      </View>
    )
  }

  const styles = StyleSheet.create({
      container: {
          padding:10,
          backgroundColor: '#0c154d',
          borderBottomColor: 'gray',
          borderBottomWidth: 1,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          margin: 1,
          borderRadius: 50,

      },
      containerDone: {
        padding:10,
        backgroundColor: '#C0C0C0',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 1,
        borderRadius: 20,

    },
      text: {
          flex:1,
          color: '#fff',
      },
      infoIcon:{
          color: '#daddf2'
      },
      textDone: {
        flex: 1,
        textDecorationLine: "line-through",
        color: "gray"
      },
  })