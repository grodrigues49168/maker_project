import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { collection, getDocs, serverTimestamp, Timestamp, doc, updateDoc } from 'firebase/firestore';
import firestore from '../../../config/firebase';
import styles from './styles'

export default function App() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const usersCollection = collection(firestore, 'users');
      const usersQuery = await getDocs(usersCollection);

      const usersData = usersQuery.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const userListData = usersData.map((user) => ({
        id: user.id,
        nome: user.nome,
        timeBio: user.timeBio ? user.timeBio.toDate().toString() : 'N/A',
      }));

      setUserList(userListData);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  const handleUpdate = async (userId) => {
    try {
      // Atualiza as informações do usuário com o ID fornecido
      await updateDoc(doc(firestore, 'users', userId), {
        // Adicione aqui os campos que deseja atualizar
        // Exemplo: nome: 'Novo Nome', bioTime: serverTimestamp()
      });

      // Atualiza a lista de usuários
      fetchData();
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
    }
  };

  return (
    <View style={styles.container} >
      <Text  style={styles.titl} >Lista de Usuários</Text>
      <FlatList
        data={userList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text  >Nome: {item.nome}</Text>
            <Text style={styles.title}>ID: {item.id}</Text>
            <Text style={styles.title}>Data e hora de acesso biometria: {item.timeBio}</Text>
            <Text style={styles.title}>{'\n'}</Text>
          </View>
        )}
      />
      <SafeAreaView style={styles.cont}>
        <TouchableOpacity title="Atualizar" style={styles.btn} onPress={fetchData}>
          <Text style={styles.textbtn}>Atualizar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}
