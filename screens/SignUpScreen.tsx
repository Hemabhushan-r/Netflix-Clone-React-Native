import React, { useContext } from 'react';
import { StyleSheet, Text, SafeAreaView,View ,Button,FlatList,ListRenderItemInfo, StatusBar, ImageBackground, TouchableOpacity, TextInput, ActivityIndicator, ToastAndroid} from 'react-native';
import {  LoginScreenProps, MovieItem, MovieTileProps } from '../types';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';
import { SignUpScreenProps } from '../types';
import { AppContext } from '../context';

const SignUpScreen=({navigation}:SignUpScreenProps)=>{
    const [fullName,setFullName]=useState('');
    const [email,setEmail]=useState('');
    const [phone,setPhone]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const [loading,setLoading]=useState(false);
    const {signUp}=useContext(AppContext);

    const registerUser=()=>{
        if(password!=confirmPassword){
            alert('Passwords don\'t match');
            return;
        }
        setLoading(true);
        auth().createUserWithEmailAndPassword(email,password).then((response)=>{
            const uid=response.user.uid;
            const data={
                id:uid,
                fullName,
                email,
                phone
            }
            database().ref(`Users/${uid}`).set({
                Info:data,
                Profiles:{
                    0:{
                        name:'User1'
                    },
                    1:{
                        name:'User2'
                    },
                    2:{
                        name:'User3'
                    },
                    3:{
                        name:'User4'
                    },
                }
            }).then(()=>{
                ToastAndroid.show('Registration Successful!',ToastAndroid.SHORT);
                signUp();
            }).catch((error)=>{
                console.log(error);
            })
        }).catch((error)=>{
            alert(error);
        })
    }
    
    return(
        <SafeAreaView style={styles.container}>
            <StatusBar translucent backgroundColor="transparent"/>
            {loading==false?
            (<View style={{flex:1,padding:30,justifyContent:'center',marginHorizontal:30}}>
                <View style={{paddingVertical:10}}>
                    <View style={{flexDirection:'row',alignItems:'center',padding:10,borderRadius:10,backgroundColor:'rgba(81,81,81,0.76)'}}>
                        <TextInput style={{color:'white'}} placeholderTextColor={"white"} placeholder='Full Name' onChangeText={(text)=>{setFullName(text)}} value={fullName} underlineColorAndroid={"transparent"} autoCapitalize="none" />
                    </View>
                </View>
                <View style={{paddingVertical:10}}>
                    <View style={{flexDirection:'row',alignItems:'center',padding:10,borderRadius:10,backgroundColor:'rgba(81,81,81,0.76)'}}>
                        <TextInput style={{color:'white'}} placeholderTextColor={"white"} placeholder='Email' onChangeText={(text)=>{setEmail(text)}} value={email} underlineColorAndroid={"transparent"} autoCapitalize="none" />
                    </View>
                </View>
                <View style={{paddingVertical:10}}>
                    <View style={{flexDirection:'row',alignItems:'center',padding:10,borderRadius:10,backgroundColor:'rgba(81,81,81,0.76)'}}>
                        <TextInput keyboardType='number-pad' style={{color:'white'}} placeholderTextColor={"white"} placeholder='Phone No' onChangeText={(text)=>{setPhone(text)}} value={phone} underlineColorAndroid={"transparent"} autoCapitalize="none" />
                    </View>
                </View>
                <View style={{paddingVertical:10}}>
                    <View style={{flexDirection:'row',alignItems:'center',padding:10,borderRadius:10,backgroundColor:'rgba(81,81,81,0.76)'}}>
                        <TextInput style={{color:'white'}} placeholderTextColor={"white"} placeholder='Password' secureTextEntry onChangeText={(text)=>{setPassword(text)}} value={password} underlineColorAndroid={"transparent"} autoCapitalize="none" />
                    </View>
                </View>
                <View style={{paddingVertical:10}}>
                    <View style={{flexDirection:'row',alignItems:'center',padding:10,borderRadius:10,backgroundColor:'rgba(81,81,81,0.76)'}}>
                        <TextInput style={{color:'white'}} placeholderTextColor={"white"} placeholder='Confirm Password' secureTextEntry onChangeText={(text)=>{setConfirmPassword(text)}} value={confirmPassword} underlineColorAndroid={"transparent"} autoCapitalize="none" />
                    </View>
                </View>
                <View style={{paddingTop:20}}>
                    <TouchableOpacity style={styles.btn} onPress={()=>{registerUser()}}>
                        <Text style={styles.btnText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row',paddingTop:30,justifyContent:'center'}}>
                    <Text style={{color:'white'}}>Already have an account ? </Text>
                    <TouchableOpacity onPress={()=>{navigation.navigate("SignIn")}}>
                        <Text style={{color:'#E50914',paddingHorizontal:5}}>Sign In Here</Text>
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

export default SignUpScreen;