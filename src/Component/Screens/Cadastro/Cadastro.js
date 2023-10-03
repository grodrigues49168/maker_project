import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, ImageBackground, ScrollView, SafeAreaView } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { authentication } from '../../../config/firebase';
import firestore from '../../../config/firebase';
import Styles from './style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Paho from 'paho-mqtt'; // Importe o módulo Paho

const CadastroScreen = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [id, setId] = useState('');
  const [senhaAdministrador, setSenhaAdministrador] = useState('');
  const Fundo = require('../../../images/fundo4.jpg');

  useEffect(() => {
    const client = new Paho.Client('10.44.1.35', 1883, '/');

    client.connect({
      onSuccess: function () {
        console.log('Conectado');
        client.subscribe('acesso/cadastro');
        client.subscribe('aceeso/id')
      },
      onFailure: function () {
        console.log('Desconectado');
      },
    });

    return () => {
      client.disconnect();
    };
  }, []);

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
        id: id,
      });

      console.log('Usuário cadastrado com sucesso!');
      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      Alert.alert('Erro', 'Erro ao cadastrar usuário.');
    }

    ligar();
  };


  function ligar() {
    try {
      const client = new Paho.Client('10.44.1.35', 9001, '/');
      client.connect({
        onSuccess: function () {
          console.log('Conectado');
          client.subscribe('acesso/cadastro');
          const message1 = new Paho.Message('ok');
          message1.destinationName = 'acesso/cadastro';
          client.send(message1);

          setTimeout(() => {
            const message2 = new Paho.Message('no');
            message2.destinationName = 'acesso/cadastro';
            client.send(message2);
            client.disconnect();
          }, 2000);
        },
        onFailure: function () {
          console.log('Desconectado');
        },
      });
    } catch (error) {
      alert('Problema na conexão');
    }
  }
  function conectarId() {
    try {
      const client = new Paho.Client('10.44.1.35', 9001, '/');
      client.connect({
        onSuccess: function () {
          console.log('Conectado');
          client.subscribe('acesso/is');
          const message1 = new Paho.Message(id);
          message1.destinationName = 'acesso/id';
          client.send(message1);

          setTimeout(() => {
            const message2 = new Paho.Message('no');
            message2.destinationName = 'acesso/id';
            client.send(message2);
            client.disconnect();
          }, 2000);
        },
        onFailure: function () {
          console.log('Desconectado');
        },
      });
    } catch (error) {
      alert('Problema na conexão');
    }
  }

  

  return (
    <ImageBackground source={Fundo} imageStyle={{ opacity: 2.0 }} style={Styles.fundo}>
      <View style={Styles.container}>
        <ScrollView>
        <SafeAreaView style={Styles.cont}>
            <Text style={Styles.text}>Nome:</Text>
            <TextInput
              placeholder="Digite seu nome"
              value={nome}
              onChangeText={(text) => setNome(text)}
              style={Styles.input}
            />
          </SafeAreaView>
          <SafeAreaView style={Styles.cont}>
            <Text style={Styles.text}>Email:</Text>
            <TextInput
              placeholder="Digite seu email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={Styles.input}
            />
          </SafeAreaView>
          <SafeAreaView style={Styles.cont}>
            <Text style={Styles.text}>Senha:</Text>
            <TextInput
              placeholder="Digite uma senha"
              value={senha}
              onChangeText={(text) => setSenha(text)}
              style={Styles.input}
              secureTextEntry
            />
          </SafeAreaView>
          <SafeAreaView style={Styles.cont}>
            <Text style={Styles.text}>Id:</Text>
       
            <TextInput
              placeholder="Digite seu id"
              value={id}
              onChangeText={(text) => setId(text)}
              style={Styles.input}
            />
          </SafeAreaView>
          <SafeAreaView style={Styles.cont}>
            <Text style={Styles.text}>Senha do Administrador:</Text>
  
            <TextInput
              placeholder="Digite a senha do administrador"
              value={senhaAdministrador}
              onChangeText={(text) => setSenhaAdministrador(text)}
              style={Styles.input}
              secureTextEntry
            />
          </SafeAreaView>
          <SafeAreaView style={Styles.cont}>
            <TouchableOpacity title="Cadastrar" style={Styles.btn} onPress={()=>{handleCadastro(); ligar(); }}>
              <Text style={Styles.textbtn}>Cadastrar</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default CadastroScreen;


