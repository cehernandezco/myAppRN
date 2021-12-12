import React, {useEffect,useState} from 'react'
import { StyleSheet, Text, View, FlatList, Pressable, TouchableOpacity, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Moment from 'moment'
import { ThemeColours } from './ThemeColours';
import EmptyList from './EmptyList';
import { Ionicons } from '@expo/vector-icons'

export const WINDOW_WIDTH = Dimensions.get('window').width
export function JobList (props) {
  const navigation = useNavigation()
  const onClick = (item) => {
    navigation.navigate(
        'JobDetails',
        {id: item.id, rate: item.rate, createdAt: item.createdAt, item:item}
    )
  }

   const renderItem = ({item}) => (
        <>
        
          <View style={styles.row}>
            <View  
              style={styles.item} 
            >
                <Pressable onPress={ () => onClick(item)}>
                <Text style={styles.name} >
                    {item.name}
                </Text>
                <Text>
                    Address: {item.address}
                </Text>
                <Text>
                    Date: {item.date}
                </Text>
                <Text>
                    Rate: ${item.rate}
                </Text>
                <Text style={styles.createdAt}>
                    Created: {Moment(item.createdAt).format("DD MMM YYYY, H:mma")}
                </Text>
                </Pressable>
            </View>
            <View style={styles.iconView}>
              <TouchableOpacity 
                    style={styles.icon}
                    onPress={ () => setAddHours() }
                >
                    <Ionicons name="time" style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        
        </>
    )

    return (
        <View style={styles.content}>
            <FlatList 
                ListEmptyComponent={() => <EmptyList/>}
                data={ props.data } 
                renderItem={ renderItem} 
                keyExtractor={item => item.id}  />
        </View>
    )
}


const styles = StyleSheet.create({
  content: {
    padding: 10,
    width:WINDOW_WIDTH,
    flex:1,
  },
  row: {
    maxWidth:WINDOW_WIDTH,
    flexDirection:'row',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  item: {
    padding: 10,
    width: '90%',
    
  },
    name: {
      fontSize:20,
      
    },
    createdAt: {
      fontSize:12,
      color: ThemeColours.gray, 
    },
    iconView:{    
      justifyContent: 'center',
      alignItems: 'center',    
    },
    icon:{
      fontSize:40,
      justifyContent: 'center',
      alignItems: 'center',
      color:ThemeColours.blackcoral,      
      zIndex:90,
    },
})