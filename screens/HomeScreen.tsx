import React from 'react';
import { StyleSheet, Text, View ,Button,FlatList,ListRenderItemInfo} from 'react-native';
import { HomeScreenProps, MovieItem, MovieTileProps } from '../types';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';


const MovieTile=({movieName}:{movieName:string})=>{
    return( <View style={{height:60,width:300,margin:4,padding:10,alignItems:'center',justifyContent:'center',borderColor:'#ffd75e',borderWidth:3,borderRadius:5}}>
                <Text>{movieName}</Text>
            </View>)
}

const HomeScreen=({route,navigation}:HomeScreenProps)=>{
    const [movies,setMovies]=useState<MovieItem[]>([]);
    useEffect(()=>{
        const onValueChange=database().ref('/main').on('value',(snapshot)=>{
            console.log('Data: ',snapshot.val());
            var tmp:MovieItem[]=[];
            const snapShotRes:Array<string>=snapshot.val();
            snapShotRes.forEach((child)=>{
                tmp.push({key:child});
            })
            setMovies(tmp);
        })
    },[]);
    return(<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <FlatList<MovieItem> style={{marginTop:100}} data={movies} keyExtractor={(item)=>item.key} renderItem={({item}:ListRenderItemInfo<MovieItem>)=><MovieTile movieName={item.key}/>}/>
        {/* <Text>Home Screen</Text>
        <Button title='Go to Screen Two' onPress={()=>navigation.navigate('Discover')}/> */}
    </View>)
}

export default HomeScreen;