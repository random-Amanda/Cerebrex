import React,{Component} from 'react'
import {StyleSheet,Text,Image,View} from 'react-native'
export default class Splash  extends  Component{

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                <Image style={styles.logo}
                 source={require('../images/logo7.png')}
                />
                </View>
                    </View>
        )
    }
}
const styles = StyleSheet.create({

    container:{
        backgroundColor:'rgb(32,53,70)',
        flex:1,
        alignContent:'center',
        justifyContent:'center',
    
    },
    title:{
        fontSize:18,
        fontWeight:'bold',
        color:'black',
        alignContent:'center',
    },
    logoContainer:{
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'column',
        flex:1
    },
})