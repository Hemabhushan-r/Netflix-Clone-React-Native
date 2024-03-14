import React, { useContext } from 'react';
import { StyleSheet, Text, SafeAreaView,View ,Button,FlatList,ListRenderItemInfo, StatusBar, ImageBackground, TouchableOpacity, TextInput, ActivityIndicator} from 'react-native';
import { LoginScreenProps, MovieItem, MovieTileProps } from '../types';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';
import { SignInScreenProps } from '../types';
import { AppContext } from '../context';

const SignInScreen=({navigation}:SignInScreenProps)=>{
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [loading,setLoading]=useState(false);
    const {signIn}=useContext(AppContext);

    const logIn=()=>{
        setLoading(true);
        auth().signInWithEmailAndPassword(email,password).then(()=>{
            signIn();
        }).catch((error)=>{
            alert(error);
        });
        
    }
    return(
        <SafeAreaView style={styles.container}>
            <StatusBar translucent backgroundColor="transparent"/>
            {loading==false?
            (<View style={{flex:4,padding:30,justifyContent:'center',marginHorizontal:30}}>
                <View style={{paddingVertical:10}}>
                    <View style={{flexDirection:'row',alignItems:'center',padding:10,borderRadius:10,backgroundColor:'rgba(81,81,81,0.76)'}}>
                        <TextInput style={{color:'white'}} placeholderTextColor={"white"} placeholder='Email' onChangeText={(text)=>{setEmail(text)}} value={email} underlineColorAndroid={"transparent"} autoCapitalize="none" />
                    </View>
                </View>
                <View style={{paddingVertical:10}}>
                    <View style={{flexDirection:'row',alignItems:'center',padding:10,borderRadius:10,backgroundColor:'rgba(81,81,81,0.76)'}}>
                        <TextInput style={{color:'white'}} placeholderTextColor={"white"} placeholder='Password' secureTextEntry onChangeText={(text)=>{setPassword(text)}} value={password} underlineColorAndroid={"transparent"} autoCapitalize="none" />
                    </View>
                </View>
                <View style={{paddingTop:20}}>
                    <TouchableOpacity style={styles.btn} onPress={()=>{logIn()}}>
                        <Text style={styles.btnText}>Log In</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row',paddingTop:30,justifyContent:'center'}}>
                    <Text style={{color:'white'}}>Don't have an account ? </Text>
                    <TouchableOpacity onPress={()=>{navigation.navigate("SignUp")}}>
                        <Text style={{color:'#E50914',paddingHorizontal:5}}>Sign Up Here</Text>
                    </TouchableOpacity>
                </View>
            </View>):
            (<View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <View style={{height:100,width:200,justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff'}}>
                    <ActivityIndicator animating={loading} size="large" color="#E50914"/>
                </View>
            </View>)}
        </SafeAreaView>)
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#252525',},
    btn:{
        flexDirection:'row',
        width:'100%',  
        padding:10,
        backgroundColor:'#E50914',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center'},
    btnText: {
        fontSize: 17,
        color: 'white',
        paddingHorizontal: 10,
    }})

export default SignInScreen;