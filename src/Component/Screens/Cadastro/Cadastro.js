import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ImageBackground, Touchable } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native'; // Importe a navegação
import Styles from './style'
import { authentication } from '../../../config/firebase';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { set } from 'react-native-reanimated';

const Fundo = require('../../../images/fundo4.jpg')
export default function CadastroScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaAdministrador, setSenhaAdministrador] = useState('');
  const navigation = useNavigation(); // Obtenha a navegação


  const cadastrar = () => {
    if (senhaAdministrador === 'P0tim@k3r14') {
      createUserWithEmailAndPassword(authentication, email, senha)
        .then((userCredential) => {
          // Cadastro bem-sucedido
          const user = userCredential.user;
          alert('Cadastro realizado com sucesso');
          setEmail("");
          setSenha("");
          setSenhaAdministrador("");

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
        });
    } else {
      // Senha do administrador incorreta
      Alert.alert('Senha do administrador incorreta', 'Por favor, insira a senha do administrador corretamente.');
    }
  };

  return (
    <ImageBackground source={Fundo}  imageStyle={{opacity:2.0}} style={Styles.fundo} >
    <View style={Styles.container}>
        <SafeAreaView style={Styles.textcont}>
                <Text style={Styles.text}>email</Text>
            </SafeAreaView>

        
        <SafeAreaView style={Styles.cont}>
        <TextInput
            style={Styles.input}
            placeholder="E-mail"
            value={email}
            onChangeText={(text) => setEmail(text)}
        />
        </SafeAreaView>
        <SafeAreaView style={Styles.textcont}>
            <Text style={Styles.text}>Senha</Text>
        </SafeAreaView>
        <SafeAreaView style={Styles.cont}>
        
        <TextInput
            style={Styles.input}
            placeholder="Senha"
            secureTextEntry={true}
            value={senha}
            onChangeText={(text) => setSenha(text)}
        />
        </SafeAreaView>
        <SafeAreaView style={Styles.textcont}>
            <Text style={Styles.text}>Senha do administrador</Text>
        </SafeAreaView>
        <SafeAreaView style={Styles.cont}>
        <TextInput
            style={Styles.input}
            placeholder="Senha do Administrador"
            secureTextEntry={true}
            value={senhaAdministrador}
            onChangeText={(text) => setSenhaAdministrador(text)}
        />
        </SafeAreaView>
     
        <SafeAreaView style={Styles.cont}>
        <TouchableOpacity title="Cadastrar"  style={Styles.btn} onPress={cadastrar}  >
            <Text style={Styles.textbtn} > Cadastrar</Text>
        </TouchableOpacity>
        </SafeAreaView>
        
    </View>
    </ImageBackground>
  );

}
