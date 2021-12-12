import React, {useEffect,useState} from 'react'
import { StyleSheet, Text, View, FlatList, Pressable, TouchableOpacity } from 'react-native'

import { useNavigation, useRoute } from '@react-navigation/native';
import Moment from 'moment'

import { ThemeColours } from './ThemeColours';
import EmptyHourList from './EmptyHourList';

export function HourList (props) {
    const navigation = useNavigation()

    const [ dataHours, setDataHours ] = useState()

    const onClick = (item) => {
        navigation.navigate(
            'ClientDetails',
            {id: item.id, address: item.address, createdAt: item.createdAt, item:item}
        )
    }
    const route = useRoute()
    console.log(route.params)
    const {id} = route.params
    const {jobItem} = route.params

    useEffect( () => {
        if( !dataHours ) {
          props.getJobDetailHours( id )
          .then( (document) => setDataHours(document) )
          .catch( (error) => console.log(error) )
        }
      },[dataHours])

    const renderItem = ({item}) => (
        
        <View  
            style={styles.item} 
        >
            <Pressable onPress={ () => onClick(item)}>
            <Text style={styles.name} >
                {item.date}
            </Text>
            <Text>
                Hours: {item.hours}
            </Text>
            <Text style={styles.createdAt}>
                Created: {Moment(item.createdAt).format("DD MMM YYYY, H:mma")}
            </Text>
            </Pressable>
        </View>
        
    )

    return (
        <View>
            <View style={styles.jobInfo}>
                <Text style={styles.jobInfoText}>
                    Job: {jobItem.name}
                </Text>
                <Text style={styles.jobInfoText}>
                    Client: {jobItem.client}
                </Text>
                <Text style={styles.jobInfoText}>
                    Date: {jobItem.date}
                </Text>
                <TouchableOpacity 
                    style={styles.buttonAdd}
                    onPress={ () => navigation.navigate('AddHours', { jobId: jobItem.id }) }>
                  <Text style={styles.buttonText}>Add Hours</Text>
                </TouchableOpacity>
            </View>
            <FlatList 
                ListEmptyComponent={() => <EmptyHourList/>}
                data={ props.dataJobHours } 
                renderItem={ renderItem} 
                keyExtractor={item => item.id} />
        </View>
    )
}


const styles = StyleSheet.create({
    jobInfo: {
        padding: 10,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        
    },
    jobInfoText: {
        fontSize: 20,
    },
    item: {
        padding: 10,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        
    },
    name: {
        fontSize:15,
        
    },
    createdAt: {
        fontSize:12,
        color: ThemeColours.gray, 
      },
    buttonAdd: {
        marginVertical: 15,
        backgroundColor: ThemeColours.prussianblue,
        padding: 10,
        borderRadius: 10,
      },
    buttonText: {
        color: ThemeColours.cultured,
        textAlign: 'center',
      },
})
