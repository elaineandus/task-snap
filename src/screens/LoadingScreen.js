import React from 'react'
import { Text, View, Image } from 'react-native'
import { COLORS } from '../constants/theme';

const LoadingScreen = ({navigation}) => {

    setTimeout(()=>{ 
        navigation.replace('TodoScreen')}, 10000)
    return (
        <View style={{
            flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.blue }} >
            <Image source={ require('../assets/images/todo-logo.png') } style={{ width: 135, height: 135 }} />    
            <Text style={{ fontSize: 30, fontWeight: "bold", paddingTop: 15, color: COLORS.white }} > TaskSnap </Text>
            <Text style={{ fontSize: 15, fontWeight: "bold", paddingTop: 5, color: COLORS.white }} > by Elaine S. Andus </Text>
        </View>
    )
}

export default LoadingScreen