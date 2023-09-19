import React from 'react';
import { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { authentication } from '../../../config/firebase'
import { View, Text, TouchableOpacity, Image, TextInput, SafeAreaView, ImageBackground} from 'react-native';
import Styles from './style';


export default ({navigation}) => {
    const Fundo = require("../../../images/fundo4.jpg")
    
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    function autenticar(){
        signInWithEmailAndPassword(authentication, email, senha)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            alert("Autenticado");
            setEmail("");
            setSenha("");

            navigation.navigate("Home")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
    }

    function cadastrar(){
        createUserWithEmailAndPassword(authentication, email, senha)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                alert("Cadastrado");
                setEmail("");
                setSenha("");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
                // ..
            });
    }   

    function logout(){
        signOut(authentication).then(() => {
            alert("Desconectado");
          }).catch((error) => {
            alert(error);
          });
    }


    return (
                <ImageBackground imageStyle={{opacity:0.3}}  source={Fundo}  resizeMode='cover' style={Styles.fundo}>
                <Image source={require('../../../../assets/logo03.png')} style={Styles.logo} />
        

        <Text style={Styles.text}>Login obrigatório para acessar o sistema!</Text>

        <TextInput style={Styles.input}  testID="inputEmail" placeholder="  Digite seu usuário"  onChangeText={(text) => setEmail(text)}/>
        <TextInput style={Styles.input} testID="inputSenha" secureTextEntry={true} placeholder="  Digite sua senha"  onChangeText={(text) => setSenha(text)} />

        <TouchableOpacity onPress={autenticar} testID="Login" style={Styles.btn} >
            <Text style={Styles.textbtn} > Login </Text>
        </TouchableOpacity>
        </ImageBackground>
    )
}