import React, {useEffect,useState} from 'react'
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import EmptyClientList from './EmptyClientList'
import Item from './Item'

export function ClientList (props) {
    const navigation = useNavigation()

    const onClick = (item) => {
        navigation.navigate(
            'ClientDetails',
            {id: item.id, address: item.address, createdAt: item.createdAt, item:item}
        )
    }

    const renderItem = ({item}) => (
        /*
        <Item text={item.name} id={item.id} item={item} clickHandler={ClientList}/> 
        */
        <View  
            style={styles.item} 
            >
            <Pressable onPress={ () => onClick(item)}>
            <Text style={styles.name} >
                {item.firstName} {item.lastName}
            </Text>
            <Text>
                Address: {item.address}
            </Text>
            <Text>
                id: {item.id}
            </Text>
            </Pressable>
        </View>
        
    )

    return (
        <View>
            <FlatList 
                ListEmptyComponent={() => <EmptyClientList/>}
                data={ props.data } 
                renderItem={ renderItem} 
                keyExtractor={item => item.id} />
        </View>
    )
}


const styles = StyleSheet.create({
    item: {
        padding: 10,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
      },
      name: {
        fontSize:20,
        
      },
})
