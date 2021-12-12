import React from 'react'
import { StyleSheet, Text, View, Image} from 'react-native'
import { ThemeColours } from './ThemeColours';

export default function EmptyHourList() {
    return (
        <View style={styles.container}> 
            <Image source={ require('../assets/emptyHours.png') } style={styles.emptyImage} resizeMode="cover"/>
            <Text style={styles.emptyText}>Add Hours</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop: 40,
        paddingTop: 20,
        display:'flex',
        flex: 1,
        alignItems:'center',
        justifyContent: 'space-around',

    },
    emptyImage:{
        width: 350,
        height:300,
    },
    emptyText:{
        color:ThemeColours.black,

        marginTop: 30,
        fontSize: 30,
    },
})
