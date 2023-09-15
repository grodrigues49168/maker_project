import React from 'react';
import { useState } from 'react';
//import firebase from "../../config/firebase";
import { View, Text, TouchableOpacity, Image, TextInput, SafeAreaView, ImageBackground} from 'react-native';
import Styles from './style';


export default function Login(){

const Fundo = require("../../../images/fundo4.jpg")
    return(
        
        <ImageBackground imageStyle={{opacity:0.3}}  source={Fundo}  resizeMode='cover' style={Styles.fundo}>
        <Image source={require('../../../../assets/logo03.png')} style={Styles.logo} />
 

 <Text style={Styles.text}>Login obrigatório para acessar o sistema!</Text>

 <TextInput style={Styles.input}  testID="inputEmail" placeholder="  Digite seu usuário"  onChangeText={(text) => setEmail(text)}/>
 <TextInput style={Styles.input} testID="inputSenha" secureTextEntry={true} placeholder="  Digite sua senha"  onChangeText={(text) => setPassword(text)} />

 <TouchableOpacity  testID="Login" style={Styles.btn} >
     <Text style={Styles.textbtn} > Login </Text>
 </TouchableOpacity>
</ImageBackground>

    )
}