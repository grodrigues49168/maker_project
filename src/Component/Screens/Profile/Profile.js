import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import firestore from '../../../config/firebase';
import styles from './styles';

export default () => {
  const [contatos, setContatos] = useState([{}]);
  const [ultimoAcesso, setUltimoAcesso] = useState('');

  async function listar() {
    const contatosCol = collection(firestore, 'users');
    const contatosSnapshot = await getDocs(contatosCol);
    const contatosList = contatosSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setContatos(contatosList);

    // Encontre a última data/hora de acesso do usuário (pode variar dependendo da estrutura do seu documento)
    const ultimoAcessoUsuario = contatosList[0]?.ultimoAcesso;
    setUltimoAcesso(ultimoAcessoUsuario || 'Nunca acessou'); // Define 'Nunca acessou' se não houver data/hora de acesso
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={contatos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.titile}>id {item.id} </Text>
            <Text style={styles.titile}>email {item.email} </Text>
            <Text style={styles.titile}>nome {item.nome} </Text>
          </View>
        )}
      />
      <SafeAreaView style={styles.cont}>
        <TouchableOpacity title="listar" style={styles.btn} onPress={listar}>
          <Text style={styles.textbtn}>listar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};



