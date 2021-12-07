import React, {useEffect,useState} from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'

import EmptyList from './EmptyList';

export function JobList (props) {
    const renderItem = ({item}) => (
        <View style={styles.item} >
          <Text onPress={ () => onClick(item) }>
            time: {item.time}
            id: {item.id}
          </Text>
        </View>
    )

    return (
        <View>
            <FlatList 
                ListEmptyComponent={() => <EmptyList/>}
                data={ props.data } 
                renderItem={ renderItem} 
                keyExtractor={item => item.id} />
        </View>
    )
}


const styles = StyleSheet.create({})
