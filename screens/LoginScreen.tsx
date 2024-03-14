import React from 'react';
import { StyleSheet, Text, SafeAreaView,View ,Button,FlatList,ListRenderItemInfo, StatusBar, ImageBackground, TouchableOpacity} from 'react-native';
import { HomeScreenProps, LoginScreenProps, MovieItem, MovieTileProps } from '../types';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';

const LoginScreen=({navigation}:LoginScreenProps)=>{
    return(<SafeAreaView style={styles.container}>       
            <StatusBar translucent backgroundColor="transparent"/>
            <ImageBackground source={require("../assets/img.jpg")} style={styles.img}>
                <LinearGradient colors={['transparent','black']} style={styles.linGrad}>
                    <View style={{paddingTop:20}}>
                        <TouchableOpacity style={styles.btn} onPress={(e)=>{navigation.navigate("SignIn")}}>
                            <Text style={styles.btnText}>Log In</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{paddingTop:20}}>
                        <TouchableOpacity style={styles.btn} onPress={()=>{navigation.navigate("SignUp")}}>
                            <Text style={styles.btnText}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </ImageBackground>
         </SafeAreaView>)
}

const styles=StyleSheet.create({
    container:{
        flex:1
    },
    img:{
        flex:1
    },
    linGrad:{
        flex:1,
        alignItems:'center',
        justifyContent:'flex-end',
    },
    btn:{
        width:300,
        alignItems:'center',
        textAlign:'center',
        backgroundColor:'#E50914',
        borderRadius:5,
        padding:10
    },
    btnText:{
        color:'white',
        fontSize:18,
        paddingHorizontal:10
    }
})

export default LoginScreen;