import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { StyleSheet, Text, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import {useMemo, useState,useEffect} from 'react';
import HomeScreen from './screens/HomeScreen';
import DiscoverScreen from './screens/DiscoverScreen';
import { AuthStackParamList, HomeStackParamList, MainAppParamList, ProfileStackParamList, SearchStackParamList } from './types';
import LoginScreen from './screens/LoginScreen';
import { AppContext, AppContextType } from './context';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import VideosScreen from './screens/VideosScreen';
import SearchScreen from './screens/SearchScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import ManageProfileScreen from './screens/ManageProfileScreen';

const HomeStack=createNativeStackNavigator<HomeStackParamList>();
const SearchStack=createNativeStackNavigator<SearchStackParamList>();
const ProfileStack=createNativeStackNavigator<ProfileStackParamList>();
const AuthStack =createNativeStackNavigator<AuthStackParamList>();
const MainAppTabNav=createMaterialTopTabNavigator<MainAppParamList>();

const HomeTabScreen=()=>{
  return(
    <HomeStack.Navigator screenOptions={{headerShown:false}}>
      <HomeStack.Screen name='Home' component={HomeScreen}/>
      <HomeStack.Screen name='Videos' component={VideosScreen}/>
    </HomeStack.Navigator>
  )
}

const SearchTabScreen=()=>{
  return(
    <SearchStack.Navigator screenOptions={{headerShown:false}}>
      <SearchStack.Screen name='Search' component={SearchScreen}/>
    </SearchStack.Navigator>
  )
}

const ProfileTabScreen=()=>{
  return(
    <ProfileStack.Navigator screenOptions={{headerShown:false}}>
      <ProfileStack.Screen name='Profile' component={ProfileScreen}/>
      <ProfileStack.Screen name='EditProfile' component={EditProfileScreen}/>
      <ProfileStack.Screen name='ManageProfile' component={ManageProfileScreen}/>
    </ProfileStack.Navigator>
  )
}

const MainAppScreen=()=>{
  return(
    <MainAppTabNav.Navigator>
      <MainAppTabNav.Screen name='HomeTab' component={HomeTabScreen}/>
      <MainAppTabNav.Screen name='ProfileTab' component={ProfileTabScreen}/>
      <MainAppTabNav.Screen name='SearchTab' component={SearchTabScreen}/>
    </MainAppTabNav.Navigator>
  )
}

const AuthAppScreen=()=>{
  return(
    <AuthStack.Navigator screenOptions={{headerShown:false}}>
          <AuthStack.Screen name="Login" component={LoginScreen}/>
          <AuthStack.Screen name="SignIn" component={SignInScreen}/>
          <AuthStack.Screen name="SignUp" component={SignUpScreen}/>
  </AuthStack.Navigator>
  )
}

export default function App() {
  //const [theme,setTheme]=useState<ThemeContextType>("light");
  const [initializing,setInitializing]=useState(true);
  const [user,setUser]=useState<FirebaseAuthTypes.User | null>();
  const appContext=useMemo(()=>({signIn:async ()=>{
    const subscriber=auth().onAuthStateChanged(callbackOnAuthStateChange)
  },signOut:async ()=>{
    setInitializing(true);
    const subscriber=auth().onAuthStateChanged(callbackOnAuthStateChange)
  },signUp:async ()=>{
    const subscriber=auth().onAuthStateChanged(callbackOnAuthStateChange)
  }}),[]);

  const callbackOnAuthStateChange:FirebaseAuthTypes.AuthListenerCallback=(user)=>{
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber=auth().onAuthStateChanged(callbackOnAuthStateChange);
  }, [])
  if(initializing) return null;
  return (
    <AppContext.Provider value={appContext}>
      {!user?
      <NavigationContainer>
        <AuthAppScreen/>
      </NavigationContainer>:
      <NavigationContainer>
        <MainAppScreen/>
      </NavigationContainer>}
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
