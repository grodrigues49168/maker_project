import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ImageBackground, ScrollView, SafeAreaView } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { authentication } from '../../../config/firebase'; // Importe o módulo de autenticação do Firebase
import firestore from '../../../config/firebase';
import Styles from './style';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CadastroScreen = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [id, setId] = useState('');
  const [senhaAdministrador, setSenhaAdministrador] = useState(''); // Novo campo para a senha do administrador
  const Fundo = require('../../../images/fundo4.jpg');

  const handleCadastro = async () => {
    if (senhaAdministrador !== 'P0tim@k3r14') {
      Alert.alert('Erro', 'Senha do administrador incorreta.');
      return;
    }

    try {
      // Crie o usuário na autenticação do Firebase
      const userCredential = await createUserWithEmailAndPassword(authentication, email, senha);
      const userId = userCredential.user.uid;

      // Crie um documento correspondente no Firestore usando o ID do usuário
      const userDocRef = doc(firestore, 'users', id);
      await setDoc(userDocRef, {
        nome,
        email,
        telefone,
        id: id,
      });

      console.log('Usuário cadastrado com sucesso!');
      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      Alert.alert('Erro', 'Erro ao cadastrar usuário.');
    }
  };

  return (
    <ImageBackground source={Fundo} imageStyle={{ opacity: 2.0 }} style={Styles.fundo}>
      <View style={Styles.container}>
        <ScrollView>
          <SafeAreaView style={Styles.textcont}>
            <Text style={Styles.text}>Nome:</Text>
          </SafeAreaView>
          <SafeAreaView style={Styles.cont}>
            <TextInput
              placeholder="Digite seu nome"
              value={nome}
              onChangeText={(text) => setNome(text)}
              style={Styles.input}
            />
          </SafeAreaView>
          <SafeAreaView style={Styles.textcont}>
            <Text style={Styles.text}>Email:</Text>
          </SafeAreaView>
          <SafeAreaView style={Styles.cont}>
            <TextInput
              placeholder="Digite seu email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={Styles.input}
            />
          </SafeAreaView>
          <SafeAreaView style={Styles.textcont}>
            <Text style={Styles.text}>Senha:</Text>
          </SafeAreaView>
          <SafeAreaView style={Styles.cont}>
            <TextInput
              placeholder="Digite uma senha"
              value={senha}
              onChangeText={(text) => setSenha(text)}
              style={Styles.input}
              secureTextEntry
            />
          </SafeAreaView>
          <SafeAreaView style={Styles.textcont}>
            <Text style={Styles.text}>Telefone:</Text>
          </SafeAreaView>
          <SafeAreaView style={Styles.cont}>
            <TextInput
              placeholder="Digite seu telefone"
              value={telefone}
              onChangeText={(text) => setTelefone(text)}
              style={Styles.input}
            />
          </SafeAreaView>
          <SafeAreaView style={Styles.textcont}>
            <Text style={Styles.text}>Id:</Text>
          </SafeAreaView>
          <SafeAreaView style={Styles.cont}>
            <TextInput
              placeholder="Digite seu id"
              value={id}
              onChangeText={(text) => setId(text)}
              style={Styles.input}
            />
          </SafeAreaView>
          <SafeAreaView style={Styles.textcont}>
            <Text style={Styles.text}>Senha do Administrador:</Text>
          </SafeAreaView>
          <SafeAreaView style={Styles.cont}>
            <TextInput
              placeholder="Digite a senha do administrador"
              value={senhaAdministrador}
              onChangeText={(text) => setSenhaAdministrador(text)}
              style={Styles.input}
              secureTextEntry
            />
          </SafeAreaView>
          <SafeAreaView style={Styles.cont}>
            <TouchableOpacity title="Cadastrar" style={Styles.btn} onPress={handleCadastro}>
              <Text style={Styles.textbtn}>Cadastrar</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default CadastroScreen;


