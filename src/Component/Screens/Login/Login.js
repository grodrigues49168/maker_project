import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { authentication} from '../../../config/firebase'; // Certifique-se de importar o firestore do Firebase também
import { View, Text, TouchableOpacity, Image, TextInput, SafeAreaView, ImageBackground } from 'react-native';
import Styles from './style';
import Home from '../Home/Dashboard';
import { useNavigation } from '@react-navigation/native';
import firestore from '../../../config/firebase';
import { doc, setDoc } from 'firebase/firestore';

export default ({ navigation }) => {
  const Fundo = require('../../../images/fundo4.jpg');

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function autenticar() {
    try {
      const userCredential = await signInWithEmailAndPassword(authentication, email, senha);

      // Obter a data e hora atual do servidor
      const timestamp = serverTimestamp();

      const userDocRef = doc(firestore, 'activeUsers', email);
      await setDoc(userDocRef, {
        loginTime: timestamp,
        email: email,
      });

      // Adicionar os dados ao Firestore
    
      // Informar ao usuário que foi autenticado com sucesso
      alert('Autenticado com sucesso!');
      
      // Limpar os campos de email e senha
      setEmail('');
      setSenha('');

      // Navegar para a tela Home
      navigation.navigate('Home');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    }
  }

  // Restante do código...

  return (
    <ImageBackground imageStyle={{ opacity: 0.3 }} source={Fundo} resizeMode="cover" style={Styles.fundo}>
      <Image source={require('../../../../assets/logo03.png')} style={Styles.logo} />

      <Text style={Styles.text}>Login obrigatório para acessar o sistema!</Text>

      <TextInput style={Styles.input} testID="inputEmail" placeholder="  Digite seu usuário" onChangeText={(text) => setEmail(text)} />
      <TextInput style={Styles.input} testID="inputSenha" secureTextEntry={true} placeholder="  Digite sua senha" onChangeText={(text) => setSenha(text)} />

      <TouchableOpacity onPress={autenticar} testID="Login" style={Styles.btn}>
        <Text style={Styles.textbtn}> Login </Text>
      </TouchableOpacity>
      {/* Restante do código... */}
    </ImageBackground>
  );
};
