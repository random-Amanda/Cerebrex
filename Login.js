import React,{Component} from 'react'
import {StyleSheet,Text,View,Image,ImageBackground,TouchableWithoutFeedBack,
    StatusBar,TextInput,SafeAreaView,Keyboard,TouchableOpacity,KeyboardAvoidingView} from 'react-native'

 export default class Login extends Component{
     render(){
         return(
         
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
            <View style={styles.logoContainer}>
            <Image style={styles.logo}
          source={require('../images/logo7.png')}
        />
        <Text style={styles.title}>Enter Your Accont Info</Text>
        </View>

        <View style={styles.credentialsContainer}>
            <TextInput style={styles.info}placeholder="  Username / Email "
             placeholderTextColor='rgba(255,255,255,0.8)'
             KeyboardType='email-address'
             returnKeyType='next'
             autoCorrect={false}
             onSubmitEditing={()=>this.refs.textPassword.focus()} >
             
            </TextInput>
            
            <TextInput style={styles.info}placeholder=" Password "
             placeholderTextColor='rgba(255,255,255,0.8)'
             secureTextEntry={true}
             returnKeyType='go'
             autoCorrect={false} 
             ref={"txtPassword"}>
             
             </TextInput>
             <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.signinbtntxt}>Sign In</Text>
             </TouchableOpacity>
        </View>

         </View>
        </SafeAreaView>
         
         )
     }
 }   
 const styles=StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:'rgb(32,53,70)',
        flexDirection:'column',
    },
    logoContainer:{
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'column',
        flex:1
    },
    logo:{
        
    },
    title:{
        color:'#f7c744',
        fontSize:12,
        textAlign:'center',
        marginTop:8,
        opacity:0.8,
    },
    credentialsContainer:{
        position:'absolute',
        left:0,
        right:0,
        bottom:0,
        padding:20,
        height:200,
    },
    info:{
        height:40,
        backgroundColor:'rgba(255,255,255,0.2)',
        color:'#FFF',
        marginBottom:20,
        paddingHorizontal:10,

    },
    buttonContainer:{
        backgroundColor:'#f7c744',
        paddingVertical:10,
        paddingBottom:10
    },
    signinbtntxt:{
        textAlign:'center',
        color:'rgb(32,53,70)',
        fontSize:18,
        fontWeight:'bold',
        
    }


 })