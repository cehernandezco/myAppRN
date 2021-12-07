import React, {useState,useEffect} from 'react'
import { SafeAreaView, StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { ThemeColours } from './ThemeColours';

import CarouselCards from './CarouselCards';

export function Greetings (props){
    const navigation = useNavigation()
    const [index, setIndex] = React.useState(0)

    useEffect( () => {
        if( props.auth === true ) {
          navigation.reset({ index: 0, routes: [ {name: 'Home'} ] })
        }
      }, [props.auth] )

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.carousel}>
                <CarouselCards/>
            </View>
            <View style={styles.inner}>
                
                <TouchableOpacity style={styles.buttonLogin} onPress={() => navigation.navigate("Signin")}>
                    <Text style={styles.buttonText}>Log in</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonSignup} onPress={() => navigation.navigate("Signup")}>
                    <Text style={styles.buttonText}>Sign up</Text>
                </TouchableOpacity>
            </View>
            
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ThemeColours.blackcoral ,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50,
    },
    inner: {
        width: 300,
        paddingTop:0,
        marginTop: 0,
      },
    buttonLogin: {
        marginVertical: 15,
        backgroundColor: ThemeColours.turquoise,
        padding: 10,
        borderRadius: 10,
      },
    buttonText: {
        color: ThemeColours.cultured,
        textAlign: 'center',
      },
    buttonSignup: {
        marginVertical: 15,
        backgroundColor: ThemeColours.prussianblue,
        padding: 10,
        borderRadius: 10,
      },
      carousel: {
        height: 600,
        padding:15,

      },
})
